"use client";

import React, { useState } from "react";
import CommonButton from "@/components/Common/CommonButton";

interface AddExerciseModalProps {
    onClose: () => void;
}

export default function AddExerciseModal({ onClose }: AddExerciseModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "easy",
        example_input: "",
        example_output: "",
        test_cases: [{ stdin: "", expected_output: "" }],
        time_limit: 1,
        memory_limit: 256,
        topics: [] as string[],
        language: "c_cpp",
        week_number: 1,
        deadline: "",
        is_active: true,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "time_limit" || name === "memory_limit" || name === "week_number" ? parseInt(value) : value,
        }));
    };

    const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const topics = e.target.value.split(",").map((t) => t.trim());
        setFormData((prev) => ({ ...prev, topics }));
    };

    const handleTestCaseChange = (index: number, field: "stdin" | "expected_output", value: string) => {
        const newTestCases = [...formData.test_cases];
        newTestCases[index][field] = value;
        setFormData((prev) => ({ ...prev, test_cases: newTestCases }));
    };

    const addTestCase = () => {
        setFormData((prev) => ({
            ...prev,
            test_cases: [...prev.test_cases, { stdin: "", expected_output: "" }],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            test_cases: JSON.stringify(formData.test_cases),
            is_free: 0, // Giá trị mặc định
            is_hard_deadline: 0, // Giá trị mặc định
        };
        console.log("Payload:", payload); // Thay bằng API call thực tế
        // Ví dụ: await fetch("/api/exercises", { method: "POST", body: JSON.stringify(payload) });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Thêm bài tập mới</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows={3}
                            required
                        />
                    </div>

                    {/* Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Độ khó</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="easy">Dễ</option>
                            <option value="intermediate">Trung bình</option>
                            <option value="hard">Khó</option>
                        </select>
                    </div>

                    {/* Example Input & Output */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Input ví dụ</label>
                            <input
                                type="text"
                                name="example_input"
                                value={formData.example_input}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Output ví dụ</label>
                            <input
                                type="text"
                                name="example_output"
                                value={formData.example_output}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* Test Cases */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Test Cases</label>
                        {formData.test_cases.map((test, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4 mt-2">
                                <input
                                    type="text"
                                    placeholder="Input"
                                    value={test.stdin}
                                    onChange={(e) => handleTestCaseChange(index, "stdin", e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Output"
                                    value={test.expected_output}
                                    onChange={(e) => handleTestCaseChange(index, "expected_output", e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTestCase}
                            className="mt-2 text-sm text-primary hover:text-primary2"
                        >
                            + Thêm test case
                        </button>
                    </div>

                    {/* Time & Memory Limit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Thời gian (giây)</label>
                            <input
                                type="number"
                                name="time_limit"
                                value={formData.time_limit}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bộ nhớ (MB)</label>
                            <input
                                type="number"
                                name="memory_limit"
                                value={formData.memory_limit}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Topics */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Chủ đề (phân cách bằng dấu phẩy)</label>
                        <input
                            type="text"
                            name="topics"
                            value={formData.topics.join(", ")}
                            onChange={handleTopicChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngôn ngữ</label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="c_cpp">C/C++</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                        </select>
                    </div>

                    {/* Week Number & Deadline */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tuần</label>
                            <input
                                type="number"
                                name="week_number"
                                value={formData.week_number}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hạn nộp</label>
                            <input
                                type="datetime-local"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* Is Active */}
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
                                className="mr-2"
                            />
                            Hoạt động
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <CommonButton label="Hủy" onClick={onClose} />
                        <CommonButton label="Tạo" onClick={onClose} />
                    </div>
                </form>
            </div>
        </div>
    );
}