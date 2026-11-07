import test from 'node:test';
import assert from 'node:assert/strict';

import {
  normalizePhoneNumber,
  buildStatusMessage,
  shouldSendWhatsAppNotification,
  getSupportedStatusOptions,
  sanitizeWhatsAppConfigForResponse,
} from '../src/utils/whatsapp.js';

test('normalizePhoneNumber converts Pakistani numbers to international format', () => {
  assert.equal(normalizePhoneNumber('0300 1234567'), '+923001234567');
  assert.equal(normalizePhoneNumber('+92 300 1234567'), '+923001234567');
});

test('buildStatusMessage fills placeholders for a status template', () => {
  const message = buildStatusMessage('approved', { name: 'علی', inquiryId: 'MSZ-123456' });
  assert.match(message, /علی/);
  assert.match(message, /MSZ-123456/);
  assert.match(message, /منظور/i);
});

test('shouldSendWhatsAppNotification blocks send when consent or integration disabled', () => {
  const enabledConfig = {
    enabled: true,
    businessNumber: '+923001234567',
    consentRequired: true,
    statusTemplates: {
      approved: { enabled: true, template: 'approved message' }
    }
  };

  const applicant = { fullName: 'علی', phone: '+923001234567', consent: { granted: true } };
  const denied = { fullName: 'حسن', phone: '+923001234567', consent: { granted: false } };

  assert.equal(shouldSendWhatsAppNotification({ applicant, status: 'approved', settings: enabledConfig }), true);
  assert.equal(shouldSendWhatsAppNotification({ applicant: denied, status: 'approved', settings: enabledConfig }), false);
  assert.equal(shouldSendWhatsAppNotification({ applicant, status: 'approved', settings: { ...enabledConfig, enabled: false } }), false);
});

test('sanitizeWhatsAppConfigForResponse masks secrets before sharing config', () => {
  const scrubbed = sanitizeWhatsAppConfigForResponse({
    enabled: true,
    businessNumber: '+923001234567',
    accessToken: 'secret-token-123',
    appSecret: 'top-secret',
    phoneNumberId: '123456789',
    statusTemplates: { approved: { enabled: true, templateName: 'approved_template' } }
  });

  assert.equal(scrubbed.accessToken, '••••••••••');
  assert.equal(scrubbed.appSecret, '••••••••••');
  assert.equal(scrubbed.businessNumber, '+923001234567');
  assert.equal(scrubbed.phoneNumberId, '123456789');
  assert.equal(scrubbed.statusTemplates.approved.templateName, 'approved_template');
});

test('getSupportedStatusOptions returns all managed statuses', () => {
  const statuses = getSupportedStatusOptions();
  assert.ok(statuses.includes('pending'));
  assert.ok(statuses.includes('under_review'));
  assert.ok(statuses.includes('approved'));
  assert.ok(statuses.includes('rejected'));
  assert.ok(statuses.includes('contacted'));
  assert.ok(statuses.includes('completed'));
});
