import {Edit, Trash2} from "lucide-react";
import {Course} from "@/types/Course";
import {deleteCourse} from "@/utils/service/CourseService";

interface CourseRowProps {
    course: Course;
    onSelect: () => void;
    selected?: boolean;
    onEdit: () => void;
    onDelete: (courseId: number) => void;
}

export default function CourseRow({course, onSelect, selected, onEdit, onDelete}: CourseRowProps ) {

    const handleDelete = async (e) => {
        e.stopPropagation(); // Ngăn click lan lên cha
        if (window.confirm(`Bạn có chắc muốn xóa khóa học "${course.name}"?`)) {
            try {
                await deleteCourse(course.id); // Gọi API
                onDelete(course.id); // Truyền ID về cha để xóa
            } catch (error) {
                console.error("Error deleting course:", error);
                // Có thể thêm thông báo lỗi ở đây
            }
        }
    };
    const handleEdit = (e) => {
        onEdit();
        e.stopPropagation();
    };

    return (
        <div
            onClick={onSelect}
            className={`p-2 flex justify-between items-center bg-gray-100 rounded cursor-pointer ${selected ? `bg-primary2` :`hover:bg-primary2`}`}
        >
            <div className={`flex-1 min-w-0 p-1`}>
                <p className="font-bold text-sm truncate">{course.name}</p>
                <p className="text-sm text-gray-500">{course.course_code}</p>
            </div>
            <div className="flex gap-2">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={handleEdit}
                >
                    <Edit size={18}/>
                </button>
                <button className="text-red-500 hover:text-red-700"
                    onClick={handleDelete}
                >
                    <Trash2 size={18}/>
                </button>
            </div>
        </div>
    );
}