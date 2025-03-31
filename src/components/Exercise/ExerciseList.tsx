"use client";
import React, { useState } from "react";
import { HiOutlineSaveAs } from "react-icons/hi";

const exercises = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "HashMap"],
        status: "🔲",
        problems: [
            {
                description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]"
            },
        ]
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        tags: ["Linked List", "Math"],
        status: "🔲",
        problems: [
            {
                description: "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.",
                input: "l1 = [2,4,3], l2 = [5,6,4]",
                output: "[7,0,8]"
            },
        ]
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        tags: ["String", "Sliding Window"],
        status: "🔲",
        problems: [
            {
                description: "Given a string s, find the length of the longest substring without repeating characters.",
                input: "s = 'abcabcbb'",
                output: "3"
            },
        ]
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        tags: ["Binary Search", "Array"],
        status: "🔲",
        problems: [
            {
                description: "Given two sorted arrays nums1 and nums2, find the median of the two sorted arrays.",
                input: "nums1 = [1,3], nums2 = [2]",
                output: "2.0"
            },
        ]
    },
    {
        id: 5,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
    {
        id: 10,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
    {
        id: 6,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
    {
        id: 7,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
    {
        id: 11,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
    {
        id: 12,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
    {
        id: 15,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
    {
        id: 13,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Merge k sorted linked lists and return it as one sorted list.",
                input: "lists = [[1,4,5],[1,3,4],[2,6]]",
                output: "[1,1,2,3,4,4,5,6]"
            },
        ]
    },
];

export default function ExerciseList() {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState("All"); 

    // Lọc danh sách bài tập dựa trên độ khó
    const filteredExercises = filter === "All"
        ? exercises
        : exercises.filter(exercise => exercise.difficulty === filter);

    return (
        <div className="exercise-container p-6 flex-grow overflow-auto">
            <div className="flex flex-row justify-between">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Exercise List</h2>
                
                <div className="flex gap-3 mb-6">
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "All" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("All")}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "Easy" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("Easy")}
                    >
                        Easy
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "Medium" ? "bg-yellow-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("Medium")}
                    >
                        Medium
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                            filter === "Hard" ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setFilter("Hard")}
                    >
                        Hard
                    </button>
                </div>
            </div>
            

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="exercise-header">
                            <th className="exercise-cell text-left">Status</th>
                            <th className="exercise-cell text-left">Title</th>
                            <th className="exercise-cell text-left">Difficulty</th>
                            <th className="exercise-cell text-left">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExercises.map((exercise) => (
                            <React.Fragment key={exercise.id}>
                                <tr
                                    className={`exercise-row ${
                                        selected === exercise.id ? "bg-primary2" : "hover:bg-gray-50"
                                    }`}
                                    onClick={() => setSelected(selected === exercise.id ? null : exercise.id)}
                                >
                                    <td className="exercise-cell text-lg">{exercise.status}</td>
                                    <td className="exercise-cell font-medium text-blue-600 hover:underline">
                                        {exercise.title}
                                    </td>
                                    <td
                                        className={`exercise-cell ${
                                            exercise.difficulty === "Easy"
                                                ? "text-green-600"
                                                : exercise.difficulty === "Medium"
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {exercise.difficulty}
                                    </td>
                                    <td className="exercise-cell">
                                        {exercise.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-gray-200 text-xs px-2 py-1 rounded-full mr-1"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </td>
                                </tr>
                                {selected === exercise.id && (
                                    <tr className="transition-all duration-300 ease-in-out max-h-[24rem] opacity-100">
                                        <td colSpan={4} className="p-4 bg-gray-100">
                                            <div className="exercise-details relative">
                                                <h3 className="font-semibold mb-2">Problems:</h3>
                                                {exercise.problems.map((problem, index) => (
                                                    <div key={index} className="mb-4 relative">
                                                        <p className="text-gray-700">{problem.description}</p>
                                                        <p className="mt-1">
                                                            <span className="font-medium">Input:</span> {problem.input}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Output:</span> {problem.output}
                                                        </p>
                                                        <div className="absolute bottom-0 right-0">
                                                            <button 
                                                            className="p-1 rounded-full bg-gray-200 text-black transition-all duration-200 hover:scale-110 hover:bg-gray-300 hover:text-black">
                                                                <HiOutlineSaveAs size={22}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}