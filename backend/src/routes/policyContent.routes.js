import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/policy (Public)
router.get("/", (req, res) => {
  try {
    const data = db.policyContent.get();
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching policy content:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/policy (Admin)
router.put("/", authenticateToken, (req, res) => {
  try {
    const updates = req.body;
    const current = db.policyContent.get() || {};
    
    const merged = {
      ...current,
      ...updates,
      header: {
        ...(current.header || {}),
        ...(updates.header || {})
      },
      campusCard: {
        ...(current.campusCard || {}),
        ...(updates.campusCard || {})
      },
      sectionHeader: {
        ...(current.sectionHeader || {}),
        ...(updates.sectionHeader || {})
      },
      admissionCallout: {
        ...(current.admissionCallout || {}),
        ...(updates.admissionCallout || {})
      },
      updatedAt: new Date().toISOString()
    };

    db.policyContent.writeSync(merged);

    return res.json({
      success: true,
      message: "تعارف و مقاصد کا مواد کامیابی سے محفوظ کر دیا گیا",
      data: merged
    });
  } catch (error) {
    console.error("Error updating policy content:", error);
    return res.status(500).json({ success: false, message: error.message || "سرور کی خرابی" });
  }
});

export default router;
