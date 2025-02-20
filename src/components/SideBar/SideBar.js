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

export default function SideBar() {
    return (
        <div className="rounded-md flex flex-col border-foreground border-r-2 min-w-60 min-h-screen shadow-secondary shadow-lg">
            <SideBarHeader/>
            <div className="grid auto-rows-min gap-4 pt-8">
                <SideBarSection sectionName={`Nền tảng`}>
                    <DropDownButton id="1" title={`Cộng đồng`} icon={TbSocial} iconSize={22} iconStrokeWidth={1.4} parentLink={`/social`}
                                    options={["Chatbot", "Chatbox - K24CNTTA", "Trà đá học viện"]}/>
                    <DropDownButton id="2" title={`Bài tập`} icon={HiOutlineClipboardDocument} iconSize={22} parentLink={`/exercises`}
                                    iconStrokeWidth={1.5} options={["Lập trình C nâng cao - ITA003", "Tự do"]}/>
                    <DropDownButton id="3" title={`Sảnh danh vọng`} icon={SiHtmlacademy} iconSize={20}
                                    iconStrokeWidth={0.7}/>
                </SideBarSection>
                <SideBarSection sectionName={`Cá nhân`}>
                    <DropDownButton id="4" title={`Dự án`} icon={LuProjector} iconSize={24} iconStrokeWidth={1.5}/>
                    <DropDownButton id="5" title={`Bài tập đang chờ`} icon={HiOutlineClipboardDocumentList}
                                    iconSize={22} iconStrokeWidth={1.5} chevron={false}/>
                    <DropDownButton id="6" title={`Bài tập đã lưu`} icon={HiOutlineClipboardDocumentCheck}
                                    iconSize={22} iconStrokeWidth={1.5} chevron={false}/>
                </SideBarSection>

                <div className="flex flex-col items-center gap-2 ">
                    <div
                        className="relative w-11/12 flex flex-row gap-2 items-center
                        justify-end hover:bg-gray-100 duration-200 p-2 rounded-lg pr-4">
                        <span className="select-none text-gray-600 text-sm">Cài đặt</span>
                        <IoSettingsOutline size={22} strokeWidth={0.7}/>
                    </div>
                    <div
                        className="relative w-11/12 flex flex-row gap-2 items-center
                        justify-end hover:bg-gray-100 duration-200 p-2 rounded-lg pr-4">
                        <span className="select-none text-gray-600 text-sm">Trợ giúp</span>
                        <TbHelp size={23} strokeWidth={1.6}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
