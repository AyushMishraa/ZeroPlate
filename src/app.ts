import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoute";
import { connectToDb } from "./config/db";
import foodRoutes from "./routes/foodRoute";
import { Server } from "socket.io";
import http from "http";
import claimRoutes from "./routes/claimRoutes";
import adminDashboardRoutes from "./routes/adminDashboardRoutes";

dotenv.config();
connectToDb();

const app = express();

app.use(express.json());
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {origin: "*"}
});
io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected: ", socket.id);
    });
});
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/admin", adminDashboardRoutes);

export default app;