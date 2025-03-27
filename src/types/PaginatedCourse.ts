import {Course} from "@/types/Course";

export interface PaginatedCourse {
    data: Course[];
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