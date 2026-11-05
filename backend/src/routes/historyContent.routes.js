import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/history (Public)
router.get("/", (req, res) => {
  try {
    const data = db.historyContent.get();
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching history content:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/history (Admin)
router.put("/", authenticateToken, (req, res) => {
  try {
    const updates = req.body;
    const current = db.historyContent.get() || {};
    
    const merged = {
      ...current,
      ...updates,
      hero: {
        ...(current.hero || {}),
        ...(updates.hero || {})
      },
      founder: {
        ...(current.founder || {}),
        ...(updates.founder || {})
      },
      updatedAt: new Date().toISOString()
    };

    db.historyContent.writeSync(merged);

    return res.json({
      success: true,
      message: "سفر و اساتذہ کا مواد کامیابی سے محفوظ کر دیا گیا",
      data: merged
    });
  } catch (error) {
    console.error("Error updating history content:", error);
    return res.status(500).json({ success: false, message: error.message || "سرور کی خرابی" });
  }
});

export default router;
