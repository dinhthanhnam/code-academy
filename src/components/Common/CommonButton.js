"use client";

export default function CommonButton({label, onClick}) {
    return(
        <button
            onClick={onClick}
            className="bg-gray-50 rounded-md border border-secondary px-4 py-2 inline-flex items-center hover:bg-background duration-200">
            {label}
        </button>
    );
}