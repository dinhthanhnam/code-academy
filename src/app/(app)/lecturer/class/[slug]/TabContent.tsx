"use client";

import { useClassContext } from "./ClassContext";

export default function TabContent() {
    const { activeTab, selectedExercise } = useClassContext();

    return (
        <div className="flex-1 p-4 overflow-auto">
            {activeTab === "editor" && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Code Editor</h2>
                    <p className="text-gray-600">
                        {selectedExercise ? "Code editor cho: " + selectedExercise.title : "Chọn bài tập để mở editor"}
                    </p>
                </div>
            )}
            {activeTab === "submissions" && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Nội dung nộp bài</h2>
                    <p className="text-gray-600">
                        {selectedExercise ? "Bài nộp cho: " + selectedExercise.title : "Chọn bài tập để xem bài nộp"}
                    </p>
                </div>
            )}
            {activeTab === "students" && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Danh sách sinh viên</h2>
                    <p className="text-gray-600">Danh sách tất cả sinh viên trong lớp</p>
                </div>
            )}
            {activeTab === "exerciseStudents" && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        {selectedExercise ? "Sinh viên nộp bài này" : "Tất cả nội dung nộp"}
                    </h2>
                    <p className="text-gray-600">
                        {selectedExercise ? "Danh sách sinh viên nộp bài: " + selectedExercise.title : "Tất cả bài nộp trong lớp"}
                    </p>
                </div>
            )}
        </div>
    );
}