import mongoose, { Document, Schema } from "mongoose";
import { TaskType } from "../types/taskTypes";

// Define the Mongoose schema for the task
const taskSchema = new Schema<TaskType & Document>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: String, ref: "User", required: true }, // Reference to User
});

// Create the model
const Task = mongoose.model<TaskType & Document>("Task", taskSchema);

export default Task;
