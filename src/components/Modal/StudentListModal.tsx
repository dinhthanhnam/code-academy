import { useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import {CourseClass} from "@/types/CourseClass";

interface StudentListModalProps {
    onClose: () => void;
    selectedCourseClass?: CourseClass;
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export function StudentListModal({ onClose, selectedCourseClass} : StudentListModalProps) {
    // const [payload, setPayload] = useState<Lecturer>({
    //         email: selectedLecturer?.email || "",
    //         name: selectedLecturer?.name || "",
    //         role: "",
    //     },
    // );

    const [message, setMessage] = useState<Message>({ message: null, success: null });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-7xl relative shadow-lg border border-secondary">
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
                        Danh sách sinh viên lớp học phần {selectedCourseClass.name}
                    </h2>
                </div>

                {message.message && (
                    <div className={`p-2`}>
                        <div
                            className={`p-2 rounded border text-sm ${
                                message.success ? "bg-green-100 text-green-700 border-green-500" : "bg-red-100 text-red-700 border-red-500"
                            }`}
                        >
                            {message.message}
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-2">

                </div>
            </div>
        </div>
    );
}