"use client";
import "../app/globals.css";
import SideBar from "@/components/SideBar";
import {SideBarProvider} from "@/context/SideBarContext";


export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body>
          <SideBarProvider>
              <div className="flex flex-row">
                  <SideBar/>

                  {children}
              </div>
          </SideBarProvider>
          </body>
      </html>
  );
}
