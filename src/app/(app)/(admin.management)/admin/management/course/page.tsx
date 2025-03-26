"use client";
import {useEffect, useState} from "react";
import { Plus } from "lucide-react";
import { useDevice } from "@/app/hooks/useDevice";
import { Course } from "@/types/Course";
import CommonButton2 from "@/components/Common/CommonButton2";
import CommonRow from "@/components/Common/CommonRow";
import CommonSearch from "@/components/Common/CommonSearch";
import { getCourses} from "@/utils/service/CourseService";
import {CourseResponse} from "@/types/CourseResponse";

export default function AdminManagementCoursePage() {
    const [courses, setCourses] = useState<CourseResponse | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const { isMobile } = useDevice();
    const handleSubmit = async () => {
       const res = await getCourses();
       setCourses(res.data);
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await getCourses(); // Gọi API
            setCourses(res.data); // Cập nhật state
        };

        fetchCourses();
    }, []); // Dependency array rỗng để chỉ chạy một lần khi component mount



    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            {/* Course List */}
            <div className={`bg-white p-2 rounded-lg shadow border border-secondary ${isMobile ? "w-full" : "w-1/3"}`}>
                <div className={`flex flex-row gap-2 p-2 justify-between items-center`}>
                    <CommonSearch
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSubmit}
                    />
                    <CommonButton2 onClick={() => console.log("Thêm học phần")} icon={Plus} label="Thêm học phần" />
                </div>
                <div>
                    {courses?.courses?.map((course) => (
                        <CommonRow
                            key={course.id}
                            course={course}
                            onSelect={() => setSelectedCourse(course)}
                        />
                    ))}
                </div>
            </div>

            {/* Course Class List */}
            <div className={`bg-white p-4 rounded-lg shadow flex items-center justify-center border border-secondary ${isMobile ? "w-full" : "w-2/3"}`}>
                {selectedCourse ? (
                    <CourseClassContainer course={selectedCourse} />
                ) : (
                    <p className="text-gray-500 text-lg">Chọn một học phần để xem danh sách lớp học phần</p>
                )}
            </div>
        </div>
    );
}

// Component CourseClass (placeholder)
function CourseClassContainer({ course }: { course: Course }) {
    return <p className="text-lg font-medium">Danh sách lớp của {course.name} sẽ hiển thị ở đây.</p>;
}
