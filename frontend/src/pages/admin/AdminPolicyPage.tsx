"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Shield,
  BookCheck,
  Heart,
  Award,
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  BookOpenCheck,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RotateCcw
} from "lucide-react";
import { api } from "@/services/api";

export default function AdminPolicyPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [policyData, setPolicyData] = useState<any>({
    header: {
      badge: "تعارف اور اغراض و مقاصد",
      title: "علومِ آلِ محمدؑ کا امین اور فکری رہنمائی کا مرکز",
      subtitle: "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) دینِ اسلام کی سربلندی، عقائدِ حقہ کی ترویج، اور نسلِ نو کو جدید تقاضوں کے مطابق باعمل مسلمان بنانے کے لیے کوشاں ہے۔"
    },
    stats: [
      { id: "stat-1", title: "حکومتی و حوزوی الحاق", desc: "منظور شدہ باضابطہ اسناد", icon: "Shield" },
      { id: "stat-2", title: "معیاری تعلیمی نصاب", desc: "دینی و عصری علوم کا امتزاج", icon: "BookCheck" },
      { id: "stat-3", title: "مکمل فلاحی نظام", desc: "مفت رہائش، طعام و کتب", icon: "Heart" }
    ],
    campusCard: {
      image: "/images/hero-banner.png",
      badge: "کیمپس مدرسہ و جامع مسجد",
      title: "احسن آباد 3، گلزار ہجری، کراچی",
      subtitle: "وسیع و عریض تعلیمی، روحانی و فلاحی کیمپس",
      hadithArabic: "مَنْ تَعَلَّمَ الْعِلْمَ وَعَمِلَ بِهِ وَعَلَّمَ لِلَّهِ دُعِيَ فِي مَلَكُوتِ السَّمَاوَاتِ عَظِيمًا",
      hadithUrdu: "جو علم حاصل کرے، اس پر عمل کرے اور اللہ کی خاطر دوسروں کو سکھائے، وہ آسمانوں کی بادشاہت میں عظیم پکارا جاتا ہے۔",
      hadithSource: "— امام جعفر صادق علیہ السلام (اصولِ کافی)"
    },
    sectionHeader: {
      badge: "ادارہ کے اہداف و ترجیحات",
      title: "ہماری بنیادی تعلیمی اور تربیتی پالیسی",
      subtitle: "ادارے کا مقصد صرف کتب پڑھانا نہیں بلکہ طالب علم کے فکر، عمل، کردار اور اخلاق کو اسوہ معصومینؑ کے مطابق نکھارنا ہے۔"
    },
    policyGoals: [
      {
        id: "1",
        badge: "بنیادی عقائد",
        title: "بچوں کے عقائد پر خصوصی توجہ",
        desc: "توحید، عدل، نبوت، امامت اور قیامت کے بنیادی اور گہرے عقائد کی مدلل اور دلنشین تفہیم تاکہ بچہ عقائدی لحاظ سے پختہ اور ثابت قدم رہے۔",
        iconName: "ShieldCheck"
      },
      {
        id: "2",
        badge: "اخلاق و کردار",
        title: "بچوں کی اخلاقی تربیت پر خصوصی توجہ",
        desc: "تزکیہ نفس، احترامِ والدین، سچائی، امانت داری، ایثار اور سیرتِ معصومینؑ کے مطابق مثالی اخلاق و کردار سازی۔",
        iconName: "HeartHandshake"
      },
      {
        id: "3",
        badge: "اہلِ علم اساتذہ",
        title: "جدید تقاضوں سے ہم آہنگ تربیت یافتہ اساتذہ",
        desc: "حوزاتِ علمیہ سے فارغ التحصیل اور جدید پیڈاگوجی کے ماہر شفیق و باصلاحیت اساتذہ کرام جو انفرادی توجہ اور شفقت سے تدریس کرتے ہیں۔",
        iconName: "GraduationCap"
      },
      {
        id: "4",
        badge: "دینی و عصری سنگم",
        title: "دینی تعلیم کے ساتھ عصری علوم کی تعلیم",
        desc: "قرآنی و حوزوی علوم کے ساتھ ساتھ انگلش، سائنس، ریاضی اور کمپیوٹر کی متوازن تدریس تاکہ طالب علم دونوں جہانوں میں سرخرو ہو۔",
        iconName: "BookOpenCheck"
      },
      {
        id: "5",
        badge: "باہمی رابطہ",
        title: "والدین کے ساتھ مکمل ہم آہنگی",
        desc: "بچے کی فکری، اخلاقی اور تعلیمی ترقی پر والدین کے ساتھ مسلسل اور باقاعدہ رابطہ، مشاورت اور تربیتی سیشنز کا اہتمام۔",
        iconName: "Users"
      },
      {
        id: "6",
        badge: "۵ سالہ نصاب",
        title: "معیاری نصابِ تعلیم",
        desc: "پانچ سالہ منظم اور ہمہ جہت تعلیمی نصاب جو حوزوی علوم قم و نجف کے روایتی دروس اور معاصر تعلیمی اصولوں کا شاہکار امتزاج ہے۔",
        iconName: "Award"
      }
    ],
    admissionCallout: {
      title: "تعلیمی سال ۲۰۲۶ - ۲۰۲۷ کے لیے داخلے جاری ہیں",
      desc: "چھٹی جماعت پاس طلبہ جن کی عمر ۱۱ تا ۱۶ سال ہو، ٹیسٹ و انٹرویو کے لیے اپلائی کر سکتے ہیں۔",
      btnText: "آن لائن داخلہ فارم"
    }
  });

  useEffect(() => {
    let isMounted = true;
    const loadPolicy = async () => {
      try {
        const res = await api.policy.get();
        if (isMounted && res.success && res.data) {
          setPolicyData((prev: any) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.warn("Using fallback policy content");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadPolicy();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.policy.update(policyData);
      if (res.success) {
        setMessage({ type: "success", text: "تعارف و مقاصد کا مواد کامیابی سے محفوظ ہو گیا ہے!" });
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

  const handleAddGoal = () => {
    const newId = String(Date.now());
    const newGoal = {
      id: newId,
      badge: "نئی پالیسی",
      title: "عنوان درج کریں",
      desc: "اس ہدف یا پالیسی کی تفصیلات یہاں لکھیں۔",
      iconName: "ShieldCheck"
    };
    setPolicyData({
      ...policyData,
      policyGoals: [...(policyData.policyGoals || []), newGoal]
    });
  };

  const handleRemoveGoal = (id: string) => {
    if (confirm("کیا آپ واقعی اس ہدف کو حذف کرنا چاہتے ہیں؟")) {
      setPolicyData({
        ...policyData,
        policyGoals: policyData.policyGoals.filter((g: any) => g.id !== id)
      });
    }
  };

  const handleGoalChange = (id: string, field: string, val: string) => {
    setPolicyData({
      ...policyData,
      policyGoals: policyData.policyGoals.map((g: any) =>
        g.id === id ? { ...g, [field]: val } : g
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
            <span>تعارف و مقاصد صفحہ کا مواد (Policy CMS)</span>
          </h2>
          <p className="text-xs text-[#C9B38D]">
            ویب سائٹ کے "تعارف و مقاصد" پیج کا تمام ڈیٹا، اہداف اور بیانات لائیو تبدیل کریں
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/policy"
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
          <span>۱. مین ہیرو ہیڈر و تعارفی بیان</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">چھوٹا بیج (Badge)</label>
            <input
              type="text"
              value={policyData.header?.badge || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  header: { ...policyData.header, badge: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">بڑا عنوان (Main Title)</label>
            <input
              type="text"
              value={policyData.header?.title || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  header: { ...policyData.header, title: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-stone-300 mb-1.5 font-bold">تفصیلی تعارف و بیان (Subtitle)</label>
          <textarea
            rows={3}
            value={policyData.header?.subtitle || ""}
            onChange={(e) =>
              setPolicyData({
                ...policyData,
                header: { ...policyData.header, subtitle: e.target.value }
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D] leading-[2.2]"
          />
        </div>
      </div>

      {/* 2. THREE KEY STATS / HIGHLIGHTS */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#C9B38D]/15 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
          <span>۲. ہیرو کے نچلے ۳ اہم فیچرز (Highlights)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(policyData.stats || []).map((st: any, idx: number) => (
            <div key={st.id || idx} className="p-4 rounded-2xl bg-[#120A05] border border-[#C9B38D]/20 space-y-3">
              <div>
                <label className="block text-xs text-[#C9B38D] mb-1">عنوان (فیچر {idx + 1})</label>
                <input
                  type="text"
                  value={st.title}
                  onChange={(e) => {
                    const next = [...policyData.stats];
                    next[idx].title = e.target.value;
                    setPolicyData({ ...policyData, stats: next });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-400 mb-1">تفصیل</label>
                <input
                  type="text"
                  value={st.desc}
                  onChange={(e) => {
                    const next = [...policyData.stats];
                    next[idx].desc = e.target.value;
                    setPolicyData({ ...policyData, stats: next });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-stone-200 text-xs outline-none focus:border-[#C9B38D]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CAMPUS & HADITH CARD */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#C9B38D]/15 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
          <span>۳. کیمپس تصویر و حدیثِ مبارکہ کارڈ</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">کیمپس کا مقام و پتہ</label>
            <input
              type="text"
              value={policyData.campusCard?.title || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  campusCard: { ...policyData.campusCard, title: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">تصویر کا ربط (Image URL)</label>
            <input
              type="text"
              value={policyData.campusCard?.image || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  campusCard: { ...policyData.campusCard, image: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs text-[#C9B38D] mb-1 font-bold">عربی حدیث شریف (متن)</label>
            <input
              type="text"
              value={policyData.campusCard?.hadithArabic || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  campusCard: { ...policyData.campusCard, hadithArabic: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm font-arabic outline-none focus:border-[#C9B38D]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1 font-bold">اردو ترجمہ</label>
            <textarea
              rows={2}
              value={policyData.campusCard?.hadithUrdu || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  campusCard: { ...policyData.campusCard, hadithUrdu: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D] leading-[2.2]"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-400 mb-1 font-bold">مستند حوالہ / کتاب</label>
            <input
              type="text"
              value={policyData.campusCard?.hadithSource || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  campusCard: { ...policyData.campusCard, hadithSource: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-[#C9B38D] text-xs outline-none focus:border-[#C9B38D]"
            />
          </div>
        </div>
      </div>

      {/* 4. POLICY GOALS CARDS */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#C9B38D]/15 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
            <span>۴. بنیادی تعلیمی و تربیتی اہداف (Policy Goals)</span>
          </h3>

          <button
            onClick={handleAddGoal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C9B38D]/20 hover:bg-[#C9B38D]/30 text-[#C9B38D] text-xs font-bold border border-[#C9B38D]/40 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>نیا ہدف شامل کریں</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(policyData.policyGoals || []).map((goal: any, index: number) => (
            <div
              key={goal.id}
              className="p-5 rounded-2xl bg-[#120A05] border border-[#C9B38D]/25 space-y-3 relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-400">ہدف #{index + 1}</span>
                <button
                  onClick={() => handleRemoveGoal(goal.id)}
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
                    value={goal.badge}
                    onChange={(e) => handleGoalChange(goal.id, "badge", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-300 mb-1">عنوان (Title)</label>
                  <input
                    type="text"
                    value={goal.title}
                    onChange={(e) => handleGoalChange(goal.id, "title", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-xs outline-none focus:border-[#C9B38D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">تفصیل (Description)</label>
                <textarea
                  rows={2}
                  value={goal.desc}
                  onChange={(e) => handleGoalChange(goal.id, "desc", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1A0E08] border border-[#C9B38D]/30 text-stone-200 text-xs outline-none focus:border-[#C9B38D] leading-[2.0]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ADMISSION CALLOUT */}
      <div className="p-6 rounded-3xl bg-[#1A0E08] border border-[#C9B38D]/25 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#C9B38D]/15 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
          <span>۵. نچلا داخلہ کال آؤٹ باکس (Admission Banner)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">بینر کا عنوان</label>
            <input
              type="text"
              value={policyData.admissionCallout?.title || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  admissionCallout: { ...policyData.admissionCallout, title: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-bold">بٹن کا متن</label>
            <input
              type="text"
              value={policyData.admissionCallout?.btnText || ""}
              onChange={(e) =>
                setPolicyData({
                  ...policyData,
                  admissionCallout: { ...policyData.admissionCallout, btnText: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-stone-300 mb-1.5 font-bold">بینر کی تفصیل</label>
          <input
            type="text"
            value={policyData.admissionCallout?.desc || ""}
            onChange={(e) =>
              setPolicyData({
                ...policyData,
                admissionCallout: { ...policyData.admissionCallout, desc: e.target.value }
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm outline-none focus:border-[#C9B38D]"
          />
        </div>
      </div>
    </div>
  );
}
