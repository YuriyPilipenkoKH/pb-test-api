import mongoose from "mongoose";

export default async function connectDB() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("Error: DATABASE_URL is not defined in environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`An unknown error occurred: ${error}`);
    }
    process.exit(1);
  }
}