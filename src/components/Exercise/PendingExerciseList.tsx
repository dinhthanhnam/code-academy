"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PendingExerciseRow from "@/components/Row/PendingExerciseRow";
import Exercise, { ExerciseListProps } from "@/types/Exercise";

export default function PendingExerciseList({ exercises = [], onSelectExercise }: ExerciseListProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const pendingExercises = exercises
    .filter((exercise) => exercise.pivot?.is_active === 1) // Kiểm tra pivot có tồn tại
    .sort((a, b) => {
      const dateA = a.pivot?.deadline ? new Date(a.pivot.deadline).getTime() : Infinity;
      const dateB = b.pivot?.deadline ? new Date(b.pivot.deadline).getTime() : Infinity;
      return dateA - dateB;
    });
  const pendingCount = pendingExercises.length;

  const handleExerciseClick = (exercise: Exercise) => {
    const exerciseId = exercise.pivot?.course_id ?? null; // Dùng course_id làm id tạm thời
    if (selected === exerciseId) {
      setSelected(null);
      if (onSelectExercise) onSelectExercise(null);
    } else {
      setSelected(exerciseId);
      if (onSelectExercise) onSelectExercise(exercise);
    }
  };

  const handleStartExercise = (courseId?: number | null, weekNumber?: number) => {
    if (courseId && weekNumber) {
      router.push(`http://localhost:3000/exercises/${courseId}/${weekNumber}`);
    } else {
      router.push(`http://localhost:3000/exercises`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex-grow overflow-auto border-t-2 border-l-2 border-primary shadow-secondary">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          Bài tập chưa hoàn thành
          <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
            {pendingCount}
          </span>
        </h2>
      </div>

      {pendingCount === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg italic">Bạn đã hoàn thành tất cả bài tập! 🎉</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-base font-bold">
                <th className="py-3 px-4 text-left">Trạng thái</th>
                <th className="py-3 px-4 text-left">Tên bài tập</th>
                <th className="py-3 px-4 text-left">Độ khó</th>
                <th className="py-3 px-4 text-left">Chủ đề</th>
                <th className="py-3 px-4 text-left">Khóa học</th>
                <th className="py-3 px-4 text-left">Hạn nộp</th>
              </tr>
            </thead>
            <tbody>
              {pendingExercises.map((exercise, index) => (
                <PendingExerciseRow
                  key={index} // Tạm dùng index, nên thay bằng key duy nhất nếu có
                  exercise={exercise}
                  isSelected={selected === exercise.pivot?.course_id}
                  onExerciseClick={handleExerciseClick}
                  onStartExercise={handleStartExercise}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}