import { useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import {Course} from "@/types/Course";
import {createCourse, editCourse} from "@/utils/service/CourseService";

interface CourseModalProps {
    onClose: () => void;
    selectedCourse?: Course;
    newCourse?: Course;
    type: "create" | "edit";
}

export function CourseModal({ onClose, newCourse, selectedCourse, type = "create" } : CourseModalProps) {
    const [payload, setPayload] = useState<Course>({
            course_code: "",
            name: ""
        },
    );
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const handleChange = (id: keyof Course, value: string) => {
        setPayload((prev) => ({
            ...prev,
            [id]: value
        }));
    };
    const handleSubmit = async (payload: Course) => {
        let res;
        if(type === "create") {
            res = await createCourse(payload);
            return res.data;
        } else {
            res = await editCourse(selectedCourse.id, payload);
            return res.data;
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative border border-gray-200 shadow-lg border border-secondary">
                {/* Nút X */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X size={24} strokeWidth={2} />
                </button>

                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Tạo học phần mới
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Điền thông tin để tạo một học phần mới
                    </p>
                </div>

                {/* Form content */}
                <div className="grid grid-cols-2 gap-2">
                    <FormInput
                        type="text"
                        name="course_code"
                        label="Mã học phần"
                        placeholder="Ví dụ: IS57A"
                        value={payload.course_code}
                        onChange={(e) => handleChange("course_code", e.target.value)}
                    />
                    <FormInput
                        type="text"
                        name="name"
                        label="Tên học phần"
                        value={payload.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                {/* Button */}
                <div className="flex justify-end mt-4 p-2">
                    <CommonButton
                        label="Xác nhận"
                        onClick={async () => await handleSubmit(payload)}
                    />
                </div>
            </div>
        </div>
    );
}