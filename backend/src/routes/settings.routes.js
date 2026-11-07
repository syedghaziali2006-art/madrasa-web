import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";
import { getAllowedFields, isValidEmail, isValidPhoneNumber, isValidUrl, normalizePhoneNumber, sanitizeText } from "../utils/validators.js";
import { sanitizeWhatsAppConfigForResponse } from "../utils/whatsapp.js";

const router = express.Router();
const allowedFields = [
  "madarsaName", "madarsaNameEnglish", "tagline", "address", "shortAddress", "phone", "whatsapp",
  "email", "interviewTimings", "monthlyFee", "admissionFee", "securityFee", "ageLimit",
  "minQualification", "testSubjects", "marqueeNotice", "isAdmissionOpen", "logo", "favicon", "websiteUrl",
  "facebookUrl", "instagramUrl", "youtubeUrl", "googleMapsUrl", "seoTitle", "seoDescription",
  "whatsappConfig"
];

// GET /api/settings (Public)
router.get("/", (req, res) => {
  try {
    const settings = db.settings.get();
    const sanitized = { ...settings };
    if (sanitized.whatsappConfig) {
      sanitized.whatsappConfig = sanitizeWhatsAppConfigForResponse(sanitized.whatsappConfig);
    }
    return res.json({ success: true, data: sanitized });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/settings (Admin)
router.put("/", authenticateToken, (req, res) => {
  try {
    const { invalidFields, allowedBody } = getAllowedFields(req.body, allowedFields);
    if (invalidFields.length > 0) {
      return res.status(400).json({ success: false, message: "غیر مجاز فیلڈز موجود ہیں۔", errors: invalidFields });
    }

    const updates = {};

    for (const [key, value] of Object.entries(allowedBody)) {
      if (value === null || value === undefined) continue;
      if (typeof value === "string") {
        updates[key] = sanitizeText(value, { maxLength: key === "address" || key === "marqueeNotice" ? 500 : 250 });
      } else {
        updates[key] = value;
      }
    }

    if (updates.phone && !isValidPhoneNumber(updates.phone)) {
      return res.status(400).json({ success: false, message: "کریڈٹ/رابطہ نمبر درست نہیں ہے۔" });
    }

    if (updates.whatsapp && !isValidPhoneNumber(updates.whatsapp)) {
      return res.status(400).json({ success: false, message: "واٹس ایپ نمبر درست نہیں ہے۔" });
    }

    if (updates.email && !isValidEmail(updates.email)) {
      return res.status(400).json({ success: false, message: "ای میل فارم درست نہیں ہے۔" });
    }

    if (updates.websiteUrl && !isValidUrl(updates.websiteUrl)) {
      return res.status(400).json({ success: false, message: "ویب سائٹ یو آر ایل درست نہیں ہے۔" });
    }

    if (updates.phone) updates.phone = normalizePhoneNumber(updates.phone) || updates.phone;
    if (updates.whatsapp) updates.whatsapp = normalizePhoneNumber(updates.whatsapp) || updates.whatsapp;

    const updated = db.settings.update(updates);
    const sanitized = { ...updated };
    if (sanitized.whatsappConfig) {
      sanitized.whatsappConfig = sanitizeWhatsAppConfigForResponse(sanitized.whatsappConfig);
    }
    return res.json({
      success: true,
      message: "ترتیبات کامیابی سے محفوظ کر دی گئیں",
      data: sanitized
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
