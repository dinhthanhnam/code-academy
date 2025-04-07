"use client";

import { useClassContext } from "./ClassContext";
import ExerciseDetail from "./ExerciseDetail";
import StudentList from "@/app/(app)/lecturer/class/[slug]/StudentList";
import SubmissionList from "@/app/(app)/lecturer/class/[slug]/SubmissionList";

export default function TabContent() {
    const { course ,students, activeTab, selectedExercise } = useClassContext();

    const renderContent = () => {
        switch (activeTab) {
            case "detail":
                return <ExerciseDetail exercise={selectedExercise} />;
            case "submissions":
                return (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Nội dung nộp bài</h2>
                        {selectedExercise ? (
                            <>
                                <p className="text-gray-600 mb-2">Bài nộp cho: {selectedExercise.title}</p>
                                <SubmissionList
                                    exerciseId={selectedExercise.id}
                                    courseClassId={course.id}
                                />
                            </>
                        ) : (
                            <p className="text-gray-600">Chọn bài tập để xem bài nộp</p>
                        )}
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