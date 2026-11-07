"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Lock,
  Building,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  BellRing
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";
import { isValidEmail, isValidPhoneNumber, validatePasswordStrength } from "@/lib/validation";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    madarsaName: "",
    madarsaNameEnglish: "",
    tagline: "",
    address: "",
    shortAddress: "",
    phone: "",
    whatsapp: "",
    email: "",
    interviewTimings: "",
    monthlyFee: "",
    admissionFee: "",
    securityFee: "",
    ageLimit: "",
    minQualification: "",
    testSubjects: "",
    marqueeNotice: "",
    isAdmissionOpen: true,
    whatsappConfig: {
      enabled: false,
      businessNumber: "",
      phoneNumberId: "",
      accessToken: "",
      apiVersion: "v20.0",
      webhookVerifyToken: "",
      appSecret: "",
      consentRequired: true,
      templateLanguage: "ur",
      statusTemplates: {
        pending: { enabled: true, templateName: "madarsa_status_received", languageCode: "ur" },
        under_review: { enabled: true, templateName: "madarsa_status_under_review", languageCode: "ur" },
        interview_scheduled: { enabled: true, templateName: "madarsa_status_under_review", languageCode: "ur" },
        approved: { enabled: true, templateName: "madarsa_status_approved", languageCode: "ur" },
        rejected: { enabled: true, templateName: "madarsa_status_rejected", languageCode: "ur" },
        contacted: { enabled: true, templateName: "madarsa_status_contacted", languageCode: "ur" },
        completed: { enabled: true, templateName: "madarsa_status_completed", languageCode: "ur" }
      }
    }
  });

  const [whatsappConfig, setWhatsappConfig] = useState<any>({
    enabled: false,
    businessNumber: "",
    phoneNumberId: "",
    accessToken: "",
    apiVersion: "v20.0",
    webhookVerifyToken: "",
    appSecret: "",
    consentRequired: true,
    templateLanguage: "ur",
    statusTemplates: {
      pending: { enabled: true, templateName: "madarsa_status_received", languageCode: "ur" },
      under_review: { enabled: true, templateName: "madarsa_status_under_review", languageCode: "ur" },
      interview_scheduled: { enabled: true, templateName: "madarsa_status_under_review", languageCode: "ur" },
      approved: { enabled: true, templateName: "madarsa_status_approved", languageCode: "ur" },
      rejected: { enabled: true, templateName: "madarsa_status_rejected", languageCode: "ur" },
      contacted: { enabled: true, templateName: "madarsa_status_contacted", languageCode: "ur" },
      completed: { enabled: true, templateName: "madarsa_status_completed", languageCode: "ur" }
    }
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [settingsRes, whatsappRes] = await Promise.all([
          api.settings.get(),
          api.whatsapp.getConfig().catch(() => null),
        ]);

        if (settingsRes.success && settingsRes.data) {
          setSettings(settingsRes.data);
        }

        if (whatsappRes?.success && whatsappRes.data) {
          setWhatsappConfig({
            ...whatsappConfig,
            ...whatsappRes.data,
            accessToken: "",
            appSecret: "",
            webhookVerifyToken: whatsappRes.data.webhookVerifyToken || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess(false);

    if (settings.phone && !isValidPhoneNumber(settings.phone)) {
      alert("مرکزی فون نمبر درست نہیں ہے۔");
      return;
    }

    if (settings.whatsapp && !isValidPhoneNumber(settings.whatsapp)) {
      alert("واٹس ایپ نمبر درست نہیں ہے۔");
      return;
    }

    if (settings.email && !isValidEmail(settings.email)) {
      alert("ای میل ایڈریس درست نہیں ہے۔");
      return;
    }

    try {
      setSavingSettings(true);
      const res = await api.settings.update({
        ...settings,
        whatsappConfig,
      });
      if (res.success) {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err: any) {
      alert("ترتیبات محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError("موجودہ پاس ورڈ درج کریں۔");
      return;
    }

    const strength = validatePasswordStrength(newPassword);
    if (!strength.valid) {
      setPasswordError(strength.message);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("نیا پاس ورڈ اور تصدیقی پاس ورڈ مطابقت نہیں رکھتے۔");
      return;
    }

    try {
      setSavingPassword(true);
      const res = await api.auth.changePassword({ currentPassword, newPassword });
      if (res.success) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(false), 4000);
      } else {
        setPasswordError(res.message);
      }
    } catch (err: any) {
      setPasswordError(err.message || "پاس ورڈ تبدیل کرنے میں خرابی۔");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="عمومی ترتیبات و پاس ورڈ کنٹرول"
        subtitle="ادارے کی بنیادی معلومات، داخلہ فیس، رابطہ نمبرز اور ایڈمن سیکیورٹی"
      />

      <div className="p-6 space-y-8 max-w-[1200px] mx-auto">
        {/* Success Alert */}
        {settingsSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>ترتیبات کامیابی کے ساتھ محفوظ ہو گئی ہیں!</span>
          </div>
        )}

        {/* Form 1: General Info & Admissions */}
        <form onSubmit={handleSaveSettings} className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#C9B38D]/20 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-[#C9B38D]" />
              <span>مدرسہ کی معلومات و رابطہ</span>
            </h3>
            <label className="flex items-center gap-3 cursor-pointer bg-[#25150C] px-3.5 py-1.5 rounded-xl border border-[#C9B38D]/30">
              <span className="text-xs font-semibold text-white">
                داخلہ پورٹل فعال ہے
              </span>
              <input
                type="checkbox"
                checked={settings.isAdmissionOpen ?? true}
                onChange={(e) => setSettings({ ...settings, isAdmissionOpen: e.target.checked })}
                className="w-4 h-4 rounded text-[#C9B38D]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نام ادارہ (اردو)</label>
              <input
                type="text"
                value={settings.madarsaName || ""}
                onChange={(e) => setSettings({ ...settings, madarsaName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نام ادارہ (انگریزی)</label>
              <input
                type="text"
                value={settings.madarsaNameEnglish || ""}
                onChange={(e) => setSettings({ ...settings, madarsaNameEnglish: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-sans"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">مرکزی فون نمبر</label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">واٹس ایپ نمبر</label>
              <input
                type="text"
                value={settings.whatsapp || ""}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">ای میل ایڈریس</label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-stone-200 mb-1">مکمل پتہ (کیمپس لوکیشن)</label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-stone-200 mb-1 flex items-center gap-1.5">
              <BellRing className="w-3.5 h-3.5 text-[#C9B38D]" />
              <span>اعلانیہ پٹی (Marquee Notice Banner)</span>
            </label>
            <input
              type="text"
              placeholder="ویب سائٹ پر چلنے والی متحرک اطلاع"
              value={settings.marqueeNotice || ""}
              onChange={(e) => setSettings({ ...settings, marqueeNotice: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
            />
          </div>

          {/* Fees Subsection */}
          <div className="pt-4 border-t border-[#C9B38D]/20">
            <h4 className="text-sm font-bold text-[#C9B38D] mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>فیس اور داخلہ ضوابط</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-200 mb-1">ماہانہ فیس</label>
                <input
                  type="text"
                  value={settings.monthlyFee || ""}
                  onChange={(e) => setSettings({ ...settings, monthlyFee: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-200 mb-1">داخلہ فیس (یک مشت)</label>
                <input
                  type="text"
                  value={settings.admissionFee || ""}
                  onChange={(e) => setSettings({ ...settings, admissionFee: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-200 mb-1">سیکورٹی فیس (قابل واپسی)</label>
                <input
                  type="text"
                  value={settings.securityFee || ""}
                  onChange={(e) => setSettings({ ...settings, securityFee: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingSettings}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] text-xs font-bold transition shadow"
            >
              <Save className="w-4 h-4" />
              <span>{savingSettings ? "محفوظ ہو رہا ہے..." : "ترتیبات محفوظ کریں"}</span>
            </button>
          </div>
        </form>

        {/* Form 2: WhatsApp Business Integration */}
        <div className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#C9B38D]/20 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BellRing className="w-5 h-5 text-[#C9B38D]" />
              <span>WhatsApp Business Alert System</span>
            </h3>
            <label className="flex items-center gap-3 cursor-pointer bg-[#25150C] px-3.5 py-1.5 rounded-xl border border-[#C9B38D]/30">
              <span className="text-xs font-semibold text-white">اعلان فعال ہے</span>
              <input
                type="checkbox"
                checked={Boolean(whatsappConfig.enabled)}
                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, enabled: e.target.checked })}
                className="w-4 h-4 rounded text-[#C9B38D]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">WhatsApp Business Number</label>
              <input
                type="text"
                value={whatsappConfig.businessNumber || ""}
                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, businessNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">Phone Number ID</label>
              <input
                type="text"
                value={whatsappConfig.phoneNumberId || ""}
                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneNumberId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">API Version</label>
              <input
                type="text"
                value={whatsappConfig.apiVersion || "v20.0"}
                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, apiVersion: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">Webhook Verify Token</label>
              <input
                type="text"
                value={whatsappConfig.webhookVerifyToken || ""}
                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, webhookVerifyToken: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">Access Token</label>
              <input
                type="password"
                value={whatsappConfig.accessToken || ""}
                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, accessToken: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">App Secret</label>
              <input
                type="password"
                value={whatsappConfig.appSecret || ""}
                onChange={(e) => setWhatsappConfig({ ...whatsappConfig, appSecret: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-[#25150C] border border-[#C9B38D]/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#C9B38D]">Notification Status Templates</h4>
              <label className="flex items-center gap-2 text-xs text-white">
                <input
                  type="checkbox"
                  checked={Boolean(whatsappConfig.consentRequired)}
                  onChange={(e) => setWhatsappConfig({ ...whatsappConfig, consentRequired: e.target.checked })}
                  className="w-4 h-4 rounded text-[#C9B38D]"
                />
                Consent Required
              </label>
            </div>

            {Object.entries(whatsappConfig.statusTemplates || {}).map(([status, info]: [string, any]) => (
              <div key={status} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center text-[11px]">
                <label className="text-stone-300 font-semibold capitalize">{status.replace("_", " ")}</label>
                <input
                  type="checkbox"
                  checked={Boolean(info?.enabled)}
                  onChange={(e) => setWhatsappConfig({
                    ...whatsappConfig,
                    statusTemplates: {
                      ...whatsappConfig.statusTemplates,
                      [status]: { ...info, enabled: e.target.checked }
                    }
                  })}
                  className="w-4 h-4 rounded text-[#C9B38D]"
                />
                <input
                  type="text"
                  value={info?.templateName || ""}
                  onChange={(e) => setWhatsappConfig({
                    ...whatsappConfig,
                    statusTemplates: {
                      ...whatsappConfig.statusTemplates,
                      [status]: { ...info, templateName: e.target.value }
                    }
                  })}
                  className="px-2 py-1.5 rounded-lg bg-[#1C1009] border border-[#C9B38D]/30 text-white focus:outline-none"
                  dir="ltr"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await api.whatsapp.test({
                    phone: settings.whatsapp || settings.phone || "",
                    name: settings.madarsaName || "مدرسہ صاحب الزمان",
                    status: "pending",
                    inquiryId: "TEST-001"
                  });
                  alert(res.message || "ٹیسٹ WhatsApp میسج بھیجی گئی۔");
                } catch (error: any) {
                  alert(error.message || "ٹیسٹ میسج بھیجنے میں خرابی۔");
                }
              }}
              className="px-4 py-2 rounded-xl bg-white/5 text-stone-200 text-xs font-semibold border border-white/10"
            >
              Send Test Message
            </button>
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await api.settings.update({ ...settings, whatsappConfig });
                  if (res.success) {
                    alert("WhatsApp settings saved successfully.");
                  }
                } catch (error: any) {
                  alert(error.message || "Saving failed.");
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] text-xs font-bold transition shadow"
            >
              <Save className="w-4 h-4" />
              Save WhatsApp Settings
            </button>
          </div>
        </div>

        {/* Form 3: Password Change */}
        <form onSubmit={handleChangePassword} className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="border-b border-[#C9B38D]/20 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#C9B38D]" />
              <span>ایڈمن پاس ورڈ تبدیل کریں</span>
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              اپنے اکاؤنٹ کو محفوظ رکھنے کے لیے پاس ورڈ باقاعدگی سے تبدیل کریں
            </p>
          </div>

          {passwordError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>پاس ورڈ کامیابی سے تبدیل کر دیا گیا ہے!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">موجودہ پاس ورڈ *</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نیا پاس ورڈ *</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نئے پاس ورڈ کی تصدیق *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold transition shadow"
            >
              <Lock className="w-4 h-4" />
              <span>{savingPassword ? "تبدیل ہو رہا ہے..." : "پاس ورڈ تبدیل کریں"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
