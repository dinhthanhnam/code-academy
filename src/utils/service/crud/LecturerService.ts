import api from "@/utils/AxiosInstance";
import {PaginatedCourseClass} from "@/types/paginated/PaginatedCourseClass";
import {PaginatedLecturer} from "@/types/paginated/PaginatedLecturer";
import {Lecturer} from "@/types/Lecturer";

export const getLecturer = async (id: number) => {
    try {
        const res = await api.get(`/admin/lecturer/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getLecturers = async (page: number, search?: string) => {
    try {
        const res = await api.get<PaginatedLecturer>("/admin/lecturer", {
            params: {
                page,
                ...(search ? { search } : {}), // Chỉ thêm search nếu có giá trị
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const createLecturer = async (payload: Lecturer) => {
    try {
        const res = await api.post("admin/lecturer", payload)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

export const updateLecturer = async (id: number , payload: Lecturer) => {
    try {
        const res = await api.put(`admin/lecturer/${id}`, payload)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

export const deleteLecturer = async (id: number ) => {
    try {
        const res = await api.delete(`admin/lecturer/${id}`)
        return res.data;
    }  catch (error) {
        console.error(error);
    }
}

export const getCourseClassesByLecturer = async  (page: number, lecturer_id?: number, search?: string) => {
    try {
        const res = await api.get<PaginatedCourseClass>("/lecturer/course-classes", {
            params: {
                page,
                ...(lecturer_id ? { lecturer_id } : {}),
                ...(search ? { search } : {}),
            },
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

