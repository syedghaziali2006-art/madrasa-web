import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/womens (Public)
router.get("/", (req, res) => {
  try {
    const data = db.womensContent.get();
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching womens content:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/womens (Admin)
router.put("/", authenticateToken, (req, res) => {
  try {
    const updates = req.body;
    const current = db.womensContent.get() || {};
    
    const merged = {
      ...current,
      ...updates,
      hero: {
        ...(current.hero || {}),
        ...(updates.hero || {})
      },
      mission: {
        ...(current.mission || {}),
        ...(updates.mission || {})
      },
      contact: {
        ...(current.contact || {}),
        ...(updates.contact || {})
      },
      updatedAt: new Date().toISOString()
    };

    db.womensContent.writeSync(merged);

    return res.json({
      success: true,
      message: "شعبہ خواتین کا مواد کامیابی سے محفوظ کر دیا گیا",
      data: merged
    });
  } catch (error) {
    console.error("Error updating womens content:", error);
    return res.status(500).json({ success: false, message: error.message || "سرور کی خرابی" });
  }
});

export default router;
