"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  ChevronLeft,
  Users,
  ShieldCheck,
  Send,
  HelpCircle,
  Award,
  Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";
import { api } from "@/services/api";

const defaultWomensData = {
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
    },
    {
      id: "wc-3",
      badge: "خاندانی تربیت",
      title: "تربیتِ اولاد اور قرآنی اصول",
      duration: "۲ ماہ (ہفتہ وار)",
      format: "آن لائن ویبینارز",
      description: "بچوں کی دینی و اخلاقی تربیت، جدید موبائل و سوشل میڈیا کے نقصانات سے بچاؤ، اور گھر میں نورانی ماحول قائم کرنے کے عملی طریقے کتبِ احادیث کی روشنی میں۔"
    },
    {
      id: "wc-4",
      badge: "فکری و عقائدی پختگی",
      title: "عقائد و سیرتِ سیدہ معصومینؑ",
      duration: "۴ ماہ",
      format: "مخلوط و لائیو سیشنز",
      description: "توحید، امامت اور ولایت پر مدلل گفتگو، سیدہ فاطمہ زہراءؑ اور جناب زینبؑ کے مبارک خطبات کا مطالعہ اور معاصر الحاد کا مقابلہ۔"
    },
    {
      id: "wc-5",
      badge: "خطابت و ابلاغ",
      title: "فنِ خطابت و ذاکری کورس",
      duration: "۶ ماہ",
      format: "عملی مشقیں",
      description: "مستند مصائب و فضائل، تاریخی کتب کے حوالے سے بیان کا سلیقہ، لہجے کا وقار اور محافل و مجالسِ عزاء کو سنجیدہ و علمی بنانے کی تربیت۔"
    },
    {
      id: "wc-6",
      badge: "عربی زبان",
      title: "ابتدائی عربی گرامر و تفہیم",
      duration: "۳ ماہ",
      format: "کیمپس و فاصلاتی",
      description: "قرآن و دعاؤں (خصوصاً نہج البلاغہ اور صحیفہ سجادیہ) کو اصل زبان میں سمجھنے کے لیے آسان عربی قواعد و لغت کا مطالعہ۔"
    }
  ],
  workshops: [
    {
      id: "ww-1",
      badge: "اہم ترین فرض",
      title: "غسل و تکفین کی عملی تربیت",
      schedule: "ماہانہ تربیتی ورکشاپ",
      description: "خواتین کے لیے میت کے غسل، کفن پہنانے، شرعی مسائل اور عملی طریقے سکھانے کا باقاعدہ ڈیمو تاکہ ہر محلے اور خاندان میں مستند تربیت یافتہ بہنیں موجود ہوں۔"
    },
    {
      id: "ww-2",
      badge: "روحانی اجتماعات",
      title: "سالانہ محافل و عزائے سیدہؑ",
      schedule: "ایامِ فاطمیہ و محرم",
      description: "خواتین کے پردے کے سخت انتظامات کے ساتھ باوقار مجالس، دروسِ حدیث اور باہمی دعائیہ محافل کا باقاعدہ اہتمام۔"
    }
  ],
  contact: {
    phone: "+92 336 3408328",
    whatsapp: "+92 336 3408328",
    timing: "صبح کا وقت (9:00 تا 1:00)",
    location: "شعبہ خواتین، مدرسہ صاحب الزمان، احسن آباد 3، کراچی"
  }
};

export default function WomensDepartmentPage() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [womensData, setWomensData] = useState(defaultWomensData);
  const [inquiryData, setInquiryData] = useState({
    name: "",
    phone: "",
    program: "احکامِ نسواں و طہارت",
    timing: "صبح کا وقت (9:00 تا 1:00)",
    message: ""
  });

  useEffect(() => {
    let isMounted = true;
    api.womens
      .get()
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setWomensData((prev) => ({
            ...prev,
            ...res.data,
            hero: { ...prev.hero, ...res.data.hero },
            mission: { ...prev.mission, ...res.data.mission },
            contact: { ...prev.contact, ...res.data.contact },
            stats: res.data.stats || prev.stats,
            courses: res.data.courses || prev.courses,
            workshops: res.data.workshops || prev.workshops,
          }));
        }
      })
      .catch((err) => console.error("Womens data fetch error:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryData({
        name: "",
        phone: "",
        program: womensData.courses[0]?.title || "احکامِ نسواں",
        timing: womensData.contact?.timing || "صبح کا وقت (9:00 تا 1:00)",
        message: ""
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#120A05] text-[#FAF7F2] selection:bg-[#C9B38D] selection:text-[#120A05]" dir="rtl">
      <Navbar
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenDonation={() => {
          window.location.href = "/#donation";
        }}
        onOpenContact={() => {
          window.location.href = "/#contact";
        }}
      />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#120A05] border-b border-[#C9B38D]/20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#C9B38D]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#1A0E08] rounded-full blur-[130px] pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-urdu font-bold text-white leading-[1.7] mb-6">
            {womensData.hero.title}
          </h1>

          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full mb-6 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] max-w-3xl mx-auto font-medium">
            {womensData.hero.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-[#C9B38D]/20">
            {womensData.stats.map((st: any, idx: number) => (
              <div key={st.id || idx} className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
                <span className="text-2xl sm:text-3xl font-bold font-urdu text-[#C9B38D] block">{st.value}</span>
                <span className="text-xs font-urdu text-stone-300 mt-1 block">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <div className="relative h-[340px] sm:h-[420px] rounded-[28px] overflow-hidden bg-[#1A0E08]">
                  <Image
                    src={womensData.mission.campusImage || "/images/women-campus.jpg"}
                    alt="شعبہ خواتین مدرسہ صاحب الزمان"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/20 to-transparent" />
                  <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-[#180E08]/90 border border-[#C9B38D]/40 backdrop-blur-md text-right shadow-xl">
                    <span className="text-xs font-urdu font-bold text-[#C9B38D] block">
                      {womensData.mission.campusBadge}
                    </span>
                    <p className="text-xs text-stone-200 font-urdu mt-1 leading-[1.8]">
                      {womensData.mission.campusDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-right">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white leading-[1.8]">
                {womensData.mission.title}
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent rounded-full shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

              <p className="text-sm sm:text-base md:text-lg text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] font-medium">
                {womensData.mission.desc}
              </p>

              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/25 shadow-xl space-y-3">
                <h3 className="font-urdu font-bold text-white text-base sm:text-lg flex items-center gap-2 text-[#D9C7A7]">
                  <Award className="w-5 h-5 text-[#C9B38D]" />
                  <span>خصوصی امتیازات اور خصوصیات:</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm font-urdu text-stone-300">
                  {(womensData.mission.features || []).map((feat: any, idx: number) => (
                    <li key={feat.id || idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0 mt-1" />
                      <span>{feat.text || feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section className="py-20 sm:py-28 bg-[#180E08] islamic-navy-pattern relative overflow-hidden border-t border-[#C9B38D]/20">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
              شعبہ خواتین کے <span className="text-[#C9B38D]">باقاعدہ کورسز</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-stone-300 font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
              دینی درسگاہ سے لے کر غسل و کفن کی عملی تربیت اور روح پرور مجالس و اجتماعات کا منظم نظام
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {(womensData.courses || []).map((course: any) => (
              <div
                key={course.id}
                className="group relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#1E110A] via-[#160B06] to-[#100703] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_20px_45px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_55px_rgba(201,179,141,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full bg-[#24130A] text-xs font-urdu font-bold text-[#C9B38D] border border-[#C9B38D]/30">
                      {course.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#120A05] border border-[#C9B38D]/40 flex items-center justify-center text-[#C9B38D] shadow-md group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-urdu font-bold text-white text-xl leading-[2.1] group-hover:text-[#D9C7A7] transition-colors mb-2.5 text-right">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-[#C9B38D] font-urdu mb-3 font-semibold">
                    <span>مدت: {course.duration}</span>
                    <span>•</span>
                    <span>طریقہ: {course.format}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.35] text-right mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#C9B38D]/20">
                  <button
                    onClick={() => {
                      setInquiryData({ ...inquiryData, program: course.title });
                      const el = document.getElementById("inquiry-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full h-10 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>اس کورس میں داخلہ لیں</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Workshops Callouts */}
          {womensData.workshops && womensData.workshops.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {womensData.workshops.map((w: any) => (
                <div key={w.id} className="p-6 rounded-3xl bg-[#1C1009] border-2 border-[#C9B38D]/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-urdu font-bold text-[#C9B38D] bg-[#22130A] px-3 py-1 rounded-full border border-[#C9B38D]/30">
                        {w.badge}
                      </span>
                      <span className="text-xs text-stone-400 font-urdu">{w.schedule}</span>
                    </div>
                    <h3 className="text-xl font-urdu font-bold text-white mb-2">{w.title}</h3>
                    <p className="text-xs text-stone-300 font-urdu leading-relaxed">{w.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      setInquiryData({ ...inquiryData, program: w.title });
                      const el = document.getElementById("inquiry-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 text-xs font-bold text-[#C9B38D] hover:text-white flex items-center gap-1 font-urdu"
                  >
                    <span>ورکشاپ کے لیے اندراج کریں</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inquiry & Contact Section */}
      <section id="inquiry-section" className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden border-t border-[#C9B38D]/20">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
              داخلہ، اوقات اور <span className="text-[#C9B38D]">رابطہ کی معلومات</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
              خواہشمند بہنیں اور سرپرست حضرات نیچے دیے گئے فارم یا نمبرز پر رابطہ فرما کر کلاسز کا حصہ بن سکتے ہیں
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/25 shadow-xl space-y-5">
                <h3 className="font-urdu font-bold text-white text-xl sm:text-2xl leading-[1.8] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#C9B38D]" />
                  <span>کلاسز کے اوقات (Timings):</span>
                </h3>

                <div className="space-y-3 font-urdu text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-[#140A05] border border-[#C9B38D]/15 flex items-center justify-between">
                    <span className="text-[#C9B38D] font-bold">اوقاتِ کار:</span>
                    <span className="text-white">{womensData.contact.timing}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#140A05] border border-[#C9B38D]/15 flex items-center justify-between">
                    <span className="text-[#C9B38D] font-bold">کیمپس مقام:</span>
                    <span className="text-white text-xs">{womensData.contact.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/25 shadow-xl space-y-4">
                <h3 className="font-urdu font-bold text-white text-xl leading-[1.8] flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#C9B38D]" />
                  <span>خصوصی رابطہ برائے خواتین:</span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.2]">
                  خواتین کی آسانی کے لیے خواتین انچارج / کوآرڈینیٹر کا براہِ راست واٹس ایپ اور فون نمبر فراہم کیا گیا ہے۔
                </p>

                <div className="pt-2 space-y-2 text-xs font-urdu">
                  <div className="p-3 rounded-xl bg-[#24130A] border border-[#C9B38D]/30 flex items-center justify-between">
                    <span className="text-stone-300">لیڈیز کوآرڈینیٹر فون:</span>
                    <span className="font-mono font-bold text-[#C9B38D]" dir="ltr">{womensData.contact.phone}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#24130A] border border-[#C9B38D]/30 flex items-center justify-between">
                    <span className="text-stone-300">واٹس ایپ رابطہ:</span>
                    <span className="font-mono font-bold text-white" dir="ltr">{womensData.contact.whatsapp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-[#1E110A] via-[#160B06] to-[#100703] border-2 border-[#C9B38D]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-right">
                <div className="mb-6">
                  <span className="text-xs font-urdu font-bold text-[#C9B38D] bg-[#22130A] px-3 py-1 rounded-full border border-[#C9B38D]/30">
                    آن لائن داخلہ و معلومات
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-urdu font-bold text-white mt-2 leading-[1.8]">
                    شعبہ خواتین میں شمولیت کی درخواست
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-urdu mt-1 leading-[2.2]">
                    اپنی معلومات درج فرمائیں، خواتین انتظامیہ جلد آپ سے رابطہ فرمائے گی
                  </p>
                </div>

                {inquirySubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-xl font-urdu font-bold text-white">
                      درخواست کامیابی سے موصول ہو گئی ہے!
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-200 font-urdu leading-[2.2]">
                      مدرسہ کے شعبہ خواتین کی کوآرڈینیٹر جلد آپ کے واٹس ایپ / فون نمبر پر کلاسز کے آغاز اور تفصیلات کے لیے رابطہ فرمائیں گی۔
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                          طالبہ / خاتون کا نام *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: سیدہ فاطمہ رضوی"
                          value={inquiryData.name}
                          onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140A05] border border-[#C9B38D]/25 text-white text-sm font-urdu focus:border-[#C9B38D] focus:outline-none placeholder:text-stone-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                          رابطہ نمبر / واٹس ایپ *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0300-1234567"
                          value={inquiryData.phone}
                          onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140A05] border border-[#C9B38D]/25 text-white text-sm font-urdu focus:border-[#C9B38D] focus:outline-none placeholder:text-stone-500"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                          مطلوبہ پروگرام *
                        </label>
                        <select
                          value={inquiryData.program}
                          onChange={(e) => setInquiryData({ ...inquiryData, program: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140A05] border border-[#C9B38D]/25 text-white text-sm font-urdu focus:border-[#C9B38D] focus:outline-none cursor-pointer"
                        >
                          {(womensData.courses || []).map((c: any) => (
                            <option key={c.id} value={c.title} className="bg-[#140A05]">
                              {c.title}
                            </option>
                          ))}
                          {(womensData.workshops || []).map((w: any) => (
                            <option key={w.id} value={w.title} className="bg-[#140A05]">
                              {w.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                          پسندیدہ وقت *
                        </label>
                        <input
                          type="text"
                          value={inquiryData.timing}
                          onChange={(e) => setInquiryData({ ...inquiryData, timing: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140A05] border border-[#C9B38D]/25 text-white text-sm font-urdu focus:border-[#C9B38D] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                        کوئی سوال یا خصوصی پیغام (اختیاری)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="اگر کوئی سوال یا سابقہ دینی تعلیم کا پس منظر ہو تو یہاں درج فرمائیں..."
                        value={inquiryData.message}
                        onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140A05] border border-[#C9B38D]/25 text-white text-sm font-urdu focus:border-[#C9B38D] focus:outline-none placeholder:text-stone-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-12 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4 text-[#8C6D3F]" />
                      <span>درخواستِ داخلہ و معلومات جمع کرائیں</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />
    </div>
  );
}
