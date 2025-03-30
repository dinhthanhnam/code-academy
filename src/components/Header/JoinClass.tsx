"use client";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

const JoinClass: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [classCode, setClassCode] = useState("");

  // Xử lý tham gia lớp
  const handleJoinClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (classCode.trim()) {
      console.log("Tham gia lớp với mã:", classCode);
      // Thêm logic để gọi API hoặc xử lý mã lớp tại đây
      setClassCode("");
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Icon dấu cộng */}
      <div
        className="p-1 rounded-full hover:bg-primary2 duration-200 group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <BiPlus size={28} />
        <span className="tooltip">Tham gia lớp</span>
      </div>

      {/* Modal nhập mã lớp */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Tham gia lớp học</h3>
            <form onSubmit={handleJoinClass}>
              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="Nhập mã lớp"
                className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
                >
                  Tham gia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinClass;