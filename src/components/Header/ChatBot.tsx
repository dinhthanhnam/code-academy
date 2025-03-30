import React, { useState } from 'react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút mở chatbox */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-400 text-white p-4 rounded-full shadow-lg hover:bg-orange-5500 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="bg-white w-80 h-[500px] rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-orange-400 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Của sổ Chat</h3>
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
    </div>
  );
};

export default Chatbot;