import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(request) {
    // Lấy cookie session từ request của client
    const sessionCookie = request.cookies.get('codeacademy_session')?.value;
    const XRSF = request.cookies.get('XSRF-TOKEN')?.value;
    if (!sessionCookie || !XRSF) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Chuyển tiếp header 'cookie' từ request gốc
        const cookieHeader = request.headers.get('cookie');
        const response = await fetch('http://localhost:8000/api/user', {
            headers: {
                "X-XSRF-HEADER": XRSF,
                Cookie: cookieHeader,
                "accept": "application/json"
            },
            // 'no-store' để đảm bảo không sử dụng cache trong môi trường middleware
            cache: 'no-store',
            credentials: 'include',
        });

        if (response.status === 200) {
            return NextResponse.next();
        }
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

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
