import Link from "next/link";
import { SiHtmlacademy } from "react-icons/si";
import {BiChevronRight} from "react-icons/bi";
import {TiSocialFlickrCircular} from "react-icons/ti";
import {TbSocial} from "react-icons/tb";
import DropDownButton from "@/components/Button/DropDownButton";
import {LuProjector} from "react-icons/lu";
import {CgFileDocument} from "react-icons/cg";
import {
    HiOutlineClipboardDocument,
    HiOutlineClipboardDocumentCheck,
    HiOutlineClipboardDocumentList
} from "react-icons/hi2";

export default function SideBar() {
    return (
        <div className="flex flex-col border-foreground border-r-2 w-60 min-h-screen outline outline-secondary">
            <div className="border-foreground border-b-4 min-h-20 flex flex-col justify-between bg-primary p-2">
                <span className="text-white font-black text-lg">HỌC VIỆN NGÂN HÀNG</span>
                <span className="self-end text-sm text-secondary">Học viện lập trình</span>
            </div>
            <div className="grid grid-rows-4 gap-4 pt-8">
                <div>
                    <span className={`pl-2 text-gray-600 text-sm`}>Nền tảng</span>
                    <div className={`gap-2 flex flex-col`}>
                        <DropDownButton href={`/`} title={`Giao lưu`} icon={TbSocial} iconSize={24} iconStrokeWidth={1.4}/>
                        <DropDownButton href={`/`} title={`Bài tập`} icon={HiOutlineClipboardDocument} iconSize={22} iconStrokeWidth={1.5}/>
                    </div>
                </div>
                <div>
                    <span className={`pl-2 text-gray-600 text-sm`}>Cá nhân</span>
                    <div className={`gap-2 flex flex-col`}>
                        <DropDownButton href={`/`} title={`Dự án`} icon={LuProjector} iconSize={24} iconStrokeWidth={1.5}/>
                        <DropDownButton href={`/`} title={`Bài tập đang chờ`} icon={HiOutlineClipboardDocumentList} iconSize={22} iconStrokeWidth={1.5} chevron={false}/>
                        <DropDownButton href={`/`} title={`Bài tập đã lưu`} icon={HiOutlineClipboardDocumentCheck} iconSize={22} iconStrokeWidth={1.5} chevron={false}/>
                    </div>
                </div>
                <div className="flex justify-center items-center">Setting</div>
            </div>
        </div>
    );
}
