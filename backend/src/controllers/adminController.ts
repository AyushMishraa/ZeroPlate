import { Request, Response } from "express";
import { User } from "../models/userModel";
import { FoodModel } from "../models/foodModel";
import { ClaimModel } from "../models/claimModel";

const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalFoodItems = await FoodModel.countDocuments();
        const totalClaims = await ClaimModel.countDocuments();
        const pendingPickups = await ClaimModel.countDocuments({ status: "pending" });
        const successfulPickups = await ClaimModel.countDocuments({ status: "completed" });
        const expiredFood = await FoodModel.countDocuments({ status: "expired" });

        // Aggregate food by type for charts
        const foodByType = await FoodModel.aggregate([
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ]);

        // Donations per day (last 7 days)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const donationsPerDay = await FoodModel.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalFoodItems,
                totalClaims,
                pendingPickups,
                successfulPickups,
                expiredFood,
                foodByType,
                donationsPerDay
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: "Internal Server error", error: error.message });
    }
};

// Fixed: was chaining .populate() on countDocuments() which is invalid
const pendingPickupList = async (req: Request, res: Response) => {
    try {
        const pendingClaims = await ClaimModel.find({ status: "pending" })
            .populate({
                path: "food",
                populate: { path: "donor", select: "name email" }
            })
            .populate("receiver", "name email")
            .sort({ createdAt: -1 })
            .limit(50);

        res.status(200).json({ success: true, pendingClaims, count: pendingClaims.length });
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { getDashboardStats, pendingPickupList };