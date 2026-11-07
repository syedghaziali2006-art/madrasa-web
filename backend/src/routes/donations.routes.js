import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";
import { isValidPhoneNumber, normalizePhoneNumber, sanitizeText } from "../utils/validators.js";

const router = express.Router();

// --- BANK ACCOUNTS (بینک اکاؤنٹس) ---

// GET /api/donations/accounts (Public)
router.get("/accounts", (req, res) => {
  try {
    const accounts = db.donationAccounts.find();
    return res.json({ success: true, data: accounts });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// POST /api/donations/accounts (Admin - Add account)
router.post("/accounts", authenticateToken, (req, res) => {
  try {
    const { bankName, accountTitle, accountNumber, iban, branch, swiftCode, purpose } = req.body;

    if (!bankName || !accountNumber) {
      return res.status(400).json({
        success: false,
        message: "بینک کا نام اور اکاؤنٹ نمبر درج کرنا لازمی ہے۔"
      });
    }

    const newAccount = {
      id: "acc-" + Date.now().toString(36),
      bankName: bankName.trim(),
      accountTitle: accountTitle || "Madarsa e Sahib uz Zaman",
      accountNumber: accountNumber.trim(),
      iban: iban || "",
      branch: branch || "",
      swiftCode: swiftCode || "",
      purpose: purpose || "عطیات و صدقات",
      isActive: true,
      createdAt: new Date().toISOString()
    };

    const saved = db.donationAccounts.insert(newAccount);
    return res.status(201).json({
      success: true,
      message: "بینک اکاؤنٹ کامیابی سے شامل ہو گیا",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/donations/accounts/:id (Admin - Update account)
router.put("/accounts/:id", authenticateToken, (req, res) => {
  try {
    const account = db.donationAccounts.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ success: false, message: "اکاؤنٹ نہیں ملا" });
    }

    const updates = { ...req.body };
    delete updates.id;
    const updated = db.donationAccounts.update(req.params.id, updates);
    return res.json({
      success: true,
      message: "اکاؤنٹ اپ ڈیٹ ہو گیا",
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/donations/accounts/:id (Admin - Delete account)
router.delete("/accounts/:id", authenticateToken, (req, res) => {
  try {
    const deleted = db.donationAccounts.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "اکاؤنٹ نہیں ملا" });
    }
    return res.json({ success: true, message: "اکاؤنٹ کامیابی سے حذف کر دیا گیا" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// --- DONOR SUBMISSIONS (عطیہ رسیدیں / سلپ جمع کرانا) ---

// POST /api/donations/submit (Public - Donor submits payment info)
router.post("/submit", (req, res) => {
  try {
    const donorName = sanitizeText(req.body?.donorName, { maxLength: 80 });
    const phone = sanitizeText(req.body?.phone, { maxLength: 30 });
    const amount = sanitizeText(req.body?.amount, { maxLength: 40 });
    const bankName = sanitizeText(req.body?.bankName, { maxLength: 120 });
    const transactionId = sanitizeText(req.body?.transactionId, { maxLength: 120 });
    const donationType = sanitizeText(req.body?.donationType, { maxLength: 80 });
    const receiptImage = sanitizeText(req.body?.receiptImage, { maxLength: 500 });
    const notes = sanitizeText(req.body?.notes, { maxLength: 500 });

    if (!donorName || donorName.length < 2) {
      return res.status(400).json({ success: false, message: "عطیہ دہندہ کا نام درج کرنا ضروری ہے۔" });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: "عطیہ کی رقم درست درج کریں۔" });
    }

    if (phone && !isValidPhoneNumber(phone)) {
      return res.status(400).json({ success: false, message: "رابطہ نمبر درست نہیں ہے۔" });
    }

    const newSubmission = {
      id: "sub-" + Math.floor(100000 + Math.random() * 900000),
      donorName,
      phone: phone ? normalizePhoneNumber(phone) : "",
      amount: String(amount).trim(),
      bankName: bankName || "",
      transactionId: transactionId || "",
      donationType: donationType || "عمومی عطیات",
      receiptImage: receiptImage || "",
      notes: notes || "",
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const saved = db.donorSubmissions.insert(newSubmission);
    return res.status(201).json({
      success: true,
      message: "عطیہ کی تفصیلات کامیابی سے درج ہو گئی ہیں۔ جزاک اللہ خیراً!",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/donations/submissions (Admin - View submissions)
router.get("/submissions", authenticateToken, (req, res) => {
  try {
    const submissions = db.donorSubmissions.find();
    return res.json({ success: true, total: submissions.length, data: submissions });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/donations/submissions/:id (Admin - Update status)
router.put("/submissions/:id", authenticateToken, (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = db.donorSubmissions.update(req.params.id, {
      ...(status && { status }),
      ...(notes !== undefined && { notes })
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }
    return res.json({ success: true, message: "عطیہ کی تصدیق اپ ڈیٹ ہو گئی", data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// DELETE /api/donations/submissions/:id (Admin)
router.delete("/submissions/:id", authenticateToken, (req, res) => {
  try {
    const deleted = db.donorSubmissions.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "ریکارڈ نہیں ملا" });
    }
    return res.json({ success: true, message: "ریکارڈ حذف کر دیا گیا" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
