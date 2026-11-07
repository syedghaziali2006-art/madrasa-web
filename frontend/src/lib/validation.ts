export function sanitizeText(value: string | null | undefined, maxLength = 2000) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizePhoneNumber(value: string | null | undefined) {
  if (!value) return null;
  const raw = String(value).trim();
  const digitsOnly = raw.replace(/\D/g, "");
  if (!digitsOnly) return null;

  if (/^923\d{9}$/.test(digitsOnly)) return `+${digitsOnly}`;
  if (/^3\d{9}$/.test(digitsOnly)) return `+92${digitsOnly}`;
  if (/^0\d{10}$/.test(digitsOnly)) return `+92${digitsOnly.slice(1)}`;
  if (/^\+?\d{8,15}$/.test(raw.replace(/\s+/g, ""))) return `+${raw.replace(/\D/g, "")}`;
  return null;
}

export function isValidPhoneNumber(value: string | null | undefined, allowInternational = true) {
  const normalized = normalizePhoneNumber(value);
  if (!normalized) return false;
  if (!allowInternational) {
    return /^\+923\d{9}$/.test(normalized) || /^03\d{9}$/.test(String(value || "").replace(/\D/g, ""));
  }
  return /^\+?\d{8,15}$/.test(normalized.replace(/\s+/g, ""));
}

export function isValidEmail(value: string | null | undefined) {
  return !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function validatePasswordStrength(value: string | null | undefined) {
  const password = String(value || "").trim();
  if (password.length < 8) return { valid: false, message: "پاس ورڈ کم از کم 8 حرفوں کا ہونا چاہیے۔" };
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    return { valid: false, message: "پاس ورڈ میں بڑے/چھوٹے حرف اور نمبر شامل ہونا ضروری ہے۔" };
  }
  return { valid: true, message: "مناسب پاس ورڈ" };
}
