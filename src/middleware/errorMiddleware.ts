import { Request, Response, NextFunction } from "express";

// Custom Error Class
class AppError extends Error {
    status: number;
    message: string;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Error Handling Middleware
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
};

export default AppError;
