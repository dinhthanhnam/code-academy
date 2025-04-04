"use client";

import { useState } from "react";
import { useClassContext } from "./ClassContext";

export default function ExerciseList() {
    const { exercises, selectedExercise, setSelectedExercise } = useClassContext();
    const [filter, setFilter] = useState("All");

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="p-6 flex flex-row justify-between border-b">
                <h2 className="text-xl font-bold text-gray-800">Danh sách bài tập</h2>
                <div className="flex gap-3">
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
                            filter === "Easy" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("Easy")}
                    >
                        Dễ
                    </button>
                </div>
            </div>

            <div className="flex flex-row p-4 bg-gray-200 font-bold text-gray-800 border-b">
                <div className="w-4/12 text-center">Tiêu đề</div>
                <div className="w-2/12 text-center">Độ khó</div>
                <div className="w-3/12 text-center">Dạng bài</div>
                <div className="w-2/12 text-center">Hạn nộp</div>
            </div>

            <div className="flex-1 overflow-auto">
                {exercises?.data?.map((exercise: any) => (
                    <div
                        key={exercise.id}
                        className={`flex flex-row p-4 border-b cursor-pointer transition-colors duration-200 ${
                            selectedExercise === exercise
                                ? "bg-blue-100 text-blue-900"
                                : "hover:bg-gray-50 text-gray-800"
                        }`}
                        onClick={() => setSelectedExercise(exercise)}
                    >
                        <div className="w-4/12">{exercise.title}</div>
                        <div className="w-2/12 text-center">{exercise.level}</div>
                        <div className="w-3/12 text-center">{exercise.topics.join(", ")}</div>
                        <div className="w-2/12 text-center">{exercise.deadline}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}