import React from "react";
import {Search} from "lucide-react";

interface CommonSearchProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
}

export default function CommonSearch({value, onSubmit, onChange}: CommonSearchProps) {
    return(

        <div className="flex items-center gap-2">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Tìm kiếm học phần..."
                    className="w-full p-2 pl-8 border rounded focus:ring ring-primary !outline-1 !outline-secondary"
                    value={value ?? ""}
                    onChange={onChange}
                />
                <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
        </div>
    );
}