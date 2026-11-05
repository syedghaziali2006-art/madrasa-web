import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./src/routes/auth.routes.js";
import admissionsRoutes from "./src/routes/admissions.routes.js";
import booksRoutes from "./src/routes/books.routes.js";
import bookRequestsRoutes from "./src/routes/bookRequests.routes.js";
import staffRoutes from "./src/routes/staff.routes.js";
import galleryRoutes from "./src/routes/gallery.routes.js";
import donationsRoutes from "./src/routes/donations.routes.js";
import settingsRoutes from "./src/routes/settings.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import statsRoutes from "./src/routes/stats.routes.js";
import homeContentRoutes from "./src/routes/homeContent.routes.js";
import policyRoutes from "./src/routes/policyContent.routes.js";
import historyRoutes from "./src/routes/historyContent.routes.js";
import womensRoutes from "./src/routes/womensContent.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true, // Allow frontend origin
    credentials: true
  })
);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Static uploads folder
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Madrasa Sahib uz Zaman API",
    time: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/book-requests", bookRequestsRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/homepage", homeContentRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/womens", womensRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stats", statsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #120A05; color: #FAF7F2; min-height: 100vh;">
      <h1 style="color: #C9B38D;">مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف)</h1>
      <h2>Backend API Server is Running Successfully</h2>
      <p>Port: ${PORT} | Status: Healthy</p>
      <a href="/api/health" style="color: #C9B38D; text-decoration: underline;">Check Health Status</a>
    </div>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "راستہ نہیں ملا (Route not found)" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "اندرونی سرور کی خرابی (Internal Server Error)"
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Madrasa API Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
