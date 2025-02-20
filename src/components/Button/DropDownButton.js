import { BiChevronRight } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setActiveDropdown } from "@/app/redux/slices/dropdownSlice";
import Link from "next/link";
import {setActiveNavigationOption} from "@/app/redux/slices/navigationOptionSlice";

export default function DropDownButton({ id,
                                           icon: Icon,
                                           iconSize = 20,
                                           iconStrokeWidth = 1,
                                           options =[],
                                           chevron = true,
                                           title,
                                           parentLink,
                                           onClick }) {
    const activeDropdown = useSelector((state) => state.dropdown.activeDropdown);
    const dispatch = useDispatch();
    const isActive = activeDropdown === id;

    const activeNavigationOption = useSelector((state) => state.navigationOption.activeNavigationOption);
    return (
        <div
            className={`p-2 w-11/12 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out mx-auto cursor-pointer 
            ${isActive ? "bg-gray-50 border-t-2 border-l-2 border-primary shadow-secondary shadow-md" : ""}`}
            onClick={
                chevron === false
                    ? () => {
                        dispatch(setActiveDropdown(isActive ? null : id));
                        dispatch(setActiveNavigationOption(null));
                    }
                    : undefined
            }
        >
            <div className="w-full flex items-center justify-between text-foreground">
                <div className="flex items-center gap-3" onClick={onClick}>
                    <Icon size={iconSize} strokeWidth={iconStrokeWidth}/>
                    {parentLink ? (
                        <Link href={parentLink}>
                            <span className={`select-none`}>{title}</span>
                        </Link>
                    ) : (
                        <span className={`select-none`}>{title}</span>
                    )}

                </div>
                {chevron && (
                    <div
                        className={`p-2 duration-200 hover:bg-gray-400 rounded-full transition-all  ${isActive ? "rotate-90" : ""}`}
                        onClick={() => {
                            dispatch(setActiveDropdown(id));
                            dispatch(setActiveNavigationOption(null))
                        }}>
                        <BiChevronRight size={18} strokeWidth={0.8}/>
                    </div>
                )}
            </div>
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isActive ? "max-h-40" : "max-h-0"}`}
            >
                {options.map((option, index) => {
                    const id = index.toString();
                    return (
                        <div key={index}
                             className={`select-none px-6 py-1 rounded-md duration-200 text-sm text-gray-800 transition-all
                             ${activeNavigationOption === option ? "bg-primary2" : "hover:bg-gray-200"}`}
                             onClick={() => dispatch(setActiveNavigationOption(option))}
                        >
                            {option}
                        </div>
                    )
                }
            )}
        </div>
</div>
    );
}
