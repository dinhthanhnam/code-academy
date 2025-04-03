export default interface Exercise {
    title?: string;
    description?: string;
    level?: string;
    example_output?: string;
    example_input?: string;
    test_cases?: TestCase;
    is_free?: boolean;
    time_limit?: number;
    memory_limit?: number;
    pivot?: {
        course_id?: number| null;
        week_number?: number;
        deadline?: number;
        is_hard_deadline?: boolean;
        is_active?: boolean;
    } | null;
}

export interface TestCase {

}