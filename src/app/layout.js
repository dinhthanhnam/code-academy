"use client";
import "../app/globals.css";
import SideBar from "@/components/SideBar";
import { Providers } from "@/app/providers";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body>
          <Providers>
              <div className="flex flex-row">
                  <SideBar/>
                  {children}
              </div>
          </Providers>
          </body>
      </html>
  );
}
