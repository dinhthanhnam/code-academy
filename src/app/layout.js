"use client";
import "../app/globals.css";
import SideBar from "@/components/SideBar/SideBar";
import { Providers } from "@/app/providers";
import {LuCircleUserRound} from "react-icons/lu";
import {BiChevronDown, BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
import Header from "@/components/Header/Header";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body>
          <Providers>
              <div className="flex flex-row">
                  <SideBar/>
                  <div className="flex flex-col w-full flex-grow">
                      <Header></Header>
                      <div className="flex-grow">{children}</div>
                  </div>
              </div>
          </Providers>
          </body>
      </html>
  );
}
