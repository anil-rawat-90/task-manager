import { config } from "../config/config";
import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.url, {
            // Options have been removed in newer versions, configure your URI directly
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
