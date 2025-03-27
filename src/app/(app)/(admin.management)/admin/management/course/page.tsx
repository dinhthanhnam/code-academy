"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useDevice } from "@/app/hooks/useDevice";
import { Course } from "@/types/Course";
import CommonButton2 from "@/components/Common/CommonButton2";
import CommonRow from "@/components/Common/CommonRow";
import CommonSearch from "@/components/Common/CommonSearch";
import {fetchCourseClassesByCourse, getCourses} from "@/utils/service/CourseService";
import { PaginatedCourse } from "@/types/PaginatedCourse";
import {SyncLoader} from "react-spinners";
import CourseClassContainer from "@/components/Admin/Course/CourseClassContainer";
import {PaginatedCourseClass} from "@/types/PaginatedCourseClass";

export default function AdminManagementCoursePage() {
    const [courses, setCourses] = useState<PaginatedCourse | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // 🔹 Thêm state loading
    const { isMobile } = useDevice();

    const handleSubmit = async () => {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
        setLoading(false);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            const data = await getCourses();
            setCourses(data);
            setLoading(false);
        };

        fetchCourses();
    }, []);

    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            {/* Course List */}
            <div className={`bg-white p-2 rounded-lg shadow border min-w-max border-secondary ${isMobile ? "w-full" : "w-1/3"}`}>
                <div className={`flex flex-row gap-2 p-2 justify-between items-center`}>
                    <CommonSearch
                        key={'search_course'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSubmit}
                    />
                    <CommonButton2 onClick={() => console.log("Thêm học phần")} icon={Plus} label="Thêm học phần" />
                </div>

                <div className={`p-2`}>
                    <div className={`border border-secondary p-2 rounded-md gap-2`}>
                        {loading ? (
                            <div className={`items-center justify-items-center`}>
                                <SyncLoader color={`gray`} size={8} margin={4} speedMultiplier={0.6} />
                            </div>
                        ) : courses?.data ? (
                            courses.data.map((course) => (
                                <div key={course.id} className={`py-1`}>
                                    <CommonRow
                                        course={course}
                                        selected={selectedCourse?.id === course.id}
                                        onSelect={() => setSelectedCourse(course)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Không có dữ liệu.</p> // 🔹 Thông báo khi không có dữ liệu
                        )}
                    </div>
                </div>
            </div>

            {/* Course Class List */}
            <div className={`bg-white p-2 rounded-lg shadow flex border border-secondary ${isMobile ? "w-full" : "flex-grow"}`}>
                {selectedCourse ? (
                    <CourseClassContainer parentCourse={selectedCourse} />
                ) : (
                    <p className="text-gray-500 text-lg">Chọn một học phần để xem danh sách lớp học phần</p>
                )}
            </div>
        </div>
    );
}
