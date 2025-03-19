import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeNavigationOption: null, // ID của dropdown đang mở
};

const navigationOptionSlice = createSlice({
    name: "navigationOption",
    initialState,
    reducers: {
        setActiveNavigationOption: (state, action) => {
            state.activeNavigationOption = state.activeNavigationOption === action.payload ? null : action.payload;
        },
    },
});

export const { setActiveNavigationOption } = navigationOptionSlice.actions;
export default navigationOptionSlice.reducer;
