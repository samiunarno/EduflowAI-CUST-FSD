import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../db.ts";
import { logActivity } from "../services/logger.service.ts";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = db.prepare('SELECT id, name, email, role, createdAt FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const updateUserRole = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["admin", "teacher", "ai_trainer", "banned"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    const targetUser: any = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, id);

    await logActivity(req.user.id, `Updated role of ${targetUser.email} to ${role}`);

    const users = db.prepare('SELECT id, name, email, role, createdAt FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user role" });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const targetUser: any = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    await logActivity(req.user.id, `Deleted system user: ${targetUser.email}`);

    const users = db.prepare('SELECT id, name, email, role, createdAt FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const getSystemLogs = async (req: any, res: any) => {
  try {
    const logs = db.prepare(`
      SELECT l.*, u.name as userName, u.email as userEmail 
      FROM activity_logs l 
      LEFT JOIN users u ON l.userId = u.id 
      ORDER BY l.createdAt DESC 
      LIMIT 100
    `).all();
    
    const mappedLogs = logs.map((l: any) => ({
      ...l,
      userId: { id: l.userId, name: l.userName, email: l.userEmail }
    }));
    
    res.json(mappedLogs);
  } catch (error) {
    console.error("Fetch logs error:", error);
    res.status(500).json({ error: "Failed to fetch system logs" });
  }
};

// AI Model Management
export const getModels = async (req: any, res: any) => {
  try {
    const models = db.prepare('SELECT * FROM ai_models ORDER BY createdAt DESC').all();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
};

export const addModel = async (req: any, res: any) => {
  try {
    const { name, version, apiDetails } = req.body;
    const id = uuidv4();
    
    db.prepare('INSERT INTO ai_models (id, name, version, apiDetails, isActive) VALUES (?, ?, ?, ?, ?)').run(
      id, name, version, apiDetails, 0
    );

    await logActivity(req.user.id, `Added new AI model: ${name} (v${version})`);

    const newModel = db.prepare('SELECT * FROM ai_models WHERE id = ?').get(id);
    res.json(newModel);
  } catch (error) {
    res.status(500).json({ error: "Failed to add model" });
  }
};

export const updateModelStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const targetModel: any = db.prepare('SELECT * FROM ai_models WHERE id = ?').get(id);
    if (!targetModel) {
      return res.status(404).json({ error: "Model not found" });
    }

    if (isActive) {
      db.prepare('UPDATE ai_models SET isActive = 0').run();
    }

    db.prepare('UPDATE ai_models SET isActive = ? WHERE id = ?').run(isActive ? 1 : 0, id);

    await logActivity(req.user.id, `${isActive ? 'Activated' : 'Deactivated'} AI model: ${targetModel.name}`);

    const models = db.prepare('SELECT * FROM ai_models ORDER BY createdAt DESC').all();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: "Failed to update model status" });
  }
};
