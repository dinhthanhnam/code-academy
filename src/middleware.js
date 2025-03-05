import { NextResponse } from 'next/server';
import axios from 'axios';
import api from "@/utils/AxiosInstance";

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const response = await api.get('/user', {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return NextResponse.next();
        }
    } catch (error) {
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