import mongoose from "mongoose";

const MailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
},
    { timestamps: true }
);

const Mail = mongoose.models.mails || mongoose.model("mails", MailSchema);

export default Mail;