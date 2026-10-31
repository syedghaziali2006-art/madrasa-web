"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Play, Calendar, MapPin, Sparkles, Star, ChevronLeft, ChevronRight, Video } from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";

import { api } from "@/services/api";

interface CelebrationsGallerySectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  items?: MediaItem[];
}

export default function CelebrationsGallerySection({ header, items }: CelebrationsGallerySectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const defaultEvents: MediaItem[] = [
    {
      id: "event-convocation",
      title: "سالانہ تقریبِ تقسیمِ اسناد، انعامات اور شیلڈز ۲۰۲۶",
      category: "تقسیمِ انعامات",
      type: "video",
      videoDuration: "۰۶:۳۰",
      imageUrl: "/images/gallery/celebration-stage.jpg",
      date: "شعبان المعظم ۱۴۴۷ھ",
      location: "مرکزی پنڈال و اسٹیج",
      description: "ممتاز پوزیشن حاصل کرنے والے ہونہار طلبہ کو علمائے کرام کے دستِ مبارک سے اعزازی شیلڈز، کتب اور سرٹیفکیٹس کی تقسیم۔",
    },
    {
      id: "event-milad",
      title: "جشنِ ولادتِ باسعادت حضرت محمد مصطفیٰ ﷺ و امام جعفر صادقؑ",
      category: "جشن و میلاد",
      type: "image",
      imageUrl: "/images/layout/mosque-arches.jpg",
      date: "۱۷ ربیع الاول",
      location: "مرکزی کانفرنس ہال",
      description: "عطر بیز محفلِ میلاد، بچوں کی نعت خوانی، قصیدہ گوئی اور شیرینی کی تقسیم کا بابرکت منظر۔",
    },
    {
      id: "event-quran-comp",
      title: "آل پاکستان مقابلہ حسنِ قرائت و تجویدِ قرآن",
      category: "قرآنی مقابلہ",
      type: "video",
      videoDuration: "۰۳:۴۵",
      imageUrl: "/images/layout/quran-study.jpg",
      date: "رمضان المبارک",
      location: "مسجد صاحب الزمان",
      description: "ملک بھر کے نامور قراء کی موجودگی میں طلبہ کے درمیان لحنِ داؤدی اور تجوید کے روح پرور مقابلے۔",
    },
    {
      id: "event-turban",
      title: "روحانی تقریبِ عمامہ پوشی برائے فارغ التحصیل علماء",
      category: "عمامہ پوشی",
      type: "image",
      imageUrl: "/images/layout/congregation.jpg",
      date: "عیدِ غدیر خم",
      location: "آڈیٹوریم ہال",
      description: "پانچ سالہ حوزوی نصاب مکمل کرنے والے فاضل طلبہ کے سروں پر مراجعِ عظام کے نمائندگان کے ہاتھوں تاجِ رسولؐ سجانے کا تاریخی لمحہ۔",
    },
  ];

  const [events, setEvents] = useState<MediaItem[]>(
    items && items.length > 0 ? items : defaultEvents
  );

  React.useEffect(() => {
    if (items && items.length > 0) {
      setEvents(items);
      return;
    }
    const fetchCelebrations = async () => {
      try {
        const res = await api.gallery.getAll({ section: "celebrations" });
        if (res.success && res.data && res.data.length > 0) {
          setEvents(res.data);
        }
      } catch (err) {
        // fallback
      }
    };
    fetchCelebrations();
  }, [items]);

  const currentEvent = events[activeIdx] || events[0] || defaultEvents[0];

  const handleNext = () => {
    if (events.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    if (events.length === 0) return;
    setActiveIdx((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section id="celebrations-gallery" className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden" dir="rtl">
      {/* Golden Festive Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#C9B38D]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header with generous vertical spacing */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <Award className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "تقاریب و یادگار ایام"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "بچوں کے جشنوں اور تقاریب کی تصویریں و ویڈیوز"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "جشنِ میلاد، سالانہ تقسیمِ اسناد، قرآنی مقابلے اور عمامہ پوشی کے شاندار اسٹیج و پُروقار لمحات"}
          </p>
        </div>

        {/* Featured Spotlight Showcase (Section 5) */}
        <div className="bg-gradient-to-b from-[#1E110A]/95 to-[#140B06]/95 border-2 border-[#C9B38D]/40 rounded-3xl p-4 sm:p-7 shadow-[0_25px_65px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          
          {/* Main Stage Spotlight Card */}
          <div
            onClick={() => setSelectedMedia(currentEvent)}
            className="group relative w-full h-[320px] sm:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden bg-[#0A0503] cursor-pointer shadow-2xl"
          >
            <Image
              src={currentEvent.imageUrl}
              alt={currentEvent.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
              priority
            />
            {/* Ambient Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/45 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 right-4 left-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120A05]/90 border border-[#C9B38D] text-xs sm:text-sm font-urdu font-bold text-[#C9B38D] backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4 text-[#C9B38D]" />
                <span>{currentEvent.category}</span>
              </span>

              {currentEvent.type === "video" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-white font-mono text-xs backdrop-blur-sm">
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  <span>{currentEvent.videoDuration}</span>
                </span>
              )}
            </div>

            {/* Video Play Pulsing Center */}
            {currentEvent.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white/95 text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_0_35px_rgba(201,179,141,0.9)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-[#120A05] text-[#120A05] mr-1" />
                </div>
              </div>
            )}

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 text-right z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-urdu text-[#C9B38D] mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentEvent.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentEvent.location}</span>
                </span>
              </div>

              <h3 className="font-urdu font-bold text-white text-lg sm:text-2xl lg:text-3xl leading-[2.1] sm:leading-[2.2] group-hover:text-[#D9C7A7] transition-colors">
                {currentEvent.title}
              </h3>

              <p className="font-urdu text-xs sm:text-sm text-stone-200 mt-2.5 leading-[2.3] max-w-4xl line-clamp-2">
                {currentEvent.description}
              </p>
            </div>
          </div>

          {/* Interactive Thumbnails Selector Row with Next/Prev Controls */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-[#1A0E08] hover:bg-[#2A170E] border border-[#C9B38D]/40 text-white flex items-center justify-center transition active:scale-95"
                aria-label="پچھلی تقریب"
              >
                <ChevronRight className="w-5 h-5 text-[#C9B38D]" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#1A0E08] hover:bg-[#2A170E] border border-[#C9B38D]/40 text-white flex items-center justify-center transition active:scale-95"
                aria-label="اگلی تقریب"
              >
                <ChevronLeft className="w-5 h-5 text-[#C9B38D]" />
              </button>
              <span className="font-urdu text-xs text-stone-400 mr-2">
                تقریب {activeIdx + 1} از {events.length}
              </span>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full sm:w-auto">
              {events.map((evt, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={evt.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative rounded-xl overflow-hidden p-1 text-right transition-all duration-300 flex items-center gap-2.5 ${
                      isActive
                        ? "bg-[#28150C] border-2 border-[#C9B38D] shadow-[0_0_15px_rgba(201,179,141,0.5)] ring-1 ring-[#C9B38D]"
                        : "bg-[#1A0E08]/80 border border-[#C9B38D]/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-black/40">
                      <Image
                        src={evt.imageUrl}
                        alt={evt.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 pr-1">
                      <span className="text-[11px] font-urdu font-bold text-white block truncate">
                        {evt.category}
                      </span>
                      <span className="text-[10px] font-urdu text-[#C9B38D] block truncate">
                        {evt.date}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

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
