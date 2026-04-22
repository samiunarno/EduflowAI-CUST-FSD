import { Request, Response } from "express";
import { Student, Feedback, AIModel } from "../models/index.ts";
import { generateFeedback } from "../services/ai.service.ts";
import { logActivity } from "../services/logger.service.ts";
import { parse } from "csv-parse/sync"; // using csv-parse

export const getDashboard = async (req: any, res: any) => {
  try {
    const students = await Student.find({ teacherId: req.user.id });
    const feedbacks = await Feedback.find().populate('studentId');
    res.json({ students, feedbacks });
  } catch (error) {
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};

export const uploadStudents = async (req: any, res: any) => {
  try {
    // If there's an uploaded file (CSV), parse it!
    if (req.file) {
      const fileContent = req.file.buffer.toString('utf-8');
      const records = parse(fileContent, { columns: true, skip_empty_lines: true });
      
      const teacherId = req.user.id;
      let activeModel = await AIModel.findOne().sort({ createdAt: -1 });
      
      const newStudents = [];
      for (const rawRecord of records) {
        const record = rawRecord as any;
        const student = await Student.create({
          name: record.name || "Unknown",
          course: record.course || "General",
          marks: parseFloat(record.marks) || 0,
          teacherId,
        });
        newStudents.push(student);
        
        // Generate AI Insight
        const insight = await generateFeedback({ course: student.course, marks: student.marks });
        await Feedback.create({
          studentId: student._id,
          course: student.course,
          content: insight,
          generatedByModel: activeModel?._id
        });
      }
      
      await logActivity(req.user.id, "Uploaded Student Data via CSV", { count: newStudents.length });
    } else {
      // Mock flow if no file was actually uploaded, we just simulate
      await logActivity(req.user.id, "Triggered Manual Sync");
    }

    res.json({ message: "Student data processed" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process uploaded data" });
  }
};
