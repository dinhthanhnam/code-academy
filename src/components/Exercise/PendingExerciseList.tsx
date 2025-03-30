"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const exercises = [
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



export default function PendingExerciseList() {
    const [selected, setSelected] = useState(null);
    const router = useRouter();
    
      const handleClick = () => {
        router.push('/pending-exercises');
      };

    return (
        <div className="exercise-container p-6 flex-grow overflow-auto">
            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4 cursor-pointer" onClick={handleClick}>
                Bài tập chưa hoàn thành 
                <BiChevronRight size={18} strokeWidth={0.8}/>
            </h2>
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
                    {exercises.map((exercise) => (
                        <tr
                            key={exercise.id}
                            className={`exercise-row ${selected === exercise.id ? "bg-primary2" : "hover:bg-gray-50"}`}
                            onClick={() => setSelected(exercise.id)}
                        >
                            <td className="exercise-cell text-lg">{exercise.status}</td>
                            <td className="exercise-cell font-medium text-blue-600 hover:underline">{exercise.title}</td>
                            <td className={`exercise-cell ${exercise.difficulty === "Easy" ? "text-green-600" : exercise.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}`}>
                                {exercise.difficulty}
                            </td>
                            <td className="exercise-cell">
                                {exercise.tags.map((tag, index) => (
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
