import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./slices/dropdownSlice";
import navigationOptionReducer from "./slices/navigationOptionSlice";
import routerReducer from "./slices/routerSlice";
import sidebarReducer from "./slices/sidebarSlice";
import deviceReducer from "./slices/deviceSlice";
import loadingReducer from "./slices/loadingSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
    reducer: {
        dropdown: dropdownReducer,
        navigationOption: navigationOptionReducer,
        router: routerReducer,
        sidebar: sidebarReducer,
        device: deviceReducer,
        loading: loadingReducer,
        message: messageReducer,
    },
});

// ✅ Export TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
