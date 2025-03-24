// @/utils/service/StudentService.ts
import api from "@/utils/AxiosInstance";

interface CourseClass {
    id: string;
    name: string;
    path: string;
}

interface PersonalCourseClassesResponse {
    success: boolean;
    message: string;
    personal_course_classes: CourseClass[];
}

export const fetchPersonalCourseClasses = async (): Promise<CourseClass[]> => {
    const res = await api.get<PersonalCourseClassesResponse>("/api/personal_course_classes");
    if (res.data.success) {
        return res.data.personal_course_classes;
    }
    throw new Error(res.data.message || "Failed to fetch personal course classes");
};