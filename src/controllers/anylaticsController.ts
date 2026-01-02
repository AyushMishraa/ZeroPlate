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
  try {
    const recentMinutes = Number(req.query.recentMinutes ?? 60); // window for rapid claims
    const rapidThreshold = Number(req.query.rapidThreshold ?? 5); // claims threshold
    const now = new Date();

    // 1) Duplicate claims (same user, same food) - find duplicates in claims collection
    const duplicateClaims = await ClaimModel.aggregate([
      {
        $group: {
          _id: { food: "$food", receiver: "$receiver" },
          count: { $sum: 1 },
          docs: { $push: "$$ROOT" }
        }
      },
      { $match: { count: { $gt: 1 } } },
      { $limit: 100 }
    ]);

    // 2) Rapid multi-claims: users with > rapidThreshold claims within recentMinutes
    const windowStart = new Date(now.getTime() - recentMinutes * 60 * 1000);
    const rapidClaimUsers = await ClaimModel.aggregate([
      { $match: { createdAt: { $gte: windowStart } } },
      {
        $group: {
          _id: "$receiver",
          recentClaims: { $sum: 1 }
        }
      },
      { $match: { recentClaims: { $gte: rapidThreshold } } },
      { $limit: 100 }
    ]);

    // 3) Suspicious donors: donors with many donations but zero pickups (no claimed/picked_up)
    const donorsAgg = await FoodModel.aggregate([
      {
        $group: {
          _id: "$donor",
          totalDonations: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          pickedUpCount: {
            $sum: {
              $cond: [{ $in: ["$status", ["picked_up"]] }, 1, 0]
            }
          }
        }
      },
      { $match: { pickedUpCount: 0, totalDonations: { $gte: 10 } } }, // example rule
      { $limit: 100 }
    ]);

    // Return results (we can further enrich with user details if needed)
    res.json({
      success: true,
      data: {
        duplicateClaimsCount: duplicateClaims.length,
        duplicateClaims: duplicateClaims.slice(0, 10),
        rapidClaimUsersCount: rapidClaimUsers.length,
        rapidClaimUsers: rapidClaimUsers.slice(0, 10),
        suspiciousDonorsCount: donorsAgg.length,
        suspiciousDonors: donorsAgg.slice(0, 10)
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}