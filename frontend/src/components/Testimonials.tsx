"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Quote,
  Sparkles,
  Star,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  X,
  Send,
  Heart,
  Award,
  SlidersHorizontal
} from "lucide-react";

export interface TestimonialItem {
  id: number | string;
  category: "scholars" | "parents" | "alumni";
  categoryLabel: string;
  badge: string;
  name: string;
  role: string;
  association: string;
  location: string;
  date: string;
  quote: string;
  rating: number;
  avatar: string;
  initialLikes?: number;
}

interface TestimonialsProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  items?: TestimonialItem[];
}

const defaultTestimonialsList: TestimonialItem[] = [
  {
    id: 1,
    category: "scholars",
    categoryLabel: "علمائے کرام",
    badge: "جید عالمِ دین",
    name: "علامہ سید مہدی موسوی",
    role: "فاضل حوزہ علمیہ قم و سرپرست",
    association: "حوزوی محقق و امامِ جمعہ",
    location: "قم / کراچی",
    date: "شوال ۱۴۴۵ھ",
    quote:
      "مدرسہ صاحب الزمان (عج) میں جس خلوص اور عرق ریزی کے ساتھ علومِ آلِ محمدؑ کی تدریس ہو رہی ہے، وہ عصرِ حاضر میں ایک مثال ہے۔ یہاں کے درجات علمی لحاظ سے پختہ اور طلبہ اخلاقی و روحانی طور پر باوقار کردار کے حامل ہیں۔",
    rating: 5,
    avatar: "/images/faculty/principal-scholar.jpg",
    initialLikes: 42
  },
  {
    id: 2,
    category: "scholars",
    categoryLabel: "علمائے کرام",
    badge: "استادِ حوزہ",
    name: "مولانا سید عابد رضوی",
    role: "استادِ درسِ خارج و فقہ",
    association: "حوزہ علمیہ نجف اشرف سے سند یافتہ",
    location: "نجف اشرف",
    date: "رمضان المبارک ۱۴۴۵ھ",
    quote:
      "ادارے کا تدریسی نظم و ضبط، فقہی و کلامی کلاسز کا اعلیٰ معیار اور خصوصاً اساتذہ کی شب و روز طلبہ پر شفقت دیکھ کر دلی طمأنینت حاصل ہوتی ہے۔ یہاں دینی اور عصری علوم کا حسین امتزاج نئی نسل کے ایمان کی مضبوط ڈھال ہے۔",
    rating: 5,
    avatar: "/images/layout/avatar1.jpg",
    initialLikes: 38
  },
  {
    id: 3,
    category: "scholars",
    categoryLabel: "علمائے کرام",
    badge: "مدیر جامعہ و خطیب",
    name: "حجۃ الاسلام مولانا خادم حسین جعفری",
    role: "مبلغ و استادِ اخلاق",
    association: "جامعۃ المصطفیٰ العالمیہ",
    location: "لاہور",
    date: "رجب المرجب ۱۴۴۵ھ",
    quote:
      "طلبہ کے حفظِ قرآن کے تلفظ، عربی قواعد کے ادراک اور تفسیری بصیرت نے مجھے بے حد متاثر کیا۔ یہ ادارہ حقیقی معنوں میں امام زمانہ عجل اللہ فرجہ الشریف کے مشن کا ایک درخشندہ چراغ ہے۔",
    rating: 5,
    avatar: "/images/faculty/founder-scholar.jpg",
    initialLikes: 56
  },
  {
    id: 4,
    category: "parents",
    categoryLabel: "محترم سرپرست و والدین",
    badge: "معزز سرپرست",
    name: "الحاج محمد ارسلان رضوی",
    role: "والدِ محترم طالب علم علی رضا",
    association: "سرپرست برائے ۴ سال",
    location: "کراچی",
    date: "ذی الحجہ ۱۴۴۵ھ",
    quote:
      "میرے دونوں بیٹے یہاں حفظِ قرآن اور حوزوی شعبے میں زیرِ تعلیم ہیں۔ بچوں کے اخلاق، نمازِ پنجگانہ کی پابندی اور والدین کے احترام میں جو واضح پاکیزگی آئی ہے وہ دیکھ کر دل باغ باغ ہو جاتا ہے۔ اللہ تعالیٰ اس ادارے کو سدا آباد رکھے۔",
    rating: 5,
    avatar: "/images/layout/avatar3.jpg",
    initialLikes: 31
  },
  {
    id: 5,
    category: "parents",
    categoryLabel: "محترم سرپرست و والدین",
    badge: "معزز سرپرست",
    name: "ڈاکٹر سید ظفر عباس نقوی",
    role: "معروف فزیشن و سرپرست",
    association: "والدِ محترم طالب علم محمد ہادی",
    location: "احسن آباد، کراچی",
    date: "محرم الحرام ۱۴۴۶ھ",
    quote:
      "دینی کتب کے ساتھ ساتھ انگلش لینگویج، کمپیوٹر لیب اور حفظانِ صحت کے اصولوں کے مطابق طعام کی سہولت قابلِ رشک ہے۔ یہ وہ ادارہ ہے جہاں بچہ دنیا اور آخرت دونوں میں سرخرو ہونے کی بنیاد حاصل کرتا ہے۔",
    rating: 5,
    avatar: "/images/layout/avatar2.jpg",
    initialLikes: 47
  },
  {
    id: 6,
    category: "parents",
    categoryLabel: "محترم سرپرست و والدین",
    badge: "معزز سرپرست",
    name: "سید قاسم حسین زیدی",
    role: "سرپرست طالب علم حسنین زیدی",
    association: "گلزارِ ہجری",
    location: "کراچی",
    date: "صفر المظفر ۱۴۴۶ھ",
    quote:
      "مدرسے میں صفائی ستھرائی، ہاسٹل کے بہترین انتظامات اور مفت طعام و رہائش کی شفاف سہولیات دیکھ کر سرپرست مکمل بے فکر ہو جاتے ہیں۔ انتظامیہ کی ایمانداری اور طلبہ سے برتاؤ انتہائی شفیق ہے۔",
    rating: 5,
    avatar: "/images/tawaf/avatar2.jpg",
    initialLikes: 29
  },
  {
    id: 7,
    category: "alumni",
    categoryLabel: "فارغ التحصیل طلبہ",
    badge: "فاضل حوزوی",
    name: "مولانا محمد رضا امینی",
    role: "فارغ التحصیل ۵ سالہ نصاب",
    association: "مدرس و محقق دینی کتب",
    location: "جامعہ نجفیہ",
    date: "رجب المرجب ۱۴۴۵ھ",
    quote:
      "مدرسہ صاحب الزمان نے ہمیں صرف کتب کا علم نہیں دیا بلکہ تقویٰ، خلوص اور انسانیت کی خدمت کا عملی درس دیا۔ دسترخوانِ امام زمانہؑ سے لے کر اساتذہ کے شفیق ہاتھ تک، یہ ادارہ میرا دوسرا گھر رہا ہے۔",
    rating: 5,
    avatar: "/images/tawaf/about_pilgrim.jpg",
    initialLikes: 35
  },
  {
    id: 8,
    category: "alumni",
    categoryLabel: "فارغ التحصیل طلبہ",
    badge: "خطیب و مدرس",
    name: "مولانا سید کمیل عباس طاہری",
    role: "فاضل دورہ عالیہ و خطیب",
    association: "پیش نماز و مبلغ",
    location: "حیدرآباد",
    date: "شعبان المعظم ۱۴۴۵ھ",
    quote:
      "یہاں سے فراغت کے بعد جب ہم میدانِ عمل میں آئے تو اندازہ ہوا کہ ہمارے اساتذہ نے ہماری علمی بنیادوں کو کتنا مستحکم کیا تھا۔ مناظرہ، خطابت اور فقہی مسائل پر مکمل عبور اسی درسگاہ کا فیضان ہے۔",
    rating: 5,
    avatar: "/images/tawaf/avatar1.jpg",
    initialLikes: 51
  },
  {
    id: 9,
    category: "alumni",
    categoryLabel: "فارغ التحصیل طلبہ",
    badge: "حافظِ قرآن و طالب علم",
    name: "حافظ محمد باقر حسینی",
    role: "حافظِ کل قرآن و فاضل دورہ مقدمات",
    association: "اب زیرِ تعلیم دورہ سطح",
    location: "کراچی",
    date: "رمضان المبارک ۱۴۴۵ھ",
    quote:
      "تجوید و قرائت کے ساتھ حفظ مکمل کرنے میں اساتذہ کی روزانہ کی رہنمائی اور دعائیہ فضا نے میرے سفر کو آسان بنایا۔ اللہ تعالیٰ اس مقدس ادارے کی خدمات کو اپنی بارگاہ میں قبول فرمائے۔",
    rating: 5,
    avatar: "/images/layout/avatar1.jpg",
    initialLikes: 44
  }
];

export default function Testimonials({ header, items }: TestimonialsProps = {}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "والدین / سرپرست",
    rating: 5,
    message: ""
  });

  const categories = [
    { id: "all", label: "تمام تاثرات" },
    { id: "scholars", label: "علمائے کرام" },
    { id: "parents", label: "محترم سرپرست و والدین" },
    { id: "alumni", label: "فارغ التحصیل طلبہ" }
  ];

  const testimonialsList: TestimonialItem[] =
    items && Array.isArray(items) && items.length > 0 ? items : defaultTestimonialsList;

  // Responsive visible count: 1 on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === "all") return testimonialsList;
    return testimonialsList.filter((item) => item.category === activeCategory);
  }, [activeCategory, testimonialsList]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const maxIndex = Math.max(0, filteredTestimonials.length - visibleCount);

  // Auto-play sliding
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= visibleCount) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length, visibleCount, maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch Swipe for mobile devices
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const handleLike = (id: number | string) => {
    const key = String(id);
    setLikedReviews((prev) => {
      const isCurrentlyLiked = !!prev[key];
      const newStatus = !isCurrentlyLiked;
      setLikeCounts((counts) => ({
        ...counts,
        [key]: (counts[key] || 0) + (newStatus ? 1 : -1)
      }));
      return { ...prev, [key]: newStatus };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        name: "",
        phone: "",
        category: "والدین / سرپرست",
        rating: 5,
        message: ""
      });
    }, 2500);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#120A05] islamic-navy-pattern relative overflow-hidden" dir="rtl">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[350px] bg-[#C9B38D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#C9B38D]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* 1. SECTION HEADER: Center Majestic Urdu Typography       */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "اکابرین و سرپرستوں کے تاثرات"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "اہلِ علم، اکابرین و والدین کے گراں قدر تاثرات"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "علمائے کرام، معزز سرپرستوں اور فارغ التحصیل طلبہ کے مدرسہ صاحب الزمان کی علمی، اخلاقی و فلاحی خدمات سے متعلق دلی خیالات"}
          </p>

          {/* Rating Pill */}
          <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1C1009] border border-[#C9B38D]/30 text-xs font-urdu text-[#C9B38D] shadow-md">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold font-sans">5.0 / 5.0</span>
            <span className="text-stone-400">•</span>
            <span>۱۰۰٪ مصدقہ و باضابطہ آراء</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. CATEGORY TABS & SLIDER CONTROLS ROW                   */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C9B38D]/15 font-urdu">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? testimonialsList.length
                  : testimonialsList.filter((t) => t.category === cat.id).length;

              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#C9B38D] text-[#120A05] shadow-[0_0_15px_rgba(201,179,141,0.4)] scale-105"
                      : "bg-[#1A0E08] text-stone-300 border border-[#C9B38D]/25 hover:border-[#C9B38D] hover:text-white"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                      isActive ? "bg-[#120A05] text-[#C9B38D]" : "bg-white/10 text-stone-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action & Slider Navigation Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Modal Trigger Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-[#C9B38D]/35 transition shadow-sm cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#C9B38D]" />
              <span>اپنی رائے درج کریں</span>
            </button>

            {/* Slider Navigation Arrows (< & >) */}
            <div className="flex items-center gap-2 bg-[#1A0E08] p-1 rounded-full border border-[#C9B38D]/30 shadow-inner">
              <button
                onClick={handlePrev}
                aria-label="پچھلا تاثر"
                title="پچھلا تاثر"
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white bg-[#120A05] hover:bg-[#C9B38D] hover:text-[#120A05] border border-[#C9B38D]/20 transition active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-[#C9B38D] px-2" dir="ltr">
                {currentIndex + 1} / {Math.max(1, filteredTestimonials.length)}
              </span>

              <button
                onClick={handleNext}
                aria-label="اگلا تاثر"
                title="اگلا تاثر"
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white bg-[#120A05] hover:bg-[#C9B38D] hover:text-[#120A05] border border-[#C9B38D]/20 transition active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. SINGLE ROW TESTIMONIALS SLIDER CAROUSEL               */}
        {/* ======================================================== */}
        <div
          className="relative overflow-hidden w-full py-4"
          dir="ltr"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12 text-stone-400 font-urdu text-sm" dir="rtl">
              اس کیٹیگری میں فی الحال کوئی تاثر موجود نہیں ہے۔
            </div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {filteredTestimonials.map((item, idx) => {
                const currentLikes = (likeCounts[String(item.id)] || 0) + (item.initialLikes || 30);
                const isLiked = !!likedReviews[String(item.id)];

                return (
                  <div
                    key={item.id || idx}
                    className="shrink-0 px-2.5 sm:px-3 flex flex-col"
                    style={{ width: `${100 / visibleCount}%` }}
                    dir="rtl"
                  >
                    <div className="h-full p-6 sm:p-7 rounded-[28px] bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#120A05] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.22)] transition-all duration-300 flex flex-col justify-between text-right relative group hover:-translate-y-1">
                      
                      {/* Subtle Ambient Quote Watermark */}
                      <Quote className="absolute top-4 left-4 w-14 h-14 text-[#C9B38D]/5 pointer-events-none" />

                      {/* Top Row: Category Tag, Stars & Date */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="px-3 py-1 rounded-full bg-[#24130A] text-[11px] font-urdu font-bold text-[#C9B38D] border border-[#C9B38D]/30 shadow-sm">
                            {item.badge || item.categoryLabel}
                          </span>

                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-400">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="text-[10px] font-urdu text-stone-400">
                              {item.date}
                            </span>
                          </div>
                        </div>

                        {/* Quote Text in clear Urdu typography */}
                        <p className="text-xs sm:text-sm text-stone-200 font-urdu leading-[2.35] mb-6 line-clamp-5">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      {/* Reviewer Details Bottom Row */}
                      <div className="pt-4 border-t border-[#C9B38D]/20">
                        <div className="flex items-center justify-between gap-3">
                          
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9B38D]/60 shrink-0 shadow-md bg-[#120A05]">
                              <Image
                                src={item.avatar || "/images/layout/avatar1.jpg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-sm sm:text-base font-urdu font-bold text-white group-hover:text-[#D9C7A7] transition-colors truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-[#C9B38D] font-urdu font-medium truncate mt-0.5">
                                {item.role}
                              </p>
                              <p className="text-[10px] text-stone-400 font-urdu truncate">
                                {item.location} • {item.association}
                              </p>
                            </div>
                          </div>

                          {/* Reaction Heart Button */}
                          <button
                            onClick={() => handleLike(item.id)}
                            aria-label="مفید تاثر"
                            title="مفید تاثر"
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition shrink-0 border cursor-pointer ${
                              isLiked
                                ? "bg-rose-950/70 border-rose-500 text-rose-300"
                                : "bg-[#1A0E08] border-[#C9B38D]/20 text-stone-400 hover:text-white hover:border-[#C9B38D]"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isLiked ? "fill-rose-500 text-rose-500" : ""
                              }`}
                            />
                          </button>

                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 4. DOT INDICATORS FOR SLIDER                             */}
        {/* ======================================================== */}
        {filteredTestimonials.length > visibleCount && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, dIdx) => (
              <button
                key={dIdx}
                onClick={() => setCurrentIndex(dIdx)}
                aria-label={`سلائیڈ ${dIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === dIdx
                    ? "w-8 h-2.5 bg-gradient-to-r from-[#C9B38D] to-[#EFE5D2] shadow-[0_0_10px_rgba(201,179,141,0.6)]"
                    : "w-2.5 h-2.5 bg-stone-700 hover:bg-stone-500"
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* 5. MODAL: SUBMIT REVIEW / FEEDBACK FORM                  */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1E110A] to-[#120A05] border-2 border-[#C9B38D]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-right max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition flex items-center justify-center cursor-pointer"
              aria-label="بند کریں"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A160D] border border-[#C9B38D]/30 text-[#C9B38D] text-xs font-urdu mb-2">
                <Heart className="w-3.5 h-3.5" />
                <span>رائے و تجاویز</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white leading-[1.7]">
                اپنا گراں قدر تاثر درج فرمائیں
              </h3>
              <p className="text-xs text-stone-300 font-urdu mt-1 leading-[1.8]">
                آپ کی رائے اور تاثرات ہمارے لیے مشعلِ راہ ہیں۔ برائے مہربانی اپنا پیغام درج کریں۔
              </p>
            </div>

            {feedbackSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-urdu font-bold text-lg text-white">شکریہ! آپ کی رائے موصول ہو گئی</h4>
                <p className="font-urdu text-xs text-stone-200">
                  آپ کے نیک جذبات اور گراں قدر خیالات کا بہت شکریہ۔ تصدیق کے بعد ویب سائٹ پر شائع کر دیا جائے گا۔
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-urdu text-xs sm:text-sm">
                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">آپ کا مبارک نام *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثلاً: الحاج سید علی رضا"
                    className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">تعلق / حیثیت</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none cursor-pointer"
                    >
                      <option value="والدین / سرپرست">والدین / سرپرست</option>
                      <option value="عالمِ دین / محقق">عالمِ دین / محقق</option>
                      <option value="فارغ التحصیل طالب علم">فارغ التحصیل طالب علم</option>
                      <option value="خیر خواہ و معاون">خیر خواہ و معاون</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">موبائل / واٹس ایپ نمبر</label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="03001234567"
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">درجہ بندی (اسٹارز)</label>
                  <div className="flex gap-2 p-2 bg-[#140A05] rounded-xl border border-[#C9B38D]/20">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "fill-[#C9B38D] text-[#C9B38D]"
                              : "text-stone-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">آپ کا تاثر / پیغام *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="مدرسہ صاحب الزمان سے متعلق اپنے خیالات یا تاثرات درج فرمائیں..."
                    className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2 text-white outline-none resize-none leading-[2.1]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-urdu font-bold text-sm py-3 rounded-full bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] transition shadow-lg mt-2 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>تاثرات ارسال کریں</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
