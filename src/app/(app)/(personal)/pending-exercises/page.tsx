"use client";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import Exercise from "@/types/Exercise";
import { FaTasks } from "react-icons/fa";

const sampleExercises: Exercise[] = [
  {
    title: "Two Sum",
    level: "Easy",
    topics: ["Array", "HashMap"],
    pivot: {
      course_id: 1,
      week_number: 1,
      deadline: "2025-04-10",
      is_active: 1,
      is_hard_deadline: 0,
    },
  },
  {
    title: "Add Two Numbers",
    level: "Medium",
    topics: ["Linked List", "Math"],
    pivot: {
      course_id: 2,
      week_number: 2,
      deadline: "2025-04-06",
      is_active: 1,
      is_hard_deadline: 0,
    },
  },
  {
    title: "Longest Substring",
    level: "Medium",
    topics: ["String", "Sliding Window"],
    pivot: {
      course_id: 3,
      week_number: 3,
      deadline: "2025-04-05",
      is_active: 0,
      is_hard_deadline: 0,
    },
  },
  {
    title: "Final Exam",
    level: "Exam",
    topics: ["Comprehensive"],
    pivot: {
      course_id: 4,
      week_number: 4,
      deadline: "2025-04-07",
      is_active: 1,
      is_hard_deadline: 1,
    },
  },
];

export default function PendingExercisesPage({ params }) {
  const pendingExercises = sampleExercises.filter(ex => ex.pivot.is_active === 1);

  // Thống kê theo độ khó
  const easyCount = pendingExercises.filter(ex => ex.level === "Easy").length;
  const mediumCount = pendingExercises.filter(ex => ex.level === "Medium").length;
  const advancedCount = pendingExercises.filter(ex => ex.level === "Advanced").length;
  const examCount = pendingExercises.filter(ex => ex.level === "Exam").length;

  // Tìm bài có hạn gần nhất
  const nearestDeadlineExercise = pendingExercises
    .sort((a, b) => new Date(a.pivot.deadline).getTime() - new Date(b.pivot.deadline).getTime())[0];

  return (
    <div className="max-w-screen min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-10 py-4">
          <div className=" flex text-left items-center gap-3">
            <FaTasks className="text-2xl text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Danh sách các bài tập cần làm
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Thống kê và chi tiết các bài tập bạn chưa hoàn thành
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen mx-auto px-6 py-8 flex-1">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập cơ bản</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{easyCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập trung cấp</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{mediumCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập nâng cao</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{advancedCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài kiểm tra</h3>
            <p className="text-3xl font-bold text-primary mt-2">{examCount}</p>
            <p className="text-sm text-gray-500">Chưa làm</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Bài tập gần nhất đến hạn</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">
              {nearestDeadlineExercise ? 
                `${nearestDeadlineExercise.title} (${nearestDeadlineExercise.pivot.deadline})` : 
                "None"}
            </p>
          </div>
        </div>

        {/* Detailed List */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <PendingExerciseList
            exercises={pendingExercises}
            onSelectExercise={(exercise) => console.log(exercise)}
          />
        </div>
      </main>

    </div>
  );
}