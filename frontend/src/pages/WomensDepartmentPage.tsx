"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
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
  Award
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";

interface ActivityCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  features: string[];
  description: string;
  badge: string;
}

export default function WomensDepartmentPage() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: "",
    phone: "",
    program: "تنظیم و درسگاہ (حوزوی و قرآنی کلاسز)",
    timing: "صبح کا وقت (9:00 تا 1:00)",
    message: ""
  });

  const coreActivities: ActivityCard[] = [
    {
      id: "classes",
      title: "تنظیم و درسگاہ",
      subtitle: "منظم تعلیمی درجات، قرآنی علوم اور حوزوی مضامین",
      iconName: "book",
      badge: "باقاعدہ تعلیمی شعبہ",
      features: [
        "تجوید و حفظِ قرآن کریم مع فہمِ کلامِ الٰہی",
        "فقہ و احکامِ نسواں (طہارت، نماز، روزہ، حج وغیرہ)",
        "سیرتِ سیدہ فاطمۃ الزہراءؑ و زینبِ کبریٰؑ کا مطالعہ",
        "عربی گرائمر، عقائد، کلام اور اخلاقیات کی کلاسز"
      ],
      description: "طالبات اور خواتین کے لیے روایتی دینی تعلیم اور حوزوی علوم کو جدید منظم انداز میں ترتیب دیا گیا ہے۔ اساتذہ میں تجربہ کار اور حوزہ علمیہ قم و نجف سے فارغ التحصیل معلمات شامل ہیں جو بہنوں کی فکری بالیدگی اور شرعی تربیت پر خصوصی توجہ دیتی ہیں۔"
    },
    {
      id: "ghusl-kafan",
      title: "غسل و کفن کی کلاس",
      subtitle: "تجہیز و تکفین کی شرعی و عملی تربیت",
      iconName: "shield",
      badge: "لازمی شرعی ورکشاپس",
      features: [
        "میت کو غسل دینے کے واجبات اور مستحبات کی تفصیلی وضاحت",
        "کفن کاٹنے، سلائی کرنے اور پہنانے کی عملی مشق",
        "نمازِ جنازہ، دفن اور تلقین کے احکام و مسائل",
        "ہنگامی بنیادوں پر مومنات کی خدمت کے لیے رضاکار ٹیم کی تیاری"
      ],
      description: "اکثر خواتین غسل و کفن کے بنیادی شرعی احکام سے ناواقف ہوتی ہیں۔ مدرسہ صاحب الزمان کا شعبہ خواتین باقاعدگی سے عملی تربیتی ورکشاپس منعقد کرتا ہے تاکہ ہر گھر میں کم از کم ایک خاتون غسل و کفن کے تمام احکام و آداب سے مکمل طور پر باخبر اور عملی مہارت کی حامل ہو۔"
    },
    {
      id: "majalis",
      title: "اجتماع و مجالس",
      subtitle: "ایامِ معصومینؑ کی محافل، مجالسِ عزا اور فکری سیمینارز",
      iconName: "heart",
      badge: "روحانی و فکری محافل",
      features: [
        "ایامِ عزا میں باوقار و پردہ دار مجالسِ عزا کا انعقاد",
        "جشنِ میلادِ رسولِ اکرمؐ اور ائمہ معصومینؑ کی بابرکت محافل",
        "ہفتہ وار دعائے کمیل و دعائے توسل کی پرنور نشستیں",
        "تربیتِ اولاد اور گھریلو زندگی پر فکری سیمینارز اور لیکچرز"
      ],
      description: "شعائرِ الٰہیہ کے احیاء اور روحانی بیداری کے لیے شعبہ خواتین کے تحت سال بھر پردے اور تقدس کے مکمل اہتمام کے ساتھ محافل و مجالس کا انعقاد کیا جاتا ہے، جہاں مستند ذاکرات اور محقق علمائے نسواں مصائب و فضائل اور معارفِ حقہ بیان کرتی ہیں۔"
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryData({
        name: "",
        phone: "",
        program: "تنظیم و درسگاہ (حوزوی و قرآنی کلاسز)",
        timing: "صبح کا وقت (9:00 تا 1:00)",
        message: ""
      });
    }, 4500);
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

      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#0E2F23] via-[#141C16] to-[#120A05] border-b border-[#C9B38D]/20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#0E3D2B]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#C9B38D]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08]/85 border border-[#C9B38D]/40 text-xs sm:text-sm font-urdu font-semibold text-[#D9C7A7] mb-6 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition">صفحہ اول</Link>
            <ChevronLeft className="w-3.5 h-3.5 text-[#C9B38D]" />
            <span>شعبہ خواتین</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-urdu font-bold text-white leading-[1.7] mb-6">
            شعبہ خواتین — <span className="text-[#C9B38D]">جامعہ سیدہ فاطمۃ الزہراءؑ</span>
          </h1>

          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full mb-6 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] max-w-3xl mx-auto font-medium">
            اسلامی تعلیمات اور تربیتی پروگرام برائے خواتین | شرعی تقاضوں کے عین مطابق، باوقار ماحول اور تجربہ کار معلمات کی زیرِ نگرانی فکری و روحانی بالیدگی کا مرکز۔
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-[#C9B38D]/20">
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-[#C9B38D] block">۱۰۰٪ پردہ دار</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">محفوظ و باوقار کیمپس</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-white block">خواتین اساتذہ</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">مستند و فاضل معلمات</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-[#C9B38D] block">عملی کورسز</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">غسل و کفن و احکام</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-white block">مفت کلاسز</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">فی سبیل اللہ خدمات</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <div className="relative h-[340px] sm:h-[420px] rounded-[28px] overflow-hidden bg-[#1A0E08]">
                  <Image
                    src="/images/women-campus.jpg"
                    alt="شعبہ خواتین مدرسہ صاحب الزمان"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/20 to-transparent" />
                  <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-[#180E08]/90 border border-[#C9B38D]/40 backdrop-blur-md text-right shadow-xl">
                    <span className="text-xs font-urdu font-bold text-[#C9B38D] block">
                      کیمپس برائے طالبات و خواتین
                    </span>
                    <p className="text-xs text-stone-200 font-urdu mt-1 leading-[1.8]">
                      مکمل طور پر الگ عمارت، جدید کلاس رومز اور پردے کے شرعی انتظامات
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
                <Sparkles className="w-4 h-4 text-[#C9B38D]" />
                <span className="font-urdu">تعارف و اغراض و مقاصد</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white leading-[1.8]">
                شعبہ خواتین کا <span className="text-[#C9B38D]">مشن اور ویژن</span>
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent rounded-full shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

              <p className="text-sm sm:text-base md:text-lg text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] font-medium">
                شعبہ خواتین کا قیام اس مقصد کے تحت عمل میں لایا گیا ہے کہ ہماری مائیں، بہنیں اور بیٹیاں سیرتِ سیدہ فاطمۃ الزہراء (سلام اللہ علیہا) اور ثانیِ زہراء حضرت زینبِ کبریٰ (سلام اللہ علیہا) کے نقوشِ قدم پر چلتے ہوئے قرآن و سنت، فقہی مسائل اور فکری شعور سے آراستہ ہوں۔
              </p>

              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/25 shadow-xl space-y-3">
                <h3 className="font-urdu font-bold text-white text-base sm:text-lg flex items-center gap-2 text-[#D9C7A7]">
                  <Award className="w-5 h-5 text-[#C9B38D]" />
                  <span>خصوصی امتیازات اور خصوصیات:</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm font-urdu text-stone-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0 mt-1" />
                    <span>خواتین کے لیے مکمل طور پر جداگانہ دروازہ، برآمدہ اور کلاس رومز۔</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0 mt-1" />
                    <span>تمام اسباق، تربیت اور ورکشاپس صرف تجربہ کار خواتین معلمات کے سپرد۔</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0 mt-1" />
                    <span>گھریلو خواتین اور ملازمت پیشہ بہنوں کے لیے اوقاتِ کار میں لچک اور سہولت۔</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0 mt-1" />
                    <span>تربیتِ اولاد، ازدواجی زندگی کی خوشحالی اور اخلاقی کردار سازی پر خصوصی رہنمائی۔</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#180E08] islamic-navy-pattern relative overflow-hidden border-t border-[#C9B38D]/20">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
              <Users className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">اہم کورسز و سرگرمیاں</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
              شعبہ خواتین کی <span className="text-[#C9B38D]">اہم خدمات و سرگرمیاں</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-stone-300 font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
              دینی درسگاہ سے لے کر غسل و کفن کی عملی تربیت اور روح پرور مجالس و اجتماعات کا منظم نظام
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {coreActivities.map((act) => (
              <div
                key={act.id}
                className="group relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#1E110A] via-[#160B06] to-[#100703] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_20px_45px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_55px_rgba(201,179,141,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full bg-[#24130A] text-xs font-urdu font-bold text-[#C9B38D] border border-[#C9B38D]/30">
                      {act.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#120A05] border border-[#C9B38D]/40 flex items-center justify-center text-[#C9B38D] shadow-md group-hover:scale-110 transition-transform">
                      {act.iconName === "book" && <BookOpen className="w-6 h-6" />}
                      {act.iconName === "shield" && <ShieldCheck className="w-6 h-6" />}
                      {act.iconName === "heart" && <Heart className="w-6 h-6" />}
                    </div>
                  </div>

                  <h3 className="font-urdu font-bold text-white text-xl sm:text-2xl leading-[2.1] group-hover:text-[#D9C7A7] transition-colors mb-2.5 text-right">
                    {act.title}
                  </h3>

                  <h4 className="text-xs sm:text-sm font-urdu font-semibold text-[#C9B38D] mb-3.5 leading-[2.0] text-right">
                    {act.subtitle}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.35] text-right mb-6">
                    {act.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#140A05] border border-[#C9B38D]/15 space-y-2 text-right">
                    <span className="text-xs font-urdu font-bold text-[#D9C7A7] block mb-1">
                      اہم خصوصیات:
                    </span>
                    {act.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-urdu text-stone-300">
                        <span className="text-[#C9B38D] mt-0.5">•</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C9B38D]/20">
                  <button
                    onClick={() => {
                      setInquiryData({ ...inquiryData, program: act.title });
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
        </div>
      </section>

      <section id="inquiry-section" className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden border-t border-[#C9B38D]/20">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
              <Calendar className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">داخلہ اور طریقہ کار</span>
            </div>

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
                    <span className="text-[#C9B38D] font-bold">صبح کی شفٹ:</span>
                    <span className="text-white">صبح ۹:۰۰ تا دوپہر ۱:۰۰ (پیر تا جمعرات)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#140A05] border border-[#C9B38D]/15 flex items-center justify-between">
                    <span className="text-[#C9B38D] font-bold">شام کی شفٹ:</span>
                    <span className="text-white">دوپہر ۳:۰۰ تا شام ۶:۰۰ (پیر تا جمعرات)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#140A05] border border-[#C9B38D]/15 flex items-center justify-between">
                    <span className="text-[#C9B38D] font-bold">ہفتہ وار کلاس:</span>
                    <span className="text-white">صرف اتوار صبح ۱۰:۰۰ تا دوپہر ۱:۰۰</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#140A05] border border-[#C9B38D]/15 flex items-center justify-between">
                    <span className="text-[#C9B38D] font-bold">غسل و کفن ورکشاپ:</span>
                    <span className="text-white">ماہانہ بنیادوں پر (شیڈول جاری کیا جاتا ہے)</span>
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
                    <span className="font-mono font-bold text-[#C9B38D]" dir="ltr">+92 336 3408328</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#24130A] border border-[#C9B38D]/30 flex items-center justify-between">
                    <span className="text-stone-300">مدرسہ رابطہ نمبر:</span>
                    <span className="font-mono font-bold text-white" dir="ltr">+92 300 1234567</span>
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
                          <option value="تنظیم و درسگاہ (حوزوی و قرآنی کلاسز)" className="bg-[#140A05]">
                            تنظیم و درسگاہ (حوزوی و قرآنی کلاسز)
                          </option>
                          <option value="غسل و کفن کی کلاس (عملی ورکشاپ)" className="bg-[#140A05]">
                            غسل و کفن کی کلاس (عملی ورکشاپ)
                          </option>
                          <option value="اجتماع و مجالس (روحانی نشستیں)" className="bg-[#140A05]">
                            اجتماع و مجالس (روحانی نشستیں)
                          </option>
                          <option value="تجوید و حفظِ قرآن کریم" className="bg-[#140A05]">
                            تجوید و حفظِ قرآن کریم
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-urdu font-semibold text-stone-200 mb-1">
                          پسندیدہ وقت *
                        </label>
                        <select
                          value={inquiryData.timing}
                          onChange={(e) => setInquiryData({ ...inquiryData, timing: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#140A05] border border-[#C9B38D]/25 text-white text-sm font-urdu focus:border-[#C9B38D] focus:outline-none cursor-pointer"
                        >
                          <option value="صبح کا وقت (9:00 تا 1:00)" className="bg-[#140A05]">
                            صبح کا وقت (9:00 تا 1:00)
                          </option>
                          <option value="شام کا وقت (3:00 تا 6:00)" className="bg-[#140A05]">
                            شام کا وقت (3:00 تا 6:00)
                          </option>
                          <option value="اتوار خصوصی کلاس (10:00 تا 1:00)" className="bg-[#140A05]">
                            اتوار خصوصی کلاس (10:00 تا 1:00)
                          </option>
                        </select>
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
