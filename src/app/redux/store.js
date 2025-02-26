import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/dropdownSlice"; // Import reducer
import navigationOptionReducer from "./slices/navigationOptionSlice";
import routerReducer from "./slices/routerSlice";
import sidebarReducer from "./slices/sidebarSlice";
import deviceReducer from "./slices/deviceSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        navigationOption: navigationOptionReducer,
        router: routerReducer,
        sidebar: sidebarReducer,
        device: deviceReducer,
    },
});
