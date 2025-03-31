import { Lecturer } from "@/types/Lecturer";
import { CourseClass } from "@/types/CourseClass";
import CommonSearch from "@/components/Common/CommonSearch";
import CommonButton from "@/components/Common/CommonButton";
import { Plus, X } from "lucide-react";
import { useEffect, useState} from "react";
import {PaginatedCourseClass} from "@/types/paginated/PaginatedCourseClass";
// import {getCourseClasses, getCourseClassesByLecturer} from "@/utils/service/crud/LecturerService";
import {SyncLoader} from "react-spinners";
import CourseClassRow from "@/components/Row/CourseClassRow";
import CommonPagination from "@/components/Pagination/CommonPagination";
import SelectedItem from "@/components/List/SelectedItem";
import {getCourseClassesByLecturer} from "@/utils/service/crud/LecturerService";
import {getCourseClasses} from "@/utils/service/crud/CourseClassService";

interface LecturerCourseClassContainerProps {
    parentLecturer?: Lecturer;
    deselectLecturer?: () => void;
}

export default function LecturerCourseClassContainer({parentLecturer = null, deselectLecturer}: LecturerCourseClassContainerProps) {
    const [lecturerCourseClasses, setLecturerCourseClasses] = useState<PaginatedCourseClass | null>(null);
    const [selectedCourseClass, setSelectedCourseClass] = useState<CourseClass | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCourseClasses = async (page = 1, search?: string) => {
        let data;
        if (parentLecturer) {
            setLoading(true);
            data = await getCourseClassesByLecturer(page, parentLecturer.id, search);
            setLecturerCourseClasses(data);
            setLoading(false);
        } else {
            setLoading(true);
            data = await getCourseClasses(page, search);
            setLecturerCourseClasses(data);
            setLoading(false);
        }
    };

    const handleSearch = async (page = 1) => {
        fetchCourseClasses(page, search);
    };

    useEffect(() => {
        fetchCourseClasses();
    }, [parentLecturer?.id]);

    return (
        <div className="flex flex-col w-full h-full">
            {/* Phần header - Search và Button */}
            <div className="flex gap-2 p-2 justify-between items-center flex-shrink-0">
                <CommonSearch
                    key="search_lecturer_classes"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onSubmit={handleSearch}
                />
                {/*<CommonButton onClick={() => console.log("Thêm lớp học phần cho giảng viên")} icon={Plus} label=" giảng viên" />*/}
            </div>

            {/* Selected Item - nếu có */}
            {parentLecturer && deselectLecturer && (
                <div className="px-2 flex-shrink-0">
                    <SelectedItem onClick={deselectLecturer} icon={X} label={`Hủy chọn ${parentLecturer.name}`} />
                </div>
            )}

            {/* Phần nội dung chính */}
            <div className="flex-grow flex flex-col overflow-hidden">
                {lecturerCourseClasses ? (
                    <div className="p-2 flex-grow flex flex-col overflow-hidden">
                        <div className="border border-secondary p-2 rounded-md flex flex-col flex-grow overflow-hidden">
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <SyncLoader color="gray" size={8} margin={4} speedMultiplier={0.6} />
                                </div>
                            ) : lecturerCourseClasses.data && lecturerCourseClasses.data.length > 0 ? (
                                <div className="flex flex-col h-full">
                                    {/* Phần danh sách CourseClassRow với thanh cuộn */}
                                    <div className="overflow-y-auto flex-grow" style={{ minHeight: 0 }}>
                                        {lecturerCourseClasses.data.map((course) => (
                                            <div key={course.id} className="py-1">
                                                <CourseClassRow
                                                    courseClass={course}
                                                    selected={selectedCourseClass?.id === course.id}
                                                    onSelect={() => setSelectedCourseClass(course)}
                                                    onEdit={() => {}}
                                                    onDelete={() => {}}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Pagination ở dưới cùng */}
                                    <div className="mt-2 flex-shrink-0">
                                        <CommonPagination meta={lecturerCourseClasses.meta} onPageChange={fetchCourseClasses} />
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
                            {parentLecturer
                                ? `Giảng viên ${parentLecturer.name} chưa được xếp lớp học phần nào`
                                : "Chọn một lớp học phần hoặc tìm kiếm"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}