// @/components/SideBar/SideBar.tsx
import { SiHtmlacademy } from "react-icons/si";
import { TbHelp, TbSocial } from "react-icons/tb";
import DropDownButton from "@/components/Button/DropDownButton";
import { LuProjector } from "react-icons/lu";
import SideBarHeader from "@/components/SideBar/SideBarHeader";
import {
    HiOutlineClipboardDocument,
    HiOutlineClipboardDocumentCheck,
    HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import SideBarSection from "@/components/SideBar/SideBarSection";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { setActiveDropdown } from "@/app/redux/slices/dropdownSlice";
import { setActiveNavigationOption } from "@/app/redux/slices/navigationOptionSlice";
import { useEffect, useRef } from "react";
import { closeSidebar } from "@/app/redux/slices/sidebarSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useLoadPersonalCourseClasses } from "@/app/hooks/useAuth";

export default function SideBar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const activeNavigationOption = useAppSelector((state) => state.navigationOption.activeNavigationOption);
    const isSidebarOpen = useAppSelector((state) => state.sidebar.isSidebarOpen);
    const isMobile = useAppSelector((state) => state.device.isMobile);
    const { courses: personalCourseClasses } = useLoadPersonalCourseClasses(); // Load dữ liệu từ Redux
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMobile && isSidebarOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                    dispatch(closeSidebar());
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isMobile, isSidebarOpen, dispatch]);

    const staticOptionsData = {
        social: [
            { id: "chatbotai", name: "Chatbox AI", path: "/chatbot" },
            { id: "chatboxk24cntta", name: "Chatbox - K24CNTTA", path: "/chatbox-k24cntta" },
            { id: "icedteaupontheacademy", name: "Trà đá học viện", path: "/iced-tea-upon-the-academy" },
        ],
    };

    return (
        <div
            ref={sidebarRef}
            className={`
                ${isMobile
                    ? isSidebarOpen
                        ? "fixed w-60 inset-0 bg-white z-50"
                        : "hidden"
                    : isSidebarOpen
                        ? "relative md:min-w-60"
                        : "absolute w-0 overflow-hidden"}
              `}
                >
            <div className="rounded-md flex flex-col border-foreground border-r-2 min-h-screen shadow-secondary shadow-lg">
                <SideBarHeader />

                <div className="flex flex-col flex-grow gap-4 pt-8">
                    <SideBarSection sectionName="Nền tảng">
                        <DropDownButton
                            id="social"
                            title="Cộng đồng"
                            icon={TbSocial}
                            iconSize={22}
                            iconStrokeWidth={1.4}
                            parentLink="/social"
                            options={staticOptionsData.social}
                        />
                        <DropDownButton
                            id="courses"
                            title="Khoá học"
                            icon={HiOutlineClipboardDocument}
                            iconSize={22}
                            parentLink="/exercises"
                            iconStrokeWidth={1.5}
                            options={personalCourseClasses} // Dùng dữ liệu động từ Redux
                        />
                        <DropDownButton
                            id="halloffame"
                            title="Sảnh danh vọng"
                            icon={SiHtmlacademy}
                            iconSize={20}
                            parentLink="/hall-of-fame"
                            iconStrokeWidth={0.7}
                        />
                    </SideBarSection>

                    <SideBarSection sectionName="Cá nhân">
                        <DropDownButton
                            id="project"
                            title="Dự án"
                            icon={LuProjector}
                            iconSize={24}
                            iconStrokeWidth={1.5}
                            parentLink="/project"
                        />
                        <DropDownButton
                            id="pendingexercises"
                            title="Bài tập đang chờ"
                            icon={HiOutlineClipboardDocumentList}
                            iconSize={22}
                            iconStrokeWidth={1.5}
                            parentLink="/pending-exercises"
                        />
                        <DropDownButton
                            id="archivedexercises"
                            title="Bài tập đã lưu"
                            icon={HiOutlineClipboardDocumentCheck}
                            iconSize={22}
                            iconStrokeWidth={1.5}
                            parentLink="/archived-exercises"
                        />
                    </SideBarSection>

                    <div className="mt-auto flex flex-col items-center gap-2 pb-4">
                        <div
                            className={`relative w-11/12 flex flex-row gap-2 items-center justify-end duration-200 p-2 rounded-lg pr-4 
                                ${activeNavigationOption === "settings" ? "bg-primary2" : "hover:bg-gray-100"}`}
                            onClick={() => {
                                dispatch(setActiveDropdown(null));
                                dispatch(setActiveNavigationOption("settings"));
                                router.push("/settings");
                            }}
                        >
                            <span className="select-none text-gray-600 text-sm">Cài đặt</span>
                            <IoSettingsOutline size={22} strokeWidth={0.7} />
                        </div>
                        <div
                            className={`relative w-11/12 flex flex-row gap-2 items-center justify-end duration-200 p-2 rounded-lg pr-4 
                                ${activeNavigationOption === "help" ? "bg-primary2" : "hover:bg-gray-100"}`}
                            onClick={() => {
                                dispatch(setActiveDropdown(null));
                                dispatch(setActiveNavigationOption("help"));
                                router.push("/help");
                            }}
                        >
                            <span className="select-none text-gray-600 text-sm">Trợ giúp</span>
                            <TbHelp size={23} strokeWidth={1.6} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}