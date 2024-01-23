import connectDB from "@/database/dbConfig";
import Mail from "@/database/models/mail";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
    try {
        await connectDB();

        const token = request.cookies.get('token')?.value || '';

        if (!token) {
            return NextResponse.json({
                error: "No access token!"
            }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const mails = await Mail.find();
        return NextResponse.json(mails, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });

    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        // validateData(data);
        const contactData = new Mail(data);
        await contactData.save();
        return NextResponse.json({ message: "Your email was registered to newsletter!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}