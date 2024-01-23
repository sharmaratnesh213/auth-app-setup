import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone number is required"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    comment: {
        type: String,
        default: "Unchecked"
    },
},
    { timestamps: true }
);

const Form = mongoose.models.forms || mongoose.model("forms", FormSchema);

export default Form;