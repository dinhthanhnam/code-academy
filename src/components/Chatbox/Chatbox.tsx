"use client";

import { useState, useEffect, useRef } from "react";
import { getInitial, formatTime, initializeChat, sendChatMessage } from "@/utils/service/ChatService";
import echo from "@/utils/Echo";

interface Message {
    id: string;
    user_id: string;
    user_name: string;
    content: string;
    conversation_id: string;
    created_at: string;
    updated_at: string;
}

interface Conversation {
    id: string;
    name: string;
    lastMessage?: string;
    time?: string;
    messages: Message[];
}

export default function Chatbox() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Khởi tạo chat
    useEffect(() => {
        initializeChat(
            setConversations,
            setSelectedConversation,
            setCurrentUserId,
            setError,
            setLoading
        );
    }, []);

    // Tự động scroll đến tin nhắn mới
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedConversation?.messages]);

    // WebSocket: Nhận tin nhắn real-time
    useEffect(() => {
        if (!echo || !selectedConversation) return;

        // Đăng ký kênh WebSocket
        const channelName = `conversation.${selectedConversation.id}`;
        console.log(`Subscribing to private-${channelName}`);

        const channel = echo.private(channelName);

        // Đăng ký sự kiện MessageSent
        channel.listen('MessageSent', (data) => {
            console.log('Raw WebSocket data:', data);

            // Phân tích dữ liệu nhận được
            let newMessage;
            try {
                // Kiểm tra nếu data là string (JSON) thì parse nó
                if (typeof data === 'string') {
                    newMessage = JSON.parse(data);
                }
                // Kiểm tra nếu data có thuộc tính message
                else if (data && data.message) {
                    newMessage = data.message;
                }
                // Nếu data đã là object và không có thuộc tính message, thì nó có thể là message
                else if (data && data.id && data.conversation_id) {
                    newMessage = data;
                }
                // Nếu data.data tồn tại và là string
                else if (data && data.data && typeof data.data === 'string') {
                    newMessage = JSON.parse(data.data);
                }
                // Nếu không đúng định dạng nào thì ném lỗi
                else {
                    throw new Error('Unknown message format');
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
                console.error('Raw data:', data);
                return;
            }

            if (!newMessage || !newMessage.id) {
                console.error('Invalid message format:', newMessage);
                return;
            }

            console.log('Processed message:', newMessage);

            // Chuyển đổi conversation_id thành string nếu cần
            if (newMessage.conversation_id && typeof newMessage.conversation_id !== 'string') {
                newMessage.conversation_id = String(newMessage.conversation_id);
            }

            // Cập nhật conversations
            setConversations((prevConversations) => {
                return prevConversations.map((conv) => {
                    if (conv.id === newMessage.conversation_id) {
                        const existingMsgIndex = conv.messages.findIndex(m => m.id === newMessage.id);

                        const updatedMessages = [...conv.messages];
                        if (existingMsgIndex >= 0) {
                            updatedMessages[existingMsgIndex] = newMessage;
                        } else {
                            updatedMessages.push(newMessage);
                        }

                        return {
                            ...conv,
                            messages: updatedMessages,
                            lastMessage: newMessage.content,
                            time: newMessage.created_at,
                        };
                    }
                    return conv;
                });
            });

            // Cập nhật selectedConversation
            setSelectedConversation((prevSelected) => {
                if (prevSelected && prevSelected.id === newMessage.conversation_id) {
                    const existingMsgIndex = prevSelected.messages.findIndex(m => m.id === newMessage.id);

                    const updatedMessages = [...prevSelected.messages];
                    if (existingMsgIndex >= 0) {
                        updatedMessages[existingMsgIndex] = newMessage;
                    } else {
                        updatedMessages.push(newMessage);
                    }

                    return {
                        ...prevSelected,
                        messages: updatedMessages,
                        lastMessage: newMessage.content,
                        time: newMessage.created_at,
                    };
                }
                return prevSelected;
            });
        });

        // Xử lý các lỗi kết nối WebSocket
        channel.error((error) => {
            console.error(`WebSocket connection error for channel ${channelName}:`, error);
            setError(`Lỗi kết nối: ${error.message || 'Không thể kết nối đến server'}`);
        });

        // Cleanup function
        return () => {
            console.log(`Unsubscribing from private-${channelName}`);
            channel.stopListening('MessageSent');
            echo.leave(`private-${channelName}`);
        };
    }, [selectedConversation?.id]);

    // Gửi tin nhắn
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation || !currentUserId) {
            setError("Vui lòng nhập tin nhắn và chọn hội thoại.");
            return;
        }

        try {
            const messageContent = newMessage.trim();
            setNewMessage(""); // Xóa input ngay lập tức để UX tốt hơn

            // Tạo optimistic update để UI phản hồi ngay
            const optimisticMessage: Message = {
                id: `temp-${Date.now()}`, // ID tạm thời, sẽ được thay thế khi nhận phản hồi từ server
                user_id: currentUserId,
                user_name: "You", // Hoặc lấy tên người dùng từ nơi khác nếu có
                content: messageContent,
                conversation_id: selectedConversation.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Cập nhật UI với tin nhắn optimistic
            setSelectedConversation(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    messages: [...prev.messages, optimisticMessage],
                    lastMessage: optimisticMessage.content,
                    time: optimisticMessage.created_at
                };
            });

            // Gửi tin nhắn lên server
            await sendChatMessage(selectedConversation.id, messageContent);
            // Không cần cập nhật state ở đây vì WebSocket sẽ cập nhật tin nhắn với dữ liệu thực từ server

        } catch (err) {
            console.error("Error sending message:", err);
            setError(err.message || "Không thể gửi tin nhắn. Vui lòng thử lại.");

            // Khôi phục tin nhắn vào input nếu gửi thất bại
            setNewMessage(newMessage);
        }
    };

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="flex w-full max-h-screen gap-6 p-4">
            {/* Danh sách nhóm chat */}
            <div className="w-96 flex flex-col bg-gradient-to-b from-orange-200 to-orange-300 rounded-xl shadow-xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800">Tin nhắn</h2>
                    <p className="text-sm text-gray-600 font-medium">Stay connected</p>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => setSelectedConversation(conversation)}
                            className={`flex items-center p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                                selectedConversation?.id === conversation.id
                                    ? "bg-orange-400 shadow-lg"
                                    : "bg-white bg-opacity-70 hover:bg-opacity-100"
                            }`}
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
                                <span className="text-xl font-semibold text-white">
                                    {getInitial(conversation.name)}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800 text-base truncate">
                                        {conversation.name}
                                    </p>
                                    <span className="text-xs text-gray-600 flex-shrink-0">
                                        {formatTime(conversation.time)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-1">
                                    {conversation.lastMessage || "Chưa có tin nhắn"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Khu vực chat */}
            {selectedConversation && currentUserId && (
                <div className="flex-1 flex flex-col bg-gradient-to-b from-orange-100 to-orange-200 rounded-xl shadow-xl">
                    {/* Header */}
                    <div className="p-6 border-b border-orange-300 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
                                <span className="text-lg font-semibold text-white">
                                    {getInitial(selectedConversation.name)}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 text-xl">{selectedConversation.name}</h3>
                                <p className="text-sm text-orange-600 font-medium">Đang hoạt động</p>
                            </div>
                        </div>
                    </div>

                    {/* Tin nhắn */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {selectedConversation.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex mb-4 ${
                                    message.user_id === currentUserId ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[70%] p-4 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 ${
                                        message.user_id === currentUserId
                                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                                            : "bg-white bg-opacity-80 text-gray-800"
                                    }`}
                                >
                                    <p className="text-sm font-semibold">{message.user_name || "Unknown"}</p>
                                    <p className="text-sm">{message.content}</p>
                                    <span className="text-xs opacity-75 block mt-1">
                                        {formatTime(message.created_at)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-6 border-t border-orange-300">
                        <div className="flex gap-4">
                            <input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                className="flex-1 p-3 bg-white bg-opacity-70 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
                            >
                                Gửi
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}