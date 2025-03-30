import { Course } from "@/types/Course";
import { CourseClass } from "@/types/CourseClass";
import CommonSearch from "@/components/Common/CommonSearch";
import CommonButton from "@/components/Common/CommonButton";
import { Plus, X } from "lucide-react";
import { useEffect, useState} from "react";
import {PaginatedCourseClass} from "@/types/PaginatedCourseClass";
import {getCourseClasses, getCourseClassesByCourse} from "@/utils/service/CourseService";
import {SyncLoader} from "react-spinners";
import CourseClassRow from "@/components/Row/CourseClassRow";
import CommonPagination from "@/components/Pagination/CommonPagination";
import SelectedItem from "@/components/List/SelectedItem";

interface CourseClassContainerProps {
    parentCourse?: Course;
    deselectCourse?: () => void;
}

export default function CourseClassContainer({parentCourse = null, deselectCourse}: CourseClassContainerProps) {
    const [courseClasses, setCourseClasses] = useState<PaginatedCourseClass | null>(null);
    const [selectedCourseClass, setSelectedCourseClass] = useState<CourseClass | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCourseClasses = async (page = 1, search?: string) => {
        let data;
        if (parentCourse) {
            setLoading(true);
            data = await getCourseClassesByCourse(page, parentCourse.id, search);
            setCourseClasses(data);
            setLoading(false);
        } else {
            setLoading(true);
            data = await getCourseClasses(page, search);
            setCourseClasses(data);
            setLoading(false);
        }
    };

    const handleSearch = async (page = 1) => {
        fetchCourseClasses(page, search);
    };

    useEffect(() => {
        fetchCourseClasses();
    }, [parentCourse?.id]);

    return (
        <div className="flex flex-col w-full h-full">
            {/* Phần header - Search và Button */}
            <div className="flex gap-2 p-2 justify-between items-center flex-shrink-0">
                <CommonSearch
                    key="search_course_classes"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onSubmit={handleSearch}
                />
                <CommonButton onClick={() => console.log("Thêm học phần")} icon={Plus} label="Thêm lớp học phần" />
            </div>

            {/* Selected Item - nếu có */}
            {parentCourse && deselectCourse && (
                <div className="px-2 flex-shrink-0">
                    <SelectedItem onClick={deselectCourse} icon={X} label={`Hủy chọn ${parentCourse.course_code}`} />
                </div>
            )}

            {/* Phần nội dung chính */}
            <div className="flex-grow flex flex-col overflow-hidden">
                {courseClasses ? (
                    <div className="p-2 flex-grow flex flex-col overflow-hidden">
                        <div className="border border-secondary p-2 rounded-md flex flex-col flex-grow overflow-hidden">
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                                </div>
                            ) : courseClasses.data && courseClasses.data.length > 0 ? (
                                <div className="flex flex-col h-full">
                                    {/* Phần danh sách CourseClassRow với thanh cuộn */}
                                    <div className="overflow-y-auto flex-grow" style={{ minHeight: 0 }}>
                                        {courseClasses.data.map((courseClass) => (
                                            <div key={courseClass.id} className="py-1">
                                                <CourseClassRow
                                                    courseClass={courseClass}
                                                    selected={selectedCourseClass?.id === courseClass.id}
                                                    onSelect={() => setSelectedCourseClass(courseClass)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Pagination ở dưới cùng */}
                                    <div className="mt-2 flex-shrink-0">
                                        <CommonPagination meta={courseClasses.meta} onPageChange={fetchCourseClasses} />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-center text-gray-500">Không có dữ liệu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center">
                        <span className="text-sm font-bold text-center">
                            {parentCourse
                                ? `Không có lớp học phần nào cho học phần ${parentCourse.name} - ${parentCourse.course_code}`
                                : "Chọn một lớp học phần hoặc tìm kiếm"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}