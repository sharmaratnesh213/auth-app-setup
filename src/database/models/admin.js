import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
},
    { timestamps: true }
);

const Admin = mongoose.models.admins || mongoose.model("admins", AdminSchema);

export default Admin;