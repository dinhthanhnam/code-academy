// components/Chatbox.tsx
"use client";

import { useState } from "react";

export default function Chatbox() {
  const [contacts] = useState([
    {
      id: 1,
      name: "Lớp năng lực số ứng dụng K24CNTTA - IS52A",
      lastMessage: "Mai kiểm tra",
      time: "10:30",
      messages: [
        { id: 1, user: "Hưng", content: "Mai kiểm tra", time: "10:30" },
        { id: 2, user: "Me", content: "M sợ à", time: "10:31" },
      ],
    },
    {
      id: 2,
      name: "Lớp nhập môn ngành công nghệ thông tin K24HTTTA - IS57A",
      lastMessage: "Hello",
      time: "10:25",
      messages: [
        { id: 1, user: "Nam", content: "Hello", time: "10:25" },
      ],
    },
  ]);

  const [selectedChat, setSelectedChat] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const updatedChat = {
        ...selectedChat,
        messages: [
          ...selectedChat.messages,
          {
            id: selectedChat.messages.length + 1,
            user: "Me",
            content: newMessage,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      };
      setSelectedChat(updatedChat);
      setNewMessage("");
    }
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="flex w-full max-h-screen gap-6">
      {/* Danh sách nhóm chat */}
      <div className="w-96 flex flex-col bg-gradient-to-b from-orange-200 to-orange-300 rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Tin nhắn
          </h2>
          <p className="text-sm text-gray-600 font-medium">Stay connected</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact)}
              className={`flex items-center p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                selectedChat.id === contact.id
                  ? "bg-orange-400 shadow-lg"
                  : "bg-white bg-opacity-70 hover:bg-opacity-100"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
                <span className="text-xl font-semibold text-white whitespace-normal">
                    {getInitial(contact.name)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800 text-base break-words whitespace-normal">
                    {contact.name}
                </p>
                  <span className="text-xs text-gray-600">{contact.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Khu vực chat */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-orange-100 to-orange-200 rounded-xl shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-orange-300 flex items-center">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mr-4">
            <span className="text-lg font-semibold text-white">
              {getInitial(selectedChat.name)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-xl">
              {selectedChat.name}
            </h3>
            <p className="text-sm text-orange-600 font-medium">Đang hoạt động</p>
          </div>
        </div>

        {/* Tin nhắn */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedChat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.user === "Me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 ${
                  message.user === "Me"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    : "bg-white bg-opacity-80 text-gray-800"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-75 block mt-1">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
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
    </div>
  );
}