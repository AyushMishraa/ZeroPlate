import mongoose from "mongoose";

export interface IClaim extends mongoose.Document {
    food: mongoose.Schema.Types.ObjectId;
    status: "pending" | "approved" | "rejected" | "completed";
    receiver: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const claimSchema = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed"],
        default: "pending"
    }
});

export const ClaimModel = mongoose.model<IClaim>("Claim", claimSchema);