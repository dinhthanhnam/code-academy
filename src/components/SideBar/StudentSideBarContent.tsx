import SideBarSection from "@/components/SideBar/SideBarSection";
import DropDownButton from "@/components/Button/DropDownButton";
import {TbSocial} from "react-icons/tb";
import {
    HiOutlineClipboardDocument,
    HiOutlineClipboardDocumentCheck,
    HiOutlineClipboardDocumentList
} from "react-icons/hi2";
import {SiHtmlacademy} from "react-icons/si";
import {LuProjector} from "react-icons/lu";
import {useLoadPersonalCourseClasses} from "@/app/hooks/useAuth";

export default function StudentSideBarContent() {
    const { courses: personalCourseClasses } = useLoadPersonalCourseClasses();
    const staticOptionsData1 = {
        social: [
            { id: "chatbotai", name: "Chatbox AI", path: "/chatbot" },
            { id: "icedteaupontheacademy", name: "Trà đá học viện", path: "/iced-tea-upon-the-academy" },
        ],
        exercise: [
            { id: "irregular", name: "Bài tập tự do", path: "/irregular" },
        ],
        hall_of_fame: [
            { id: "xep-hang-khoa", name: "Bảng xếp hạng khoa", path: "/itde" }
        ]
    };

    const staticOptionsData2 = {
        social: [
            { id: "chatboxk24cntta", name: "Chatbox - K24CNTTA", path: "/chatbox-k24cntta" },
        ],
    };
    return (
        <>
            <SideBarSection sectionName="Nền tảng">
                <DropDownButton
                    id="social"
                    title="Cộng đồng"
                    icon={TbSocial}
                    iconSize={22}
                    iconStrokeWidth={1.4}
                    parentLink="/social"
                    defaultOptions={staticOptionsData1.social}
                    options={staticOptionsData2.social}
                />
                <DropDownButton
                    id="courses"
                    title="Khoá học"
                    icon={HiOutlineClipboardDocument}
                    iconSize={22}
                    parentLink="/exercises"
                    iconStrokeWidth={1.5}
                    defaultOptions={staticOptionsData1.exercise}
                    options={personalCourseClasses} // Dùng dữ liệu động từ Redux
                />
                <DropDownButton
                    id="halloffame"
                    title="Bảng xếp hạng"
                    icon={SiHtmlacademy}
                    iconSize={20}
                    parentLink="/exercises"
                    iconStrokeWidth={0.7}
                    defaultOptions={staticOptionsData1.hall_of_fame}
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
        </>

    );
}