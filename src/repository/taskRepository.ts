import Task from "../models/Task";
import { TaskType } from "../types/taskTypes";

export const createTask = async (taskData: Omit<TaskType, "status"> & Partial<Pick<TaskType, "status">>) => {
    try {
        // Ensure status is provided, default to 'pending' if not
        const task = new Task({
            ...taskData,
            status: taskData.status || "pending", // Default status
        });
        await task.save();
        return task;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error creating task: " + error.message);
        } else {
            throw new Error("Error creating task");
        }
    }
};

// Add other task-related methods
