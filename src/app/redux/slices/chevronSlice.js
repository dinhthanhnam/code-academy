import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chevronDown: null, // ID của dropdown đang mở
};

const chevronSlice = createSlice({
    name: "chevron",
    initialState,
    reducers: {
        setChevronDown: (state, action) => {
            state.chevronDown = state.chevronDown === action.payload ? null : action.payload;
        },
    },
});

export const { setChevronDown } = chevronSlice.actions;
export default chevronSlice.reducer;
