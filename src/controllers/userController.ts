import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { createUser } from "../repository/userRepository";
import AppError from "../middleware/errorMiddleware";

// User Registration

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUser({ username, email, password });
        res.status(201).send("User registered successfully.");
    } catch (error) {
        // Type assertion to ensure error is of type Error
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        } else {
            next(new AppError("Unknown error occurred", 400));
        }
    }
};

// User Login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(new AppError("Invalid email or password.", 400));

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return next(new AppError("Invalid email or password.", 400));

        const token = jwt.sign({ _id: user._id, username: user.username }, "secretKey", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 500));
        } else {
            next(new AppError("Unknown error occurred", 500));
        }
    }
};
