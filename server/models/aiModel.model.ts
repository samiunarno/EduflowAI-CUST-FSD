import mongoose from "mongoose";

const TrainingHistorySchema = new mongoose.Schema({
  epoch: { type: String, required: true },
  accuracy: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const AIModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  version: { type: String, required: true },
  apiDetails: { type: String },
  accuracy: { type: Number, default: 0 },
  lastTrained: { type: Date },
  isActive: { type: Boolean, default: false },
  trainingHistory: [TrainingHistorySchema]
}, { timestamps: true });

export const AIModel = mongoose.model("AIModel", AIModelSchema);
