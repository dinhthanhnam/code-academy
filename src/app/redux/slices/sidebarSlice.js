import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false, // Mặc định Sidebar đóng trên mobile
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: { isSidebarOpen: true },
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false;
        },
        openSidebar: (state) => {
            state.isSidebarOpen = true;
        },
    },
});

export const { toggleSidebar, closeSidebar, openSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
