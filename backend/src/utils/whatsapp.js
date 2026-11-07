import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { db } from "../db/jsonDb.js";
import { normalizePhoneNumber, sanitizeText } from "./validators.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

export { normalizePhoneNumber };

export const WHATSAPP_STATUS_MAP = {
  pending: {
    label: "NEW / RECEIVED",
    enabled: true,
    languageCode: "ur",
    templateName: "madarsa_status_received",
    message: "السلام علیکم {{name}}،\n\nمدرسہ صاحب الزمان (عج) نے آپ کی درخواست موصول کر لی ہے۔ ہمارے منتظمین آپ کی درخواست کا جائزہ لے رہے ہیں اور جلد ہی آپ کو آگاہ کر دیا جائے گا۔\n\nجزاک اللہ خیر۔"
  },
  under_review: {
    label: "UNDER REVIEW",
    enabled: true,
    languageCode: "ur",
    templateName: "madarsa_status_under_review",
    message: "السلام علیکم {{name}}،\n\nآپ کی درخواست مدرسہ صاحب الزمان (عج) میں زیرِ جائزہ ہے۔ ہمارے انتظامیہ کے اہلکار آپ کے اگلے مراحل کے بارے میں آپ کو مطلع کریں گے۔\n\nجزاک اللہ خیر۔"
  },
  interview_scheduled: {
    label: "INTERVIEW SCHEDULED",
    enabled: true,
    languageCode: "ur",
    templateName: "madarsa_status_under_review",
    message: "السلام علیکم {{name}}،\n\nآپ کی درخواست کے حوالے سے انٹرویو مقرر کیا جا چکا ہے۔ ہمارے اہلکار آپ کے متعلق مزید تفصیلات فراہم کریں گے۔\n\nجزاک اللہ خیر۔"
  },
  approved: {
    label: "APPROVED",
    enabled: true,
    languageCode: "ur",
    templateName: "madarsa_status_approved",
    message: "السلام علیکم {{name}}،\n\nآپ کی درخواست/درخواستِ داخلہ مدرسہ صاحب الزمان (عج) میں منظور کر دی گئی ہے۔\n\nبراہِ کرم ہماری انتظامیہ سے مزید ہدایات کے لیے رابطہ کریں۔\n\nجزاک اللہ خیر۔"
  },
  rejected: {
    label: "REJECTED",
    enabled: true,
    languageCode: "ur",
    templateName: "madarsa_status_rejected",
    message: "السلام علیکم {{name}}،\n\nآپ کی دلچسپی اور درخواست پر غور کے بعد، ہمیں افسوس ہے کہ آپ کی درخواست اس بار منظور نہیں ہوئی۔\n\nمزید وضاحت کے لیے مدرسہ کی انتظامیہ سے رابطہ کریں۔\n\nجزاک اللہ خیر۔"
  },
  contacted: {
    label: "CONTACTED",
    enabled: true,
    languageCode: "ur",
    templateName: "madarsa_status_contacted",
    message: "السلام علیکم {{name}}،\n\nمدرسہ صاحب الزمان (عج) کی انتظامیہ آپ سے رابطہ کرنے کی کوشش کر چکی ہے۔\n\nبراہِ کرم فوری جواب دیں یا مدرسہ سے رابطہ کریں۔\n\nجزاک اللہ خیر۔"
  },
  completed: {
    label: "COMPLETED / CLOSED",
    enabled: true,
    languageCode: "ur",
    templateName: "madarsa_status_completed",
    message: "السلام علیکم {{name}}،\n\nآپ کی درخواست مدرسہ صاحب الزمان (عج) میں مکمل/ختم کر دی گئی ہے۔\n\nآپ کے تعاون اور رابطے کا شکریہ۔\n\nجزاک اللہ خیر۔"
  }
};

export function getSupportedStatusOptions() {
  return Object.keys(WHATSAPP_STATUS_MAP);
}

export function normalizeStatusKey(status) {
  const normalized = String(status || "").trim().toLowerCase();
  if (!normalized) return "pending";
  if (normalized === "interview_scheduled") return "interview_scheduled";
  if (normalized === "under_review") return "under_review";
  if (normalized === "received") return "pending";
  if (normalized === "closed") return "completed";
  if (normalized === "done") return "completed";
  if (normalized === "new") return "pending";
  return normalized in WHATSAPP_STATUS_MAP ? normalized : "pending";
}

export function sanitizeWhatsAppConfigForResponse(config = {}) {
  if (!config || typeof config !== "object") return {};

  const sanitized = { ...config };
  if (sanitized.accessToken) sanitized.accessToken = "••••••••••";
  else sanitized.accessToken = "";

  if (sanitized.appSecret) sanitized.appSecret = "••••••••••";
  else sanitized.appSecret = "";

  if (sanitized.webhookVerifyToken) sanitized.webhookVerifyToken = "••••••••••";
  else sanitized.webhookVerifyToken = "";

  return sanitized;
}

export function getConfiguredWhatsAppSettings(settingsDoc = {}) {
  const directConfig = settingsDoc.whatsappConfig || settingsDoc.whatsappSettings ? null : settingsDoc;
  const config = settingsDoc.whatsappConfig || settingsDoc.whatsappSettings || directConfig || {};

  const phoneNumberId =
    config.phoneNumberId ||
    process.env.WHATSAPP_PHONE_NUMBER_ID ||
    process.env.META_PHONE_NUMBER_ID ||
    "";

  const accessToken =
    config.accessToken ||
    process.env.WHATSAPP_ACCESS_TOKEN ||
    process.env.META_ACCESS_TOKEN ||
    "";

  const appSecret =
    config.appSecret ||
    process.env.WHATSAPP_APP_SECRET ||
    process.env.META_APP_SECRET ||
    "";

  const appId =
    config.appId ||
    process.env.WHATSAPP_APP_ID ||
    process.env.META_APP_ID ||
    "";

  const webhookVerifyToken =
    config.webhookVerifyToken ||
    process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ||
    process.env.META_WEBHOOK_VERIFY_TOKEN ||
    "";

  // Enabled by default if credentials exist, unless explicitly set to false
  const enabled =
    config.enabled !== undefined
      ? Boolean(config.enabled)
      : (process.env.WHATSAPP_ENABLED !== undefined
          ? process.env.WHATSAPP_ENABLED === "true" || process.env.WHATSAPP_ENABLED === "1"
          : Boolean(phoneNumberId && accessToken));

  return {
    enabled,
    businessNumber: config.businessNumber || process.env.WHATSAPP_BUSINESS_NUMBER || settingsDoc.whatsapp || "+15551936940",
    businessName: config.businessName || settingsDoc.madarsaName || "Madarsa Sahib uz Zaman",
    phoneNumberId,
    accessToken,
    appSecret,
    appId,
    apiVersion: config.apiVersion || process.env.WHATSAPP_API_VERSION || "v20.0",
    webhookVerifyToken,
    consentRequired: config.consentRequired !== false,
    statusTemplates: {
      ...WHATSAPP_STATUS_MAP,
      ...(config.statusTemplates || {})
    },
    templateLanguage: config.templateLanguage || "ur",
    messageFormat: config.messageFormat || "auto" // 'auto' | 'template' | 'text'
  };
}

export function buildStatusMessage(status, variables = {}) {
  const templateKey = normalizeStatusKey(status);
  const template = WHATSAPP_STATUS_MAP[templateKey] || WHATSAPP_STATUS_MAP.pending;
  const name = sanitizeText(variables.name || variables.fullName || "مشتری", { maxLength: 80 });
  const inquiryId = sanitizeText(variables.inquiryId || variables.id || variables.applicationId || "-", { maxLength: 80 });

  const replacements = {
    name,
    inquiryId,
    status: template.label,
    businessName: sanitizeText(variables.businessName || "مدرسہ صاحب الزمان", { maxLength: 120 })
  };

  let message = template.message;
  if (inquiryId && inquiryId !== "-") {
    message = `${message}\n\nدرخواست نمبر: ${inquiryId}`;
  }

  Object.entries(replacements).forEach(([key, value]) => {
    message = message.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value);
  });

  return message;
}

export function shouldSendWhatsAppNotification({ applicant, status, settings }) {
  const config = getConfiguredWhatsAppSettings(settings || {});

  if (!config.enabled) return false;
  if (!applicant) return false;
  if (config.consentRequired) {
    const consentGranted = applicant.consent?.granted === true || applicant.whatsappConsent === true || applicant.consent === true;
    if (!consentGranted) return false;
  }

  const normalizedStatus = normalizeStatusKey(status);
  const template = (config.statusTemplates || {})[normalizedStatus];
  if (!template || template.enabled === false) return false;

  const targetNumber = normalizePhoneNumber(applicant.phone || applicant.whatsapp || "");
  return Boolean(targetNumber);
}

export function verifyWebhookSignature(rawBody, signature, secret) {
  if (!secret) return true;
  const expected = `sha256=${crypto.createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  const provided = typeof signature === "string" ? signature.trim() : "";

  if (!provided) return false;

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
  } catch (error) {
    return false;
  }
}

export async function sendWhatsAppNotification({ applicant, inquiryId, status, settingsDoc = {}, sendContext = {} }) {
  const config = getConfiguredWhatsAppSettings(settingsDoc);
  const normalizedStatus = normalizeStatusKey(status);
  const targetNumber = normalizePhoneNumber(applicant?.phone || applicant?.whatsapp || "");
  const template = config.statusTemplates[normalizedStatus] || WHATSAPP_STATUS_MAP[normalizedStatus] || WHATSAPP_STATUS_MAP.pending;
  const businessNumber = config.businessNumber || "+15551936940";

  if (!shouldSendWhatsAppNotification({ applicant, status: normalizedStatus, settings: settingsDoc })) {
    const reason = !config.enabled
      ? "واٹس ایپ نوٹیفکیشن غیر فعال ہے (WhatsApp notification disabled)."
      : (config.consentRequired && !(applicant?.consent?.granted || applicant?.whatsappConsent || applicant?.consent === true))
      ? "امیدوار کی طرف سے واٹس ایپ اجازت موجود نہیں ہے (No consent)."
      : !targetNumber
      ? "امیدوار کا فون نمبر درست نہیں ہے (Invalid recipient phone)."
      : "اس اسٹیٹس کا واٹس ایپ ٹیمپلیٹ غیر فعال ہے۔";

    const logRecord = {
      id: `wa-${Date.now()}`,
      inquiryId: inquiryId || applicant?.id || "unknown",
      recipient: targetNumber || applicant?.phone || "missing",
      businessNumber,
      status: "skipped",
      provider: "meta",
      templateName: template?.templateName || "none",
      message: "Notification skipped: " + reason,
      metadata: { reason, statusKey: normalizedStatus },
      createdAt: new Date().toISOString()
    };
    db.whatsAppMessages.insert(logRecord);

    return {
      success: false,
      status: "skipped",
      reason
    };
  }

  if (!targetNumber) {
    return {
      success: false,
      status: "failed",
      reason: "امیدوار کا فون نمبر درست نہیں ہے (Invalid recipient number)."
    };
  }

  if (!config.phoneNumberId || !config.accessToken) {
    const reason = "واٹس ایپ API کی معلومات (Phone Number ID یا Access Token) غائب ہے۔ برائے مہربانی .env چیک کریں۔";
    const logRecord = {
      id: `wa-${Date.now()}`,
      inquiryId: inquiryId || applicant?.id || "unknown",
      recipient: targetNumber,
      businessNumber,
      status: "not_configured",
      provider: "meta",
      templateName: template.templateName,
      message: reason,
      metadata: { error: reason },
      createdAt: new Date().toISOString()
    };
    db.whatsAppMessages.insert(logRecord);

    return {
      success: false,
      status: "not_configured",
      reason
    };
  }

  // Meta Cloud API requires digits only without leading '+'
  const cleanTo = targetNumber.replace(/\D/g, "");

  const messageBody = buildStatusMessage(normalizedStatus, {
    name: applicant?.fullName || applicant?.name || "مشتری",
    businessName: config.businessName,
    inquiryId: inquiryId || applicant?.id || "-"
  });

  const headers = {
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json"
  };

  const metaUrl = `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`;

  // Function to build human-friendly reason from Meta error response
  const formatMetaError = (errorObj) => {
    const code = errorObj?.code;
    const details = errorObj?.error_data?.details || errorObj?.message || "Unknown error";
    if (code === 131030) {
      return `موصول کنندہ کا نمبر میٹا کی الاؤڈ لسٹ میں نہیں ہے۔ ٹیسٹ موڈ میں پہلے یہ نمبر developers.facebook.com پر WhatsApp > API Setup میں شامل کریں۔ (Code: 131030: Recipient phone number not in allowed list)`;
    }
    if (code === 132001) {
      return `ٹیمپلیٹ '${template.templateName}' میٹا واٹس ایپ مینیجر میں منظور شدہ نہیں ہے۔ (Code: 132001: Template does not exist)`;
    }
    if (code === 190) {
      return `میٹا ایکسس ٹوکن غیر معتبر یا ختم ہو چکا ہے۔ نیا ٹوکن حاصل کریں۔ (Code: 190: Invalid/Expired OAuth Token)`;
    }
    if (code === 131047) {
      return `صارف کی طرف سے 24 گھنٹے کا ونڈو بند ہے۔ ٹیمپلیٹ میسج ضروری ہے۔ (Code: 131047: Re-engagement message required)`;
    }
    return `میٹا واٹس ایپ خرابی (${code || "API"}): ${details}`;
  };

  let responseBody = null;
  let responseOk = false;
  let usedType = "template";

  // If format is text only, send text directly
  if (config.messageFormat === "text") {
    usedType = "text";
    const textPayload = {
      messaging_product: "whatsapp",
      to: cleanTo,
      type: "text",
      text: { body: messageBody }
    };
    const res = await fetch(metaUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(textPayload)
    });
    responseOk = res.ok;
    responseBody = await res.json().catch(() => ({}));
  } else {
    // Attempt template send
    const templatePayload = {
      messaging_product: "whatsapp",
      to: cleanTo,
      type: "template",
      template: {
        name: template.templateName || "madarsa_status_update",
        language: {
          code: template.languageCode || config.templateLanguage || "ur"
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: applicant?.fullName || applicant?.name || "مشتری" },
              { type: "text", text: inquiryId || applicant?.id || "-" }
            ]
          }
        ]
      }
    };

    const res = await fetch(metaUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(templatePayload)
    });

    responseOk = res.ok;
    responseBody = await res.json().catch(() => ({}));

    // If template does not exist (code 132001), try text message fallback automatically
    if (!responseOk && responseBody?.error?.code === 132001) {
      const fallbackPayload = {
        messaging_product: "whatsapp",
        to: cleanTo,
        type: "text",
        text: { body: messageBody }
      };

      const fallbackRes = await fetch(metaUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(fallbackPayload)
      });

      if (fallbackRes.ok) {
        responseOk = true;
        responseBody = await fallbackRes.json().catch(() => ({}));
        usedType = "text_fallback";
      }
    }
  }

  if (!responseOk) {
    const errorObj = responseBody?.error || {};
    const friendlyDetail = formatMetaError(errorObj);

    const logRecord = {
      id: `wa-${Date.now()}`,
      inquiryId: inquiryId || applicant?.id || "unknown",
      recipient: targetNumber,
      businessNumber,
      status: "failed",
      provider: "meta",
      templateName: template.templateName,
      message: messageBody,
      metadata: { error: friendlyDetail, rawError: errorObj, usedType },
      createdAt: new Date().toISOString()
    };
    db.whatsAppMessages.insert(logRecord);

    return {
      success: false,
      status: "failed",
      messageId: null,
      provider: "meta",
      reason: friendlyDetail,
      raw: responseBody
    };
  }

  const messageId = responseBody?.messages?.[0]?.id || `wa-${Date.now()}`;
  const logRecord = {
    id: `wa-${Date.now()}`,
    inquiryId: inquiryId || applicant?.id || "unknown",
    recipient: targetNumber,
    businessNumber,
    status: "queued",
    provider: "meta",
    templateName: template.templateName,
    message: messageBody,
    providerMessageId: messageId,
    metadata: { requestContext: sendContext, statusKey: normalizedStatus, usedType },
    createdAt: new Date().toISOString()
  };

  db.whatsAppMessages.insert(logRecord);

  return {
    success: true,
    status: "queued",
    messageId,
    provider: "meta",
    reason: "واٹس ایپ پیغام کامیابی کے ساتھ میٹا کو موصول ہو گیا اور بھیج دیا گیا۔",
    raw: responseBody
  };
}
