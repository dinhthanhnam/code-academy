import { BiChevronRight } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setActiveDropdown } from "@/app/redux/slices/dropdownSlice";

export default function DropDownButton({ id, icon: Icon, iconSize = 20, iconStrokeWidth = 1, options =[], title, chevron = true, onClick }) {
    const activeDropdown = useSelector((state) => state.dropdown.activeDropdown);
    const dispatch = useDispatch();
    const isActive = activeDropdown === id;

    return (
        <div
            className={`p-2 w-11/12 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out mx-auto cursor-pointer ${isActive ? "bg-gray-50" : ""}`}
        >
            <div className="w-full flex items-center justify-between text-foreground">
                <div className="flex items-center gap-3" onClick={onClick}>
                    <Icon size={iconSize} strokeWidth={iconStrokeWidth}/>
                    <span>{title}</span>
                </div>
                {chevron && (
                    <div className={`p-2 duration-200 hover:bg-gray-400 rounded-full transition-all  ${isActive ? "rotate-90" : ""}`}
                         onClick={() => dispatch(setActiveDropdown(id))}>
                        <BiChevronRight size={18} strokeWidth={0.8}/>
                    </div>
                )}
            </div>
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isActive ? "max-h-40" : "max-h-0"}`}
            >
                {options.map((option, index) => (
                    <div key={index} className="px-6 py-1 hover:bg-gray-200 rounded-md duration-200 text-sm text-opacity-90">
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}
