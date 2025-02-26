import "@/app/globals.css";
import { Providers } from "@/app/providers";
import DeviceDetector from "@/components/DeviceDetector";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <DeviceDetector />
            {children}
        </Providers>
        </body>
        </html>
    );
}
