import {Lecturer} from "@/types/Lecturer";
import {deleteLecturer} from "@/utils/service/crud/LecturerService";
import {Edit, PlusCircle, Trash2} from "lucide-react";

interface StudentRowProps {
    lecturer: Lecturer;
    onSelect: () => void;
    selected?: boolean;
    onAdd: () => void;
    onEdit: () => void;
    onDelete: (courseId: number) => void;
}

export default function StudentRow({lecturer, onSelect, selected, onEdit, onDelete, onAdd}: StudentRowProps ) {

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm(`Bạn có chắc muốn xóa giảng viên "${lecturer.name}"?`)) {
            try {
                await deleteLecturer(lecturer.id);
                onDelete(lecturer.id);
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
    };
    const handleEdit = (e) => {
        onEdit();
        e.stopPropagation();
    };

    const handleAdd = (e) => {
        onAdd();
        e.stopPropagation();
    }
    return (
        <div
            onClick={onSelect}
            className={`p-2 flex justify-between items-center bg-gray-100 rounded cursor-pointer ${selected ? `bg-primary2` :`hover:bg-primary2`}`}
        >
            <div className={`flex-1 min-w-0 p-1`}>
                <p className="font-bold text-sm truncate">{lecturer.name}</p>
                <p className="text-sm text-gray-500">{lecturer.email}</p>
            </div>
            <div className="flex gap-2">
                <button
                    className="text-green-500 hover:text-green-700 group relative"
                    onClick={handleAdd}
                >
                    <PlusCircle size={18}/>
                    <span className={`tooltip`}>Thêm lớp học phần</span>
                </button>
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