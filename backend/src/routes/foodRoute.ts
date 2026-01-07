import express from "express";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { RegisterFood, GetAllFood, GetAllAvailableFood, UpdateFoodItem, DeleteFoodItem } from "../controllers/foodController";
import { verifyToken } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/", GetAllFood);
router.get("/available", GetAllAvailableFood);
router.post("/add-foodItem", verifyToken, authorizeRoles("donor", "admin"), RegisterFood);
router.patch("/update-foodItem/:id", verifyToken, authorizeRoles("donor", "admin"), UpdateFoodItem);
router.delete("/delete-foodItem/:id", verifyToken, authorizeRoles("donor", "admin"), DeleteFoodItem);

export default router;