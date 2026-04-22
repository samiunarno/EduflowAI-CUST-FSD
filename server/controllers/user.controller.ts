import { Request, Response } from "express";
import { User } from "../models/index.ts";
import bcrypt from "bcryptjs";
import { logActivity } from "../services/logger.service.ts";

export const getProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req: any, res: any) => {
  try {
    const { name, password } = req.body;
    const updates: any = {};
    
    if (name) updates.name = name;
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      updates,
      { new: true }
    ).select('-password');

    await logActivity(req.user.id, "Profile Updated");
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};
