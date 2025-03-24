import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
    isLoading: boolean;
}

const loadingInitialState: LoadingState = {
    isLoading: false, // Trạng thái mặc định
};

const loadingSlice = createSlice({
    name: "loading",
    initialState: loadingInitialState,
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
export type { LoadingState };