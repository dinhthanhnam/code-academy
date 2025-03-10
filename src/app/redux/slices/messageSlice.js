import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    success: null, // true: success (green), false: error (red)
    visible: false,
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.message = action.payload.message;
            state.success = action.payload.success;
            state.visible = true;
        },
        hideMessage: (state) => {
            state.visible = false;
        },
    },
});

export const { showMessage, hideMessage } = messageSlice.actions;
export default messageSlice.reducer;
