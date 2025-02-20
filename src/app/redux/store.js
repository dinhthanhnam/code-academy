import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/dropdownSlice"; // Import reducer
import navigationOptionReducer from "./slices/navigationOptionSlice";
import chevronReducer from "@/app/redux/slices/chevronSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        navigationOption: navigationOptionReducer,
        chevron: chevronReducer,
    },
});
