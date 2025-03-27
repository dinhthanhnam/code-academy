import SideBarSection from "@/components/SideBar/SideBarSection";
import DropDownButton from "@/components/Button/DropDownButton";
import {TbSocial} from "react-icons/tb";
import {SiGoogleclassroom} from "react-icons/si";

export default function LecturerSideBarContent() {

    const staticOptionsData = {
        classes: [
            { id: "courses", name: "Học phần", path: "/course" },
            { id: "course-classes", name: "Lớp học phần", path: "/course-class" },
        ],
    };

    return (
        <>
            <SideBarSection sectionName="Giảng viên">
                <DropDownButton
                    id="course-class"
                    title="Quản lý lớp"
                    icon={SiGoogleclassroom}
                    iconSize={20}
                    iconStrokeWidth={0.2}
                    referencePath="/lecturer"
                    defaultOptions={staticOptionsData.classes}
                />
            </SideBarSection>
        </>
    );
}