import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseClass {
    id: string;
    name: string;
    path: string;
}

interface PersonalCourseClassesState {
    courses: CourseClass[];
}

const personalCourseClassesInitialState: PersonalCourseClassesState = {
    courses: [],
};

const personalCourseClassesSlice = createSlice({
    name: "personalCourseClasses",
    initialState: personalCourseClassesInitialState,
    reducers: {
        personalCourseClasses(state, action: PayloadAction<CourseClass[]>) {
            state.courses = action.payload;
        },
    },
});

export const { personalCourseClasses } = personalCourseClassesSlice.actions;
export const personalCourseClassesReducer = personalCourseClassesSlice.reducer;
export type { PersonalCourseClassesState, CourseClass };