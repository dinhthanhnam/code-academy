import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get("codeacademy_session");
    const xsrfToken = req.cookies.get("XSRF-TOKEN");

    if (!sessionCookie || !xsrfToken) {
        // Không có session -> Redirect đến trang login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Gửi session và xsrf token đến Laravel để kiểm tra
    const laravelResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
        headers: {
            Cookie: `codeacademy_session=${sessionCookie.value}; XSRF-TOKEN=${xsrfToken.value}`,
            "X-XSRF-HEADER": xsrfToken.value,
        },
        credentials: "include",
    });

    if (!laravelResponse.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Áp dụng middleware cho các route cần bảo vệ
export const config = {
    matcher: [
        '/',
        '/social/:path*',
        '/project/:path*',
        '/exercises/:path*',
        '/hall-of-fame/:path*',
        '/pending-exercises/:path*',
        '/archived-exercises/:path*'
    ],
};
