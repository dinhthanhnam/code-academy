import { BiChevronRight } from "react-icons/bi";
import Link from "next/link";

export default function DropDownButton({ href, icon: Icon, onClick, iconSize = 20, iconStrokeWidth = 1, title, active, chevron = true }) {
    return (
        <Link href={href} passHref legacyBehavior>
            <div
                className="p-2 w-11/12 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out mx-auto"
                onClick={onClick}
            >
                <a className="w-full flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-3">
                        <Icon size={iconSize} strokeWidth={iconStrokeWidth} />  {/* Đúng cách gọi component */}
                        <span>{title}</span>
                    </div>
                    {chevron && (<BiChevronRight size={18} strokeWidth={0.8} />)}
                </a>
            </div>
        </Link>
    );
}
