import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: String },
  content: { type: String, required: true },
  generatedByModel: { type: mongoose.Schema.Types.ObjectId, ref: 'AIModel' },
}, { timestamps: true });

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
