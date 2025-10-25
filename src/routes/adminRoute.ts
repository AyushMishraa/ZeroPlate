import { Request, Response, NextFunction } from "express";
import express from "express";
import { User, IUser } from "../models/userModel";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const adminRoute = express.Router();

adminRoute.put('/role/:id', authorizeRoles('admin'), async (req: Request, res: Response) => {
  const id  = req.params.id;
  const { role } = req.body;

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = role;
  await user.save();

  res.json({ message: "User role updated successfully" });
});

export default adminRoute;
