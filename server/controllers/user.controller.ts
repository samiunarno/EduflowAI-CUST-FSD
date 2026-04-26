import { Request, Response } from "express";
import db from "../db.ts";
import bcrypt from "bcryptjs";
import { logActivity } from "../services/logger.service.ts";

export const getProfile = async (req: any, res: any) => {
  try {
    const user = db.prepare('SELECT id, name, email, role, createdAt FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req: any, res: any) => {
  try {
    const { name, password } = req.body;
    
    if (name) {
      db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, req.user.id);
    }
    
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, req.user.id);
    }

    const updatedUser = db.prepare('SELECT id, name, email, role, createdAt FROM users WHERE id = ?').get(req.user.id);

    await logActivity(req.user.id, "Profile Updated");
    
    res.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
