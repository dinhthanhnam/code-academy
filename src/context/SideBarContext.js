"use client";
import { createContext, useContext, useState } from "react";

// Tạo Context
const SideBarContext = createContext({});

// Hook để dùng Context dễ dàng
export function useSideBar() {
    return useContext(SideBarContext);
}

// Provider bọc toàn bộ ứng dụng
export function SideBarProvider({ children }) {
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <SideBarContext.Provider value={{ activeDropdown, setActiveDropdown }}>
            {children}
        </SideBarContext.Provider>
    );
}
