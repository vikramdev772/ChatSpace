import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors'

import { connectDB } from './config/db.js';
import cloudinary from './config/cloudinary.js';

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"

dotenv.config()

app.use(express.json());

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/",(req,res)=>res.json({server:"  server started  ✅  "}))

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("\n\t✔️  Server running on port  💻 : "+ PORT)
    connectDB()
    // Initialize Cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }, (error, result) => {
        if (error) {
            console.error("\n\t❌ Cloudinary connection failed:", error.message)
        } else {
            console.log("\n\t✅ Connected to Cloudinary 🌨️\n")
        }
    });
})
