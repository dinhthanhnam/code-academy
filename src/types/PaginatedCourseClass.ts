import {CourseClass} from "@/types/CourseClass";

export interface PaginatedCourseClass {
    data: CourseClass[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: string;
        from: string;
        last_page: string;
        links: object[];
        path: string;
        per_page: string;
        to: string;
        total: string;
    };
}