import { BiChevronRight } from "react-icons/bi";
import Exercise, {PendingExerciseRowProps} from "@/types/Exercise"; // Giả sử các interface được định nghĩa trong file types.ts

export default function PendingExerciseRow({
  exercise,
  isSelected,
  onExerciseClick,
  onStartExercise,
}: PendingExerciseRowProps) {
  return (
    <>
      <tr
        className={`border-b cursor-pointer transition-all duration-200 ${
          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
        }`}
        onClick={() => onExerciseClick(exercise)}
      >
        <td className="py-3 px-4 text-sm">{exercise.pivot.is_active === 1 ? "🔲" : "✅"}</td>
        <td className="py-3 px-4 font-medium text-blue-600 hover:underline">
          {exercise.title || "Chưa có tiêu đề"}
        </td>
        <td
          className={`py-3 px-4 ${
            exercise.level === "Easy"
              ? "text-green-600"
              : exercise.level === "Medium"
              ? "text-yellow-600"
              : exercise.level === "Hard"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {exercise.level || "Không xác định"}
        </td>
        <td className="py-3 px-4">
          {exercise.topics?.map((topic, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-xs px-2 py-1 rounded-full mr-1"
            >
              {topic}
            </span>
          )) || "Không có chủ đề"}
        </td>
        <td className="py-3 px-4 text-gray-600 flex items-center">
          {exercise.pivot?.course_id || "Không có khóa học"}
          <BiChevronRight className="ml-1 text-gray-400" />
        </td>
        <td className="py-3 px-4 text-gray-600">
          {exercise.pivot?.deadline
            ? new Date(exercise.pivot.deadline).toLocaleDateString("vi-VN")
            : "Không có hạn nộp"}
        </td>
      </tr>
      {isSelected && (
        <tr>
          <td colSpan={6} className="p-0">
            <div className="p-6 bg-white border-x border-b border-gray-100 transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                {exercise.title || "Chưa có tiêu đề"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Độ khó</p>
                  <p
                    className={`text-lg font-semibold ${
                      exercise.level === "Easy"
                        ? "text-green-600"
                        : exercise.level === "Medium"
                        ? "text-yellow-600"
                        : exercise.level === "Hard"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {exercise.level || "Không xác định"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Khóa học</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {exercise.pivot?.course_id || "Không có khóa học"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Hạn nộp</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {exercise.pivot?.deadline
                      ? new Date(exercise.pivot.deadline).toLocaleDateString("vi-VN")
                      : "Không có hạn nộp"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Chủ đề</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {exercise.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    )) || <span className="text-gray-600">Không có chủ đề</span>}
                  </div>
                </div>
              </div>
              <button
                className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-secondary text-white rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-md"
                onClick={() => onStartExercise(exercise.pivot?.course_id, exercise.pivot?.week_number)}
              >
                Làm bài ngay
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}