import mongoose from "mongoose";

import { env } from "config/env";

export const initializeDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI_DEVELOPMENT);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
