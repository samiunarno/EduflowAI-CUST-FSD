import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String },
  marks: { type: Number },
  assignments: [{ title: String, score: Number }],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Student = mongoose.model("Student", StudentSchema);
