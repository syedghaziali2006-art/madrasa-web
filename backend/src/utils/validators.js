const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s/$.?#].[\S]*$/i;

export function sanitizeText(value, options = {}) {
  const { maxLength = 2000, allowHtml = false } = options;
  if (value === null || value === undefined) return "";
  let text = String(value).trim();

  if (!allowHtml) {
    text = text
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/[\u0000-\u001F\u007F]/g, " ");
  }

  if (maxLength && text.length > maxLength) {
    text = text.slice(0, maxLength);
  }

  return text.trim();
}

export function normalizePhoneNumber(value) {
  if (value === null || value === undefined) return null;

  const raw = String(value).trim();
  if (!raw) return null;

  const digitsOnly = raw.replace(/\D/g, "");
  if (!digitsOnly) return null;

  if (raw.startsWith("+")) {
    const noPlus = raw.replace(/\D/g, "");
    if (/^923\d{9}$/.test(noPlus)) return `+${noPlus}`;
    if (/^\d{8,15}$/.test(noPlus)) return `+${noPlus}`;
  }

  if (raw.startsWith("0092")) {
    const noPrefix = raw.replace(/^0092/i, "");
    const candidate = `+92${noPrefix.replace(/\D/g, "")}`;
    if (/^\+923\d{9}$/.test(candidate)) return candidate;
  }

  if (raw.startsWith("92") && digitsOnly.length === 12) {
    const candidate = `+${digitsOnly}`;
    if (/^\+923\d{9}$/.test(candidate)) return candidate;
  }

  if (raw.startsWith("0") && digitsOnly.length === 11 && /^3\d{9}$/.test(digitsOnly.slice(1))) {
    return `+92${digitsOnly.slice(1)}`;
  }

  if (/^3\d{9}$/.test(digitsOnly) && digitsOnly.length === 10) {
    return `+92${digitsOnly}`;
  }

  if (/^923\d{9}$/.test(digitsOnly) && digitsOnly.length === 12) {
    return `+${digitsOnly}`;
  }

  if (/^\+?\d{8,15}$/.test(raw.replace(/\s+/g, "")) && !/^[A-Za-z]+$/.test(raw)) {
    return `+${raw.replace(/\D/g, "")}`;
  }

  return null;
}

export function isValidPhoneNumber(value, options = {}) {
  const allowInternational = options.allowInternational !== false;
  const normalized = normalizePhoneNumber(value);
  if (!normalized) return false;

  if (!allowInternational) {
    return /^\+923\d{9}$/.test(normalized) || /^03\d{9}$/.test(value.replace(/\D/g, ""));
  }

  return /^\+?\d{8,15}$/.test(normalized.replace(/\s+/g, "")) && !normalized.includes(" ");
}

export function isValidEmail(value) {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

export function isValidUrl(value) {
  if (typeof value !== "string") return false;
  return URL_RE.test(value.trim());
}

export function validatePasswordStrength(value) {
  const password = String(value || "").trim();
  if (password.length < 8) {
    return { valid: false, message: "پاس ورڈ کم از کم 8 حرفوں کا ہونا چاہیے۔" };
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    return { valid: false, message: "پاس ورڈ میں بڑے/چھوٹے حرف اور نمبر شامل ہونا ضروری ہے۔" };
  }
  return { valid: true, message: "مناسب پاس ورڈ" };
}

export function makeErrorResponse(message, details = {}) {
  return {
    success: false,
    message,
    errors: details
  };
}

export function getAllowedFields(body, fields) {
  const allowed = new Set(fields);
  const invalidFields = Object.keys(body || {}).filter((key) => !allowed.has(key));
  return { invalidFields, allowedBody: Object.fromEntries(Object.entries(body || {}).filter(([key]) => allowed.has(key))) };
}
