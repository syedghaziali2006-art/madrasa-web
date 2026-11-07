import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";
import { isValidPhoneNumber, normalizePhoneNumber, sanitizeText } from "../utils/validators.js";

const router = express.Router();

// --- BOOK REQUESTS (کتب کی فرمائش) ---

// POST /api/book-requests (Public - Request a Book)
router.post("/requests", (req, res) => {
  try {
    const name = sanitizeText(req.body?.name, { maxLength: 80 });
    const phone = sanitizeText(req.body?.phone, { maxLength: 30 });
    const bookName = sanitizeText(req.body?.bookName, { maxLength: 160 });
    const authorName = sanitizeText(req.body?.authorName, { maxLength: 120 });
    const purpose = sanitizeText(req.body?.purpose, { maxLength: 160 });
    const notes = sanitizeText(req.body?.notes, { maxLength: 500 });

    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, message: "نام درج کرنا ضروری ہے۔" });
    }

    if (!bookName || bookName.length < 2) {
      return res.status(400).json({ success: false, message: "کتاب کا نام درج کرنا ضروری ہے۔" });
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      return res.status(400).json({ success: false, message: "موبائل نمبر درست نہیں ہے۔" });
    }

    const newRequest = {
      id: "req-" + Date.now().toString(36),
      name,
      phone: normalizePhoneNumber(phone),
      bookName,
      authorName,
      purpose: purpose || "تحقیقی مقالہ",
      notes,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const saved = db.bookRequests.insert(newRequest);
    return res.status(201).json({
      success: true,
      message: "کتاب کی درخواست کامیابی سے جمع ہو گئی ہے!",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/book-requests (Admin - List Requests)
router.get("/requests", authenticateToken, (req, res) => {
  try {
    const requests = db.bookRequests.find();
    return res.json({ success: true, total: requests.length, data: requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/book-requests/:id (Admin - Update Request Status)
router.put("/requests/:id", authenticateToken, (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = db.bookRequests.update(req.params.id, {
      ...(status && { status }),
      ...(notes !== undefined && { notes })
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, message: "درخواست کی کیفیت تبدیل کر دی گئی", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/book-requests/:id (Admin)
router.delete("/requests/:id", authenticateToken, (req, res) => {
  try {
    const deleted = db.bookRequests.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, message: "درخواست کامیابی سے حذف کر دی گئی" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// --- BOOK DONATIONS (عطیہ کتب) ---

// POST /api/book-donations (Public - Offer to Donate Books)
router.post("/donations", (req, res) => {
  try {
    const name = sanitizeText(req.body?.name, { maxLength: 80 });
    const phone = sanitizeText(req.body?.phone, { maxLength: 30 });
    const city = sanitizeText(req.body?.city, { maxLength: 120 });
    const bookCount = sanitizeText(req.body?.bookCount, { maxLength: 80 });
    const topic = sanitizeText(req.body?.topic, { maxLength: 80 });
    const message = sanitizeText(req.body?.message, { maxLength: 500 });

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "نام اور فون نمبر درج کرنا لازمی ہے۔"
      });
    }

    if (!isValidPhoneNumber(phone)) {
      return res.status(400).json({ success: false, message: "موبائل نمبر درست نہیں ہے۔" });
    }

    const newDonation = {
      id: "don-" + Date.now().toString(36),
      name,
      phone: normalizePhoneNumber(phone),
      city: city || "",
      bookCount: bookCount || "10-50 کتب",
      topic: topic || "دینی کتب",
      message,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const saved = db.bookDonations.insert(newDonation);
    return res.status(201).json({
      success: true,
      message: "کتب کے عطیہ کی پیشکش کامیابی سے موصول ہو گئی ہے!",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/book-donations (Admin - List Donations)
router.get("/donations", authenticateToken, (req, res) => {
  try {
    const donations = db.bookDonations.find();
    return res.json({ success: true, total: donations.length, data: donations });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/book-donations/:id (Admin - Update Status)
router.put("/donations/:id", authenticateToken, (req, res) => {
  try {
    const { status } = req.body;
    const updated = db.bookDonations.update(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }
    return res.json({ success: true, message: "کیفیت اپ ڈیٹ ہو گئی", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/book-donations/:id (Admin)
router.delete("/donations/:id", authenticateToken, (req, res) => {
  try {
    const deleted = db.bookDonations.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }
    return res.json({ success: true, message: "ریکارڈ کامیابی سے حذف ہو گیا" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
