"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, GraduationCap, Send, Copy, Check, AlertCircle } from "lucide-react";
import { coursesData } from "@/data/madarsaData";
import { api } from "@/services/api";
import { isValidPhoneNumber, sanitizeText } from "@/lib/validation";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export default function AdmissionModal({ isOpen, onClose, defaultCourse }: AdmissionModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    age: "",
    gender: "طالب علم (مرد)",
    phone: "",
    city: "",
    selectedCourse: defaultCourse || coursesData?.[0]?.title || "حوزوی تعلیم (درسِ نظامی ۵ سالہ)",
    previousEducation: "چھٹی جماعت پاس",
    residenceType: "رہائشی (ہاسٹل و طعام کے ساتھ)",
    message: "",
    whatsappConsent: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultCourse) {
      setFormData((prev) => ({ ...prev, selectedCourse: defaultCourse }));
    }
  }, [defaultCourse]);

  useEffect(() => {
    let isMounted = true;
    api.settings
      .get()
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setSettings(res.data);
        }
      })
      .catch((err) => console.warn("Failed to load settings in modal:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const fullName = sanitizeText(formData.fullName, 80);
    const fatherName = sanitizeText(formData.fatherName, 80);
    const city = sanitizeText(formData.city, 80);
    const age = Number(formData.age);
    const phone = sanitizeText(formData.phone, 30);

    if (!fullName || fullName.length < 2) nextErrors.fullName = "نام امیدوار درج کریں۔";
    if (!fatherName || fatherName.length < 2) nextErrors.fatherName = "والد / سرپرست کا نام درج کریں۔";
    if (!city || city.length < 2) nextErrors.city = "شہر یا علاقہ درج کریں۔";
    if (!Number.isFinite(age) || age < 8 || age > 35) nextErrors.age = "عمر 8 تا 35 سال کے درمیان ہونی چاہیے۔";
    if (!phone || !isValidPhoneNumber(phone)) nextErrors.phone = "براہ کرم درست موبائل نمبر درج کریں۔";
    if (!formData.whatsappConsent) nextErrors.whatsappConsent = "براہِ کرم واٹس ایپ نوٹیفکیشن کے لیے اجازت دیں۔";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    const fallbackId = "MSZ-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const res = await api.admissions.submit({
        ...formData,
        fullName: sanitizeText(formData.fullName, 80),
        fatherName: sanitizeText(formData.fatherName, 80),
        city: sanitizeText(formData.city, 80),
        phone: sanitizeText(formData.phone, 30),
        message: sanitizeText(formData.message, 500),
        whatsappConsent: Boolean(formData.whatsappConsent),
      });
      if (res.success && res.applicationId) {
        setAppId(res.applicationId);
      } else {
        setAppId(fallbackId);
      }
    } catch (err: any) {
      console.warn("Backend submit fallback:", err);
      setAppId(fallbackId);
      setErrors((prev) => ({ ...prev, submit: err.message || "درخواست جمع کرنے میں خرابی ہوئی۔" }));
      setSubmitting(false);
      return;
    } finally {
      setSubmitting(false);
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const handleCopyAppId = async () => {
    if (!appId) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(appId);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = appId;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.warn("Copy failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="border-2 border-amber-500/40 p-[2px] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.9)] w-full max-w-2xl my-6">
        <div className="relative w-full backdrop-blur-2xl backdrop-saturate-150 rounded-[30px] p-6 sm:p-8">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-white hover:text-[#C9B38D] hover:bg-white/20 transition"
            aria-label="بند کریں"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] text-xs font-urdu font-semibold text-[#C9B38D] border border-[#C9B38D]/40 mb-2">
                  
                  <span>{settings?.marqueeNotice || "تعلیمی سال ۲۰۲۶ - ۲۰۲۷ (داخلے جاری ہیں)"}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-urdu font-bold text-white pb-3">
                  آن لائن درخواستِ داخلہ فارم
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-urdu mt-1.5 leading-[2.2]">
                  {settings?.madarsaName || "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف)"} میں داخلہ کے لیے معلومات درج فرمائیں
                </p>

                {/* Dynamic Requirements Info Bar */}
                {settings && (
                  <div className="mt-4 p-3 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-urdu text-stone-300">
                    <div>
                      <span className="text-[#C9B38D] block font-bold">عمر کی حد:</span>
                      <span>{settings.ageLimit || "11 تا 16 سال"}</span>
                    </div>
                    <div>
                      <span className="text-[#C9B38D] block font-bold">کم از کم قابلیت:</span>
                      <span>{settings.minQualification || "چھٹی پاس"}</span>
                    </div>
                    <div>
                      <span className="text-[#C9B38D] block font-bold">ٹیسٹ مضامین:</span>
                      <span className="truncate block" title={settings.testSubjects}>{settings.testSubjects || "اردو، انگلش، قرآن"}</span>
                    </div>
                    <div>
                      <span className="text-[#C9B38D] block font-bold">ماہانہ فیس:</span>
                      <span>{settings.monthlyFee || "1500 روپے"}</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.submit && (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-200">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errors.submit}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      نام امیدوار *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: علی رضا"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border ${errors.fullName ? "border-rose-500/80" : "border-[#C9B38D]/20"} text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition`}
                    />
                    {errors.fullName && <p className="mt-1 text-[11px] text-rose-300">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      والد / سرپرست کا نام *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: محمد رضا"
                      value={formData.fatherName}
                      onChange={(e) => {
                        setFormData({ ...formData, fatherName: e.target.value });
                        if (errors.fatherName) setErrors((prev) => ({ ...prev, fatherName: "" }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border ${errors.fatherName ? "border-rose-500/80" : "border-[#C9B38D]/20"} text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition`}
                    />
                    {errors.fatherName && <p className="mt-1 text-[11px] text-rose-300">{errors.fatherName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      جنس *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none cursor-pointer"
                    >
                      <option value="طالب علم (مرد)" className="bg-[#1A0E08]">طالب علم (مرد)</option>
                      <option value="طالبہ (خاتون - کیمپس زہراء)" className="bg-[#1A0E08]">طالبہ (خاتون - جامعہ زہراء)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      عمر (سال) *
                    </label>
                    <input
                      type="number"
                      required
                      min="8"
                      max="35"
                      placeholder="مثال: 14"
                      value={formData.age}
                      onChange={(e) => {
                        setFormData({ ...formData, age: e.target.value });
                        if (errors.age) setErrors((prev) => ({ ...prev, age: "" }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border ${errors.age ? "border-rose-500/80" : "border-[#C9B38D]/20"} text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition`}
                      dir="ltr"
                    />
                    {errors.age && <p className="mt-1 text-[11px] text-rose-300">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      شہر / علاقہ *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: کراچی / لاہور"
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border ${errors.city ? "border-rose-500/80" : "border-[#C9B38D]/20"} text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition`}
                    />
                    {errors.city && <p className="mt-1 text-[11px] text-rose-300">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      واٹس ایپ / رابطہ نمبر *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border ${errors.phone ? "border-rose-500/80" : "border-[#C9B38D]/20"} text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition`}
                      dir="ltr"
                    />
                    {errors.phone && <p className="mt-1 text-[11px] text-rose-300">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      سابقہ تعلیمی قابلیت
                    </label>
                    <select
                      value={formData.previousEducation}
                      onChange={(e) => setFormData({ ...formData, previousEducation: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition"
                    >
                      <option value="چھٹی جماعت پاس" className="bg-[#1A0E08]">چھٹی جماعت پاس (اہل برائے پانچ سالہ کورس)</option>
                      <option value="مڈل / آٹھویں پاس" className="bg-[#1A0E08]">مڈل / آٹھویں پاس</option>
                      <option value="میٹرک (Matric)" className="bg-[#1A0E08]">میٹرک (Matric)</option>
                      <option value="انٹرمیڈیٹ (FA / FSc)" className="bg-[#1A0E08]">انٹرمیڈیٹ (FA / FSc)</option>
                      <option value="گریجویشن (BA / BS)" className="bg-[#1A0E08]">گریجویشن (BA / BS)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                    کوئی اضافی تفصیل یا پیغام (اختیاری)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="کوئی خاص معلومات جو آپ شیئر کرنا چاہیں..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 resize-none transition"
                  />
                </div>

                <div className="mt-2 flex items-start gap-3 rounded-xl border border-[#C9B38D]/25 bg-[#1A0E08]/70 p-3 text-xs text-stone-200">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.whatsappConsent)}
                    onChange={(e) => {
                      setFormData({ ...formData, whatsappConsent: e.target.checked });
                      if (errors.whatsappConsent) setErrors((prev) => ({ ...prev, whatsappConsent: "" }));
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-[#C9B38D]/30 bg-[#1A0E08] text-[#C9B38D]"
                  />
                  <label className="leading-6">
                    میں اپنی درخواست کے حوالے سے status updates، انٹرویو اور داخلہ کے متعلق WhatsApp اطلاع حاصل کرنے کے لیے رضامند ہوں۔
                  </label>
                </div>
                {errors.whatsappConsent && <p className="mt-1 text-[11px] text-rose-300">{errors.whatsappConsent}</p>}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base shadow-lg transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#120A05]/40 border-t-[#120A05]" />
                    ) : (
                      <Send className="w-4 h-4 text-[#C9B38D]" />
                    )}
                    <span>{submitting ? "جمع ہو رہی ہے..." : "درخواست داخلہ جمع کرائیں"}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#1A0E08] border-2 border-[#C9B38D] text-[#C9B38D] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(201,179,141,0.4)]">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-urdu font-bold text-white">
                  درخواستِ داخلہ کامیابی سے موصول ہو گئی ہے!
                </h3>
                <p className="text-sm text-stone-300 font-urdu mt-2 leading-[2.2]">
                  مدرسہ انتظامیہ کی جانب سے جلد آپ کے واٹس ایپ / فون نمبر پر ٹیسٹ و انٹرویو کی تاریخ کے لیے رابطہ کیا جائے گا۔
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1A0E08] border border-[#C9B38D]/40 max-w-sm mx-auto shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-urdu text-stone-400 block">آپ کا درخواست نمبر (Application ID):</span>
                  <button
                    type="button"
                    onClick={handleCopyAppId}
                    aria-label="Copy application ID"
                    title="Copy application ID"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#C9B38D]/50 bg-[#22130B] text-[#C9B38D] transition hover:bg-[#2B1B12] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C9B38D]/60"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <span className="text-xl font-bold font-mono text-[#C9B38D] tracking-wider mt-2 block" dir="ltr">
                  {appId}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] font-urdu font-bold text-sm shadow-md transition"
              >
                ٹھیک ہے، شکریہ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
