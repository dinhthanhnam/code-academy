"use client";

import { BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { setActiveDropdown } from "@/app/redux/slices/dropdownSlice";
import { setActiveNavigationOption } from "@/app/redux/slices/navigationOptionSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { IconType } from "react-icons";

type DropdownOption = {
    id: string;
    name: string;
    path?: string;
};

type DropDownButtonProps = {
    id: string;
    icon: IconType;
    iconSize?: number;
    iconStrokeWidth?: number;
    options?: DropdownOption[];
    chevron?: boolean;
    title: string;
    parentLink?: string;
};

export default function DropDownButton({
                                           id,
                                           icon: Icon,
                                           iconSize = 20,
                                           iconStrokeWidth = 1,
                                           options = [],
                                           chevron = true,
                                           title,
                                           parentLink,
                                       }: DropDownButtonProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const activeDropdown = useAppSelector((state) => state.dropdown.activeDropdown);
    const activeNavigationOption = useAppSelector((state) => state.navigationOption.activeNavigationOption);

    const isActive = activeDropdown === id;

    const handleButtonClick = () => {
        dispatch(setActiveDropdown(isActive ? null : id));
        dispatch(setActiveNavigationOption(null));
        if (parentLink) {
            router.push(parentLink);
        }
    };

    const handleOptionClick = (optionId: string, optionPath?: string) => {
        dispatch(setActiveNavigationOption(optionId));
        if (optionPath) {
            router.push(parentLink ? parentLink + optionPath : optionPath);
        }
    };

    return (
        <div
            className={`p-2 w-11/12 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out mx-auto cursor-pointer
            ${isActive ? "bg-gray-50 border-t-2 border-l-2 border-primary shadow-secondary shadow-md" : ""}`}
        >
            <div className="w-full flex items-center justify-between text-foreground" onClick={handleButtonClick}>
                <div className="flex items-center gap-3">
                    <Icon size={iconSize} strokeWidth={iconStrokeWidth} />
                    <span className="select-none">{title}</span>
                </div>

                {chevron && (
                    <div
                        className={`p-2 duration-200 hover:bg-gray-400 rounded-full transition-all ${
                            isActive ? "rotate-90" : ""
                        }`}
                    >
                        <BiChevronRight size={18} strokeWidth={0.8} />
                    </div>
                )}
            </div>

            {/* Danh sách các options bên trong dropdown */}
            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isActive ? "max-h-40" : "max-h-0"}`}>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`select-none px-6 py-1 rounded-md duration-200 text-sm text-gray-800 transition-all
                        ${activeNavigationOption === option.id ? "bg-primary2" : "hover:bg-gray-200"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOptionClick(option.id, option.path);
                        }}
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
