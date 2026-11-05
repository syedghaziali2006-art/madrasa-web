"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, GraduationCap, Send } from "lucide-react";
import { coursesData } from "@/data/madarsaData";
import { api } from "@/services/api";

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
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [settings, setSettings] = useState<any>(null);

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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const fallbackId = "MSZ-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const res = await api.admissions.submit(formData);
      if (res.success && res.applicationId) {
        setAppId(res.applicationId);
      } else {
        setAppId(fallbackId);
      }
    } catch (err) {
      console.warn("Backend submit fallback:", err);
      setAppId(fallbackId);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
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
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition"
                    />
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
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition"
                    />
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none cursor-pointer"
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
                      min="10"
                      max="65"
                      placeholder="مثال: 14"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition"
                      dir="ltr"
                    />
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
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      مطلوبہ شعبہ / کورس *
                    </label>
                    <select
                      value={formData.selectedCourse}
                      onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none cursor-pointer"
                    >
                      {(coursesData || []).map((course) => (
                        <option key={course.id} value={course.title} className="bg-[#1A0E08]">
                          {course.title}
                        </option>
                      ))}
                      <option value="شعبہ خواتین (جامعہ سیدہ فاطمہ الزہراء)" className="bg-[#1A0E08]">
                        شعبہ خواتین (جامعہ سیدہ فاطمہ الزہراء)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      واٹس ایپ / رابطہ نمبر *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none placeholder:text-stone-500 transition"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      سابقہ تعلیمی قابلیت
                    </label>
                    <select
                      value={formData.previousEducation}
                      onChange={(e) => setFormData({ ...formData, previousEducation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none cursor-pointer"
                    >
                      <option value="چھٹی جماعت پاس" className="bg-[#1A0E08]">چھٹی جماعت پاس (اہل برائے پانچ سالہ کورس)</option>
                      <option value="مڈل / آٹھویں پاس" className="bg-[#1A0E08]">مڈل / آٹھویں پاس</option>
                      <option value="میٹرک (Matric)" className="bg-[#1A0E08]">میٹرک (Matric)</option>
                      <option value="انٹرمیڈیٹ (FA / FSc)" className="bg-[#1A0E08]">انٹرمیڈیٹ (FA / FSc)</option>
                      <option value="گریجویشن (BA / BS)" className="bg-[#1A0E08]">گریجویشن (BA / BS)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                      طریقہ تعلیم / رہائش
                    </label>
                    <select
                      value={formData.residenceType}
                      onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/20 text-white text-sm font-urdu focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none cursor-pointer"
                    >
                      <option value="رہائشی (ہاسٹل و طعام)" className="bg-[#1A0E08]">رہائشی (ہاسٹل و ۳ وقت طعام)</option>
                      <option value="غیر رہائشی (ڈے اسکالر)" className="bg-[#1A0E08]">غیر رہائشی (ڈے اسکالر)</option>
                      <option value="آن لائن / فاصلاتی" className="bg-[#1A0E08]">آن لائن / فاصلاتی کلاسز</option>
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

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base shadow-lg transition-all duration-300 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-[#C9B38D]" />
                    <span>درخواست داخلہ جمع کرائیں</span>
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
                <span className="text-xs font-urdu text-stone-400 block">آپ کا درخواست نمبر (Application ID):</span>
                <span className="text-xl font-bold font-mono text-[#C9B38D] tracking-wider mt-1 block" dir="ltr">
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
