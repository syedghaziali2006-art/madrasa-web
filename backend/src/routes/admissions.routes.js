import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";
import { isValidPhoneNumber, normalizePhoneNumber, sanitizeText } from "../utils/validators.js";
import { sendWhatsAppNotification, normalizeStatusKey } from "../utils/whatsapp.js";

const router = express.Router();

// Helper to generate application ID
const generateApplicationId = () => {
  return "MSZ-" + Math.floor(100000 + Math.random() * 900000);
};

const validateAdmissionPayload = (body) => {
  const fullName = sanitizeText(body?.fullName, { maxLength: 80 });
  const fatherName = sanitizeText(body?.fatherName, { maxLength: 80 });
  const city = sanitizeText(body?.city, { maxLength: 80 });
  const selectedCourse = sanitizeText(body?.selectedCourse, { maxLength: 120 });
  const previousEducation = sanitizeText(body?.previousEducation, { maxLength: 120 });
  const residenceType = sanitizeText(body?.residenceType, { maxLength: 120 });
  const message = sanitizeText(body?.message, { maxLength: 500 });
  const gender = sanitizeText(body?.gender, { maxLength: 80 }) || "طالب علم (مرد)";
  const ageValue = Number(body?.age);
  const phoneValue = sanitizeText(body?.phone, { maxLength: 30 });

  if (!fullName || fullName.length < 2) {
    throw new Error("نام امیدوار کو درست لکھنا ضروری ہے۔");
  }

  if (!fatherName || fatherName.length < 2) {
    throw new Error("والد / سرپرست کا نام درج کرنا ضروری ہے۔");
  }

  if (!phoneValue || !isValidPhoneNumber(phoneValue)) {
    throw new Error("براہ کرم درست موبائل نمبر درج کریں۔");
  }

  if (!city || city.length < 2) {
    throw new Error("شہر یا علاقہ درج کرنا ضروری ہے۔");
  }

  if (!selectedCourse || selectedCourse.length < 2) {
    throw new Error("کورس یا شعبہ منتخب کرنا ضروری ہے۔");
  }

  if (!Number.isFinite(ageValue) || ageValue < 8 || ageValue > 35) {
    throw new Error("عمر 8 سے 35 سال کے درمیان ہونی چاہیے۔");
  }

  return {
    fullName,
    fatherName,
    age: ageValue,
    gender,
    phone: normalizePhoneNumber(phoneValue),
    city,
    selectedCourse,
    previousEducation: previousEducation || "چھٹی جماعت پاس",
    residenceType: residenceType || "رہائشی (ہاسٹل و طعام)",
    message
  };
};

// POST /api/admissions (Public - Submit Application)
router.post("/", (req, res) => {
  try {
    let payload;
    try {
      payload = validateAdmissionPayload(req.body);
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const whatsappConsent = Boolean(req.body?.whatsappConsent);
    const newAdmission = {
      id: generateApplicationId(),
      ...payload,
      status: "pending",
      interviewDate: "",
      notes: "",
      whatsappConsent,
      consent: whatsappConsent ? {
        granted: true,
        timestamp: new Date().toISOString()
      } : {
        granted: false,
        timestamp: null
      },
      createdAt: new Date().toISOString()
    };

    const saved = db.admissions.insert(newAdmission);

    return res.status(201).json({
      success: true,
      message: "درخواستِ داخلہ کامیابی کے ساتھ موصول ہو گئی ہے!",
      applicationId: saved.id,
      data: saved
    });
  } catch (error) {
    console.error("Admission submit error:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/admissions (Admin - List with search & filters)
router.get("/", authenticateToken, (req, res) => {
  try {
    const { status, search } = req.query;

    let admissions = db.admissions.find();

    if (status && status !== "all") {
      admissions = admissions.filter((item) => item.status === status);
    }

    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      admissions = admissions.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.fullName.toLowerCase().includes(q) ||
          item.fatherName.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          (item.city && item.city.toLowerCase().includes(q)) ||
          item.selectedCourse.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      total: admissions.length,
      data: admissions
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/admissions/stats/summary (Admin - Summary counts)
router.get("/stats/summary", authenticateToken, (req, res) => {
  try {
    const all = db.admissions.find();
    const stats = {
      total: all.length,
      pending: all.filter((a) => a.status === "pending").length,
      interview_scheduled: all.filter((a) => a.status === "interview_scheduled").length,
      approved: all.filter((a) => a.status === "approved").length,
      rejected: all.filter((a) => a.status === "rejected").length
    };
    return res.json({ success: true, stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// GET /api/admissions/:id (Admin - Single details)
router.get("/:id", authenticateToken, (req, res) => {
  try {
    const admission = db.admissions.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, data: admission });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// PUT /api/admissions/:id (Admin - Update status / interviewDate / notes)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { status, interviewDate, notes, whatsappConsent, sendWhatsApp } = req.body;
    const admission = db.admissions.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }

    const previousStatus = admission.status;
    const updates = {};
    if (status !== undefined) updates.status = status;
    if (interviewDate !== undefined) updates.interviewDate = interviewDate;
    if (notes !== undefined) updates.notes = notes;
    if (whatsappConsent !== undefined) updates.whatsappConsent = Boolean(whatsappConsent);
    if (whatsappConsent === true && !admission.consent) {
      updates.consent = { granted: true, timestamp: new Date().toISOString() };
    }

    const updated = db.admissions.update(req.params.id, updates);

    let notificationResult = { success: false, status: "skipped", reason: "اسٹیٹس میں کوئی تبدیلی نہیں ہوئی تھی۔" };
    const shouldTriggerNotification = Boolean(sendWhatsApp) || (status !== undefined && previousStatus !== status);

    if (shouldTriggerNotification) {
      const settingsDoc = db.settings.get();
      const targetStatus = status !== undefined ? status : updated.status;
      notificationResult = await sendWhatsAppNotification({
        applicant: {
          fullName: updated.fullName,
          phone: updated.phone,
          consent: updated.consent || { granted: Boolean(updated.whatsappConsent) },
          whatsappConsent: Boolean(updated.whatsappConsent)
        },
        inquiryId: updated.id,
        status: normalizeStatusKey(targetStatus),
        settingsDoc,
        sendContext: { previousStatus, newStatus: targetStatus, manualTrigger: Boolean(sendWhatsApp) }
      });
    }

    let responseMessage = "درخواست کامیابی کے ساتھ اپ ڈیٹ کر دی گئی ہے۔";
    if (shouldTriggerNotification) {
      if (notificationResult.success) {
        responseMessage += " اور واٹس ایپ اطلاع بھیج دی گئی۔";
      } else {
        responseMessage += ` (واٹس ایپ اطلاع نوٹ: ${notificationResult.reason})`;
      }
    }

    return res.json({
      success: true,
      message: responseMessage,
      data: updated,
      whatsapp: notificationResult
    });
  } catch (error) {
    console.error("Admission update error:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// POST /api/admissions/:id/send-whatsapp (Admin - Manually trigger WhatsApp notification)
router.post("/:id/send-whatsapp", authenticateToken, async (req, res) => {
  try {
    const admission = db.admissions.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }

    const targetStatus = req.body?.status || admission.status;
    const settingsDoc = db.settings.get();

    const notificationResult = await sendWhatsAppNotification({
      applicant: {
        fullName: admission.fullName,
        phone: admission.phone,
        consent: admission.consent || { granted: Boolean(admission.whatsappConsent) },
        whatsappConsent: Boolean(admission.whatsappConsent)
      },
      inquiryId: admission.id,
      status: normalizeStatusKey(targetStatus),
      settingsDoc,
      sendContext: { manualTrigger: true }
    });

    return res.json({
      success: notificationResult.success,
      message: notificationResult.reason || (notificationResult.success ? "واٹس ایپ نوٹیفکیشن ارسال کر دی گئی ہے۔" : "نوٹیفکیشن نہیں جا سکی۔"),
      data: notificationResult
    });
  } catch (error) {
    console.error("Manual WhatsApp trigger error:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی: " + error.message });
  }
});

// DELETE /api/admissions/:id (Admin - Delete)
router.delete("/:id", authenticateToken, (req, res) => {
  try {
    const success = db.admissions.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "درخواست نہیں ملی" });
    }
    return res.json({ success: true, message: "درخواست کامیابی سے حذف کر دی گئی" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
