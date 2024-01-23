import connectDB from "@/database/dbConfig";
import Mail from "@/database/models/mail";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        await connectDB();
        const token = request.cookies.get('token')?.value || '';

        if (!token) {
            return NextResponse.json({
                error: "No access token!"
            }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const { id } = await request.json();
        const deletedMail = await Mail.findByIdAndDelete(id);

        if (!deletedMail) {
            return NextResponse.json({ error: "Such a mail doesn't exit" }, { status: 300 });
        }

        return NextResponse.json({
            message: 'Mail deleted successfully'
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}