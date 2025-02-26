"use client";
import { useState } from "react";

const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "HashMap"], status: "✅" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", tags: ["Linked List", "Math"], status: "🔲" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", tags: ["String", "Sliding Window"], status: "🔲" },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", tags: ["Binary Search", "Array"], status: "🔲" },
    { id: 5, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 6, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 7, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 8, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 9, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 10, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 11, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 12, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 13, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 14, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 15, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
    { id: 16, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"], status: "🔲" },
];

export default function ProblemList() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="problem-container p-6 flex-grow overflow-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Problem List</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="problem-header">
                        <th className="problem-cell text-left">Status</th>
                        <th className="problem-cell text-left">Title</th>
                        <th className="problem-cell text-left">Difficulty</th>
                        <th className="problem-cell text-left">Tags</th>
                    </tr>
                    </thead>
                    <tbody>
                    {problems.map((problem) => (
                        <tr
                            key={problem.id}
                            className={`problem-row ${selected === problem.id ? "bg-primary2" : "hover:bg-gray-50"}`}
                            onClick={() => setSelected(problem.id)}
                        >
                            <td className="problem-cell text-lg">{problem.status}</td>
                            <td className="problem-cell font-medium text-blue-600 hover:underline">{problem.title}</td>
                            <td className={`problem-cell ${problem.difficulty === "Easy" ? "text-green-600" : problem.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}`}>
                                {problem.difficulty}
                            </td>
                            <td className="problem-cell">
                                {problem.tags.map((tag, index) => (
                                    <span key={index} className="inline-block bg-gray-200 text-xs px-2 py-1 rounded-full mr-1">
                      {tag}
                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
