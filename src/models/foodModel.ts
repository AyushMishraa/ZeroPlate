import mongoose from "mongoose";
import { prependOnceListener } from "process";

export interface FoodInterface extends mongoose.Document {
  title: string;
  quantity: number;
  status: "available" | "claimed" | "picked_up" | "expired";
  donor: mongoose.Schema.Types.ObjectId; 
  pickupLocation: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  expirationDate: Date;
  location: {
    type: string;
    coordinates: number[];
  }
}

const foodSchema = new mongoose.Schema<FoodInterface>({
    title: { 
        type: String,
        required: true
    },
    type: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "claimed", "picked_up", "expired"],
        required: true
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt :{
        type: Date
    },
    expirationDate: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    },
    pickupLocation: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true,

        },
    }
});

export const FoodModel = mongoose.model<FoodInterface>("Food", foodSchema);