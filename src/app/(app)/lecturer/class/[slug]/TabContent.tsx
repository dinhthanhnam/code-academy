"use client";

import { useClassContext } from "./ClassContext";
import ExerciseDetail from "./ExerciseDetail";
import StudentList from "@/app/(app)/lecturer/class/[slug]/StudentList";

export default function TabContent() {
    const { students, activeTab, selectedExercise } = useClassContext();

    const renderContent = () => {
        switch (activeTab) {
            case "detail":
                return <ExerciseDetail exercise={selectedExercise} />;
            case "submissions":
                return (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Nội dung nộp bài</h2>
                        <p className="text-gray-600">
                            {selectedExercise ? "Bài nộp cho: " + selectedExercise.title : "Chọn bài tập để xem bài nộp"}
                        </p>
                    </div>
                );
            case "students":
                return <StudentList students={students} />;
            default:
                return null;
        }
    };

    return <div className="flex-1 p-4 overflow-auto">{renderContent()}</div>;
}