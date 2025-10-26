import { Request, Response } from "express";
import { foodSchema } from "../validators/foodValidator";
import { FoodInterface, FoodModel } from "../models/foodModel";

const RegisterFood = async (req: Request, res: Response) => {
    try {
        const parsedData = foodSchema.parseAsync(req.body);
        const donorId= (req as any).user?._id;
        // Logic to save food data to the database goes here
        const food: FoodInterface = new FoodModel({
            ...parsedData,
            status: req.body.status,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            donor: donorId,
        });
        await food.save();
        return res.status(201).json({ message: "Food registered successfully", food });
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