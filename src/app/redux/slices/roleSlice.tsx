import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoleState {
    isStudent: boolean;
    isLecturer: boolean;
    isTechnician: boolean;
}

const roleInitialState: RoleState = {
    isStudent: true, // Mặc định là máy tính
    isLecturer: false,
    isTechnician: false
};

const roleSlice = createSlice({
    name: "role",
    initialState: roleInitialState,
    reducers: {
        setRole: (state, action: PayloadAction<string>) => {
            state.isStudent = action.payload === 'student';
            state.isLecturer = action.payload === 'lecturer';
            state.isTechnician = action.payload === 'technician';
        },
    },
});

export const { setRole } = roleSlice.actions;
export const roleReducer = roleSlice.reducer;
export type { roleSlice };