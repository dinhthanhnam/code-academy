import {Edit, Trash2} from "lucide-react";
import {Course} from "@/types/Course";

interface CourseRowProps {
    course: Course;
    onSelect: () => void;
    selected?: boolean;
}

export default function CourseRow({course, onSelect, selected}: CourseRowProps ) {
    return (
        <div
            onClick={onSelect}
            className={`p-2 flex justify-between items-center bg-gray-100 rounded cursor-pointer ${selected ? `bg-primary2` :`hover:bg-primary2`}`}
        >
            <div>
                <p className="font-bold text-sm">{course.name}</p>
                <p className="text-sm text-gray-500">{course.course_code}</p>
            </div>
            <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={18}/>
                </button>
                <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18}/>
                </button>
            </div>
        </div>
    );
}