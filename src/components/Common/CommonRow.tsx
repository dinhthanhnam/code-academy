import {Edit, Trash2} from "lucide-react";
import {Course} from "@/types/Course";

export default function CommonRow({course, onSelect}: { course: Course; onSelect: () => void }) {
    return (
        <div
            onClick={onSelect}
            className="p-3 flex justify-between items-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
        >
            <div>
                <p className="font-medium">{course.name}</p>
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