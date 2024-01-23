import connectDB from "@/database/dbConfig";
import Form from "@/database/models/form";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(request) {
    try {
        await connectDB();
        const token = request.cookies.get('token')?.value || '';

        if (!token) {
            return NextResponse.json({
                error: "No access token!"
            }, { status: 300 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const { id, comment } = await request.json();
        const form = await Form.findByIdAndUpdate(id, { comment }, { new: true });

        if (!form) {
            return NextResponse.json({ error: "Such a form doesn't exit" }, { status: 300 });
        }

        return NextResponse.json({ message: 'Comment updated successfully', form }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}

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
        const deletedForm = await Form.findByIdAndDelete(id);

        if (!deletedForm) {
            return NextResponse.json({ error: "Such a form doesn't exit" }, { status: 300 });
        }

        return NextResponse.json({
            message: 'Form deleted successfully'
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}