import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
const JWT_SECRET = process.env.JWT_SECRET as string;
dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({message: "No token provided"});
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user =  decoded;
        next();
    } catch (error: any) {
        return res.status(401).json({message: "Invalid token", error: error.message});
    }
}
