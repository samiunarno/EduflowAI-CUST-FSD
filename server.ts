import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import apiRoutes from "./server/routes/index.ts";

dotenv.config();

const PORT = 3000;

// Setup MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edai';

mongoose.connect(MONGODB_URI).then(async () => {
  console.log("Connected to MongoDB successfully.");
}).catch((err) => {
  console.error("Failed to connect to MongoDB. Please ensure MONGODB_URI is set.", err.message);
});

async function startServer() {
  const app = express();
  
  app.use(express.json());

  // Modular API Routes
  app.use('/api', apiRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
