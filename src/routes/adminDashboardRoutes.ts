import { getDashboardStats, pendingPickupList } from "../controllers/adminController";
import express from "express";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { verifyToken } from "../middlewares/authMiddleware";

const adminDashboardRouter = express.Router();

adminDashboardRouter.get("/adminDashboard", verifyToken, authorizeRoles("admin"), getDashboardStats);
adminDashboardRouter.get("/pendingPickups", verifyToken,  authorizeRoles("admin"), pendingPickupList);

export default adminDashboardRouter;