import "../app/globals.css";
import SideBar from "@/components/SideBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div className={`flex flex-row`}>
              <SideBar></SideBar>
              {children}
          </div>
      </body>
    </html>
  );
}
