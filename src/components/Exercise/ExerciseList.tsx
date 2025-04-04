"use client";
import React, { useState } from "react";
import Exercise from "@/types/Exercise";
import ExerciseRow from "../Row/ExerciseRow";

interface ExerciseListProps {
    exercises: Exercise[];
    onSelectExercise?: (exercise: Exercise | null) => void; // Thêm callback để thông báo bài tập được chọn
}

export default function ExerciseList({ exercises, onSelectExercise }: ExerciseListProps) {
    const [selected, setSelected] = useState<number | string | null>(null);
    const [filter, setFilter] = useState<string>("All");

    const filteredExercises = exercises && Array.isArray(exercises)
        ? exercises
              .filter((exercise) => exercise.pivot?.is_active === 1)
              .filter((exercise) =>
                  filter === "All" ? true : exercise.level === filter
              )
        : [];

    const handleSelect = (index: number | string | null) => {
        setSelected(index);
        // Truyền bài tập được chọn lên component cha
        if (onSelectExercise) {
            const selectedExercise = index !== null ? filteredExercises.find((_, i) => i === index) || null : null;
            onSelectExercise(selectedExercise || null);
        }
    };

    return (
        <div className="exercise-container p-6 flex-grow overflow-auto">
            <div className="flex flex-row justify-between">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Danh sách bài tập</h2>
                <div className="flex gap-3 mb-6">
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "All" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("All")}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "basic" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("basic")}
                    >
                        Cơ bản
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "intermediate" ? "bg-yellow-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("intermediate")}
                    >
                        Trung cấp
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "advanced" ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("advanced")}
                    >
                        Nâng cao
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "exam" ? "bg-orange-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("exam")}
                    >
                        Bài kiểm tra
                    </button>
                </div>
            </div>

            <div className="flex flex-row p-4 bg-gray-200 font-bold text-gray-800 border-b">
                <div className="w-1/12 text-center">Trạng thái</div>
                <div className="w-4/12 text-center">Tiêu đề</div>
                <div className="w-2/12 text-center">Độ khó</div>
                <div className="w-3/12 text-center">Dạng bài</div>
                <div className="w-2/12 text-center">Hạn nộp</div>
            </div>

            <div className="overflow-x-auto">
                {filteredExercises.length > 0 ? (
                    filteredExercises.map((exercise, index) => (
                        <ExerciseRow
                            key={index}
                            exercise={{
                                id: index,
                                title: exercise.title || "Không có tiêu đề",
                                difficulty:
                                    exercise.level === "basic"
                                        ? "Cơ bản"
                                        : exercise.level === "intermediate"
                                        ? "Trung cấp"
                                        : exercise.level === "advanced"
                                        ? "Nâng cao"
                                        : "Không xác định",
                                tags: exercise.topics || [],
                                status: "🔲",
                                problems: [
                                    {
                                        description: exercise.description || "",
                                        input: exercise.example_input || "",
                                        output: exercise.example_output || "",
                                    },
                                ],
                                deadline: exercise.pivot?.deadline || "N/A",
                            }}
                            isSelected={selected === index}
                            onClick={() => handleSelect(selected === index ? null : index)}
                        />
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        Không có bài tập nào để hiển thị.
                    </div>
                )}
            </div>
        </div>
    );
}