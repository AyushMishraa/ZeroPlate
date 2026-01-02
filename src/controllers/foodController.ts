import { Request, Response } from "express";
import { FoodInterface, FoodModel } from "../models/foodModel";
import { findBestNGOsForFood } from "../services/matchingService";
import { success } from "zod";

const RegisterFood = async (req: Request, res: Response) => {
    try {
        const donorId= (req as any).user?.id;
        console.log("donorId", donorId);
        // Logic to save food data to the database goes here
        const food: FoodInterface = new FoodModel({
            title: req.body.title,
            quantity: req.body.quantity,
            expirationDate: req.body.expirationDate,
            pickupLocation: req.body.pickupLocation,
            type: req.body.type,
            status: req.body.status,
            createdAt: new Date(),
            updatedAt: new Date(),
            donor: donorId,
        });
        await food.save();
        const bestNGOs = await findBestNGOsForFood(food.id);
        console.log("bestNGOs", bestNGOs);
        const topNGOs = bestNGOs.slice(0,3);
        console.log("topNGOs", topNGOs);
        return res.status(201).json({ 
            success: true,
            message: "Food registered successfully",
            food,
            recommendedNGOs:topNGOs
       });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const GetAllFood = async (req: Request, res: Response) => {
    try {
        const foodList = await FoodModel.find().populate("donor", "name email");
        return res.status(200).json({ food: foodList });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const GetAllAvailableFood = async (req: Request,  res: Response) => {
    try {
        const food = await FoodModel.find({ status: "available"}).populate("donor", "name email");
        return res.status(200).json({ food });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const UpdateFoodItem = async (req: Request, res: Response) =>  {
    try {
        const foodId = req.params.id;
        const food = await FoodModel.findByIdAndUpdate(foodId, req.body, { new: true });
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        return res.status(200).json({ message: "Food item updated successfully", food });
    } catch (error: any) {
       return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const DeleteFoodItem = async (req: Request, res: Response) => {
    try {
        const foodId = req.params.id;
        const food = await FoodModel.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        return res.status(200).json({ message: "Food item deleted successfully", food });
    } catch (error: any) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { RegisterFood, GetAllFood, GetAllAvailableFood, UpdateFoodItem, DeleteFoodItem };