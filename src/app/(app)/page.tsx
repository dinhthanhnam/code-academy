"use client";
import CourseList from "@/components/CourseList/CourseList";
import PendingExerciseList from "@/components/Exercise/PendingExerciseList";
import RankingBoard from "@/components/Ranking/RankingBoard";
import { useDevice } from "@/hooks/useDevice";
import { useRole } from "@/hooks/useAuth";
import Exercise from "@/types/Exercise"; // Import interface Exercise

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

  return isStudent ? (
    <div className="flex justify-center min-h-screen p-2">
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2 w-full`}>
        {/* Cột bên trái */}
        <div className="flex-1">
          <PendingExerciseList
            exercises={sampleExercises}
            onSelectExercise={(exercise) => console.log(exercise)}
          />
        </div>

        {/* Cột bên phải */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-100 overflow-auto">
            <RankingBoard />
          </div>
          <div className="h-100 overflow-auto">
            <CourseList />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}