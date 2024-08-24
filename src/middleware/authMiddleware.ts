import { config } from "../config/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: any;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Access Denied. No token provided.");

    try {
        const decoded = jwt.verify(token, config.secret); // Use a proper secret key
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};

export { verifyToken };
