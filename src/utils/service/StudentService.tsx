// @/utils/service/StudentService.ts
import api from "@/utils/AxiosInstance";

interface CourseClass {
    id: string;
    name: string;
    path: string;
    type?: string;
}

interface PersonalCourseClassesResponse {
    success: boolean;
    message: string;
    personal_course_classes: CourseClass[];
}

interface LecturerCourseClassesResponse {
    success: boolean;
    message: string;
    lecturer_course_classes: CourseClass[];
}

interface JoinClassResponse {
    message: string;
}

export const fetchPersonalCourseClasses = async (): Promise<CourseClass[]> => {
    const res = await api.get<PersonalCourseClassesResponse>("/api/personal_course_classes");
    if (res.data.success) {
        return res.data.personal_course_classes;
    }
    throw new Error(res.data.message || "Failed to fetch personal course classes");
};

export const fetchLecturerCourseClasses = async (): Promise<CourseClass[]> => {
    const res = await api.get<LecturerCourseClassesResponse>("/api/lecturer_course_classes");
    if (res.data.success) {
        return res.data.lecturer_course_classes;
    }
    throw new Error(res.data.message || "Failed to fetch lecturer course classes");
};

export const joinClassByCode = async (classCode: string): Promise<string> => {
    try {
        const res = await api.post<JoinClassResponse>("/join-class", {
            class_code: classCode,
        });
        return res.data.message;
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error("Mã lớp không tồn tại.");
        } else if (error.response?.status === 409) {
            throw new Error("Bạn đã tham gia lớp này rồi.");
        } else {
            throw new Error("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    }
};