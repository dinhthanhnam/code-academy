import React, {FormEvent} from "react";
import {IconType} from "react-icons";

interface CommonButtonProps {
    label?: string;
    onClick: (() => void) | ((e: React.MouseEvent) => void);
    children?: React.ReactNode;
    icon?: IconType;
}

export default function CommonButton({ label, onClick, icon: Icon }: CommonButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-primary bg-opacity-90 rounded-md border border-secondary
            p-2 inline-flex items-center gap-2 hover:bg-primary hover:bg-opacity-100 duration-200 text-white
            ease-in-out"
        >
            {Icon && <Icon size={20} strokeWidth={2} />}
            {label && <span className="text-sm whitespace-nowrap">{label}</span>}
        </button>
    );
}
