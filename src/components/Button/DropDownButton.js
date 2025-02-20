"use client";
import { BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setActiveDropdown } from "@/app/redux/slices/dropdownSlice";
import { setActiveNavigationOption } from "@/app/redux/slices/navigationOptionSlice";
import { setChevronDown } from "@/app/redux/slices/chevronSlice";

export default function DropDownButton({ id, icon: Icon, iconSize = 20, iconStrokeWidth = 1, options = [], chevron = true, title, parentLink }) {
    const activeDropdown = useSelector((state) => state.dropdown.activeDropdown);
    const activeNavigationOption = useSelector((state) => state.navigationOption.activeNavigationOption);
    const chevronDown = useSelector((state) => state.chevron.chevronDown);
    const dispatch = useDispatch();
    const isActive = activeDropdown === id;
    const isChevronDown = chevronDown === id;
    const router = useRouter();

    // 👉 Xử lý khi bấm vào toàn bộ DropDownButton
    const handleButtonClick = () => {
        dispatch(setActiveDropdown(id));
        dispatch(setActiveNavigationOption(null));

        if (parentLink) {
            router.push(parentLink); // Không reload trang
        }
    };

    // 👉 Xử lý khi chỉ bấm vào Chevron
    const handleChevronClick = (e) => {
        e.stopPropagation();
        dispatch(setActiveDropdown(id));
        dispatch(setChevronDown(isChevronDown ? null : id)); // Toggle trạng thái chevron
    };

    return (
        <div
            className={`p-2 w-11/12 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out mx-auto cursor-pointer 
            ${isActive ? "bg-gray-50 border-t-2 border-l-2 border-primary shadow-secondary shadow-md" : ""}`}
            onClick={handleButtonClick}
        >
            <div className="w-full flex items-center justify-between text-foreground">
                <div className="flex items-center gap-3">
                    <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
                    <span className="select-none">{title}</span>
                </div>

                {/* Chevron */}
                {chevron && (
                    <div
                        className={`p-2 duration-200 hover:bg-gray-400 rounded-full transition-all ${isActive && isChevronDown ? "rotate-90" : ""}`}
                        onClick={handleChevronClick}
                    >
                        <BiChevronRight size={18} strokeWidth={0.8} />
                    </div>
                )}
            </div>

            {/* Dropdown Items */}
            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isActive && isChevronDown ? "max-h-40" : "max-h-0"}`}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`select-none px-6 py-1 rounded-md duration-200 text-sm text-gray-800 transition-all
                        ${activeNavigationOption === option ? "bg-primary2" : "hover:bg-gray-200"}`}
                        onClick={() => dispatch(setActiveNavigationOption(option))}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}
