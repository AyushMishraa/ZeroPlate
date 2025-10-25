import mongoose from "mongoose";

export type UserRole = 'donor' | 'recipient' | 'admin';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  role: "donor" | "receiver" | "admin";
  provider: "google" | "local";
  googleId?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["donor", "receiver", "admin"], default: "receiver", required: true },
    provider: { type: String, enum: ["google", "local"], required: true, default: "local" },
    googleId: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);