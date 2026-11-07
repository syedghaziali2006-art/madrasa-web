import express from "express";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";
import { normalizePhoneNumber, sanitizeText } from "../utils/validators.js";
import {
  buildStatusMessage,
  getConfiguredWhatsAppSettings,
  getSupportedStatusOptions,
  normalizeStatusKey,
  sanitizeWhatsAppConfigForResponse,
  sendWhatsAppNotification,
  verifyWebhookSignature,
} from "../utils/whatsapp.js";

const router = express.Router();

router.get("/config", authenticateToken, (req, res) => {
  try {
    const settings = db.settings.get();
    const config = getConfiguredWhatsAppSettings(settings);
    return res.json({
      success: true,
      data: {
        ...sanitizeWhatsAppConfigForResponse(config),
        hasCredentials: Boolean(config.accessToken && config.phoneNumberId),
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

router.put("/config", authenticateToken, (req, res) => {
  try {
    const current = db.settings.get();
    const existing = current.whatsappConfig || {};
    const body = req.body || {};

    const next = {
      ...existing,
      enabled: Boolean(body.enabled),
      businessNumber: sanitizeText(body.businessNumber || "", { maxLength: 40 }),
      businessName: sanitizeText(body.businessName || current.madarsaName || "مدرسہ صاحب الزمان", { maxLength: 120 }),
      phoneNumberId: sanitizeText(body.phoneNumberId || "", { maxLength: 80 }),
      accessToken: body.accessToken ? String(body.accessToken).trim() : existing.accessToken || "",
      apiVersion: sanitizeText(body.apiVersion || "v20.0", { maxLength: 30 }),
      webhookVerifyToken: sanitizeText(body.webhookVerifyToken || "", { maxLength: 200 }),
      appSecret: body.appSecret ? String(body.appSecret).trim() : existing.appSecret || "",
      consentRequired: body.consentRequired !== false,
      templateLanguage: sanitizeText(body.templateLanguage || "ur", { maxLength: 20 }),
      statusTemplates: { ...(existing.statusTemplates || {}), ...(body.statusTemplates || {}) }
    };

    const updatedSettings = db.settings.update({
      whatsappConfig: next,
      whatsapp: next.businessNumber || current.whatsapp || ""
    });

    return res.json({
      success: true,
      message: "واٹس ایپ ترتیبات محفوظ ہو گئیں۔",
      data: sanitizeWhatsAppConfigForResponse(getConfiguredWhatsAppSettings(updatedSettings))
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "واٹس ایپ ترتیبات محفوظ کرنے میں خرابی" });
  }
});

router.get("/history", authenticateToken, (req, res) => {
  try {
    const messages = db.whatsAppMessages.find();
    return res.json({ success: true, data: messages.slice(0, 50) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "تاریخچہ بازیافت میں خرابی" });
  }
});

router.post("/preview", authenticateToken, (req, res) => {
  try {
    const { status = "pending", name = "مشتری", inquiryId = "MSZ-123456" } = req.body || {};
    const message = buildStatusMessage(status, { name, inquiryId });
    return res.json({ success: true, data: { status: normalizeStatusKey(status), message } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "پیش نظارہ تیار نہیں ہو سکا" });
  }
});

router.post("/test", authenticateToken, async (req, res) => {
  try {
    const current = db.settings.get();
    const number = normalizePhoneNumber(req.body?.phone || current.whatsapp || "");
    if (!number) {
      return res.status(400).json({ success: false, message: "مستند ٹیسٹ نمبر درج کریں۔" });
    }

    const result = await sendWhatsAppNotification({
      applicant: {
        fullName: req.body?.name || "Test User",
        phone: number,
        consent: { granted: true }
      },
      inquiryId: req.body?.inquiryId || "TEST-001",
      status: req.body?.status || "pending",
      settingsDoc: current,
      sendContext: { mode: "test_message" }
    });

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.reason || "ٹیسٹ میسج نہیں بھیجا جا سکا۔", data: result });
    }

    return res.json({ success: true, message: "ٹیسٹ میسج queued ہو گیا ہے۔", data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "ٹیسٹ میسج بھیجنے میں خرابی" });
  }
});

router.post("/send", authenticateToken, async (req, res) => {
  try {
    const { applicant, inquiryId, status } = req.body || {};
    const result = await sendWhatsAppNotification({
      applicant,
      inquiryId,
      status,
      settingsDoc: db.settings.get(),
      sendContext: { mode: "manual_send" }
    });

    return res.json({ success: result.success, message: result.reason || "Notification processed.", data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "واٹس ایپ notificaton نہیں بھیجا جا سکا" });
  }
});

router.get("/statuses", authenticateToken, (req, res) => {
  try {
    return res.json({ success: true, data: getSupportedStatusOptions() });
  } catch (error) {
    return res.status(500).json({ success: false, message: "اسٹیٹس بازیافت میں خرابی" });
  }
});

router.get("/webhook", (req, res) => {
  const current = db.settings.get();
  const verifyToken = current.whatsappConfig?.webhookVerifyToken || process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "";
  
  // Meta sends dots (hub.mode), though some proxies convert them to underscores
  const mode = req.query["hub.mode"] || req.query.hub_mode;
  const token = req.query["hub.verify_token"] || req.query.hub_verify_token;
  const challenge = req.query["hub.challenge"] || req.query.hub_challenge;

  if (mode === "subscribe" && token && token === verifyToken && challenge) {
    return res.status(200).send(String(challenge));
  }

  return res.status(403).json({ success: false, message: "Invalid webhook verification token." });
});

router.post("/webhook", (req, res) => {
  try {
    const current = db.settings.get();
    const secret = current.whatsappConfig?.appSecret || process.env.WHATSAPP_APP_SECRET || "";
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body || {});
    const signature = req.headers["x-hub-signature-256"] || req.headers["X-Hub-Signature-256"] || "";

    if (secret && !verifyWebhookSignature(rawBody, signature, secret)) {
      return res.status(401).json({ success: false, message: "Invalid webhook signature" });
    }

    const payload = JSON.parse(rawBody || "{}");
    const entry = payload?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value || {};
    const status = value?.statuses?.[0];

    if (!status) {
      return res.status(200).json({ success: true, message: "Webhook received but no status update found." });
    }

    const messageId = status.id || status.message_id || status?.message?.id || null;
    const deliveryStatus = status.status || "failed";

    if (messageId) {
      const existing = db.whatsAppMessages.find((item) => item.providerMessageId === messageId || item.id === messageId);
      if (existing.length > 0) {
        db.whatsAppMessages.update(existing[0].id, {
          deliveryStatus,
          updatedAt: new Date().toISOString(),
          metadata: { ...(existing[0].metadata || {}), webhook: status }
        });
      }
    }

    return res.status(200).json({ success: true, message: "Status processed." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
});

export default router;
