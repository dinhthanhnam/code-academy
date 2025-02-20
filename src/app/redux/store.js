import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/dropdownSlice"; // Import reducer

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer, // Định nghĩa reducer
    },
});
