import {Course} from "@/types/Course";
import {CourseClass} from "@/types/CourseClass";
import CommonSearch from "@/components/Common/CommonSearch";
import CommonButton2 from "@/components/Common/CommonButton2";
import {Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {PaginatedCourseClass} from "@/types/PaginatedCourseClass";
import {fetchCourseClassesByCourse} from "@/utils/service/CourseService";
import {SyncLoader} from "react-spinners";
import CourseClassRow from "@/components/Row/CourseClassRow";
import CommonPagination from "@/components/Pagination/CommonPagination";

interface CourseClassContainerProps {
    parentCourse?: Course;
}

export default function CourseClassContainer({ parentCourse = null }: CourseClassContainerProps) {
    const [courseClasses, setCourseClasses] =useState<PaginatedCourseClass | null>(null);
    const [selectedCourseClass, setSelectedCourseClass] = useState<CourseClass>(null);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        const data = await fetchCourseClassesByCourse(parentCourse.id);
        setCourseClasses(data);
    };

    const fetchCourseClasses = async (page = 1) => {
        if(parentCourse) {
            setLoading(true);
            const data = await fetchCourseClassesByCourse(parentCourse.id, page);
            setLoading(false);
            setCourseClasses(data);
        }
    }
    useEffect(() => {
        if (parentCourse?.id) {
            fetchCourseClasses();
        }
    }, [parentCourse?.id]);

    return (
        <div className={`flex flex-col w-full`}>
            <div className={`flex gap-2 p-2 justify-between items-center`}>
                <CommonSearch
                    key={'search_course_classes'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onSubmit={handleSubmit}
                />
                <CommonButton2 onClick={() => console.log("Thêm học phần")} icon={Plus} label="Thêm lớp học phần" />
            </div>
            {courseClasses ? (
                <div className={`p-2`}>
                    <div className={`border border-secondary p-2 rounded-md gap-2`}>
                        {loading ? (
                            <div className={`items-center justify-items-center`}>
                                <SyncLoader color={`gray`} size={8} margin={4} speedMultiplier={0.6} />
                            </div>
                        ) : courseClasses.data ? (
                            <div>
                                {courseClasses.data.map((courseClass) => (
                                <div key={courseClass.id} className={`py-1`}>
                                    <CourseClassRow
                                        courseClass={courseClass}
                                        selected={selectedCourseClass?.id === courseClass.id}
                                        onSelect={() => setSelectedCourseClass(courseClass)}
                                    />
                                </div>
                                ))}
                                <CommonPagination meta={courseClasses.meta} onPageChange={fetchCourseClasses} />
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Không có dữ liệu.</p> // 🔹 Thông báo khi không có dữ liệu
                        )}
                    </div>
                </div>
            ) : (
                <div className={`w-full h-full text-sm font-bold flex justify-items-center items-center`}>
                    <span className={`mx-auto`}>
                        {parentCourse ? "Không có lớp học phần nào cho học phần " + parentCourse.name + " - " + parentCourse.course_code : "Chọn một lớp học phần hoặc tìm kiếm"}
                    </span>
                </div>
            )}

        </div>
    );
}
