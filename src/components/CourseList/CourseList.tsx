"use client";

export default function CourseList() {
  const courses = [
    { 
      id: 1,
      title: "Lớp năng lực số ứng dụng K24CNTTA - IS52A",
      progress: 75,
      lessons: 20,
      completedLessons: 15,
    },
    { 
      id: 2,
      title: "Lớp nhập môn ngành công nghệ thông tin K24CNTTA - IS57A",
      progress: 40,
      lessons: 25,
      completedLessons: 10,
    },
    { 
      id: 3,
      title: "Lập trình nâng cao với C K24CNTTA - IS28A",
      progress: 90,
      lessons: 15,
      completedLessons: 13,
    },
  ];

  return (
    <div className="exercise-container p-6 flex-grow overflow-auto">
      {/* Tiêu đề */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Khóa học của tôi
      </h2>

      {/* Danh sách khóa học */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="flex flex-col transform transition-all hover:scale-105 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            {/* Thông tin khóa học */}
            <div className="flex flex-col flex-grow">
              <h3 className="font-semibold text-gray-800 text-lg mb-3 truncate">
                {course.title}
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Tiến độ: <span className="font-medium text-gray-800">{course.progress}%</span>
                </p>
                <p className="text-sm text-gray-600">
                  Bài học: <span className="font-medium text-gray-800">{course.completedLessons}/{course.lessons}</span>
                </p>
              </div>

              {/* Thanh tiến độ */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-orange-400 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Nút tiếp tục */}
            <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Tiếp tục học
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}