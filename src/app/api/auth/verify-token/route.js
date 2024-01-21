import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export function GET(request) {

    const token = request.cookies.get('token')?.value || '';
    if (!token) {
        return NextResponse.json({
            error: "No access token!"
        }, { status: 300 });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return NextResponse.json({
            message: 'Token verified',
            success: true,
        });
    } catch (error) {
        // console.error('JWT verification error:', error);
        const response = NextResponse.json({ error: error.message }, { status: 400 });
        response.cookies.set("token", "",
            {
                httpOnly: true,
                expires: new Date(0)
            });
        return response;
    }
}