"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Users,
  Award,
  BookOpen,
  Calendar,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { api } from "@/services/api";

export default function AdminWomensPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [womensData, setWomensData] = useState<any>({
    hero: {
      badge: "شعبہ خواتین",
      title: "شعبہ خواتین — جامعہ سیدہ فاطمۃ الزہراءؑ",
      subtitle: "اسلامی تعلیمات اور تربیتی پروگرام برائے خواتین | شرعی تقاضوں کے عین مطابق، باوقار ماحول اور تجربہ کار معلمات کی زیرِ نگرانی فکری و روحانی بالیدگی کا مرکز۔"
    },
    stats: [
      { id: "ws-1", value: "۱۰۰٪ پردہ دار", label: "محفوظ و باوقار کیمپس" },
      { id: "ws-2", value: "خواتین اساتذہ", label: "مستند و فاضل معلمات" },
      { id: "ws-3", value: "عملی کورسز", label: "غسل و کفن و احکام" },
      { id: "ws-4", value: "مفت کلاسز", label: "فی سبیل اللہ خدمات" }
    ],
    mission: {
      badge: "تعارف و اغراض و مقاصد",
      title: "شعبہ خواتین کا مشن اور ویژن",
      desc: "شعبہ خواتین کا قیام اس مقصد کے تحت عمل میں لایا گیا ہے کہ ہماری مائیں، بہنیں اور بیٹیاں سیرتِ سیدہ فاطمۃ الزہراء (سلام اللہ علیہا) اور ثانیِ زہراء حضرت زینبِ کبریٰ (سلام اللہ علیہا) کے نقوشِ قدم پر چلتے ہوئے قرآن و سنت، فقہی مسائل اور فکری شعور سے آراستہ ہوں۔",
      features: [
        { id: "mf-1", text: "خواتین کے لیے مکمل طور پر جداگانہ دروازہ، برآمدہ اور کلاس رومز۔" },
        { id: "mf-2", text: "تمام اسباق، تربیت اور ورکشاپس صرف تجربہ کار خواتین معلمات کے سپرد۔" },
        { id: "mf-3", text: "گھریلو خواتین اور ملازمت پیشہ بہنوں کے لیے اوقاتِ کار میں لچک اور سہولت۔" },
        { id: "mf-4", text: "تربیتِ اولاد، ازدواجی زندگی کی خوشحالی اور اخلاقی کردار سازی پر خصوصی رہنمائی۔" }
      ],
      campusImage: "/images/women-campus.jpg",
      campusBadge: "کیمپس برائے طالبات و خواتین",
      campusDesc: "مکمل طور پر الگ عمارت، جدید کلاس رومز اور پردے کے شرعی انتظامات"
    },
    courses: [
      {
        id: "wc-1",
        badge: "بنیادی فقہ و عبادات",
        title: "احکامِ نسواں و طہارت",
        duration: "۳ ماہ (ہفتہ میں ۳ دن)",
        format: "حضوری و آن لائن",
        description: "خواتین کے مخصوص شرعی مسائل، نماز، روزہ، وضو، غسل اور روزمرہ فقہی احکام پر تفصیلی و مدلل کلاسز مع سوال و جواب۔"
      },
      {
        id: "wc-2",
        badge: "قرآنی علوم",
        title: "تجوید، ترتیل و تفہیمِ قرآن",
        duration: "۶ ماہ (روزانہ)",
        format: "حضوری (کیمپس)",
        description: "تجوید کے مستند قواعد کے ساتھ قرآنِ پاک کی درست تلاوت، نماز کے اذکار کی تصحیح اور منتخب سورتوں کا باقاعدہ فہم و ترجمہ۔"
      }
    ],
    workshops: [
      {
        id: "ww-1",
        badge: "اہم ترین فرض",
        title: "غسل و تکفین کی عملی تربیت",
        schedule: "ماہانہ تربیتی ورکشاپ",
        description: "خواتین کے لیے میت کے غسل، کفن پہنانے، شرعی مسائل اور عملی طریقے سکھانے کا باقاعدہ ڈیمو تاکہ ہر محلے اور خاندان میں مستند تربیت یافتہ بہنیں موجود ہوں۔"
      }
    ],
    contact: {
      phone: "+92 300 0000000",
      whatsapp: "+92 300 0000000",
      timing: "صبح کا وقت (9:00 تا 1:00)",
      location: "شعبہ خواتین، مدرسہ صاحب الزمان، احسن آباد 3، کراچی"
    }
  });

  useEffect(() => {
    let isMounted = true;
    const loadWomens = async () => {
      try {
        const res = await api.womens.get();
        if (isMounted && res.success && res.data) {
          setWomensData((prev: any) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.warn("Using fallback womens content");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadWomens();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.womens.update(womensData);
      if (res.success) {
        setMessage({ type: "success", text: "شعبہ خواتین کا مواد کامیابی سے محفوظ ہو گیا ہے!" });
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({ type: "error", text: res.message || "محفوظ کرنے میں خرابی پیش آئی" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "سرور سے رابطہ نہ ہو سکا" });
    } finally {
      setSaving(false);
    }
  };

  const handleAddCourse = () => {
    const newCourse = {
      id: "wc-" + Date.now(),
      badge: "نیا کورس",
      title: "عنوان درج کریں",
      duration: "۳ ماہ",
      format: "حضوری / آن لائن",
      description: "اس کورس کی تفصیل اور اغراض و مقاصد یہاں درج کریں۔"
    };
    setWomensData({
      ...womensData,
      courses: [...(womensData.courses || []), newCourse]
    });
  };

  const handleRemoveCourse = (id: string) => {
    if (confirm("کیا آپ واقعی اس کورس کو حذف کرنا چاہتے ہیں؟")) {
      setWomensData({
        ...womensData,
        courses: womensData.courses.filter((c: any) => c.id !== id)
      });
    }
  };

  const handleCourseChange = (id: string, field: string, val: string) => {
    setWomensData({
      ...womensData,
      courses: womensData.courses.map((c: any) =>
        c.id === id ? { ...c, [field]: val } : c
      )
    });
  };

  const handleAddWorkshop = () => {
    const newWorkshop = {
      id: "ww-" + Date.now(),
      badge: "ورکشاپ",
      title: "ورکشاپ کا عنوان",
      schedule: "ماہانہ",
      description: "ورکشاپ کی تفصیلات یہاں لکھیں۔"
    };
    setWomensData({
      ...womensData,
      workshops: [...(womensData.workshops || []), newWorkshop]
    });
  };

  const handleRemoveWorkshop = (id: string) => {
    if (confirm("کیا آپ واقعی اس ورکشاپ کو حذف کرنا چاہتے ہیں؟")) {
      setWomensData({
        ...womensData,
        workshops: womensData.workshops.filter((w: any) => w.id !== id)
      });
    }
  };

  const handleWorkshopChange = (id: string, field: string, val: string) => {
    setWomensData({
      ...womensData,
      workshops: womensData.workshops.map((w: any) =>
        w.id === id ? { ...w, [field]: val } : w
      )
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9B38D] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 font-urdu text-right" dir="rtl">
      {/* Sticky Top Action Bar */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3.5 bg-[#120A05]/90 backdrop-blur-xl border-b border-[#C9B38D]/25 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>شعبہ خواتین صفحہ کا مواد (Women's CMS)</span>
          </h2>
          <p className="text-xs text-[#C9B38D]">
            جامعہ سیدہ فاطمۃ الزہراءؑ پیج کے کورسز، ورکشاپس، مشن اور تفصیلات کو لائیو تبدیل کریں
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/womens-department"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-bold border border-white/10 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>لائیو پیج دیکھیں</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs sm:text-sm font-bold shadow-lg hover:brightness-105 active:scale-95 transition disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#120A05] border-t-transparent rounded-full animate-spin" />
                <span>محفوظ ہو رہا ہے...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>تبدیلیاں محفوظ کریں</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 animate-fadeIn text-sm font-bold ${
            message.type === "success"
              ? "bg-green-950/80 border border-green-500/50 text-green-300"
              : "bg-red-950/80 border border-red-500/50 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#C9B38D]/15 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
          <span>۱. ہیرو ہیڈر و تعارف</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">چھوٹا بیج (Badge)</label>
            <input
              type="text"
              value={womensData.hero?.badge || ""}
              onChange={(e) =>
                setWomensData({
                  ...womensData,
                  hero: { ...womensData.hero, badge: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">بڑا عنوان (Main Title)</label>
            <input
              type="text"
              value={womensData.hero?.title || ""}
              onChange={(e) =>
                setWomensData({
                  ...womensData,
                  hero: { ...womensData.hero, title: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-stone-300 mb-1.5 font-bold">تعارفی پیراگراف (Subtitle)</label>
          <textarea
            rows={3}
            value={womensData.hero?.subtitle || ""}
            onChange={(e) =>
              setWomensData({
                ...womensData,
                hero: { ...womensData.hero, subtitle: e.target.value }
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D] leading-[2.2]"
          />
        </div>
      </div>

      {/* 2. STATS */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#C9B38D]/15 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
          <span>۲. ہیرو کے نچلے ۴ اہم کی پوائنٹس (Stats)</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(womensData.stats || []).map((st: any, idx: number) => (
            <div key={st.id || idx} className="p-4 rounded-2xl bg-[#120A05] border border-[#C9B38D]/20 space-y-2">
              <div>
                <label className="block text-[11px] text-[#C9B38D] mb-1">اہم قدر (Value)</label>
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => {
                    const next = [...womensData.stats];
                    next[idx].value = e.target.value;
                    setWomensData({ ...womensData, stats: next });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-400 mb-1">لیبل (Label)</label>
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => {
                    const next = [...womensData.stats];
                    next[idx].label = e.target.value;
                    setWomensData({ ...womensData, stats: next });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-stone-200 text-xs outline-none focus:border-[#C9B38D]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MISSION & CAMPUS */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#C9B38D]/15 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
          <span>۳. مشن، ویژن اور کیمپس امیج</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">مشن سیکشن عنوان</label>
            <input
              type="text"
              value={womensData.mission?.title || ""}
              onChange={(e) =>
                setWomensData({
                  ...womensData,
                  mission: { ...womensData.mission, title: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">کیمپس تصویر (Image URL)</label>
            <input
              type="text"
              value={womensData.mission?.campusImage || ""}
              onChange={(e) =>
                setWomensData({
                  ...womensData,
                  mission: { ...womensData.mission, campusImage: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-stone-300 mb-1.5 font-bold">مشن کی تفصیل</label>
          <textarea
            rows={3}
            value={womensData.mission?.desc || ""}
            onChange={(e) =>
              setWomensData({
                ...womensData,
                mission: { ...womensData.mission, desc: e.target.value }
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D] leading-[2.2]"
          />
        </div>
      </div>

      {/* 4. COURSES MANAGER */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#C9B38D]/15 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
            <span>۴. شعبہ خواتین کے کورسز (Courses Catalog)</span>
          </h3>

          <button
            onClick={handleAddCourse}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C9B38D]/20 hover:bg-[#C9B38D]/30 text-[#C9B38D] text-xs font-bold border border-[#C9B38D]/40 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>نیا کورس شامل کریں</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(womensData.courses || []).map((crs: any, idx: number) => (
            <div
              key={crs.id}
              className="p-5 rounded-2xl bg-[#120A05] border border-[#C9B38D]/25 space-y-3 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-400">کورس #{idx + 1}</span>
                <button
                  onClick={() => handleRemoveCourse(crs.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                  title="حذف کریں"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-[#C9B38D] mb-1">بیج (Badge)</label>
                  <input
                    type="text"
                    value={crs.badge}
                    onChange={(e) => handleCourseChange(crs.id, "badge", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-300 mb-1">عنوان (Title)</label>
                  <input
                    type="text"
                    value={crs.title}
                    onChange={(e) => handleCourseChange(crs.id, "title", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">مدت (Duration)</label>
                  <input
                    type="text"
                    value={crs.duration}
                    onChange={(e) => handleCourseChange(crs.id, "duration", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">طریقہ (Format)</label>
                  <input
                    type="text"
                    value={crs.format}
                    onChange={(e) => handleCourseChange(crs.id, "format", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">تفصیل</label>
                <textarea
                  rows={2}
                  value={crs.description}
                  onChange={(e) => handleCourseChange(crs.id, "description", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-stone-200 text-xs outline-none focus:border-[#C9B38D] leading-[2.0]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. WORKSHOPS MANAGER */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#C9B38D]/15 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
            <span>۵. عملی تربیتی ورکشاپس (Workshops)</span>
          </h3>

          <button
            onClick={handleAddWorkshop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C9B38D]/20 hover:bg-[#C9B38D]/30 text-[#C9B38D] text-xs font-bold border border-[#C9B38D]/40 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>نئی ورکشاپ شامل کریں</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(womensData.workshops || []).map((w: any, idx: number) => (
            <div
              key={w.id}
              className="p-5 rounded-2xl bg-[#120A05] border border-[#C9B38D]/25 space-y-3 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-400">ورکشاپ #{idx + 1}</span>
                <button
                  onClick={() => handleRemoveWorkshop(w.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                  title="حذف کریں"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-[#C9B38D] mb-1">بیج (Badge)</label>
                  <input
                    type="text"
                    value={w.badge}
                    onChange={(e) => handleWorkshopChange(w.id, "badge", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-300 mb-1">عنوان (Title)</label>
                  <input
                    type="text"
                    value={w.title}
                    onChange={(e) => handleWorkshopChange(w.id, "title", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">اوقات / شیڈول</label>
                <input
                  type="text"
                  value={w.schedule}
                  onChange={(e) => handleWorkshopChange(w.id, "schedule", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">تفصیل</label>
                <textarea
                  rows={2}
                  value={w.description}
                  onChange={(e) => handleWorkshopChange(w.id, "description", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-stone-200 text-xs outline-none focus:border-[#C9B38D] leading-[2.0]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
