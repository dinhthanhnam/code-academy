import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false, // Trạng thái mặc định
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
    },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
