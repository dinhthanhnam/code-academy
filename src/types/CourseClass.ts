export interface CourseClass {
    id: string;
    course_class_code: string;
    name?: string;
    description?: string;
    start_date?: Date;
    slug: string;
    created_at?: Date;
    updated_at?: Date;
}