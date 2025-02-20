"use client";
import "../app/globals.css";
import SideBar from "@/components/SideBar/SideBar";
import { Providers } from "@/app/providers";
import {LuCircleUserRound} from "react-icons/lu";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body>
          <Providers>
              <div className="flex flex-row">
                  <SideBar/>
                  <div className="flex flex-col min-h-screen w-full flex-grow">
                      <div className={`px-4 w-full self-center flex flex-row items-center min-w-screen justify-between min-h-16 bg-gray-100`}>
                          <div className={`flex flex-row`}>
                              abc
                          </div>
                          <div className={`flex flex-row-reverse`}>
                              <LuCircleUserRound />
                          </div>
                      </div>
                      <div className="flex-grow">{children}</div>
                  </div>
              </div>
          </Providers>
          </body>
      </html>
  );
}
