import api from "@/utils/AxiosInstance";
import {PaginatedCourse} from "@/types/PaginatedCourse";
import {CourseClass} from "@/types/CourseClass";
import {PaginatedCourseClass} from "@/types/PaginatedCourseClass";
import {Course} from "@/types/Course";

export const getCourse = async (id: number) => {
    try {
        const res = await api.get(`/admin/course/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCourses = async (page: number, search?: string) => {
    try {
        const res = await api.get<PaginatedCourse>("/admin/course", {
            params: {
                page,
                ...(search ? { search } : {}), // Chỉ thêm search nếu có giá trị
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createCourse = async (payload: Course) => {
    try {
        const res = await api.post("admin/course", payload)
        return res.data;
    }  catch (error) {
        console.log(error);
    }
}

export const updateCourse = async (id: number , payload: Course) => {
    try {
        const res = await api.put(`admin/course/${id}`, payload)
        return res.data;
    }  catch (error) {
        console.log(error);
    }
}

export const deleteCourse = async (id: number ) => {
    try {
        const res = await api.delete(`admin/course/${id}`)
        return res.data;
    }  catch (error) {
        console.log(error);
    }
}


export const getCourseClasses = async (page: number, search?: string) => {
    try {
        const res = await api.get<PaginatedCourseClass>("/admin/course-class", {
            params: {
                page,
                ...(search ? { search } : {}),
            },
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCourseClassesByCourse = async  (page: number, course_id?: number, search?: string) => {
    try {
        const res = await api.get<PaginatedCourseClass>("/course/course-classes", {
            params: {
                page,
                ...(course_id ? { course_id } : {}),
                ...(search ? { search } : {}),
            },
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

