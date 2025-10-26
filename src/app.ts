import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoute";
import { connectToDb } from "./config/db";
import foodRoutes from "./routes/foodRoute"

dotenv.config();
connectToDb();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);

export default app;