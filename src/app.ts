import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoute";
import { connectToDb } from "./config/db";

dotenv.config();
connectToDb();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

export default app;