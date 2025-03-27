"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useDevice } from "@/app/hooks/useDevice";
import { Course } from "@/types/Course";
import CommonButton from "@/components/Common/CommonButton";
import CourseRow from "@/components/Row/CourseRow";
import CommonSearch from "@/components/Common/CommonSearch";
import { getCourses } from "@/utils/service/CourseService";
import { PaginatedCourse } from "@/types/PaginatedCourse";
import { SyncLoader } from "react-spinners";
import CourseClassContainer from "@/components/Admin/Course/CourseClassContainer";
import CommonPagination from "@/components/Pagination/CommonPagination";

export default function AdminManagementCoursePage() {
    const [courses, setCourses] = useState<PaginatedCourse | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { isMobile } = useDevice();

    // Hàm lấy danh sách khóa học (có hỗ trợ search + pagination)
    const fetchCourses = async (page = 1, query?: string | null) => {
        setLoading(true);
        const data = await getCourses(page, query);
        setCourses(data);
        setLoading(false);
    };

    // Hàm tìm kiếm
    const handleSearch = () => {
        fetchCourses(1, search); // Reset về trang 1 khi tìm kiếm
    };

    // Khi xóa hết search input, tự động load lại danh sách không có query
    useEffect(() => {
        if (search === "") {
            fetchCourses(1, null);
        }
    }, [search]);

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className={`flex ${isMobile ? "flex-col" : "flex-grow"} gap-2`}>
            {/* Course List */}
            <div className={`bg-white p-2 rounded-lg shadow border border-secondary ${isMobile ? "w-full" : "w-1/3"}`}>
                <div className="flex flex-row gap-2 p-2 justify-between items-center">
                    <CommonSearch
                        key="search_course"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSearch}
                    />
                    <CommonButton onClick={() => console.log("Thêm học phần")} icon={Plus} label="Thêm học phần" />
                </div>

                <div className="p-2">
                    <div className="border border-secondary p-2 rounded-md gap-2">
                        {loading ? (
                            <div className="items-center justify-items-center">
                                <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                            </div>
                        ) : courses?.data ? (
                            <div>
                                {courses.data.map((course) => (
                                    <div key={course.id} className="py-1">
                                        <CourseRow
                                            course={course}
                                            selected={selectedCourse?.id === course.id}
                                            onSelect={() => setSelectedCourse(course)}
                                        />
                                    </div>
                                ))}
                                <CommonPagination
                                    meta={courses.meta}
                                    onPageChange={(page) => fetchCourses(page, search)} // Giữ search param khi chuyển trang
                                />
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Không có dữ liệu.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Course Class List */}
            <div className={`bg-white p-2 rounded-lg shadow flex border border-secondary ${isMobile ? "w-full" : "flex-grow"}`}>
                <CourseClassContainer parentCourse={selectedCourse} deselectCourse={() => setSelectedCourse(null)}/>
            </div>
        </div>
    );
}
