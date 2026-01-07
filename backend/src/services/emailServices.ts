import nodemailer from "nodemailer";
import { User } from "../models/userModel";
import dotenv from "dotenv";

dotenv.config();

const transporter  = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }  
});

export const sendNotificationMail = async(donorMail: string, foodTitle: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: donorMail,
        subject: "Your food has been claimed!",
        text: `Your donation "${foodTitle}" has been claimed by a receiver.`,
    }

    await transporter.sendMail(mailOptions);
}