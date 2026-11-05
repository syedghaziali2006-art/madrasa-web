"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  X,
  Send,
  Heart,
  Hand,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState<number>(0);
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

  const testimonialsList: TestimonialItem[] =
    items && Array.isArray(items) && items.length > 0 ? items : defaultTestimonialsList;

  // Handle Drag Gesture
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (Math.abs(info.offset.x) > 80) {
      const direction = info.offset.x > 0 ? 300 : -300;
      setExitX(direction);
      setTimeout(() => {
        // Cycle card
        setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
        setExitX(0);
      }, 200);
    }
  };

  const handleNext = () => {
    setExitX(-280);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
      setExitX(0);
    }, 200);
  };

  const handlePrev = () => {
    setExitX(280);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
      setExitX(0);
    }, 200);
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
    <section
      id="reviews"
      dir="rtl"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#0A0503] text-[#FAF7F2]"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,179,141,0.12)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,185,0,0.08)_0%,_transparent_65%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">

        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/85 border border-[#C9B38D]/40 text-[#D9C7A7] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg shadow-black/40">
            
            <span className="font-urdu">
              {header?.badge || "اکابرین و سرپرستوں کے تاثرات"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || (
              <>
                علمائے کرام و اکابرین کے{" "}
                <span className="text-[#C9B38D]">مبارک تاثرات و پیغامات</span>
              </>
            )}
          </h2>

          <p className="font-urdu text-sm sm:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto pt-2">
            {header?.subtitle || "مدرسہ کی علمی و اخلاقی خدمات پر جید علماء اور سرپرستوں کے تاثرات"}
          </p>

          {/* Interactive Action Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A0E08]/90 hover:bg-[#C9B38D] border border-[#C9B38D]/50 text-[#D9C7A7] hover:text-[#120A05] font-urdu text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>اپنی رائے شامل کریں (Feedback)</span>
            </button>

            {/* Gesture Hint Badge */}
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-urdu">
              <Hand className="w-3.5 h-3.5 text-[#C9B38D] animate-bounce" />
              <span>کارڈ کو دائیں یا بائیں سوائپ (Swipe) کریں</span>
            </span>
          </div>
        </div>

        {/* 2. STACKED MOTION CARD CAROUSEL (Framer-Motion Gesture Stack) */}
        <div className="relative w-full max-w-2xl mx-auto h-[440px] sm:h-[400px] flex items-center justify-center">

          {/* Left Arrow Button (Next) */}
          <button
            onClick={handlePrev}
            aria-label="پچھلی رائے"
            className="absolute -right-4 sm:-right-14 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_rgba(255,245,230,0.2),0_10px_25px_rgba(0,0,0,0.6)] text-[#f5deb3] hover:text-white hover:bg-white/[0.12] hover:border-[#f5deb3]/35 hover:scale-105 active:scale-95 transition-all duration-300 z-20 flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Right Arrow Button (Prev) */}
          <button
            onClick={handleNext}
            aria-label="اگلی رائے"
            className="absolute -left-4 sm:-left-14 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_rgba(255,245,230,0.2),0_10px_25px_rgba(0,0,0,0.6)] text-[#f5deb3] hover:text-white hover:bg-white/[0.12] hover:border-[#f5deb3]/35 hover:scale-105 active:scale-95 transition-all duration-300 z-20 flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Stacked Cards Area */}
          <div className="relative w-full h-full max-w-[560px] flex items-center justify-center">
            {testimonialsList.map((item, index) => {
              const isCurrentCard = index === currentIndex;
              const isPrevCard = index === (currentIndex + 1) % testimonialsList.length;
              const isNextCard = index === (currentIndex + 2) % testimonialsList.length;

              if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

              const isLiked = !!likedReviews[String(item.id)];
              const currentLikes =
                (item.initialLikes || 35) + (likeCounts[String(item.id)] || 0);

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute w-full rounded-3xl p-6 sm:p-8 select-none cursor-grab active:cursor-grabbing",
                    "bg-gradient-to-b from-[#2a1e14]/55 to-[#140e09]/75 hover:from-[#38281b]/65",
                    "border border-[#f5deb3]/15 hover:border-[#f5deb3]/30",
                    "shadow-[inset_0_1px_1px_0_rgba(255,245,230,0.18),0_12px_32px_-8px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_2px_0_rgba(255,245,230,0.28),0_16px_40px_-8px_rgba(0,0,0,0.7)]",
                    "backdrop-blur-xl transition-all duration-300 ease-out"
                  )}
                  style={{
                    zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                  }}
                  drag={isCurrentCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.65}
                  onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                  initial={{
                    scale: 0.95,
                    opacity: 0,
                    y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                    rotate: isCurrentCard ? 0 : isPrevCard ? -2.5 : -5,
                  }}
                  animate={{
                    scale: isCurrentCard ? 1 : isPrevCard ? 0.96 : 0.92,
                    opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                    x: isCurrentCard ? exitX : 0,
                    y: isCurrentCard ? 0 : isPrevCard ? 10 : 20,
                    rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2.5 : -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                  }}
                >
                  {/* Subtle Top-Center Specular Golden Light Bleed */}
                  <div className="absolute top-0 inset-x-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#f5deb3]/50 to-transparent pointer-events-none" />

                  {/* Card Header: Category + Rating Stars */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#f5deb3]/15">
                    <span className="font-urdu text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_rgba(255,245,230,0.15)] text-[#f5deb3] hover:bg-white/[0.09] transition-all duration-300">
                      {item.categoryLabel}
                    </span>

                    {/* 5 Rating Stars */}
                    <div className="flex items-center gap-1" dir="ltr">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card Body: Quote */}
                  <div className="relative py-4 sm:py-5 min-h-[140px] sm:min-h-[130px] flex items-center">
                    <Quote className="absolute top-2 right-0 w-8 h-8 text-[#f5deb3]/15 pointer-events-none rotate-180" />
                    <p className="font-urdu text-stone-200 text-sm sm:text-base leading-[2.1] sm:leading-[2.2] text-right font-medium relative z-10">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: Reviewer Info + Interactive Like */}
                  <div className="pt-4 border-t border-[#f5deb3]/15 flex items-center justify-between">
                    {/* User Meta */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#f5deb3]/40 shadow-md shrink-0 bg-[#120A05]">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-right">
                        <h4 className="font-urdu font-bold text-base text-white leading-tight">
                          {item.name}
                        </h4>
                        <p className="font-urdu text-xs text-[#f5deb3] leading-tight mt-0.5">
                          {item.role} • {item.location}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                      }}
                      className={cn(
                        "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 text-xs font-bold cursor-pointer",
                        isLiked
                          ? "bg-red-500/20 border-red-500/40 text-red-300 shadow-[inset_0_1px_1px_rgba(255,200,200,0.25),0_0_14px_rgba(239,68,68,0.35)]"
                          : "bg-white/[0.04] border-[#f5deb3]/15 text-stone-300 shadow-[inset_0_1px_1px_rgba(255,245,230,0.15)] hover:bg-white/[0.09] hover:border-[#f5deb3]/30 hover:text-white"
                      )}
                      title="اس تاثر کو پسند کریں"
                    >
                      <Heart
                        className={cn(
                          "w-3.5 h-3.5 transition-colors",
                          isLiked ? "fill-red-500 text-red-500" : "text-stone-300"
                        )}
                      />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. PAGINATION DOTS (Clickable Indicators) */}
        <div className="mt-8 flex justify-center items-center gap-2">
          {testimonialsList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "rounded-full transition-all duration-300 cursor-pointer",
                index === currentIndex
                  ? "w-8 h-2.5 bg-[#C9B38D] shadow-[0_0_10px_#C9B38D]"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`رائے نمبر ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* ============================================================== */}
      {/* 4. MODAL: "اپنی رائے شامل کریں" (FEEDBACK MODAL)                  */}
      {/* ============================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-gradient-to-b from-[#1C1108] to-[#120A05] border-2 border-[#C9B38D]/40 rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#C9B38D]/25 mb-5">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-[#C9B38D]" />
                <h3 className="font-urdu font-bold text-lg text-white">
                  اپنی قیمتی رائے ارسال فرمائیں
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="py-8 text-center space-y-3 font-urdu">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">جزاک اللہ خیراً!</h4>
                <p className="text-sm text-stone-300">
                  آپ کی قیمتی رائے کامیابی سے موصول ہو گئی ہے۔ انتظامیہ کے جائزے کے بعد اسے شائع کر دیا جائے گا۔
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-urdu text-right">
                <div>
                  <label className="block text-xs font-semibold text-[#D9C7A7] mb-1">
                    آپ کا اسمِ گرامی *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثلاً: علامہ سید محمد رضوی / محمد علی"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] text-white text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#D9C7A7] mb-1">
                      رابطہ نمبر / شہر
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] text-white text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#D9C7A7] mb-1">
                      تعلق کی نوعیت
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] text-white text-sm outline-none cursor-pointer"
                    >
                      <option value="والدین / سرپرست">والدین / سرپرست</option>
                      <option value="علمائے کرام">علمائے کرام</option>
                      <option value="فارغ التحصیل طالب علم">فارغ التحصیل طالب علم</option>
                      <option value="معزز مہمان / خیر خواہ">معزز مہمان / خیر خواہ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D9C7A7] mb-1">
                    آپ کے تاثرات / تبصرہ *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="مدرسہ صاحب الزمان کی علمی، اخلاقی و تربیتی خدمات کے بارے میں اپنے مخلصانہ تاثرات تحریر فرمائیں..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] text-white text-sm outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#D9C7A7] to-[#C9B38D] text-[#120A05] font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
