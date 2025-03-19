import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRoute: "/", // Route mặc định
};

const routerSlice = createSlice({
    name: "router",
    initialState,
    reducers: {
        setCurrentRoute: (state, action) => {
            state.currentRoute = action.payload;
        },
    },
});

export const { setCurrentRoute } = routerSlice.actions;
export default routerSlice.reducer;
