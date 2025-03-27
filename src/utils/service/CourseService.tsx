import api from "@/utils/AxiosInstance";
import {PaginatedCourse} from "@/types/PaginatedCourse";
import {CourseClass} from "@/types/CourseClass";
import {PaginatedCourseClass} from "@/types/PaginatedCourseClass";

export const getCourses = async (page = 1) => {
    try {
        const res = await api.get<PaginatedCourse>(`/admin/course?page=${page}`);
        return  res.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchCourseClassesByCourse = async  (course_id: any, page = 1) => {
    try {
        const res = await api.get<PaginatedCourseClass>(`/course/course-classes/${course_id}?page=${page}`)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}