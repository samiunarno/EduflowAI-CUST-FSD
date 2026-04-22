import { ActivityLog } from "../models/activityLog.model.ts";

export const logActivity = async (userId: string | null, action: string, details?: any) => {
  try {
    await ActivityLog.create({ userId, action, details });
  } catch (err) {
    console.error("Failed to log activity", err);
  }
};
