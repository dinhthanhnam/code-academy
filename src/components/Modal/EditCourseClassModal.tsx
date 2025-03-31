import { useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import {CourseClass} from "@/types/CourseClass";
import {createCourseClass, updateCourseClass} from "@/utils/service/crud/CourseClassService";
import {BiRefresh} from "react-icons/bi";
import {nanoid} from "nanoid";
import FormSelect from "@/components/Form/FormSelect"; // Đảm bảo đã import nanoid

interface EditCourseClassModalProps {
    onClose: () => void;
    selectedCourseClass?: CourseClass;
    newCourseClass?: (course: CourseClass) => void;
    updatedCourseClass?: (course: CourseClass) => void;
    type: "create" | "edit";
}

interface Message {
    message: string | null;
    success: boolean | null;
}

export function EditCourseClassModal({ onClose, newCourseClass, updatedCourseClass, selectedCourseClass, type = "create" } : EditCourseClassModalProps) {
    const [payload, setPayload] = useState<CourseClass>({
            active: false,
            course_id: null,
            course_class_code: "",
            course_class_join_code: selectedCourseClass?.course_class_join_code || "",
            description: "",
            slug: "",
            assigned_regular_class_id: null,

            name: selectedCourseClass?.name || ""
        },
    );

    const [message, setMessage] = useState<Message>({ message: null, success: null });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (id: keyof CourseClass, value: string) => {
        setPayload((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    // Sửa generateJoinCode để tạo chuỗi 8 ký tự
    const generateJoinCode = () => {
        return nanoid(8); // Tạo chuỗi random 8 ký tự
    }

    // Hàm xử lý khi click nút refresh
    const handleRefreshJoinCode = () => {
        const newJoinCode = generateJoinCode();
        setPayload((prev) => ({
            ...prev,
            course_class_join_code: newJoinCode
        }));
    };

    const handleSubmit = async (payload: CourseClass) => {
        setIsSubmitting(true);
        try {
            let data;
            if (type === "create") {
                data = await createCourseClass(payload);
                if (data.success && newCourseClass && data.data) {
                    newCourseClass(data.data);
                }
            } else {
                data = await updateCourseClass(selectedCourseClass!.id, payload);
                if (data.success && updatedCourseClass && data.data) {
                    updatedCourseClass(data.data);
                }
            }

            setMessage({message: data.message, success: data.success});
        } catch (error) {
            console.log(error);
            setMessage({message: "Đã xảy ra lỗi, vui lòng thử lại", success: false});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-lg border border-secondary">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X size={24} strokeWidth={2} />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {type === "create" ? "Tạo học phần mới" : `Chỉnh sửa học phần ${selectedCourseClass.name}`}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Điền thông tin để {type === "create" ? "tạo" : "chỉnh sửa"} học phần
                    </p>
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
                    <FormSelect
                        label="Học phần"
                        name="course"
                        value="math"
                        options={[
                            { value: "math", label: "Toán" },
                            { value: "physics", label: "Vật lý" },
                            { value: "chemistry", label: "Hóa học" },
                        ]}
                        onChange={(e) => console.log(e.target.value)}
                        placeholder="Chọn một môn học"
                        selectOnly={true}
                    />
                    <FormInput
                        type="text"
                        name="course_class_code"
                        label="Mã học phần"
                        placeholder="Ví dụ: IS52A01"
                        value={payload.course_class_code}
                        onChange={(e) => handleChange("course_class_code", e.target.value)}
                    />
                    <div className="flex flex-row flex-grow items-end justify-between">
                        <FormInput
                            type="text"
                            name="course_class_join_code"
                            label="Mã tham gia"
                            value={payload.course_class_join_code} // Sửa từ payload.name sang course_class_join_code
                            onChange={(e) => handleChange("course_class_join_code", e.target.value)}
                            className="w-full mr-2"
                        />
                        <div className="flex flex-col justify-end h-full pb-2 pr-2">
                            <button
                                className="p-1 border border-secondary rounded-md hover:bg-gray-200 duration-200 ease-in-out"
                                onClick={handleRefreshJoinCode} // Thêm handler cho nút refresh
                            >
                                <BiRefresh size={27} strokeWidth={0.2} color="EF6622"/>
                            </button>
                        </div>
                    </div>

                    <FormInput
                        type="text"
                        name="name"
                        label="Tên học phần"
                        value={payload.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                <div className="flex justify-end mt-4 p-2">
                    <CommonButton
                        label={isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                        onClick={async () => await handleSubmit(payload)}
                    />
                </div>
            </div>
        </div>
    );
}