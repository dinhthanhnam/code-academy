import {
    fetchPersonalConversation,
    fetchMessagesByConversation,
    sendMessage,
} from "@/utils/service/StudentService";
import { getCurrentUserId } from "@/utils/service/AuthService";

interface Conversation {
    id: string;
    name: string;
    lastMessage?: string;
    time?: string;
    messages: Message[];
}

interface Message {
    id: string;
    user_id: string;
    user_name?: string;
    content: string;
    created_at: string;
}

// Lấy ký tự đầu tiên của tên
export const getInitial = (name: string): string => {
    return name.charAt(0).toUpperCase();
};

// Định dạng thời gian
export const formatTime = (dateString?: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Time";
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Khởi tạo chat
export const initializeChat = async (
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
    setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>,
    setCurrentUserId: React.Dispatch<React.SetStateAction<string | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
    try {
        setLoading(true);

        // Bước 1: Lấy ID người dùng
        try {
            const userId = await getCurrentUserId();
            console.log("Current User ID:", userId); // Debug
            setCurrentUserId(userId);
        } catch (err) {
            console.error("Error fetching user ID:", err);
            setError("Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.");
            return;
        }

        // Bước 2: Lấy danh sách các cuộc hội thoại
        const courseClasses = await fetchPersonalConversation();
        const convs: Conversation[] = courseClasses.map((course) => ({
            id: course.id,
            name: course.name,
            messages: [],
        }));

        // Bước 3: Lấy tin nhắn cho từng cuộc hội thoại
        const updatedConvs = await Promise.all(
            convs.map(async (conv) => {
                try {
                    const messages = await fetchMessagesByConversation(conv.id);
                    return {
                        ...conv,
                        messages,
                        lastMessage: messages[messages.length - 1]?.content || "Chưa có tin nhắn",
                        time: messages[messages.length - 1]?.created_at || "",
                    };
                } catch (error) {
                    console.error(`Error loading messages for conversation ${conv.id}:`, error);
                    return {
                        ...conv,
                        messages: [],
                        lastMessage: "Chưa có tin nhắn",
                        time: "",
                    };
                }
            })
        );

        // Bước 4: Cập nhật state
        setConversations(updatedConvs);
        if (updatedConvs.length > 0) {
            setSelectedConversation(updatedConvs[0]);
        }
    } catch (error) {
        console.error("Error loading conversations:", error);
        setError("Không thể tải cuộc hội thoại. Vui lòng thử lại.");
    } finally {
        setLoading(false);
    }
};

// Gửi tin nhắn
export const handleSendMessage = async (
    e: React.FormEvent,
    newMessage: string,
    selectedConversation: Conversation | null,
    currentUserId: string | null,
    setNewMessage: React.Dispatch<React.SetStateAction<string>>,
    setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>,
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !currentUserId) {
        setError("Vui lòng chọn cuộc hội thoại và đảm bảo đã đăng nhập.");
        return;
    }

    try {
        const sentMessage = await sendMessage(selectedConversation.id, newMessage);
        console.log("Sent message with user_id:", sentMessage.user_id); // Debug
        const updatedMessages = [...selectedConversation.messages, sentMessage];
        const updatedConversation = {
            ...selectedConversation,
            messages: updatedMessages,
            lastMessage: sentMessage.content,
            time: sentMessage.created_at,
        };

        // Cập nhật selectedConversation
        setSelectedConversation(updatedConversation);

        // Cập nhật conversations
        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === selectedConversation.id ? updatedConversation : conv
            )
        );

        setNewMessage("");
    } catch (error) {
        console.error("Error sending message:", error);
        setError("Không thể gửi tin nhắn. Vui lòng thử lại.");
    }
};

// Làm mới tin nhắn
export const refreshMessages = async (
    selectedConversation: Conversation | null,
    setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>,
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
    if (!selectedConversation) return;
    try {
        const messages = await fetchMessagesByConversation(selectedConversation.id);
        const updatedConversation = {
            ...selectedConversation,
            messages,
            lastMessage: messages[messages.length - 1]?.content || "Chưa có tin nhắn",
            time: messages[messages.length - 1]?.created_at || "",
        };
        setSelectedConversation(updatedConversation);
        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === selectedConversation.id ? updatedConversation : conv
            )
        );
    } catch (error) {
        console.error("Error refreshing messages:", error);
        setError("Không thể làm mới tin nhắn. Vui lòng thử lại.");
    }
};