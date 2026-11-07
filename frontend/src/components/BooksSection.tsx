"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BookOpen,
  Star,
  X,
  Compass,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { CircularGallery, GalleryItem } from "./CircularGallery";

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
    description:
      "فارسی و اردو کی معروف ترین کلاسیکل مقتل کی کتاب جس میں انبیاء اور اہل بیتؑ کے مصائب کا دردناک اور مستند تاریخی بیان ہے۔",
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
    description:
      "واقعہ کربلا کے تاریخی حقائق، فلسفۂ شہادت اور اس کے اسلامی و سیاسی اثرات پر تفصیلی و مدلل تاریخی جائزہ۔",
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
    description:
      "قیامِ امام حسینؑ کے پس منظر، اسباب و محرکات اور کوفہ و شام کے تاریخی حالات پر مشتمل جامع کتاب۔",
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
    description:
      "قرآن مجید کی عصرِ حاضر کے تقاضوں کے مطابق تفصیلی اور عام فہم تفسیر جو علمی و عقائدی سوالات کے جوابات فراہم کرتی ہے۔",
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
    description:
      "واقعہ کربلا سے متعلق مستند تاریخی شواہد، اسناد اور محققانہ تجزیات کا خوبصورت اور معلوماتی انتخاب۔",
  },
  {
    id: "6",
    title: "تاریخِ عاشور",
    author: "ڈاکٹر ابراہیم آیتی",
    category: "واقعہ عاشوراء",
    coverImage: "/images/books/book-5.jpg",
    rating: 5,
    reviewsCount: 160,
    pages: 310,
    description:
      "عاشوراء کے دن کے واقعات کا گھڑی بہ گھڑی اور تفصیلی محققانہ احوال، معتبر اسناد کے ساتھ۔",
  },
];

export default function BooksSection({ header, className }: BooksSectionProps) {
  const [books, setBooks] = useState<Book[]>(DEFAULT_BOOKS);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Outer container ref for pinned scroll-locking
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fetch books from API if available
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.books.getAll();
        if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: Book[] = res.data.map((b: any, idx: number) => ({
            id: b.id || b._id || String(idx + 1),
            title: b.title || "کتاب",
            author: b.author || "مؤلف",
            category: b.category || "عام مطالعہ",
            coverImage: b.coverImage || `/images/books/book-${(idx % 5) + 1}.jpg`,
            rating: b.rating || 5,
            reviewsCount: b.reviewsCount || 100,
            pages: b.pages || 250,
            description: b.description || "علومِ آلِ محمدؑ پر مشتمل ایک علمی و مستند تصنیف۔",
          }));
          if (mapped.length > 0) {
            setBooks(mapped);
          }
        }
      } catch (err) {
        // Fallback to DEFAULT_BOOKS
      }
    };
    fetchBooks();
  }, []);

  // Pinned scroll-locking effect:
  // When this section is reached, it pins in place until 1 full 360-degree cycle is completed
  // (so the first image does a full round and comes again) before allowing the page to scroll past!
  useEffect(() => {
    let rafId: number;
    let targetRotation = 0;
    let currentRot = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = containerRef.current.offsetHeight - windowHeight;

      if (totalScrollableDistance <= 0) return;

      // Scrolled distance within this pinned container
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
      setScrollProgress(progress);

      // Exactly 360 degrees so first image completes a full round and returns to front
      targetRotation = progress * 360;
    };

    const smoothUpdate = () => {
      currentRot += (targetRotation - currentRot) * 0.14;
      if (Math.abs(targetRotation - currentRot) < 0.02) {
        currentRot = targetRotation;
      }
      setRotation(currentRot);
      rafId = requestAnimationFrame(smoothUpdate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(smoothUpdate);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Map Book to GalleryItem expected by CircularGallery
  const galleryItems: GalleryItem[] = books.map((b) => ({
    id: b.id,
    common: b.title,
    binomial: b.category,
    photo: {
      url: b.coverImage,
      text: b.title,
      pos: "center",
      by: b.author,
    },
    pages: b.pages,
    description: b.description,
    author: b.author,
    category: b.category,
    rating: b.rating,
    reviewsCount: b.reviewsCount,
  }));

  const handleItemClick = (item: GalleryItem) => {
    const matched = books.find((b) => b.id === item.id) || {
      id: item.id || "1",
      title: item.common,
      author: item.author || item.photo.by,
      category: item.category || item.binomial,
      coverImage: item.photo.url,
      rating: item.rating || 5,
      reviewsCount: item.reviewsCount || 100,
      pages: item.pages || 250,
      description: item.description || "علومِ آلِ محمدؑ پر مشتمل علمی تصنیف۔",
    };
    setSelectedBook(matched);
  };

  return (
    // Outer scroll container with 300vh height:
    // User scrolls 2 full viewport heights while the section remains pinned at top: 0
    <div
      ref={containerRef}
      id="books"
      dir="rtl"
      className={cn("relative h-[300vh] bg-[#0A0503] select-none", className)}
    >
      {/* Sticky Fullscreen Viewport pinned at top: 0 */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 z-10">
        {/* 1. Cinematic Ambient Background with Center Spotlight */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[550px] bg-gradient-to-r from-amber-900/15 via-[#C9B38D]/20 to-amber-900/15 rounded-full blur-[140px] opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#0A0503_80%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(#C9B38D_0.6px,_transparent_0.6px)] [background-size:28px_28px] opacity-[0.035]" />
        </div>

        {/* 2. Top Header Area */}
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 relative z-10 text-center shrink-0">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-1 leading-[2] sm:leading-[2.1] drop-shadow-md">
            {header?.title || "مدرسہ کے اساتذہ و اکابرین کی کتب"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-1.5 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="font-urdu text-xs sm:text-sm md:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {header?.subtitle ||
              "علومِ آلِ محمدؑ اور عصری اسلامی افکار پر مشتمل مستند کتب و تصانیف کا مطالعہ فرمائیں"}
          </p>
        </div>

        {/* 3. Center: 3D Circular Gallery Viewport Driven by Scroll Rotation */}
        <div className="relative w-full flex-1 max-h-[68vh] flex items-center justify-center my-auto overflow-hidden">
          <CircularGallery
            items={galleryItems}
            radius={520}
            rotation={rotation}
            onItemClick={handleItemClick}
            className="w-full h-full"
          />
        </div>

        {/* 4. Bottom Scroll Progress & Guidance Bar */}
        <div className="w-full max-w-lg mx-auto px-4 relative z-10 text-center shrink-0 pb-2 space-y-2">
          {/* Subtle Golden Progress Line */}
          <div className="w-full max-w-xs mx-auto h-1 bg-white/10 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#C9B38D] to-amber-300 rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(201,179,141,0.8)]"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs font-urdu text-stone-400 px-2">
            <span className="flex items-center gap-1 text-[#C9B38D]">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>
                {scrollProgress < 0.98
                  ? `اسکرول گھماؤ: ${Math.round(scrollProgress * 100)}٪`
                  : "۳۶۰° چکر مکمل (پہلی کتاب واپس آ گئی)"}
              </span>
            </span>

            <span className="flex items-center gap-1 text-stone-300">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              <span>نیچے اسکرول کرتے رہیں</span>
            </span>
          </div>
        </div>
      </div>

      {/* 5. LIGHTBOX / DETAIL MODAL FOR SELECTED BOOK */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-xl bg-black/85 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#140A05] border-2 border-[#C9B38D]/50 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
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

                <p className="text-sm font-urdu font-semibold text-stone-200 mt-2">
                  مصنف: <span className="text-[#C9B38D]">{selectedBook.author}</span>
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 my-2.5">
                  <div className="flex text-[#C9B38D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#9C835A]" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-300 font-urdu">
                    ({selectedBook.reviewsCount} آراء)
                  </span>
                </div>

                <p className="font-urdu text-xs sm:text-sm text-stone-200 leading-[2.2] mt-1">
                  {selectedBook.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#C9B38D]/20 flex items-center justify-around text-xs font-urdu text-stone-300">
                  <span>
                    صفحات: <b className="text-white">{selectedBook.pages}</b>
                  </span>
                  <span>
                    زبان: <b className="text-white">اردو</b>
                  </span>
                  <span>
                    دستیابی: <b className="text-emerald-400">لائبریری میں موجود</b>
                  </span>
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
    </div>
  );
}
export { CircularGallery };
export type { GalleryItem };
