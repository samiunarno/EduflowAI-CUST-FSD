import db from "../db.ts";
import { v4 as uuidv4 } from "uuid";

export const logActivity = async (userId: string | null, action: string, details?: any) => {
  try {
    const id = uuidv4();
    const detailsStr = details ? JSON.stringify(details) : null;
    db.prepare('INSERT INTO activity_logs (id, userId, action, details) VALUES (?, ?, ?, ?)').run(
      id, userId, action, detailsStr
    );
  } catch (err) {
    console.error("Failed to log activity", err);
  }
};
