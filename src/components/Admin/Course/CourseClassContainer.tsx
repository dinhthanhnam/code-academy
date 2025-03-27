import {Course} from "@/types/Course";
import {CourseClass} from "@/types/CourseClass";
import CommonSearch from "@/components/Common/CommonSearch";
import CommonButton2 from "@/components/Common/CommonButton2";
import {Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {PaginatedCourseClass} from "@/types/PaginatedCourseClass";
import {fetchCourseClassesByCourse} from "@/utils/service/CourseService";

interface CourseClassContainerProps {
    parentCourse?: Course;
}

export default function CourseClassContainer({ parentCourse }: CourseClassContainerProps) {
    const [courseClasses, setCourseClasses] =useState<PaginatedCourseClass | null>(null);
    const [search, setSearch] = useState<string>("");

    const handleSubmit = async () => {
        const data = await fetchCourseClassesByCourse(parentCourse.id);
        setCourseClasses(data);
    };

    useEffect(() => {
        const fetchCourseClasses = async () => {
            if(parentCourse) {
                const data = await fetchCourseClassesByCourse(parentCourse.id);
                setCourseClasses(data);
            }
        }
        fetchCourseClasses();
    }, [parentCourse]);

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
                <div>có course class nhưng chưa fill</div>
            ) : (
                <div className={`justify-center items-center`}>
                    <p className="text-lg font-medium">
                        Không có lớp học phần nào cho học phần {parentCourse.name + " - " + parentCourse.course_code}.
                    </p>
                </div>
            )}

        </div>
    );
}
