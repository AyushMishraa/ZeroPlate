import express from "express";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { RegisterFood, GetAllFood, GetAllAvailableFood, UpdateFoodItem, DeleteFoodItem } from "../controllers/foodController";
const router = express.Router();

router.get("/", GetAllFood);
router.get("/available", GetAllAvailableFood);
router.post("/add-foodItem", authorizeRoles("donor"), RegisterFood);
router.patch("/update-foodItem/:id", authorizeRoles("donor"), UpdateFoodItem);
router.delete("/delete-foodItem/:id", authorizeRoles("donor"), DeleteFoodItem);

export default router;


