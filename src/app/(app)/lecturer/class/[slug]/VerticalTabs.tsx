"use client";

import { useClassContext } from "./ClassContext";
import { Code, Upload, Users, BarChart2 } from "lucide-react";

export default function VerticalTabs() {
    const { activeTab, setActiveTab } = useClassContext();

    return (
        <div className="w-16 bg-gray-50 flex flex-col items-center py-4 gap-3 border-r border-secondary m-1">
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-md group relative ${
                    activeTab === "editor"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("editor")}
            >
                <Code size={20} />
                <span className="tooltip z-10">Mở Code Editor</span>
            </button>
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-md group relative ${
                    activeTab === "submissions"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("submissions")}
            >
                <Upload size={20} />
                <span className="tooltip z-10">Xem nội dung nộp bài</span>
            </button>
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-md group relative ${
                    activeTab === "students"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("students")}
            >
                <Users size={20} />
                <span className="tooltip z-10">Xem danh sách sinh viên</span>
            </button>
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-md group relative ${
                    activeTab === "exerciseStudents"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("exerciseStudents")}
            >
                <BarChart2 size={20} />
                <span className="tooltip z-10">Xem sinh viên nộp bài này</span>
            </button>
        </div>
    );
}