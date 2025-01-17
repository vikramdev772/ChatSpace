import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors'

import { connectDB } from './lib/db.js';

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
    console.log("\n\t Server running on port  💻 : "+ PORT)
    connectDB()
})