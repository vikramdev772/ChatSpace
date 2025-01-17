import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`\n\t🍏 MongoDB connected  : ${conn.connection.host}`);
    } catch (error) {
        console.log("\n\t❌ MongoDB connection error:", error);
    }
}