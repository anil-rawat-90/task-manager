import express from "express";
import { addTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/taskController";

const router = express.Router();

// Create a new task
router.post("/", addTask);

// Get all tasks for the logged-in user
router.get("/", getTasks);

router.get("/:id", getTask);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
