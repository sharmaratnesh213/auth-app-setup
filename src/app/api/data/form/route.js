import connectDB from "@/database/dbConfig";
import Form from "@/database/models/form";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

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

        const forms = await Form.find();
        return NextResponse.json(forms, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(request) {
    await connectDB();
    const data = await request.json();
    // validateData(data);
    const contactData = Form(data);
    await contactData.save();
    return NextResponse.json({ message: "Your query was sent!" }, { status: 201 });
}