import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../db.ts";
import { generateFeedback } from "../services/ai.service.ts";
import { logActivity } from "../services/logger.service.ts";
import { parse } from "csv-parse/sync";

export const getDashboard = async (req: any, res: any) => {
  try {
    const students = db.prepare('SELECT * FROM students WHERE teacherId = ?').all(req.user.id);
    
    // Joint query to mimic populate
    const feedbacks = db.prepare(`
      SELECT f.*, s.name as studentName 
      FROM feedback f 
      LEFT JOIN students s ON f.studentId = s.id
    `).all();
    
    // Map feedbacks to look like Mongoose populated objects for frontend compatibility
    const mappedFeedbacks = feedbacks.map((f: any) => ({
      ...f,
      studentId: { id: f.studentId, name: f.studentName }
    }));

    res.json({ students, feedbacks: mappedFeedbacks });
  } catch (error) {
    console.error("Dashboard load error:", error);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};

export const uploadStudents = async (req: any, res: any) => {
  try {
    if (req.file) {
      const fileContent = req.file.buffer.toString('utf-8');
      const records = parse(fileContent, { columns: true, skip_empty_lines: true });
      
      const teacherId = req.user.id;
      const activeModel: any = db.prepare('SELECT * FROM ai_models ORDER BY createdAt DESC LIMIT 1').get();
      
      for (const record of records as any[]) {
        const studentId = uuidv4();
        const name = record.name || "Unknown";
        const course = record.course || "General";
        const marks = parseFloat(record.marks) || 0;

        db.prepare('INSERT INTO students (id, name, course, marks, teacherId) VALUES (?, ?, ?, ?, ?)').run(
          studentId, name, course, marks, teacherId
        );
        
        // Generate AI Insight
        const insight = await generateFeedback({ course, marks });
        const feedbackId = uuidv4();
        db.prepare('INSERT INTO feedback (id, studentId, course, content, generatedByModel) VALUES (?, ?, ?, ?, ?)').run(
          feedbackId, studentId, course, insight, activeModel?.id
        );
      }
      
      await logActivity(req.user.id, "Uploaded Student Data via CSV", { count: records.length });
    } else {
      await logActivity(req.user.id, "Triggered Manual Sync");
    }

    res.json({ message: "Student data processed" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process uploaded data" });
  }
};
