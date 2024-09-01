import express, { Application, NextFunction, Request, Response } from "express";
import http from "http";
import { setupSocket } from "./socket";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import orderRoutes from "./routes/orderRoutes";
import { verifyToken } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./database/db"; // Import the MongoDB connection function from the database folder
import { MessageBroker } from "./broker/message-broker";
import { Consumer, Producer } from "kafkajs";

export const ExpressApp = async () => {
  const app: Application = express();

  // Connect to MongoDB
  await connectDB(); // Initialize the connection to the database

  const server = http.createServer(app);
  const io = setupSocket(server);

  // Middleware
  app.use(cors());
  app.use(express.json());

  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("producer connected");
  });
  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", () => {
    console.log("consumer connected");
  });

  await MessageBroker.subscribe(message => {
    console.log("Consumer received the message");
    console.log("Message received", message);
  }, "OrderEvents");

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/tasks", verifyToken, taskRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "I am healthy" });
  });
  // Error Handling Middleware (should be the last middleware)
  app.use(errorHandler);

  return app;
};
