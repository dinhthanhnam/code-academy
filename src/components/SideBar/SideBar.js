import { SiHtmlacademy } from "react-icons/si";
import {TbHelp, TbSocial} from "react-icons/tb";
import DropDownButton from "@/components/Button/DropDownButton";
import {LuProjector} from "react-icons/lu";
import SideBarHeader from "@/components/SideBar/SideBarHeader";
import {
    HiOutlineClipboardDocument,
    HiOutlineClipboardDocumentCheck,
    HiOutlineClipboardDocumentList
} from "react-icons/hi2";
import SideBarSection from "@/components/SideBar/SideBarSection";
import {IoSettingsOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {setActiveDropdown} from "@/app/redux/slices/dropdownSlice";
import {setActiveNavigationOption} from "@/app/redux/slices/navigationOptionSlice";
import {useEffect, useRef} from "react";
import {closeSidebar} from "@/app/redux/slices/sidebarSlice";

export default function SideBar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const activeNavigationOption = useSelector((state) => state.navigationOption.activeNavigationOption);
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const isMobile = useSelector((state) => state.device.isMobile);
    const sidebarRef = useRef(null);  // Ref để kiểm tra click ngoài sidebar

    // 📌 Xử lý sự kiện click ra ngoài sidebar
    useEffect(() => {
        if (isMobile && isSidebarOpen) {
            const handleClickOutside = (event) => {
                if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                    dispatch(closeSidebar());  // Đóng sidebar nếu click bên ngoài
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isMobile, isSidebarOpen, dispatch]);

    const optionsData = {
        "social": [
            {
                id: "chatbotai",
                name: "Chatbox AI",
                path: "/chatbot"
            },
            {
                id: "chatboxk24cntta",
                name: "Chatbox - K24CNTTA",
                path: "/chatbox-k24cntta"
            },
            {
                id: "icedteaupontheacademy",
                name: "Trà đá học viện",
                path: "/iced-tea-upon-the-academy"
            },
        ],
        "exercises": [
            {
                id: 1,
                name: "Lập trình C nâng cao - ITA003",
                path: "/ita003"
            },
            {
                id: 2,
                name: "Tự do",
                path: "/irregular"
            },
        ],
    }

    return (
        <div
            ref={sidebarRef}
            className={`
                ${isMobile ?
                (isSidebarOpen ? "fixed w-60 inset-0 bg-white z-50" : "hidden")  // Mobile: Fixed full màn hình khi mở
                : (isSidebarOpen ? "relative md:min-w-60" : "absolute w-0 overflow-hidden")} 
            `}
        >
            <div className="rounded-md flex flex-col border-foreground border-r-2 min-h-screen shadow-secondary shadow-lg">
                <SideBarHeader />

                {/* Nội dung chính với flex-grow */}
                <div className="flex flex-col flex-grow gap-4 pt-8">
                    <SideBarSection sectionName="Nền tảng">
                        <DropDownButton id="social" title="Cộng đồng" icon={TbSocial} iconSize={22} iconStrokeWidth={1.4} parentLink="/social" options={optionsData.social}/>
                        <DropDownButton id="exercises" title="Bài tập" icon={HiOutlineClipboardDocument} iconSize={22} parentLink="/exercises" iconStrokeWidth={1.5} options={optionsData.exercises}/>
                        <DropDownButton id="halloffame" title="Sảnh danh vọng" icon={SiHtmlacademy} iconSize={20} parentLink="/hall-of-fame" iconStrokeWidth={0.7}/>
                    </SideBarSection>

                    <SideBarSection sectionName="Cá nhân">
                        <DropDownButton id="project" title="Dự án" icon={LuProjector} iconSize={24} iconStrokeWidth={1.5} parentLink="/project"/>
                        <DropDownButton id="pendingexercises" title="Bài tập đang chờ" icon={HiOutlineClipboardDocumentList} iconSize={22} iconStrokeWidth={1.5} parentLink="/pending-exercises"/>
                        <DropDownButton id="archivedexercises" title="Bài tập đã lưu" icon={HiOutlineClipboardDocumentCheck} iconSize={22} iconStrokeWidth={1.5} parentLink="/archived-exercises"/>
                    </SideBarSection>

                    {/* Đẩy phần cài đặt xuống dưới cùng */}
                    <div className="mt-auto flex flex-col items-center gap-2 pb-4">
                        {/* Cài đặt */}
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
                            <IoSettingsOutline size={22} strokeWidth={0.7}/>
                        </div>

                        {/* Trợ giúp */}
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
                            <TbHelp size={23} strokeWidth={1.6}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

