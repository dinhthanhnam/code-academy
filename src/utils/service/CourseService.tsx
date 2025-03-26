import api from "@/utils/AxiosInstance";
import {CourseResponse} from "@/types/CourseResponse";

export const getCourses = async (page = 1) => {
    return api.get<CourseResponse>(`/admin/course?page=${page}`);
};
