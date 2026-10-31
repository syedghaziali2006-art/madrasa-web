"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  History,
  GraduationCap,
  Users,
  Award,
  Calendar,
  BookOpen,
  ArrowRight,
  Heart,
  Mail,
  Phone,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";
import FounderSection from "@/components/FounderSection";

interface Milestone {
  year: string;
  hijriYear: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

interface FormerStaff {
  id: string;
  name: string;
  title: string;
  tenure: string;
  department: string;
  contribution: string;
  image: string;
  status: string;
}

interface CurrentStaff {
  id: string;
  name: string;
  title: string;
  category: "leadership" | "faculty" | "admin" | "quran";
  department: string;
  qualification: string;
  experience: string;
  image: string;
  email?: string;
  phone?: string;
  isOnlineActive?: boolean;
}

export default function HistoryStaffPage() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  const milestones: Milestone[] = [
    {
      year: "۱۹۹۸ء",
      hijriYear: "۱۴۱۹ھ",
      title: "سنگِ بنیاد اور مدرسہ کا مبارک آغاز",
      subtitle: "خلوصِ نیت اور محدود وسائل کے ساتھ عظیم الشان سفر کی ابتدا",
      description: "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) کا باضابطہ آغاز مخلص علمائے کرام اور مراجعِ عظام کے نمائندگان کی سرپرستی میں ہوا۔ ابتدائی طور پر حفظِ قرآن اور حوزوی مقدمات کے دو درجات سے تدریس کا آغاز ہوا جس میں صرف ۲۰ طلبہ زیرِ تعلیم تھے۔",
      highlight: "۲۰ طلبہ اور ۲ اساتذہ سے تاریخی ابتدا"
    },
    {
      year: "۲۰۰۵ء",
      hijriYear: "۱۴۲۶ھ",
      title: "پانچ سالہ مکمل حوزوی نصاب کا نفاذ",
      subtitle: "حوزاتِ علمیہ قم و نجف کے ہم آہنگ منظم تدریسی نظام",
      description: "جامعۃ المصطفیٰ العالمیہ اور نجف اشرف کے روایتی دروس کی بنیاد پر پانچ سالہ مکمل نصابِ تعلیم نافذ کیا گیا۔ فقہ، اصول، کلام، عربی ادب، منطق اور فلسفہ کے باقاعدہ تدریسی شعبہ جات قائم کیے گئے اور طلبہ کے لیے مفت اقامت گاہ کا قیام عمل میں آیا۔",
      highlight: "پہلی سند یافتہ حوزوی کھیپ کی فراغت"
    },
    {
      year: "۲۰۱۲ء",
      hijriYear: "۱۴۳۳ھ",
      title: "مرکزی کتب خانہ و ڈیجیٹل ریسرچ لیب کا قیام",
      subtitle: "دینی کتب کے ساتھ جدید آئی ٹی اور انفارمیشن ٹیکنالوجی کا امتزاج",
      description: "طلبہ کے تحقیقی ذوق کو پروان چڑھانے کے لیے پچیس ہزار سے زائد مطبوعہ کتب پر مشتمل کتب خانہ قائم کیا گیا۔ ساتھ ہی طلبہ کو کمپیوٹر، انگلش لینگویج اور جدید عصری مضامین کی تدریس کے لیے جدید کمپیوٹر لیب اور سمعی و بصری شعبہ فعال کیا گیا۔",
      highlight: "۲۵,۰۰۰ کتب و ڈیجیٹل لائبریری کا افتتاح"
    },
    {
      year: "۲۰۱۸ء",
      hijriYear: "۱۴۳۹ھ",
      title: "احسن آباد کے وسیع مستقل کیمپس میں منتقلی",
      subtitle: "جدید ملٹی اسٹوری عمارت، وسیع آڈیٹوریم اور دسترخوانِ امام زمانہؑ",
      description: "طلبہ کی بڑھتی ہوئی تعداد کے پیشِ نظر مدرسہ کو گلزارِ ہجری اسکیم ۳۳ احسن آباد کے وسیع کیمپس میں منتقل کیا گیا۔ اس مرحلے پر نیا آڈیٹوریم ہال، کشادہ دار القرآن، کھیلوں کا میدان اور روزانہ سینکڑوں طلبہ و غرباء کے لیے باقاعدہ دسترخوانِ امام زمانہؑ کا قیام عمل میں لایا گیا۔",
      highlight: "مستقل وسیع کیمپس و مفت ہاسٹل بلاک"
    },
    {
      year: "۲۰۲۶ء",
      hijriYear: "۱۴۴۷ھ",
      title: "عصری تقاضوں سے ہم آہنگ بین الاقوامی اسلامی مرکز",
      subtitle: "۵۰۰ سے زائد فارغ التحصیل علماء و مبلغین اور آن لائن داخلہ پورٹل",
      description: "آج مدرسہ صاحب الزمان ایک تناور درخت بن چکا ہے جس کے فارغ التحصیل علماء دنیا بھر میں تبلیغِ دین، امامتِ جمعہ اور علمی ریسرچ کی خدمات انجام دے رہے ہیں۔ ادارہ عصری علوم، بین الاقوامی سمینارز اور ریسرچ جرنلز کے ساتھ تسلسل سے روبہ ترقی ہے۔",
      highlight: "۲۸ سالہ درخشندہ علمی و تربیتی سفر"
    }
  ];

  const formerStaffList: FormerStaff[] = [
    {
      id: "former-1",
      name: "حضرت علامہ سید کاظم موسویؒ",
      title: "بانی و سابق سرپرستِ اعلیٰ",
      tenure: "۱۹۹۸ء تا ۲۰۱۲ء",
      department: "سرپرستی و فقہِ عالیہ",
      contribution: "مدرسہ کی بنیاد رکھی اور ابتدا سے لے کر کیمپس کے استحکام تک چودہ سال خلوص، تقویٰ اور بصیرت کے ساتھ رہنمائی فرمائی۔",
      image: "/images/faculty/founder-scholar.jpg",
      status: "رحمۃ اللہ علیہ"
    },
    {
      id: "former-2",
      name: "مولانا شیخ غلام عباس نجفیؒ",
      title: "سابق شیخ الحدیث و استادِ فقہ",
      tenure: "۲۰۰۰ء تا ۲۰۱۶ء",
      department: "شعبہ حدیث و اصول",
      contribution: "نجف اشرف کے فارغ التحصیل محقق عالم جنہوں نے مدرسہ کے ابتدائی ۱۶ سال تک کتبِ اربعہ اور اصولِ فقہ کی بے لوث تدریس فرمائی۔",
      image: "/images/layout/avatar2.jpg",
      status: "رحمۃ اللہ علیہ"
    },
    {
      id: "former-3",
      name: "استاد قاری محمد اسماعیل رضویؒ",
      title: "سابق صدر شعبہ تجوید و قرائت",
      tenure: "۱۹۹۹ء تا ۲۰۱۸ء",
      department: "دار القرآن و تجوید",
      contribution: "سینکڑوں حفاظ و قراء کو لحنِ داؤدی اور تجوید کے قواعد سکھائے جن کے شاگرد آج پاکستان بھر میں خدمات انجام دے رہے ہیں۔",
      image: "/images/layout/avatar1.jpg",
      status: "رحمۃ اللہ علیہ"
    },
    {
      id: "former-4",
      name: "ماسٹر سید اختر حسین زیدیؒ",
      title: "سابق پرنسپل شعبہ عصری علوم",
      tenure: "۲۰۰۴ء تا ۲۰۲۰ء",
      department: "عصری تعلیم، سائنس و انگلش",
      contribution: "دینی طلبہ کو میٹرک، انگلش اور کمپیوٹر میں ماہر بنانے کے لیے جدید سلیبس ترتیب دیا اور مخلصانہ تعلیمی خدمات پیش کیں۔",
      image: "/images/layout/avatar3.jpg",
      status: "رحمۃ اللہ علیہ"
    },
    {
      id: "former-5",
      name: "مولانا سید منظور حسین نقوی",
      title: "سابق مہتمم و ناظمِ تعلیمات",
      tenure: "۲۰۰۲ء تا ۲۰۲۱ء",
      department: "امورِ تعلیم و تربیت",
      contribution: "طلبہ کے اخلاقی، تعلیمی اور امتحانی نظام کو منظم کیا اور ۱۹ سال تک ادارے کی مثالی انتظامی بنیادیں استوار کیں۔",
      image: "/images/tawaf/about_pilgrim.jpg",
      status: "دامت برکاتہ"
    },
    {
      id: "former-6",
      name: "جناب حاجی علی محمد جعفریؒ",
      title: "سابق ناظمِ مالیات و امورِ انتظامیہ",
      tenure: "۱۹۹۸ء تا ۲۰۱۷ء",
      department: "مالیات و تعمیرات",
      contribution: "ابتدائی تعمیرات، دسترخوان اور فلاحی فنڈز کے امین جنہوں نے ادارے کے ہر اینٹ اور مالی شفافیت میں اپنا حصہ ڈالا۔",
      image: "/images/tawaf/avatar2.jpg",
      status: "رحمۃ اللہ علیہ"
    }
  ];

  const currentStaffList: CurrentStaff[] = [
    {
      id: "cur-1",
      name: "علامہ سید مہدی موسوی",
      title: "مدیرِ اعلیٰ و پرنسپل مدرسہ",
      category: "leadership",
      department: "انتظامیہ و اعلیٰ تدریس",
      qualification: "فاضل حوزہ علمیہ قم، درسِ خارج و اصول",
      experience: "۲۲ سالہ تدریسی و تنظیمی تجربہ",
      image: "/images/faculty/principal-scholar.jpg",
      email: "principal@madrasasahibuzzaman.org",
      phone: "+92 300 1234567",
      isOnlineActive: true
    },
    {
      id: "cur-2",
      name: "مولانا سید عابد رضوی",
      title: "نائب مدیر و استادِ درسِ خارج و فقہ",
      category: "leadership",
      department: "شعبہ فقہ و کلام",
      qualification: "سطحِ چہارم (ڈاکٹریٹ کے مساوی) حوزہ نجف اشرف",
      experience: "۱۸ سالہ تدریسی تجربہ",
      image: "/images/layout/avatar1.jpg",
      email: "abid.rizvi@madrasasahibuzzaman.org",
      isOnlineActive: true
    },
    {
      id: "cur-3",
      name: "مولانا سید حسنین باقر نجفی",
      title: "صدر شعبہ علومِ قرآن و حدیث",
      category: "faculty",
      department: "شعبہ تفاسیر و احادیث",
      qualification: "ماسٹرز اسلامیات و حوزوی سندِ اجتہاد",
      experience: "۱۵ سالہ تدریسی تجربہ",
      image: "/images/layout/avatar2.jpg",
      isOnlineActive: true
    },
    {
      id: "cur-4",
      name: "قاری سید محمد رضا نقوی",
      title: "صدر شعبہ تجوید و حفظِ قرآن",
      category: "quran",
      department: "دار القرآن الکریم",
      qualification: "سند قراءاتِ عشرہ، مصر و مشہد مقدس",
      experience: "۱۲ سالہ تدریسی تجربہ",
      image: "/images/layout/child-quran.jpg",
      isOnlineActive: true
    },
    {
      id: "cur-5",
      name: "پروفیسر ڈاکٹر عمار کاظمی",
      title: "صدر شعبہ عصری علوم، انگلش و آئی ٹی",
      category: "faculty",
      department: "عصری تعلیم و ریسرچ",
      qualification: "پی ایچ ڈی کمپیوٹر سائنس و ایم اے انگلش",
      experience: "۱۴ سالہ تدریسی تجربہ",
      image: "/images/layout/avatar3.jpg",
      isOnlineActive: true
    },
    {
      id: "cur-6",
      name: "جناب سید سجاد حسین رضوی",
      title: "ناظمِ امورِ طلبہ و ہاسٹل انچارج",
      category: "admin",
      department: "ہاسٹل و ڈسپلن کمیٹی",
      qualification: "ایم اے سوشیالوجی و حوزوی سطح دوم",
      experience: "۱۰ سالہ تنظیمی خدمات",
      image: "/images/tawaf/avatar1.jpg",
      isOnlineActive: true
    },
    {
      id: "cur-7",
      name: "جناب محمد ارسلان زیدی",
      title: "ڈائریکٹر فنانس و اکاؤنٹس",
      category: "admin",
      department: "شعبہ حسابات و شفافیت",
      qualification: "ایم بی اے فنانس و سی اے فائنلسٹ",
      experience: "۱۱ سالہ کارپوریٹ و فلاحی تجربہ",
      image: "/images/layout/donation-box.jpg",
      isOnlineActive: false
    },
    {
      id: "cur-8",
      name: "انجینئر علی عباس جعفری",
      title: "انچارج آئی ٹی و ڈیجیٹل سسٹم",
      category: "admin",
      department: "سافٹ ویئر و آن لائن پورٹل",
      qualification: "بی ایس کمپیوٹر سسٹمز انجینئرنگ",
      experience: "۸ سالہ سافٹ ویئر تجربہ",
      image: "/images/tawaf/avatar2.jpg",
      isOnlineActive: true
    }
  ];

  const filteredStaff =
    activeTab === "all"
      ? currentStaffList
      : currentStaffList.filter((s) => s.category === activeTab);

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

      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#0A241A] via-[#120A05] to-[#120A05] border-b border-[#C9B38D]/20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#0E3D2B]/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#C9B38D]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08]/85 border border-[#C9B38D]/40 text-xs sm:text-sm font-urdu font-semibold text-[#D9C7A7] mb-6 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition">صفحہ اول</Link>
            <ChevronLeft className="w-3.5 h-3.5 text-[#C9B38D]" />
            <span>تاریخ و اساتذہ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-urdu font-bold text-white leading-[1.7] mb-6">
            سفرِ مدرسہ و <span className="text-[#C9B38D]">اساتذہ کرام</span>
          </h1>

          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full mb-6 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] max-w-3xl mx-auto font-medium">
            مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) کے سنگِ بنیاد سے لے کر موجودہ جدید کیمپس تک کا پروقار ۲۸ سالہ سفر اور اس کے بانی، سابق و موجودہ اساتذہ کا تعارف۔
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-[#C9B38D]/20">
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-[#C9B38D] block">۱۹۹۸ء</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">سالِ تاسیس و سنگِ بنیاد</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-white block">۲۸ سال</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">تسلسل سے تدریسی سفر</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-[#C9B38D] block">۵۰۰+</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">فارغ التحصیل علماء و حفاظ</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
              <span className="text-2xl sm:text-3xl font-bold font-urdu text-white block">۲۵+</span>
              <span className="text-xs font-urdu text-stone-300 mt-1 block">اساتذہ و انتظامی ارکان</span>
            </div>
          </div>
        </div>
      </div>

      <FounderSection />

      <section className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
              <History className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">سفر اور ارتقاء</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
              تاریخ اور <span className="text-[#C9B38D]">پس منظر</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
              بیس طلبہ سے لے کر ۵۰۰ سے زائد علماء کی تیاری تک کے اہم سنگِ میل اور تاریخی ادوار
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute right-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#C9B38D] via-[#8C6D3F] to-[#C9B38D]/20 transform translate-x-1/2 rounded-full" />

            <div className="space-y-12 sm:space-y-16">
              {milestones.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isEven ? "md:flex-row-reverse" : ""
                    } gap-6 md:gap-12`}
                  >
                    <div className="w-full md:w-1/2 text-right">
                      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/30 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1.5">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full bg-[#24130A] text-xs font-urdu font-bold text-[#C9B38D] border border-[#C9B38D]/30">
                            {item.highlight}
                          </span>
                          <span className="text-xs font-urdu text-stone-400">
                            {item.hijriYear}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white mb-2.5 leading-[2.1]">
                          {item.title}
                        </h3>

                        <h4 className="text-xs sm:text-sm font-urdu font-semibold text-[#D9C7A7] mb-3 leading-[2.0]">
                          {item.subtitle}
                        </h4>

                        <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.4]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex absolute right-1/2 transform translate-x-1/2 w-12 h-12 rounded-full bg-[#120A05] border-2 border-[#C9B38D] items-center justify-center z-10 shadow-[0_0_20px_rgba(201,179,141,0.6)]">
                      <span className="w-4 h-4 rounded-full bg-[#C9B38D] animate-pulse" />
                    </div>

                    <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start px-4">
                      <span className="font-urdu text-3xl sm:text-4xl font-extrabold text-[#C9B38D] tracking-wider bg-[#1A0E08] px-5 py-2 rounded-2xl border border-[#C9B38D]/30 shadow-md">
                        {item.year}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#18100A] islamic-navy-pattern relative overflow-hidden border-t border-[#C9B38D]/20">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
              <Heart className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">محسنین و سابق اساتذہ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
              پہلے کے اساتذہ اور <span className="text-[#C9B38D]">اسٹاف ممبران</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
              وہ مخلص اساتذہ اور انتظامی اراکین جنہوں نے مدرسے کی بنیاد، تعلیمی فروغ اور طلبہ کی تربیت میں اپنی زندگیاں وقف کیں
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {formerStaffList.map((staff) => (
              <div
                key={staff.id}
                className="group relative rounded-3xl p-6 bg-gradient-to-b from-[#1C120B] via-[#160D07] to-[#100804] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.25)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-[#C9B38D]/40 shrink-0 bg-stone-900 shadow-md">
                      <Image
                        src={staff.image}
                        alt={staff.name}
                        fill
                        className="object-cover sepia-[0.35] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-right min-w-0">
                      <span className="inline-block text-[11px] font-urdu font-bold text-[#C9B38D] bg-[#22130A] px-2.5 py-0.5 rounded-full border border-[#C9B38D]/30 mb-1">
                        {staff.status}
                      </span>
                      <h3 className="font-urdu font-bold text-white text-base sm:text-lg leading-[1.6] group-hover:text-[#D9C7A7] transition-colors truncate">
                        {staff.name}
                      </h3>
                      <p className="text-xs font-urdu text-stone-300 truncate">
                        {staff.title}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#140A05] border border-[#C9B38D]/15 mb-4 text-xs font-urdu text-[#D9C7A7] flex items-center justify-between">
                    <span>مدتِ خدمت:</span>
                    <span className="font-bold text-white">{staff.tenure}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.2] text-right">
                    {staff.contribution}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#C9B38D]/15 flex items-center justify-between text-[11px] font-urdu text-stone-400">
                  <span>شعبہ: {staff.department}</span>
                  <span className="text-[#C9B38D] font-bold">خراجِ عقیدت</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden border-t border-[#C9B38D]/20">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
              <Users className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">تدریسی و انتظامی فیکلٹی</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
              موجودہ اساتذہ اور <span className="text-[#C9B38D]">انتظامیہ</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
              اہلِ علم، ماہرِ علومِ قرآنی اور جدید تعلیمی اصولوں سے واقف اساتذہ کرام جو شب و روز طلبہ کی تعمیرِ سیرت میں مصروف ہیں
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
            {[
              { id: "all", label: "تمام ارکان" },
              { id: "leadership", label: "قیادت و پرنسپل" },
              { id: "faculty", label: "اساتذہ کرام" },
              { id: "quran", label: "شعبہ حفظ و تجوید" },
              { id: "admin", label: "انتظامیہ و اکاؤنٹس" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-urdu text-xs sm:text-sm font-bold px-5 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-[#120A05] border-2 border-[#C9B38D] shadow-lg scale-105"
                    : "bg-[#1A0E08] text-stone-300 hover:text-white border border-[#C9B38D]/30 hover:border-[#C9B38D]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="group relative rounded-3xl p-5 bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#120703] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.3)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-stone-900 border border-[#C9B38D]/30 shadow-inner group-hover:border-[#C9B38D] transition-colors">
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {staff.isOnlineActive && (
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-[10px] font-urdu font-bold backdrop-blur-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>فعال و حاضر</span>
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-urdu font-semibold text-[#C9B38D] bg-[#22130A] px-2.5 py-0.5 rounded-full border border-[#C9B38D]/30 inline-block mb-1.5">
                      {staff.department}
                    </span>
                    <h3 className="font-urdu font-bold text-white text-lg leading-[1.6] group-hover:text-[#D9C7A7] transition-colors">
                      {staff.name}
                    </h3>
                    <p className="text-xs font-urdu font-semibold text-stone-300 mt-1">
                      {staff.title}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#C9B38D]/15 space-y-2 text-right">
                    <div className="text-[11px] font-urdu text-stone-300 leading-[1.8]">
                      <span className="text-[#C9B38D] font-bold">تعلیمی قابلیت: </span>
                      {staff.qualification}
                    </div>
                    <div className="text-[11px] font-urdu text-stone-300">
                      <span className="text-[#C9B38D] font-bold">تجربہ: </span>
                      {staff.experience}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#C9B38D]/20 flex items-center justify-between text-xs font-urdu">
                  <button
                    onClick={() => setIsAdmissionOpen(true)}
                    className="w-full h-9 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] font-urdu font-bold text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                  >
                    <span>رابطہ و ملاقات</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1A0E08] via-[#24130A] to-[#1A0E08] border-2 border-[#C9B38D]/40 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right shadow-2xl">
            <div>
              <h3 className="text-2xl font-urdu font-bold text-white mb-2 leading-[1.8]">
                کیا آپ ہمارے اساتذہ کی زیرِ نگرانی تعلیم حاصل کرنا چاہتے ہیں؟
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.2]">
                تعلیمی سال ۲۰۲۶ - ۲۰۲۷ کے لیے داخلے جاری ہیں۔ ٹیسٹ و انٹرویو کے لیے آن لائن فارم پر کریں۔
              </p>
            </div>
            <button
              onClick={() => setIsAdmissionOpen(true)}
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            >
              آن لائن داخلہ فارم پر جائیں
            </button>
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
