import {Course} from "@/types/Course";

export interface CourseResponse {
    courses: Course[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}