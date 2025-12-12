import { Request, Response } from "express";
import { FoodModel } from "../models/foodModel";
import { User } from "../models/userModel";
import { ClaimModel } from "../models/claimModel";
import mongoose from "mongoose";
import { success } from "zod";

export const getSummary = async ( req: Request, res: Response) => {
    try {
        const totalDonations = await FoodModel.countDocuments();
        const totalClaims = await ClaimModel.countDocuments();
        const mealsSaved = await FoodModel.aggregate([
            { $match : { status : { $in: ["claimed", "picked_up"]}}},
            { $group : {_id: null, totalMeals: {$sum: "$quantity"}}}
        ]);

        const totalMealsSaved = mealsSaved[0]?.totalMeals ?? 0;

        const activeDonorsAgg = await User.aggregate([
            {$group: {_id: "$donor", count: { $sum: 1}}},
            {$count: "activeDonors"}
        ]);
    
        const activeDonors = activeDonorsAgg[0]?.activeDonors ?? 0;

        const activeReceiversAgg = await User.aggregate([
            {$group: {_id: "$receiver", count: { $sum: 1}}},
            {$count: "activeReceivers"}
        ]);

        const activeReceivers = activeReceiversAgg[0]?.activeReceivers ?? 0;

        res.json({
            success: true,
            data: {
                totalDonations,
                totalClaims,
                totalMealsSaved,
                activeDonors,
                activeReceivers
            },
            message: "Analytics summary retrieved successfully"
        });
    } catch (error) {
        console.error(error);
    }
};

export const getTopDonors = async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit ?? 10);

        const agg = await User.aggregate([
            {
                $group: {
                    _id: "$donor",
                    totalQuantity: { $sum: "$quantity" },
                    donationCount: { $sum: 1 }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "donor"

                }
            },
            { $unwind: "$donor" },
            {
                $project: {
                    donorId: "$_id",
                    "donor._id": 1,
                    "donor.name": 1,
                    "donor.email": 1,
                    totalQuantity: 1,
                    donationsCount: 1
                }
            }
        ]);
        res.json({
            success: true, data: agg, message: "Top donors retrieved successfully"
        });
    } catch (error) {
        console.error(error);
    }
}

export const getFrauds = async (req: Request, res: Response) => {

}