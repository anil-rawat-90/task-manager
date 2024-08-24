import express, { Application } from "express";
import http from "http";
import { setupSocket } from "./socket";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import { verifyToken } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./database/db"; // Import the MongoDB connection function from the database folder
import { config } from "./config/config";

const app: Application = express();
const PORT = config.APP_PORT || 3000;

// Connect to MongoDB
connectDB(); // Initialize the connection to the database

const server = http.createServer(app);
const io = setupSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
