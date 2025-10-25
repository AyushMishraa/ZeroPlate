import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({message: "Not authorized" });
        }
        if (!allowedRoles.includes(req.user?.role)) {
            return res.status(403).json({message: "Forbidden" });
        }
        next();
    }
}