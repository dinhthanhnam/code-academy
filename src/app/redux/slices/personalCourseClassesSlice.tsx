import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseClass {
    id: string;
    name: string;
    path: string;
}

interface PersonalCourseClassesState {
    courses: CourseClass[];
    error: string | null;
}

const personalCourseClassesInitialState: PersonalCourseClassesState = {
    courses: [],
    error: null,
};

const personalCourseClassesSlice = createSlice({
    name: "personalCourseClasses",
    initialState: personalCourseClassesInitialState,
    reducers: {
        fetchCoursesSuccess(state, action: PayloadAction<CourseClass[]>) {
            state.courses = action.payload;
            state.error = null;
        },
        fetchCoursesFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { fetchCoursesSuccess, fetchCoursesFailure } = personalCourseClassesSlice.actions;
export default personalCourseClassesSlice.reducer;
export type { PersonalCourseClassesState, CourseClass };