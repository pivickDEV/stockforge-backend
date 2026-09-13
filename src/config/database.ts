import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | undefined;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  connectionPromise = mongoose
    .connect(mongoUri)
    .then((connection) => {
      console.log("MongoDB Connected");
      return connection;
    })
    .catch((error) => {
      connectionPromise = undefined;
      throw error;
    });

  return connectionPromise;
};