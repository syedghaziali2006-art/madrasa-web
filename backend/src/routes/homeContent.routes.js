import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";
import { getSeedData } from "../db/seedData.js";

const router = express.Router();

// GET /api/homepage (Public)
router.get("/", (req, res) => {
  try {
    const data = db.homeContent.get();
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching home content:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/homepage (Admin)
router.put("/", authenticateToken, (req, res) => {
  try {
    const updates = req.body;
    const current = db.homeContent.get() || {};
    
    // Deep merge for hero and sections
    const merged = {
      ...current,
      ...updates,
      hero: {
        ...(current.hero || {}),
        ...(updates.hero || {})
      },
      sections: {
        ...(current.sections || {}),
        ...(updates.sections || {})
      },
      updatedAt: new Date().toISOString()
    };

    db.homeContent.writeSync(merged);

    return res.json({
      success: true,
      message: "صفحہ اول کا مواد اور سیٹنگز کامیابی سے محفوظ کر دی گئیں",
      data: merged
    });
  } catch (error) {
    console.error("Error updating home content:", error);
    return res.status(500).json({ success: false, message: error.message || "سرور کی خرابی" });
  }
});

// POST /api/homepage/reset (Admin)
router.post("/reset", authenticateToken, (req, res) => {
  try {
    const seed = getSeedData();
    db.homeContent.writeSync(seed.homeContent);
    return res.json({
      success: true,
      message: "صفحہ اول کا مواد بحال کر دیا گیا",
      data: seed.homeContent
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
