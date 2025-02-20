import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/dropdownSlice"; // Import reducer
import navigationOptionReducer from "./slices/navigationOptionSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        navigationOption: navigationOptionReducer// Định nghĩa reducer
    },
});
