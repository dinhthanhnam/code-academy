"use client";
import CourseList from "@/components/CourseList/CourseList";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import RankingBoard from "@/components/Ranking/RankingBoard";
import { useDevice } from "@/hooks/useDevice";
import { useRole } from "@/hooks/useAuth";
import Exercise from "@/types/Exercise";
import { FaClipboardList, FaTrophy, FaBook } from "react-icons/fa";

// Dữ liệu mẫu
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
];

export default function Home() {
  const { isMobile } = useDevice();
  const { isStudent } = useRole();

  if (!isStudent) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-screen mx-auto">

        {/* Main Content */}
        <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-5"}`}>
          {/* Pending Exercises - 3/5 width on desktop */}
          <div className={`${isMobile ? "col-span-1" : "col-span-3"}`}>
                    <PendingExerciseList
                    exercises={sampleExercises}
                    onSelectExercise={(exercise) => console.log(exercise)}
                    />
          </div>

          {/* Right Column - 2/5 width on desktop */}
          <div className={`${isMobile ? "col-span-1" : "col-span-2"} flex flex-col gap-6`}>
            {/* Ranking Board */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-2 border-l-2 border-primary shadow-secondary">
              <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
                <FaTrophy className="text-yellow-600" />
                <h2 className="text-lg font-semibold text-gray-800">Bảng xếp hạng</h2>
              </div>
              <div className="overflow-auto">
                <RankingBoard />
              </div>
            </div>

            {/* Course List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-2 border-l-2 border-primary shadow-secondary">
              <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
                <FaBook className="text-green-600" />
                <h2 className="text-lg font-semibold text-gray-800">Lớp học của tôi</h2>
              </div>
              <div className="overflow-auto">
                <CourseList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}