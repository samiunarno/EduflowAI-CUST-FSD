import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

export const ActivityLog = mongoose.model("ActivityLog", ActivityLogSchema);
