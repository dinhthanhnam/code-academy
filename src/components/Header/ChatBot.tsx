"use client";
import React, { useState } from "react";
import { LuMessageCircleMore } from "react-icons/lu";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <>
      {/* Icon dấu cộng */}
      <div
        className="p-1 rounded-full hover:bg-primary2 duration-200 group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <LuMessageCircleMore  size={28} />
        <span className="tooltip">Chat</span>
      </div>

      {/* Chatbox dropdown */}
      {isOpen && (
        <div className="fixed top-16 right-4 bg-white w-80 h-[400px] rounded-lg shadow-xl flex flex-col z-40">
          {/* Header của chat */}
          <div className="bg-orange-400 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Cửa sổ Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Chưa có tin nhắn nào</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-black p-2 rounded-lg mb-2 max-w-[70%] ml-auto"
                >
                  {msg}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-400 text-white p-2 rounded-r-lg hover:bg-orange-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;