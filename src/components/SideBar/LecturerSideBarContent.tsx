import SideBarSection from "@/components/SideBar/SideBarSection";
import DropDownButton from "@/components/Button/DropDownButton";
import {TbSocial} from "react-icons/tb";

export default function LecturerSideBarContent() {

    const staticOptionsData = {
        management: [
            { id: "courses", name: "Học phần", path: "/course" },
            { id: "course-classes", name: "Lớp học phần", path: "/course-class" },
            { id: "lecturer", name: "Giảng viên", path: "/lecturer" },
            { id: "student", name: "Sinh viên", path: "/student" },
            { id: "exercise", name: "Bài tập", path: "/exercise" },
            { id: "admin", name: "Quản trị viên", path: "/admin" },
        ],
        database: [
            { id: "course", name: "Course", path: "/course" },
        ]
    };

    return (
        <>
            <SideBarSection sectionName="Quản lý">
                <DropDownButton
                    id="general-management"
                    title="Quản lý chung"
                    icon={TbSocial}
                    iconSize={22}
                    iconStrokeWidth={1.4}
                    parentLink="/admin/management"
                    defaultOptions={staticOptionsData.management}
                />
            </SideBarSection>

            <SideBarSection sectionName="Cơ sở dữ liệu">
                <DropDownButton
                    id="database"
                    title="Quản lý chung"
                    icon={TbSocial}
                    iconSize={22}
                    iconStrokeWidth={1.4}
                    parentLink="/admin/database"
                    defaultOptions={staticOptionsData.database}
                />
            </SideBarSection>
        </>

    );
}