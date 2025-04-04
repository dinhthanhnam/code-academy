import api from "@/utils/AxiosInstance";
import {User} from "@/types/User";
import {PaginatedUser} from "@/types/paginated/PaginatedUser";
import {PaginatedExercise} from "@/types/paginated/PaginatedExercise";
import {CourseClass} from "@/types/CourseClass";

export const getCourseClass = async (slug: string) => {
    try {
        const res = await api.get<{ data: CourseClass }>(`/api/course-class/${slug}/detail`);
        return res.data.data;
    } catch (error) {
        console.error("Error fetching course class:", error);
        throw error;
    }
};

export const getCourseClassExercises = async (slug: string) => {
    try {
        const res = await api.get<PaginatedExercise>(`/api/course-class/${slug}/exercises`);
        return res.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        throw error;
    }
};

export const getCourseClassStudents = async (slug: string) => {
    try {
        const res = await api.get<PaginatedUser>(`/api/course-class/${slug}/students`);
        return res.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};