// @/app/hooks/useAuth.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { fetchPersonalCourseClasses } from "@/utils/service/StudentService";
import { fetchCoursesSuccess, fetchCoursesFailure } from "@/app/redux/slices/personalCourseClassesSlice";

export const useLoadPersonalCourseClasses = () => {
    const dispatch = useAppDispatch();
    const { courses, error } = useAppSelector((state) => state.personalCourseClasses);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const coursesData = await fetchPersonalCourseClasses();
                dispatch(fetchCoursesSuccess(coursesData));
            } catch (err: any) {
                dispatch(fetchCoursesFailure(err.message));
            }
        };

        // Chỉ load nếu chưa có dữ liệu và không có lỗi
        if (!courses.length && !error) {
            loadCourses();
        }
    }, [dispatch, courses.length, error]);

    return { courses, error }; // Bỏ loading
};