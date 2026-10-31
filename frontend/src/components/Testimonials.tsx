"use client";

import React, { useState, useMemo } from "react";
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
  BookOpen,
  GraduationCap,
  Users,
  Building2,
  ThumbsUp
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
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});

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

  // Spotlight list (top 3 reviews, picking across categories if possible)
  const spotlightReviews = useMemo(() => {
    if (!testimonialsList || testimonialsList.length === 0) return [];
    const scholar = testimonialsList.find((t) => t.category === "scholars");
    const parent = testimonialsList.find((t) => t.category === "parents");
    const alumni = testimonialsList.find((t) => t.category === "alumni");
    const picked = [scholar, parent, alumni].filter(Boolean) as TestimonialItem[];
    return picked.length > 0 ? picked : testimonialsList.slice(0, 3);
  }, [testimonialsList]);

  const currentSpotlight =
    spotlightReviews[spotlightIndex] || spotlightReviews[0] || testimonialsList[0] || null;

  const handleNextSpotlight = () => {
    setSpotlightIndex((prev) => (prev + 1) % spotlightReviews.length);
  };

  const handlePrevSpotlight = () => {
    setSpotlightIndex((prev) => (prev - 1 + spotlightReviews.length) % spotlightReviews.length);
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

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === "all") return testimonialsList;
    return testimonialsList.filter((item) => item.category === activeCategory);
  }, [activeCategory, testimonialsList]);

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
    <section id="testimonials" className="py-24 sm:py-32 bg-[#120A05] islamic-navy-pattern relative overflow-hidden" dir="rtl">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[350px] bg-[#C9B38D]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#C9B38D]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* 1. SECTION HEADER: Center Majestic Urdu Typography       */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "علماء و سرپرستوں کے ارشادات و آراء"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "اہلِ علم و والدین کے گراں قدر تاثرات"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "علمائے کرام، معزز سرپرستوں اور فارغ التحصیل طلبہ کے مدرسہ صاحب الزمان کی علمی، اخلاقی و فلاحی خدمات سے متعلق دلی خیالات"}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. BENTO ROW: Spotlight Showcase + Rating Scorecard      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 sm:mb-16 items-stretch">
          
          {/* Bento Card 1: Interactive Featured Spotlight Review (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] h-full flex flex-col">
              <div className="bg-gradient-to-b from-[#1C1009] via-[#150B06] to-[#110904] rounded-[30px] p-6 sm:p-9 relative overflow-hidden flex-1 flex flex-col justify-between">
                
                {/* Large Ambient Watermark Quote */}
                <Quote className="absolute -bottom-8 -left-8 w-48 h-48 text-[#C9B38D]/5 pointer-events-none" />

                <div>
                  {/* Top Bar: Badge, Stars & Slide Controls */}
                  <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#2A160D] text-xs font-urdu font-bold text-[#C9B38D] border border-[#C9B38D]/35 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>نمایاں تاثر: {currentSpotlight.badge}</span>
                      </span>

                      <span className="text-[11px] font-urdu text-stone-400 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                        {currentSpotlight.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Rating Stars */}
                      <div className="flex text-[#C9B38D]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#C9B38D]" />
                        ))}
                      </div>

                      {/* Slider Navigation Buttons */}
                      <div className="flex items-center gap-1.5 bg-[#120A05] p-1 rounded-full border border-[#C9B38D]/30">
                        <button
                          onClick={handlePrevSpotlight}
                          aria-label="پچھلا تاثر"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#2A160D] transition active:scale-90"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-urdu font-bold text-[#C9B38D] px-1.5">
                          {spotlightIndex + 1} / {spotlightReviews.length}
                        </span>
                        <button
                          onClick={handleNextSpotlight}
                          aria-label="اگلا تاثر"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#2A160D] transition active:scale-90"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Quote Text */}
                  <blockquote className="text-base sm:text-xl lg:text-2xl leading-[2.4] sm:leading-[2.6] text-stone-100 font-urdu font-medium text-right mb-6">
                    &ldquo;{currentSpotlight.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom Reviewer Profile Bar */}
                <div className="pt-5 border-t border-[#C9B38D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-b from-[#EFE5D2] to-[#876F4B] shadow-lg shrink-0">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#120A05]">
                        <Image
                          src={currentSpotlight.avatar}
                          alt={currentSpotlight.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#120A05] flex items-center justify-center text-white" title="تصدیق شدہ">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    </div>

                    <div className="text-right">
                      <h3 className="text-base sm:text-lg font-urdu font-bold text-white leading-[1.6]">
                        {currentSpotlight.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-urdu text-[#D9C7A7] font-medium leading-[1.6]">
                        {currentSpotlight.role} • {currentSpotlight.location}
                      </p>
                      <p className="text-[11px] font-urdu text-stone-400">
                        {currentSpotlight.association}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Like/Reaction */}
                  <button
                    onClick={() => handleLike(currentSpotlight.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-urdu font-bold transition-all border ${
                      likedReviews[currentSpotlight.id]
                        ? "bg-rose-950/60 border-rose-500/60 text-rose-300"
                        : "bg-[#1A0E08] border-[#C9B38D]/25 text-stone-300 hover:text-white hover:border-[#C9B38D]"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        likedReviews[currentSpotlight.id] ? "fill-rose-500 text-rose-500 scale-110" : "text-stone-400"
                      }`}
                    />
                    <span>مفید رائے ({likeCounts[currentSpotlight.id]})</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Bento Card 2: Trust & Rating Scorecard (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="rounded-[32px] p-6 sm:p-7 bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#120A05] border border-[#C9B38D]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-1 flex flex-col justify-between text-right">
              
              <div>
                {/* Aggregate Rating Banner */}
                <div className="flex items-center justify-between pb-5 border-b border-[#C9B38D]/20">
                  <div>
                    <span className="text-xs font-urdu font-bold text-[#C9B38D] uppercase tracking-wider block mb-1">
                      مجموعی تعلیمی و تربیتی درجہ بندی
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold font-sans text-white">5.0</span>
                      <span className="text-stone-400 font-urdu text-xs">از ۵.۰</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="flex text-[#C9B38D] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#C9B38D]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-urdu text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>۱۰۰٪ تصدیق شدہ</span>
                    </span>
                  </div>
                </div>

                {/* Rating Distribution Meters */}
                <div className="py-5 space-y-3 font-urdu text-xs">
                  <div>
                    <div className="flex justify-between text-stone-200 mb-1">
                      <span>تدریس و فقہی کتب کا معیار</span>
                      <span className="text-[#C9B38D] font-bold">۱۰۰٪</span>
                    </div>
                    <div className="w-full bg-[#100804] h-2 rounded-full overflow-hidden border border-[#C9B38D]/15">
                      <div className="bg-gradient-to-r from-[#876F4B] to-[#C9B38D] h-full rounded-full w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-200 mb-1">
                      <span>روحانی و اخلاقی تربیت</span>
                      <span className="text-[#C9B38D] font-bold">۹۹٪</span>
                    </div>
                    <div className="w-full bg-[#100804] h-2 rounded-full overflow-hidden border border-[#C9B38D]/15">
                      <div className="bg-gradient-to-r from-[#876F4B] to-[#C9B38D] h-full rounded-full w-[99%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-200 mb-1">
                      <span>ہاسٹل، طعام و صفائی</span>
                      <span className="text-[#C9B38D] font-bold">۹۸٪</span>
                    </div>
                    <div className="w-full bg-[#100804] h-2 rounded-full overflow-hidden border border-[#C9B38D]/15">
                      <div className="bg-gradient-to-r from-[#876F4B] to-[#C9B38D] h-full rounded-full w-[98%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-200 mb-1">
                      <span>سرپرستوں سے باقاعدہ رابطہ</span>
                      <span className="text-[#C9B38D] font-bold">۱۰۰٪</span>
                    </div>
                    <div className="w-full bg-[#100804] h-2 rounded-full overflow-hidden border border-[#C9B38D]/15">
                      <div className="bg-gradient-to-r from-[#876F4B] to-[#C9B38D] h-full rounded-full w-full" />
                    </div>
                  </div>
                </div>

                {/* Trust Statistics */}
                <div className="grid grid-cols-2 gap-3 pt-2 pb-4">
                  <div className="p-3 rounded-2xl bg-[#140A05] border border-[#C9B38D]/20 text-center">
                    <span className="text-xl font-bold font-sans text-white block">500+</span>
                    <span className="text-[11px] font-urdu text-stone-300">مطمئن سرپرست</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#140A05] border border-[#C9B38D]/20 text-center">
                    <span className="text-xl font-bold font-sans text-[#C9B38D] block">100%</span>
                    <span className="text-[11px] font-urdu text-stone-300">مفت خدمات</span>
                  </div>
                </div>
              </div>

              {/* Direct CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full font-urdu font-bold text-xs sm:text-sm py-3 px-4 rounded-2xl bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#120A05]" />
                <span>اپنا تاثر و رائے درج فرمائیں</span>
              </button>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. CATEGORY FILTER TABS WITH COUNTERS                    */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#C9B38D]/15 font-urdu">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
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
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
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

          <div className="text-xs text-stone-400 font-urdu hidden sm:flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9B38D]" />
            <span>تمام تاثرات انتظامیہ کی جانب سے مصدقہ ہیں</span>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 4. REVIEWS GRID: Premium Balanced Cards                  */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-[28px] bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#120A05] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.22)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 text-right relative"
            >
              {/* Top Row: Category Tag, Rating & Date */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#24130A] text-[11px] font-urdu font-bold text-[#C9B38D] border border-[#C9B38D]/30">
                    {item.badge}
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="flex text-[#C9B38D]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C9B38D] text-[#C9B38D]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-urdu text-stone-400">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Quote Text with comfortable Nastaliq line height */}
                <p className="text-xs sm:text-sm text-stone-200 font-urdu leading-[2.35] mb-6 line-clamp-4 group-hover:line-clamp-none transition-all">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Reviewer Details Row */}
              <div className="pt-4 border-t border-[#C9B38D]/20">
                <div className="flex items-center justify-between gap-3">
                  
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9B38D]/60 shrink-0 shadow-md bg-[#120A05]">
                      <Image
                        src={item.avatar}
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

                  {/* Reaction Button */}
                  <button
                    onClick={() => handleLike(item.id)}
                    aria-label="مفید تاثر"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition shrink-0 border ${
                      likedReviews[item.id]
                        ? "bg-rose-950/70 border-rose-500 text-rose-300"
                        : "bg-[#1A0E08] border-[#C9B38D]/20 text-stone-400 hover:text-white hover:border-[#C9B38D]"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedReviews[item.id] ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 5. BOTTOM INVITATION BANNER                              */}
        {/* ======================================================== */}
        <div className="mt-16 p-6 sm:p-9 rounded-[32px] bg-gradient-to-r from-[#1A0E08] via-[#24130A] to-[#1A0E08] border-2 border-[#C9B38D]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#120A05] border border-[#C9B38D]/40 flex items-center justify-center shrink-0 shadow text-[#C9B38D]">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-urdu font-bold text-white text-base sm:text-xl leading-[1.8]">
                کیا آپ کا بچہ بھی مدرسہ صاحب الزمان میں زیرِ تعلیم ہے یا آپ خیر خواہ ہیں؟
              </h4>
              <p className="font-urdu text-xs sm:text-sm text-stone-300 mt-1 leading-[2.1]">
                ہمیں اپنی مخلصانہ رائے اور تجاویز سے آگاہ فرمائیں تاکہ ہم تعلیمی و فلاحی معیار کو مزید درخشاں بنا سکیں۔
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-sm shrink-0 shadow-lg transition active:scale-95 cursor-pointer relative z-10"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#8C6D3F] ml-2" />
            <span>اپنی رائے درج فرمائیں</span>
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 6. MODAL: SUBMIT REVIEW / FEEDBACK FORM                  */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1E110A] to-[#120A05] border-2 border-[#C9B38D]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-right max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition flex items-center justify-center"
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
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
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
                        className="p-1 hover:scale-125 transition-transform"
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
                  className="w-full font-urdu font-bold text-sm py-3 rounded-full bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] transition shadow-lg mt-2 active:scale-95 flex items-center justify-center gap-2"
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
