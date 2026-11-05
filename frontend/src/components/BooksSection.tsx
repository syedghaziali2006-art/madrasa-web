"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  BookOpen,
  Star,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Hand,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  pages: number;
  description: string;
}

export interface BooksSectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  className?: string;
}

const DEFAULT_BOOKS: Book[] = [
  {
    id: "1",
    title: "روضة الشہداء (کلاسیکل مقتل)",
    author: "علامہ ملا حسین واعظ کاشفیؒ",
    category: "مقتل و فضائل",
    coverImage: "/images/books/book-3.jpg",
    rating: 5,
    reviewsCount: 245,
    pages: 480,
    description: "فارسی و اردو کی معروف ترین کلاسیکل مقتل کی کتاب جس میں انبیاء اور اہل بیتؑ کے مصائب کا دردناک اور مستند تاریخی بیان ہے۔",
  },
  {
    id: "2",
    title: "شہادتِ امام حسینؑ",
    author: "سید ابو الاعلیٰ مودودی",
    category: "تاریخ و سوانح",
    coverImage: "/images/books/book-1.jpg",
    rating: 5,
    reviewsCount: 180,
    pages: 190,
    description: "واقعہ کربلا کے تاریخی حقائق، فلسفۂ شہادت اور اس کے اسلامی و سیاسی اثرات پر تفصیلی و مدلل تاریخی جائزہ۔",
  },
  {
    id: "3",
    title: "کربلا کا تاریخی پس منظر",
    author: "شاہدہ بی بی خسروی / ندوی",
    category: "تاریخِ کربلا",
    coverImage: "/images/books/book-2.jpg",
    rating: 5,
    reviewsCount: 130,
    pages: 320,
    description: "قیامِ امام حسینؑ کے پس منظر، اسباب و محرکات اور کوفہ و شام کے تاریخی حالات پر مشتمل جامع کتاب۔",
  },
  {
    id: "4",
    title: "تفسیر نمونہ (جامع اردو ایڈیشن)",
    author: "آیت اللہ العظمیٰ ناصر مکارم شیرازی و جمعی از محققین",
    category: "علومِ قرآن و تفاسیر",
    coverImage: "/images/intro/library-books.jpg",
    rating: 5,
    reviewsCount: 310,
    pages: 650,
    description: "قرآن مجید کی عصرِ حاضر کے تقاضوں کے مطابق تفصیلی اور عام فہم تفسیر جو علمی و عقائدی سوالات کے جوابات فراہم کرتی ہے۔",
  },
  {
    id: "5",
    title: "شہادتِ امام حسینؑ (حقائق و واقعات)",
    author: "محققین تاریخِ اسلام",
    category: "تحقیق و مقالات",
    coverImage: "/images/books/book-4.jpg",
    rating: 5,
    reviewsCount: 95,
    pages: 220,
    description: "واقعہ کربلا سے متعلق مستند تاریخی شواہد، اسناد اور محققانہ تجزیات کا خوبصورت اور معلوماتی انتخاب۔",
  },
  {
    id: "6",
    title: "تاریخِ عاشور",
    author: "ڈاکٹر ابراہیم آیتی",
    category: "واقعہ عاشوراء",
    coverImage: "/images/books/book-5.jpg",
    rating: 5,
    reviewsCount: 165,
    pages: 290,
    description: "عاشوراء کے دن کے لمحہ بہ لمحہ واقعات، خطبات، شہدائے کربلا کی قربانیوں اور تاریخی حقائق پر مستند تصنیف۔",
  },
  {
    id: "7",
    title: "نہج البلاغہ (ترجمہ و شرح)",
    author: "شریف رضیؒ / علامہ مفتی جعفر حسین",
    category: "کلامِ امیر المومنینؑ",
    coverImage: "/images/intro/library-students.jpg",
    rating: 5,
    reviewsCount: 420,
    pages: 780,
    description: "حضرت علی ابن ابی طالبؑ کے خطبات، خطوط اور حکمت آمیز کلمات کا بے مثل و الہامی شاہکار۔",
  },
  {
    id: "8",
    title: "وسائل الشیعہ (جلد اوّل)",
    author: "شیخ حر عاملیؒ",
    category: "احادیث و فقہ",
    coverImage: "/images/intro/founder-shakir-ali.jpg",
    rating: 5,
    reviewsCount: 190,
    pages: 540,
    description: "اہل بیتؑ کی فقہی و عملی احادیث کا عظیم الشان اور جامع ترین ذخیرہ جس پر حوزوی دروس کا انحصار ہے۔",
  },
  {
    id: "9",
    title: "بحار الانوار (منتخب معارف)",
    author: "علامہ محمد باقر مجلسیؒ",
    category: "جامع احادیثِ معصومینؑ",
    coverImage: "/images/intro/campus-building.jpg",
    rating: 5,
    reviewsCount: 275,
    pages: 600,
    description: "شیعہ تاریخ اور علومِ آلِ محمدؑ کا سب سے بڑا انسائیکلوپیڈیا جس میں عقائد، اخلاق اور تاریخ جمع ہیں۔",
  },
  {
    id: "10",
    title: "صحیفہ سجادیہ (دعائیں و مناجات)",
    author: "امام علی بن الحسین زین العابدینؑ",
    category: "زبورِ آلِ محمدؑ",
    coverImage: "/images/intro/namaz-ba-jamat.jpg",
    rating: 5,
    reviewsCount: 380,
    pages: 350,
    description: "معرفتِ الٰہی، توبہ اور اخلاقی کمالات پر مشتمل سید الساجدینؑ کی بے مثال مناجات اور ادعیہ۔",
  },
  {
    id: "11",
    title: "اصولِ کافی (شرح و تحقیق)",
    author: "ثقۃ الاسلام کلینیؒ",
    category: "عقائد و اصولِ دین",
    coverImage: "/images/intro/tarbiyat-session.png",
    rating: 5,
    reviewsCount: 340,
    pages: 720,
    description: "کتبِ اربعہ میں سب سے مقدم کتاب جس میں عقل، علم، توحید اور امامت کے بنیادی احادیث و اصول محفوظ ہیں۔",
  },
];

export default function BooksSection({ header, className }: BooksSectionProps) {
  const [books, setBooks] = useState<Book[]>(DEFAULT_BOOKS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [stageWidth, setStageWidth] = useState<number>(1440);
  const touchStartXRef = useRef<number | null>(null);

  // Fetch from API with graceful fallback to DEFAULT_BOOKS
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.books.getAll();
        if (res.success && res.data && res.data.length > 0) {
          const mapped: Book[] = res.data.slice(0, 11).map((b: any, idx: number) => ({
            id: b.id || String(idx),
            title: b.title,
            author: b.author || "مصنف",
            category: b.category || "دینی کتب",
            coverImage: b.coverImage || DEFAULT_BOOKS[idx % DEFAULT_BOOKS.length].coverImage,
            rating: b.rating || 5,
            reviewsCount: b.reviewsCount || 120 + idx * 15,
            pages: b.pages || 280,
            description: b.description || "مستند دینی، علمی اور حوزوی تصنیف",
          }));

          // Ensure at least 9 books for the 3D carousel effect
          if (mapped.length >= 7) {
            setBooks(mapped);
          }
        }
      } catch (err) {
        // Fallback to DEFAULT_BOOKS
      }
    };
    fetchBooks();
  }, []);

  // Track window dimensions for responsive spacing
  useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== "undefined") {
        setStageWidth(window.innerWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const total = books.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleNext();
      } else if (e.key === "ArrowRight") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left
        handleNext();
      } else {
        // Swiped right
        handlePrev();
      }
    }
  };

  return (
    <section
      id="books"
      dir="rtl"
      className={cn(
        "py-20 sm:py-28 relative overflow-hidden bg-[#0A0503] text-[#FAF7F2] select-none",
        className
      )}
    >
      {/* 1. Cinematic Ambient Lighting Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[450px] bg-gradient-to-r from-amber-700/10 via-[#C9B38D]/15 to-amber-700/10 rounded-full blur-[140px] opacity-75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0A0503_85%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#C9B38D_0.6px,_transparent_0.6px)] [background-size:28px_28px] opacity-[0.035]" />
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">

        {/* 2. Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#D9C7A7] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-md">
            
            <span className="font-urdu">{header?.badge || "سیکشن ۳: منتخب مطبوعات"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-1 leading-[2.1] sm:leading-[2.2] drop-shadow-md">
            {header?.title || "مدرسہ کے اساتذہ و اکابرین کی کتب"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-2 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="font-urdu text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
            {header?.subtitle || "علومِ آلِ محمدؑ اور عصری اسلامی افکار پر مشتمل مستند کتب و تصانیف کا مطالعہ فرمائیں"}
          </p>

          <div className="pt-1 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-urdu shadow-sm">
              <Hand className="w-3.5 h-3.5 text-[#C9B38D] animate-bounce" />
              <span>کتاب منتخب کرنے کے لیے کلک کریں یا تیر کے نشانات استعمال کریں</span>
            </span>
          </div>
        </div>

        {/* 3. 3D CAROUSEL VIEWPORT (Perspective Container) */}
        <div
          className="relative w-full h-[360px] sm:h-[430px] md:h-[480px] lg:h-[520px] flex items-center justify-center overflow-visible my-4"
          style={{
            perspective: stageWidth < 640 ? "850px" : "1200px",
            transformStyle: "preserve-3d",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {books.map((book, index) => {
            // Calculate shortest distance in circular ring
            let diff = index - currentIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const absDiff = Math.abs(diff);
            const sign = Math.sign(diff);

            // Maximum visible cards: 4 to the left, 1 center, 4 to the right (total 9)
            const isVisible = absDiff <= 4;

            // Responsive X-spacing to mimic Image 2 reference perfectly
            const baseSpacing = stageWidth < 640 ? 52 : stageWidth < 1024 ? 92 : 142;
            const x = sign * (baseSpacing * (1 + (absDiff - 1) * 0.72));

            // Receding in Z depth
            const zStep = stageWidth < 640 ? 40 : 62;
            const z = -absDiff * zStep;

            // 3D Y-axis rotation (Side cards tilt inwards)
            const rotYStep = stageWidth < 640 ? 28 : 34;
            const rotY = -sign * (rotYStep + absDiff * 3.5);

            // Scale & Opacity
            const scale = isCenter ? 1.08 : Math.max(0.72, 1 - absDiff * 0.058);
            const opacity = !isVisible ? 0 : isCenter ? 1 : Math.max(0.45, 1 - absDiff * 0.13);
            const zIndex = 50 - absDiff;

            return (
              <div
                key={book.id}
                onClick={() => {
                  if (isCenter) {
                    setSelectedBook(book);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
                style={{
                  transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  transition:
                    "transform 0.65s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.5s ease, filter 0.5s ease",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer group",
                  stageWidth < 640
                    ? "w-[155px] h-[215px]"
                    : stageWidth < 1024
                    ? "w-[200px] h-[280px]"
                    : "w-[245px] h-[340px]"
                )}
                title={book.title}
              >
                {/* Card Container with Rounded Frame */}
                <div
                  className={cn(
                    "relative w-full h-full rounded-[22px] overflow-hidden bg-[#180E08] transition-all duration-500",
                    isCenter
                      ? "border-2 border-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(255,255,255,0.28)] ring-2 ring-white/60"
                      : "border border-[#C9B38D]/30 shadow-[0_15px_35px_rgba(0,0,0,0.9)] hover:border-[#C9B38D] hover:shadow-[0_0_25px_rgba(201,179,141,0.35)]"
                  )}
                >
                  {/* Book Image */}
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 210px, 260px"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                      !isCenter && "brightness-[0.82] contrast-[1.05]"
                    )}
                    priority={isCenter}
                  />

                  {/* Gradient Lighting & Title Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4 text-right">
                    {/* Category Tag */}
                    <span className="text-[10px] sm:text-[11px] font-urdu font-bold text-[#C9B38D] mb-0.5 line-clamp-1">
                      {book.category}
                    </span>

                    {/* Book Title */}
                    <h4 className="font-urdu font-bold text-white text-xs sm:text-sm drop-shadow-md line-clamp-1">
                      {book.title}
                    </h4>

                    {/* Center Card Click Prompt */}
                    {isCenter && (
                      <div className="mt-1 flex items-center justify-between text-[10px] text-white/90 font-urdu pt-1 border-t border-white/20">
                        <span className="flex items-center gap-1 text-[#C9B38D]">
                          <Eye className="w-3 h-3" />
                          <span>تفصیلات دیکھیں</span>
                        </span>
                        <span className="text-stone-300">{book.pages} صفحات</span>
                      </div>
                    )}
                  </div>

                  {/* Subtle Spine highlight for depth */}
                  <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. BOTTOM NAVIGATION CONTROL PILL (Matching Image 2 Reference) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#1c130c]/70 hover:bg-[#251810]/75 border border-[#f5deb3]/15 backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,245,230,0.18),0_12px_40px_rgba(0,0,0,0.85)] transition-all">
            {/* Previous Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_rgba(255,245,230,0.2)] text-stone-200 hover:text-white hover:bg-white/[0.12] hover:border-[#f5deb3]/35 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
              aria-label="پچھلی کتاب"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Pagination Dots with Elongated Active Pill */}
            <div className="flex items-center gap-1.5 px-2">
              {books.map((_, dotIdx) => {
                const isActive = dotIdx === currentIndex;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setCurrentIndex(dotIdx)}
                    className={cn(
                      "transition-all duration-300 rounded-full cursor-pointer",
                      isActive
                        ? "w-6 h-1.5 bg-[#f5deb3] shadow-[0_0_10px_rgba(245,222,179,0.9)]"
                        : "w-1.5 h-1.5 bg-white/35 hover:bg-white/65"
                    )}
                    aria-label={`کتاب ${dotIdx + 1}`}
                  />
                );
              })}
            </div>

            {/* Next Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_rgba(255,245,230,0.2)] text-stone-200 hover:text-white hover:bg-white/[0.12] hover:border-[#f5deb3]/35 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
              aria-label="اگلی کتاب"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 7. LIGHTBOX / DETAIL MODAL FOR SELECTED BOOK */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl backdrop-blur-none border-2 border-[#C9B38D]/50 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#120A05] hover:bg-[#2A170E] border border-[#C9B38D]/40 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              aria-label="بند کریں"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-right mt-2">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden bg-[#0A0503] border-2 border-[#C9B38D]/50 shrink-0 shadow-xl">
                <Image
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="inline-block self-center sm:self-start px-3 py-1 rounded-full bg-[#1A0E08] text-[11px] font-urdu font-semibold text-[#C9B38D] border border-[#C9B38D]/30 mb-2">
                  {selectedBook.category}
                </div>

                <h3 className="font-urdu font-bold text-white text-xl sm:text-2xl leading-[2.1]">
                  {selectedBook.title}
                </h3>

                <p className="text-sm font-urdu font-semibold text-black mt-2">
                  مصنف: {selectedBook.author}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 my-2.5">
                  <div className="flex text-[#C9B38D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#9C835A]" />
                    ))}
                  </div>
                  <span className="text-xs text-black font-urdu">
                    ({selectedBook.reviewsCount} آراء)
                  </span>
                </div>

                <p className="font-urdu text-xs sm:text-sm text-stone-200 leading-[2.2] mt-1">
                  {selectedBook.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#C9B38D]/20 flex items-center justify-around text-xs font-urdu text-stone-300">
                  <span>صفحات: <b className="text-white">{selectedBook.pages}</b></span>
                  <span>زبان: <b className="text-white">اردو</b></span>
                  <span>دستیابی: <b className="text-emerald-400">لائبریری میں موجود</b></span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C9B38D]/30 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedBook(null)}
                className="flex-1 h-11 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#8C6D3F]" />
                <span>مطالعہ و معلومات کے لیے رابطہ کریں</span>
              </a>
              <button
                onClick={() => setSelectedBook(null)}
                className="h-11 px-6 rounded-full bg-[#1A0E08] hover:bg-[#2A170E] text-white border border-[#C9B38D]/40 font-urdu font-semibold text-sm transition cursor-pointer"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
