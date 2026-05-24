import mongoose from "mongoose";
import logger from "./logger.config";
import { serverConfig } from ".";

export const connectDB = async () => {
    try {
        const dbUrl = serverConfig.DB_URL;

        await mongoose.connect(dbUrl)

        logger.info("Connected to mongoDB successfully");

        mongoose.connection.on("error", (error) => {
            logger.error("MongoDB connection error", error)
        });

        mongoose.connection.on("disconnected", () => {
            logger.warn("MongoDB disconnected")
        });

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            logger.info("MongoDB connection closed");
            process.exit(0);
        })

    } catch (error) {
        logger.error("Failed to connect to MongoDB", error);
        process.exit(1); // exit with failure
    }
}