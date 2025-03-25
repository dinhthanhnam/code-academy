import React, {FormEvent} from "react";
import {IconType} from "react-icons";

interface CommonButton2Props {
    label?: string;
    onClick: () => void; // Đổi tên từ "onClick" -> "onClickAction"
    children?: React.ReactNode;
    icon?: IconType;
}

export default function CommonButton2({ label, onClick, children, icon: Icon }: CommonButton2Props) {
    return (
        <button
            onClick={onClick} // Cập nhật tên prop ở đây
            className="bg-primary rounded-md border border-secondary px-4 py-2 inline-flex items-center hover:bg-primary2 duration-200 text-white"
        >
            <Icon size={20} strokeWidth={1} />
            {label}
        </button>
    );
}
