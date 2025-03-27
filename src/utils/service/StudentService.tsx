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