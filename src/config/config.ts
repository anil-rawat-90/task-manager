import dotenv from "dotenv";

let env = process.env.RUN_ENV;
dotenv.config();

export const config = {
    RUN_ENV: env,
    NODE_HOST: process.env.HOST || "127.0.0.1",
    APP_PORT: process.env.APP_PORT,
    SERVICE_NAME: "task-manager",
    mongo: {
        url: process.env.MONGODB_URI || "",
    },
    secret: process.env.JWT_SECRET || "",
};
