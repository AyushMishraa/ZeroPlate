import { Request, Response } from "express";
import { User } from "../models/userModel";
import { FoodModel } from "../models/foodModel";
import { ClaimModel } from "../models/claimModel";

const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalFoodItems = await FoodModel.countDocuments();
        const totalClaims = await ClaimModel.countDocuments();
        const pendingPickups = await ClaimModel.countDocuments({status: "pending"});

       // Aggregate food by type
       const foodByType = await FoodModel.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } }
       ])

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalFoodItems,
                totalClaims,
                pendingPickups,
                foodByType
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
}

const pendingPickupList = async (req: Request, res: Response) => {
    try {
        const totalClaimedFood = await FoodModel.countDocuments({status: "claimed"}).populate("donor", "name email").populate("receiver", "name email");

        res.status(200).json({success: true, totalClaimedFood});
    } catch (error: any) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export { getDashboardStats, pendingPickupList };