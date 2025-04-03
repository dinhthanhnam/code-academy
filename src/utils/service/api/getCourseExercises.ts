import api from "@/utils/AxiosInstance";
import {User} from "@/types/User";
import {PaginatedUser} from "@/types/paginated/PaginatedUser";

export const getCourseClass = async (slug: string) => {
    try {
        const res = await api.get(`/api/course-class/detail`, {
            params: { slug }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching course class:", error);
        throw error; // Re-throw để component xử lý
    }
};

export const getCourseClassExercises = async (slug: string) => {
    try {
        const res = await api.get(`/api/course-class/exercises`, {
            params: { slug }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        throw error;
    }
};

export const getCourseClassStudents = async (slug: string) => {
    try {
        const res = await api.get<PaginatedUser>(`/api/course-class/students`, {
            params: { slug }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};