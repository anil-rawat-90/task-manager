import { Request, Response, NextFunction } from "express";
import { io } from "../socket";
import Task from "../models/Task";
import { createTask } from "../repository/taskRepository";
import AppError from "../middleware/errorMiddleware";

interface AuthRequest extends Request {
    user?: any;
}

// Create a new task

export const addTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const userId = req.user._id;
    try {
        const task = await createTask({ title, description, user: userId });
        io.emit("taskUpdated", task);
        res.status(201).json(task);
    } catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        } else {
            next(new AppError("Unknown error occurred", 400));
        }
    }
};

// Get all tasks for the logged-in user
export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;

    try {
        const tasks = await Task.find({ user: userId });
        res.json(tasks);
    } catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        } else {
            next(new AppError("Unknown error occurred", 400));
        }
    }
};

// Get a task
export const getTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const userId = req.user._id;
    try {
        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) return next(new AppError("Task not found.", 404));
        res.json(task);
    } catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        } else {
            next(new AppError("Unknown error occurred", 400));
        }
    }
};

// Update a task
export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { title, description, status } = req.body;
    const taskId = req.params.id;
    const userId = req.user._id;

    try {
        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) return next(new AppError("Task not found.", 404));

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.updatedAt = new Date();

        await task.save();
        io.emit("taskUpdated", task);
        res.json(task);
    } catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        } else {
            next(new AppError("Unknown error occurred", 400));
        }
    }
};

// Delete a task
export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    try {
        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
        if (!task) return next(new AppError("Task not found.", 404));
        io.emit("taskUpdated", null);
        res.json({ message: "Task deleted successfully." });
    } catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        } else {
            next(new AppError("Unknown error occurred", 400));
        }
    }
};
