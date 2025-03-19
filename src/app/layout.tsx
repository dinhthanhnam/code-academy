import "@/app/globals.css";
import { Providers } from "@/app/providers";
import DeviceDetector from "@/components/DeviceDetector";
import LoadingBar from "@/components/Loading/LoadingBar";
import GlobalMessage from "@/components/Global/GlobalMessage"; // Import component mới

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <DeviceDetector />
            <LoadingBar /> {/* Hiển thị loading bar nếu cần */}
            <GlobalMessage />
            {children}
        </Providers>
        </body>
        </html>
    );
}
