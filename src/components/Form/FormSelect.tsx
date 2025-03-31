import { ChangeEvent, useState, useRef, useEffect } from "react";

interface FormSelectProps {
    label?: string;
    value?: string;
    name: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    disable?: boolean;
    className?: string;
    selectOnly?: boolean;
}

export default function FormSelect({
                                       label,
                                       value = "",
                                       name,
                                       options,
                                       placeholder,
                                       onChange,
                                       disable = false,
                                       className = "",
                                       selectOnly = true,
                                   }: FormSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(value);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lọc options dựa trên search term
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setIsOpen(true);
        onChange(e); // Gọi callback cha
    };

    const handleOptionClick = (option: { value: string; label: string }) => {
        setSearch(option.label);
        setIsOpen(false);
        // Tạo synthetic event để khớp với onChange của select
        const syntheticEvent = {
            target: { value: option.value, name },
        } as ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
    };

    return (
        <div className={`${className} flex flex-col p-2`} ref={wrapperRef}>
            {label && (
                <label className="block font-bold justify-self-start text-md">{label}</label>
            )}
            {selectOnly ? (
                // Chế độ chỉ chọn
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disable}
                    className="p-2 rounded focus:ring focus:ring-primary border text-sm border-secondary outline-secondary"
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                // Chế độ tìm kiếm
                <div className="relative">
                    <input
                        type="text"
                        name={name}
                        value={search}
                        onChange={handleInputChange}
                        onFocus={() => setIsOpen(true)}
                        placeholder={placeholder}
                        disabled={disable}
                        className="w-full p-2 rounded focus:ring focus:ring-primary border text-sm border-secondary outline-secondary"
                    />
                    {isOpen && filteredOptions.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border border-secondary rounded shadow-lg max-h-60 overflow-auto">
                            {filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}