import test from "node:test";
import assert from "node:assert/strict";

import {
  isValidEmail,
  isValidPhoneNumber,
  normalizePhoneNumber,
  sanitizeText,
  validatePasswordStrength
} from "../src/utils/validators.js";

test("sanitizeText strips HTML and control characters", () => {
  const value = sanitizeText('<script>alert(1)</script>  hello  ', { maxLength: 20 });
  assert.equal(value, "hello");
});

test("email validation accepts real addresses and rejects malformed ones", () => {
  assert.equal(isValidEmail("admin@example.com"), true);
  assert.equal(isValidEmail("bad-email"), false);
});

test("Pakistani mobile numbers normalize correctly", () => {
  assert.equal(normalizePhoneNumber("0300-1234567"), "+923001234567");
  assert.equal(normalizePhoneNumber("+923001234567"), "+923001234567");
  assert.equal(normalizePhoneNumber("00923001234567"), "+923001234567");
});

test("invalid numbers are rejected", () => {
  assert.equal(isValidPhoneNumber("abc123"), false);
  assert.equal(isValidPhoneNumber("12345"), false);
});

test("password validation enforces a strong policy", () => {
  const weak = validatePasswordStrength("short");
  assert.equal(weak.valid, false);

  const strong = validatePasswordStrength("StrongPass123");
  assert.equal(strong.valid, true);
});
