import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Accept token from httpOnly cookie (Google OAuth flow) OR Authorization header (SPA flow)
        let token = req.cookies?.token;

        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 80,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
