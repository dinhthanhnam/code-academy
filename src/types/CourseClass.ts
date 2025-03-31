export interface CourseClass {
    id?: number;
    course_id?: number | null;
    course_class_code: string;
    assigned_regular_class_id?: number | null;
    course_class_join_code?: string | null;
    name?: string;
    description?: string;
    active?: boolean;
    start_date?: Date;
    slug?: string;
    created_at?: Date;
    updated_at?: Date;
}