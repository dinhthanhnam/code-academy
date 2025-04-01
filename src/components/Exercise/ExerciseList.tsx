"use client";
import React, { useState } from "react";
import { HiOutlineSaveAs } from "react-icons/hi";
import ExerciseRow from "../Row/ExerciseRow";

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
    {
        id: 14,
        title: "Bài kiểm tra số 1",
        difficulty: "Exam",
        tags: ["Linked List", "Heap"],
        status: "🔲",
        problems: [
            {
                description: "Viết một chương trình nhận vào một số nguyên n (1 ≤ n ≤ 10⁶) và kiểm tra xem nó có phải là số nguyên tố hay không.",
                input: "7",
                output: "YES"
            },
        ],
        deadline: "15:00 02/04/2025",
    },
];

export default function ExerciseList() {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState("All");
  
    // Lọc danh sách bài tập dựa trên độ khó
    const filteredExercises =
      filter === "All"
        ? exercises
        : exercises.filter((exercise) => exercise.difficulty === filter);
  
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
                filter === "Easy" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setFilter("Easy")}
            >
              Dễ
            </button>
            <button
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                filter === "Medium" ? "bg-yellow-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setFilter("Medium")}
            >
              Trung bình
            </button>
            <button
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                filter === "Hard" ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setFilter("Hard")}
            >
              Khó
            </button>
            <button
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-md ${
                filter === "Exam" ? "bg-orange-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setFilter("Exam")}
            >
              Bài kiểm tra
            </button>
          </div>
        </div>
  
        {/* Tiêu đề cột */}
        <div className="flex flex-row p-4 bg-gray-200 font-bold text-gray-800 border-b">
          <div className="w-1/12 text-center">Trạng thái</div>
          <div className="w-4/12 text-center">Tiêu đề</div>
          <div className="w-2/12 text-center">Độ khó</div>
          <div className="w-3/12 text-center">Dạng bài</div>
          <div className="w-2/12 text-center">Hạn nộp</div>
        </div>
  
        {/* Danh sách các hàng */}
        <div className="overflow-x-auto">
          {filteredExercises.map((exercise) => (
            <ExerciseRow
              key={exercise.id}
              exercise={exercise}
              isSelected={selected === exercise.id}
              onClick={() => setSelected(selected === exercise.id ? null : exercise.id)}
            />
          ))}
        </div>
      </div>
    );
  }