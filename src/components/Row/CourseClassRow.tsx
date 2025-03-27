import {Edit, Trash2} from "lucide-react";
import {CourseClass} from "@/types/CourseClass";
import {format} from "date-fns";
import {vi} from "date-fns/locale";

interface CourseClassProps {
    courseClass: CourseClass;
    onSelect: () => void;
    selected?: boolean;
}

export default function CourseClassRow({courseClass, onSelect, selected}: CourseClassProps ) {

    return (
        <div
            onClick={onSelect}
            className={`p-2 flex justify-between items-center bg-gray-100 rounded cursor-pointer ${selected ? `bg-primary2` :`hover:bg-primary2`}`}
        >
            <div>
                <p className="font-bold text-sm">{courseClass.name}</p>
                <p className="text-sm text-gray-600">{courseClass.description}</p>
                <p className="text-sm text-gray-500">{courseClass.course_class_code}</p>
            </div>
            <div>
                <span className={`text-sm text-gray-600`}>
                    {courseClass.start_date ? format(new Date(courseClass.start_date), "dd/MM/yyyy", { locale: vi }) : "Chưa có ngày"}
                </span>
            </div>
            <div>
                <span className={`text-sm ${courseClass.active ? "text-green-600" : "text-red-600"}`}>
                    {courseClass.active ? "Đang diễn ra" : "kết thúc"}
                </span>
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