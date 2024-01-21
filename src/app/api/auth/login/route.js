import Admin from "@/database/models/admin";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import connectDB from "@/database/dbConfig";

export async function POST(req) {
    try {
        await connectDB();
        const reqBody = await req.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await Admin.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Such an admin does not exist" }, { status: 400 })
        }

        console.log("Admin exists");

        //check if password is correct
        // const validPassword = await bcryptjs.compare(password, user.password)
        if (password !== user.password) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}