import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {

    const response = NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", '*');
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const path = request.nextUrl.pathname;
    const isPublicPath = !path.includes('/admin/dashboard');
    const token = request.cookies.get('token')?.value || '';

    if (token && path.includes('/admin/login')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
    }
    if (isPublicPath) {
        // console.log(path);
        return response;
    }

    // console.log(token);

    if (token) {
        return response;
    }

    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }

}

export const config = {
    matcher: [
        '/api/:path*',
        '/admin/:path*'
    ]
}