"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronRight, ChevronLeft, Sparkles, ZoomIn, Library, Eye } from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";

import { api } from "@/services/api";

interface LibraryGallerySectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
}

export default function LibraryGallerySection({ header }: LibraryGallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const defaultLibraryItems: MediaItem[] = [
    {
      id: "lib-1",
      title: "مرکزی مطالعہ ہال و کتب الماری",
      category: "مطالعہ و کتب",
      type: "image",
      imageUrl: "/images/gallery/library-interior.jpg",
      date: "کتب خانہ صاحب الزمان",
      location: "ہال نمبر ۱ - حوزوی کتب",
      description: "شاہکار لکڑی کی الماریوں میں سجی ہزاروں کتب، پرسکون ماحول اور طلبہ کے لیے وسیع اسٹڈی ٹیبلز۔",
    },
    {
      id: "lib-2",
      title: "قدیم نایاب خطی نسخے و قلمی نوادرات",
      category: "مخطوطات و نوادرات",
      type: "image",
      imageUrl: "/images/library.jpg",
      date: "نایاب کتب",
      location: "خصوصی ریسرچ سیکشن",
      description: "صدیوں پرانے قلمی نسخے، تفاسیر اور علمائے سلف کے نایاب ہاتھ کے لکھے ہوئے کتب کے اوراق۔",
    },
    {
      id: "lib-3",
      title: "کتبِ تفاسیر، احادیث و فقہی انسائیکلوپیڈیا",
      category: "علومِ آلِ محمدؑ",
      type: "image",
      imageUrl: "/images/books/book-3.jpg",
      date: "بنیادی مآخذ",
      location: "شعبہ تحقیق و فقہ",
      description: "کتبِ اربعہ، بحار الانوار، وسائل الشیعہ اور تفاسیر قرآن کا عظیم الشان اور مستند مجموعہ۔",
    },
    {
      id: "lib-4",
      title: "ڈیجیٹل لائبریری و آن لائن ریسرچ سسٹم",
      category: "ڈیجیٹل کیٹلاگ",
      type: "image",
      imageUrl: "/images/books/book-2.jpg",
      date: "جدید تحقیق",
      location: "کمپیوٹر کیٹلاگ کارنر",
      description: "آن لائن پورٹل جہاں سے طلبہ دنیا بھر کے اسلامی مقالات اور پی ڈی ایف کتب تک رسائی حاصل کرتے ہیں۔",
    },
    {
      id: "lib-5",
      title: "محققین و اساتذہ کا فکری کارنر",
      category: "ریسرچ کارنر",
      type: "image",
      imageUrl: "/images/books/book-5.jpg",
      date: "علمی نشستیں",
      location: "سیمینار روم",
      description: "اساتذہ اور محقق طلبہ کے سنجیدہ فکری مباحث اور علمی مقالہ نگاری کے لیے مختص جگہ۔",
    },
  ];

  const [libraryItems, setLibraryItems] = useState<MediaItem[]>(defaultLibraryItems);

  React.useEffect(() => {
    const fetchLibraryMedia = async () => {
      try {
        const res = await api.gallery.getAll({ section: "library" });
        if (res.success && res.data && res.data.length > 0) {
          setLibraryItems(res.data);
        }
      } catch (err) {
        // fallback
      }
    };
    fetchLibraryMedia();
  }, []);

  const handleNext = () => {
    if (libraryItems.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % libraryItems.length);
  };

  const handlePrev = () => {
    if (libraryItems.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + libraryItems.length) % libraryItems.length);
  };

  return (
    <section id="library-gallery" className="py-20 sm:py-28 bg-[#160C07] islamic-navy-pattern relative overflow-hidden" dir="rtl">
      {/* Background Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C9B38D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header with generous vertical spacing */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <Library className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "علم و تحقیق کا گہوارہ"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "لائبریری کی تصویریں و نوادرات"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "مدرسہ صاحب الزمان کی عظیم الشان لائبریری، نایاب مخطوطات اور مطالعہ ہال کی تصویری جھلکیاں"}
          </p>
        </div>

        {/* Carousel Slider with Zoomed Center Item (Section 2) */}
        <div className="relative py-6">

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 inset-x-0 z-30 pointer-events-none px-2 sm:px-4">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="پچھلی تصویر"
            >
              <ChevronRight className="w-6 h-6 text-[#8C6D3F]" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="اگلی تصویر"
            >
              <ChevronLeft className="w-6 h-6 text-[#8C6D3F]" />
            </button>
          </div>

          {/* Cards Showcase Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
            {libraryItems.map((item, idx) => {
              const isCenter = idx === currentIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setSelectedMedia(item);
                  }}
                  className={`group relative rounded-3xl overflow-hidden bg-[#1A0E08] transition-all duration-500 cursor-pointer flex flex-col ${
                    isCenter
                      ? "md:scale-105 lg:scale-110 z-20 border-2 border-[#C9B38D] shadow-[0_0_35px_rgba(201,179,141,0.5)] ring-2 ring-[#C9B38D]/40"
                      : "opacity-75 hover:opacity-100 border border-[#C9B38D]/25 shadow-lg scale-95"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0A0503]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent" />

                    {/* Highlight Badge if Center */}
                    {isCenter && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#120A05]/90 border border-[#C9B38D] text-xs font-urdu font-bold text-[#C9B38D] shadow-md backdrop-blur-sm">
                          <Sparkles className="w-3.5 h-3.5 text-[#C9B38D]" />
                          <span>نمایاں مجموعہ</span>
                        </span>
                      </div>
                    )}

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                      <span className="w-12 h-12 rounded-full bg-white text-[#120A05] border border-[#C9B38D] flex items-center justify-center shadow-lg">
                        <ZoomIn className="w-6 h-6 text-[#8C6D3F]" />
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-4 sm:p-5 bg-gradient-to-b from-[#1E110A] to-[#120A05] text-right">
                    <span className="text-[11px] font-urdu font-semibold text-[#C9B38D] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-urdu font-bold text-white text-sm sm:text-base leading-[2.1] group-hover:text-[#D9C7A7] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="font-urdu text-xs text-stone-300 mt-2 leading-[2.1] line-clamp-1">
                      {item.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {libraryItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-[#C9B38D] shadow-[0_0_10px_#C9B38D]"
                    : "w-2.5 bg-stone-600 hover:bg-stone-400"
                }`}
                aria-label={`سلائیڈ ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <MediaLightboxModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
}
