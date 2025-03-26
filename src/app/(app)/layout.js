"use client";
import "@/app/globals.css";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import RoleDetector from "@/components/RoleDetector";

export default function AppLayout({ children }) {
    return (
        <div>
            <RoleDetector />
            <div className="flex h-screen overflow-hidden">
                <SideBar />
                {/* Main Content */}
                <div className="flex flex-col w-full flex-grow">
                    <Header />
                    {/* Container chứa children */}
                    <div className="flex-grow overflow-auto bg-gray-100 p-2 pt-4 flex flex-col md:flex-row gap-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
