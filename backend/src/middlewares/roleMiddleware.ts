import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        console.log("req.user", req.user);
        if (!req.user) {
            return res.status(401).json({message: "Not authorized", user: req.user});
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: "Forbidden", user: req.user});
        }
        next();
    }
}