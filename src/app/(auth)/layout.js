// "use client";
import "@/app/globals.css";

export default function AuthLayout({ children }) {
    return (
        <div>
            {/* Ảnh bên trái */}
            <img
                src="/img/hvnh.jpg"
                alt="Background"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 max-w-xs"
            />
            {children}
        </div>
    );
}
