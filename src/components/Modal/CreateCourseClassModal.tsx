import { ChangeEvent, useState } from 'react';
import FormInput from "@/components/Form/FormInput";
import { X } from "lucide-react";
import CommonButton from "@/components/Common/CommonButton";
import { CourseClass } from "@/types/CourseClass";
import { createCourseClass } from "@/utils/service/crud/CourseClassService";
import { BiRefresh } from "react-icons/bi";
import { nanoid } from "nanoid";
import FormSelect from "@/components/Form/FormSelect";
import { Course } from "@/types/Course";

interface CourseClassModalProps {
    onClose: () => void;
    parentCourse?: Course;
    selectedCourseClass?: CourseClass;
    newCourseClass?: (course: CourseClass) => void;
    updatedCourseClass?: (course: CourseClass) => void;
}

interface Message {
    message: string | null;
    success: boolean | null;
}

// Định nghĩa interface cho một lớp học trong bulk add
interface ClassForm {
    id: string; // ID duy nhất để quản lý từng form
    course_class_code: string;
    name: string;
    course_class_join_code: string;
}

export function CreateCourseClassModal({
                                           onClose,
                                           newCourseClass,
                                           updatedCourseClass,
                                           selectedCourseClass,
                                           parentCourse
                                       }: CourseClassModalProps) {
    const [payload, setPayload] = useState<CourseClass>({
        active: true,
        course_id: parentCourse?.id || null,
        course_class_code: "",
        course_class_join_code: selectedCourseClass?.course_class_join_code || "",
        description: "",
        slug: "",
        assigned_regular_class_id: null,
        name: selectedCourseClass?.name || ""
    });

    const [bulkAdd, setBulkAdd] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('single');
    const [classForms, setClassForms] = useState<ClassForm[]>([]); // Danh sách các form lớp học
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

    const generateJoinCode = () => nanoid(8);

    const handleRefreshJoinCode = (formId?: string) => {
        const newJoinCode = generateJoinCode();
        if (bulkAdd && formId) {
            setClassForms((prev) =>
                prev.map((form) =>
                    form.id === formId ? { ...form, course_class_join_code: newJoinCode } : form
                )
            );
        } else {
            setPayload((prev) => ({
                ...prev,
                course_class_join_code: newJoinCode
            }));
        }
    };

    const handleClassFormChange = (formId: string, field: keyof ClassForm, value: string) => {
        setClassForms((prev) =>
            prev.map((form) =>
                form.id === formId ? { ...form, [field]: value } : form
            )
        );
    };

    const addClassForm = () => {
        setClassForms((prev) => [
            ...prev,
            {
                id: nanoid(8),
                course_class_code: "",
                name: "",
                course_class_join_code: generateJoinCode(),
            },
        ]);
    };

    const removeClassForm = (formId: string) => {
        setClassForms((prev) => prev.filter((form) => form.id !== formId));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (bulkAdd && classForms.length > 0) {
                // Xử lý bulk add
                const promises = classForms.map((form) =>
                    createCourseClass({
                        ...payload,
                        course_class_code: form.course_class_code,
                        name: form.name,
                        course_class_join_code: form.course_class_join_code,
                    })
                );
                const results = await Promise.all(promises);
                if (newCourseClass) {
                    results.forEach((data: any) => {
                        if (data.success && data.data) newCourseClass(data.data);
                    });
                }
                setMessage({ message: "Đã tạo các lớp học phần thành công", success: true });
            } else {
                // Xử lý single add
                const data: any = await createCourseClass(payload);
                if (data.success && newCourseClass && data.data) {
                    newCourseClass(data.data);
                }
                setMessage({ message: data.message, success: data.success });
            }
        } catch (error) {
            console.log(error);
            setMessage({ message: "Đã xảy ra lỗi, vui lòng thử lại", success: false });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center max-h-screen"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-7xl relative shadow-lg border border-secondary max-h-full flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X size={24} strokeWidth={2} />
                </button>

                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800">
                        {parentCourse ? `Tạo học phần mới cho học phần ${parentCourse.name}` : `Tạo lớp học phần mới`}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Điền thông tin để tạo lớp học phần
                    </p>
                </div>

                {message.message && (
                    <div className="p-2">
                        <div
                            className={`p-2 rounded border text-sm ${
                                message.success ? "bg-green-100 text-green-700 border-green-500" : "bg-red-100 text-red-700 border-red-500"
                            }`}
                        >
                            {message.message}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                    <FormInput
                        type="text"
                        name="course_code"
                        label="Mã học phần"
                        value={parentCourse?.course_code || ""}
                        disable={!!parentCourse}
                    />
                    <div className="colholder"></div>
                    <div className="flex flex-row w-full">
                        <FormSelect
                            className="w-full"
                            label="Chọn"
                            name="bulk-add"
                            options={[
                                { value: 'single', label: 'Thêm một' },
                                { value: 'bulk', label: 'Thêm nhiều' },
                            ]}
                            value={selectedOption}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedOption(value);
                                setBulkAdd(value === 'bulk');
                            }}
                            selectOnly={true}
                        />
                        {bulkAdd && (
                            <div className="flex flex-col justify-end pb-2 pl-2">
                                <CommonButton onClick={addClassForm} label="Thêm lớp" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Phần chứa các form lớp học */}
                <div className="flex-1 overflow-auto mt-4">
                    {bulkAdd && classForms.length > 0 ? (
                        classForms.map((form, index) => (
                            <div key={form.id} className="border border-gray-300 rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-md font-semibold">Lớp {index + 1}</h3>
                                    <button
                                        onClick={() => removeClassForm(form.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <FormInput
                                        type="text"
                                        name={`course_class_code_${form.id}`}
                                        label="Mã lớp học phần"
                                        placeholder="Ví dụ: IS52A01"
                                        value={form.course_class_code}
                                        onChange={(e) => handleClassFormChange(form.id, "course_class_code", e.target.value)}
                                    />
                                    <FormInput
                                        type="text"
                                        name={`name_${form.id}`}
                                        label="Tên học phần"
                                        value={form.name}
                                        onChange={(e) => handleClassFormChange(form.id, "name", e.target.value)}
                                    />
                                    <div className="flex flex-row items-end">
                                        <FormInput
                                            type="text"
                                            name={`course_class_join_code_${form.id}`}
                                            label="Mã tham gia"
                                            value={form.course_class_join_code}
                                            onChange={(e) => handleClassFormChange(form.id, "course_class_join_code", e.target.value)}
                                            className="w-full"
                                        />
                                        <div className={`p-2`}>
                                            <button
                                                className="p-1 border border-secondary rounded-md hover:bg-gray-200 duration-200 ease-in-out"
                                                onClick={() => handleRefreshJoinCode(form.id)}
                                            >
                                                <BiRefresh size={25} strokeWidth={0.2} color="#EF6622" />
                                            </button>
                                        </div>
                                    </div>
                                    <FormInput
                                        className="col-span-3"
                                        type="text"
                                        name="description"
                                        label="Mô tả"
                                        value={payload.description}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="grid grid-cols-3 gap-2">
                            <FormInput
                                type="text"
                                name="course_class_code"
                                label="Mã lớp học phần"
                                placeholder="Ví dụ: IS52A01"
                                value={payload.course_class_code}
                                onChange={(e) => handleChange("course_class_code", e.target.value)}
                            />
                            <FormInput
                                type="text"
                                name="name"
                                label="Tên học phần"
                                value={payload.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <div className="flex flex-row items-end">
                                <FormInput
                                    type="text"
                                    name="course_class_join_code"
                                    label="Mã tham gia"
                                    value={payload.course_class_join_code}
                                    onChange={(e) => handleChange("course_class_join_code", e.target.value)}
                                    className="w-full"
                                />
                                <div className={`p-2`}>
                                    <button
                                        className="p-1 border border-secondary rounded-md hover:bg-gray-200 duration-200 ease-in-out"
                                        onClick={() => handleRefreshJoinCode()}
                                    >
                                        <BiRefresh size={25} strokeWidth={0.2} color="#EF6622" />
                                    </button>
                                </div>
                            </div>
                            <FormInput
                                className="col-span-3"
                                type="text"
                                name="description"
                                label="Mô tả"
                                value={payload.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-4 p-2">
                    <CommonButton
                        label={isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}