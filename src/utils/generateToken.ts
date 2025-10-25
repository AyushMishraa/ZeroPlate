import jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (userMail: string) => {
    return jwt.sign({email:userMail}, JWT_SECRET, {expiresIn: '7d'});
}