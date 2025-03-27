import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get("codeacademy_session");
    const xsrfToken = req.cookies.get("XSRF-TOKEN");
    const { pathname } = req.nextUrl; // Lấy đường dẫn của yêu cầu

    // Kiểm tra nếu yêu cầu là đến /login hoặc /register
    const isAuthPage = pathname === "/login" || pathname === "/register";

    // Nếu không có session hoặc xsrfToken
    if (!sessionCookie || !xsrfToken) {
        // Nếu cố vào trang yêu cầu đăng nhập mà không có session, chuyển về /login
        if (!isAuthPage) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        // Cho phép truy cập /login hoặc /register
        return NextResponse.next();
    }

    // Gửi session và xsrfToken đến Laravel để kiểm tra tính hợp lệ
    const laravelResponse = await fetch(`http://localhost:8000/auth/check`, {
        headers: {
            Cookie: `codeacademy_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfToken.value}`,
            "X-XSRF-HEADER": xsrfToken.value,
        },
        credentials: "include",
    });

    // Nếu session không hợp lệ
    if (!laravelResponse.ok) {
        if (!isAuthPage) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    // Nếu session hợp lệ và cố truy cập /login hoặc /register, chuyển về trang chính
    if (isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Nếu session hợp lệ và truy cập trang bảo vệ, tiếp tục
    return NextResponse.next();
}

// Áp dụng middleware cho các route cần bảo vệ
export const config = {
    matcher: [
        "/",
        "/login", // Thêm để kiểm soát /login
        "/register", // Thêm để kiểm soát /register
        "/social/:path*",
        "/project/:path*",
        "/exercises/:path*",
        "/hall-of-fame/:path*",
        "/pending-exercises/:path*",
        "/archived-exercises/:path*",
        "/admin/:path*"
    ],
};