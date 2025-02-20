import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeDropdown: null, // ID của dropdown đang mở
};

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState,
    reducers: {
        setActiveDropdown: (state, action) => {
            state.activeDropdown = state.activeDropdown === action.payload ? null : action.payload;
        },
    },
});

export const { setActiveDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;
