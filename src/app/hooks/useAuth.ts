// @/app/hooks/useAuth.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { fetchPersonalCourseClasses } from "@/utils/service/StudentService";
import { personalCourseClasses } from "@/app/redux/slices/personalCourseClassesSlice";
import {showMessage} from "@/app/redux/slices/messageSlice";

export const useSidebarState = () => {
    return {
        activeNavigationOption: useAppSelector((state) => state.navigationOption.activeNavigationOption),
        isSidebarOpen: useAppSelector((state) => state.sidebar.isSidebarOpen),
        isMobile: useAppSelector((state) => state.device.isMobile),
    };
};

export const useRole = () => {
    return {
        isStudent: useAppSelector((state) => state.role.isStudent),
        isAdmin: useAppSelector((state) => state.role.isAdmin),
        isLecturer: useAppSelector((state) => state.role.isLecturer),
    };
};

export const useLoadPersonalCourseClasses = () => {
    const dispatch = useAppDispatch();
    const { courses } = useAppSelector((state) => state.personalCourseClasses);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const coursesData = await fetchPersonalCourseClasses();
                dispatch(personalCourseClasses(coursesData));
            } catch (err: any) {
                dispatch(showMessage({message: "Không lấy được khoá học cho sinh viên!", success: true}));
            }
        };

        // Chỉ load nếu chưa có dữ liệu và không có lỗi
        if (!courses.length) {
            loadCourses();
        }
    }, [dispatch, courses.length]);

    return { courses }; // Bỏ loading
};