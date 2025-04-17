"use client";

import { useState, useEffect } from "react";
import {
    getInitial,
    formatTime,
    initializeChat,
    handleSendMessage,
    refreshMessages,
} from "@/utils/service/ChatService";

export default function Chatbox() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                                    {conversation.lastMessage}
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
                        <button
                            onClick={() => refreshMessages(selectedConversation, setSelectedConversation, setConversations, setError)}
                            className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200"
                        >
                            Làm mới
                        </button>
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
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) =>
                            handleSendMessage(
                                e,
                                newMessage,
                                selectedConversation,
                                currentUserId,
                                setNewMessage,
                                setSelectedConversation,
                                setConversations,
                                setError
                            )
                        }
                        className="p-6 border-t border-orange-300"
                    >
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