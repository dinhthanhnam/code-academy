import ProfileHolder from "@/components/Header/ProfileHolder";
import {BiDockLeft} from "react-icons/bi";

export default function Header() {
    return (
        <div
            className={`px-2 w-full self-center flex flex-row items-center min-w-screen justify-between min-h-14 bg-gray-100 border-main border-b shadow-secondary2 shadow-sm`}>
            <div className={`flex flex-row cursor-pointer`}>
                <div className={`p-0.5 rounded-sm hover:bg-primary2 duration-200 group relative`}>
                    <BiDockLeft size={30} />
                    <span className={`tooltip`}>Ẩn/hiện Sidebar</span>
                </div>
            </div>
            <ProfileHolder></ProfileHolder>
        </div>
    );
}