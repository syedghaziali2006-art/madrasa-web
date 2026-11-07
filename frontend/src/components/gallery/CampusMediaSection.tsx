"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Play, ZoomIn, Building2, Eye, Video } from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";
import { api } from "@/services/api";

interface CampusMediaSectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  items?: MediaItem[];
}

export default function CampusMediaSection({ header, items }: CampusMediaSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const defaultMediaList: MediaItem[] = [
    {
      id: "campus-vid-1",
      title: "مدرسہ کا مرکزی بیرونی منظر و گنبد",
      category: "مرکزی کیمپس",
      type: "video",
      videoDuration: "",
      videoUrl: "",
      imageUrl: "",
      date: "تعلیمی سال ۲۰۲۶",
      location: "احسن آباد کیمپس، کراچی",
      description: "مدرسہ صاحب الزمان کی پرشکوہ اسلامی طرزِ تعمیر کی حامل عمارت، محرابیں اور وسیع دالان کا مکمل ویڈیو ٹور۔",
    },
    {
      id: "campus-img-1",
      title: "دار الحدیث و مرکزی تدریسی ہال",
      category: "تدریسی ہال",
      type: "image",
      imageUrl: "/images/layout/congregation.jpg",
      date: "رجب المرجب",
      location: "دوسری منزل، مرکزی ہال",
      description: "طلبہ کے روزمرہ دروس، کتبِ اربعہ اور منطق و بلاغت کی محفلِ درس کا خوبصورت منظر۔",
    },
    {
      id: "campus-img-2",
      title: "حوزوی کلاس رومز و کتب خوانی",
      category: "تعلیمی بلاک",
      type: "image",
      imageUrl: "/images/layout/quran-study.jpg",
      date: "روزانہ تدریس",
      location: "پہلی منزل، کمرہ نمبر ۱۰",
      description: "طلبہ کے لیے پرسکون، کشادہ اور جدید سہولیات سے آراستہ درس گاہیں جہاں اساتذہ انفرادی توجہ دیتے ہیں۔",
    },
    {
      id: "campus-img-3",
      title: "مرکزی کتب خانہ و ریڈنگ ہال",
      category: "کتب خانہ",
      type: "image",
      imageUrl: "/images/gallery/library-interior.jpg",
      date: "جدید سہولیات",
      location: "لائبریری بلاک",
      description: "۲۵ ہزار سے زائد مستند دینی و تحقیقی کتب اور مطالعہ کے لیے پرسکون ماحول۔",
    },
    {
      id: "campus-img-4",
      title: "وسیع صحن و بیرونی راہداری",
      category: "کیمپس ایریا",
      type: "image",
      imageUrl: "/images/layout/sunset-mosque.jpg",
      date: "تفریحی ماحول",
      location: "مرکزی کورٹ یارڈ",
      description: "طلبہ کے لیے سرسبز و شاداب قدرتی ماحول، چہل قدمی اور فکری مباحثوں کی کشادہ جگہ۔",
    },
  ];

  const [mediaList, setMediaList] = useState<MediaItem[]>(
    items && items.length > 0 ? items : defaultMediaList
  );

  useEffect(() => {
    if (items && items.length > 0) {
      setMediaList(items);
      return;
    }
    const fetchCampusMedia = async () => {
      try {
        const res = await api.gallery.getAll({ section: "campus" });
        if (res.success && res.data && res.data.length > 0) {
          setMediaList(res.data);
        }
      } catch (err) {
        // Fallback to defaultMediaList
      }
    };
    fetchCampusMedia();
  }, [items]);

  // Ensure exactly 1 Video (Featured) and 4 Images
  const videoItem: MediaItem = useMemo(() => {
    return mediaList.find((m) => m.type === "video") || defaultMediaList[0];
  }, [mediaList]);

  const imageItems: MediaItem[] = useMemo(() => {
    const rawImages = mediaList.filter((m) => m.id !== videoItem.id && m.type !== "video");
    const defaultImages = defaultMediaList.slice(1);
    const combined = [...rawImages];
    for (const defImg of defaultImages) {
      if (combined.length >= 4) break;
      if (!combined.some((x) => x.id === defImg.id)) {
        combined.push(defImg);
      }
    }
    return combined.slice(0, 4);
  }, [mediaList, videoItem]);

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return !!url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);
  };

  const directVideoSrc = isVideoUrl(videoItem.imageUrl)
    ? videoItem.imageUrl
    : isVideoUrl(videoItem.videoUrl)
    ? videoItem.videoUrl
    : null;

  return (
    <section id="campus-media" className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden w-full" dir="rtl">
      {/* Ambient Glow Orbs for Glassmorphic Refraction */}
      <div className="absolute top-1/4 -right-16 w-[650px] h-[400px] bg-[#C9B38D]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-amber-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-5 -left-16 w-[600px] h-[400px] bg-[#8C6D3F]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Glass Elements */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "مدرسے کی تصویریں اور ویڈیوز"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "مدرسہ صاحب الزمان کی پروقار عمارت، جدید کلاس رومز، کمپیوٹر لیب اور روحانی ماحول کا تصویری و ویڈیو احاطہ"}
          </p>
        </div>

        {/* Asymmetric Bento Grid: 1 Video (Large Featured Card) + 4 Surrounding Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          
          {/* ========================================================= */}
          {/* CARD 1: THE 1 FEATURED VIDEO (Spans 2 cols & 2 rows on lg)*/}
          {/* ========================================================= */}
          <div
            onClick={() => setSelectedMedia(videoItem)}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 group relative rounded-[28px] overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-[#120A05]/85 backdrop-blur-2xl backdrop-saturate-150 border-2 border-white/20 hover:border-[#C9B38D] shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_25px_60px_rgba(201,179,141,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.35)] transition-all duration-500 cursor-pointer min-h-[360px] sm:min-h-[460px] flex flex-col justify-end"
          >
            {/* Poster / Thumbnail from video first frame or custom image */}
            {directVideoSrc ? (
              <video
                src={`${directVideoSrc}#t=0.5`}
                preload="metadata"
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88] pointer-events-none"
              />
            ) : videoItem.imageUrl && !isVideoUrl(videoItem.imageUrl) ? (
              <Image
                src={videoItem.imageUrl}
                alt={videoItem.title || "ویڈیو ٹور"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#2A160D] to-[#120A05] flex items-center justify-center">
                <Video className="w-16 h-16 text-[#C9B38D]/25" />
              </div>
            )}
            
            {/* Frosted Glass Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/45 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent pointer-events-none" />

            {/* Top Badges with Glassmorphism */}
            <div className="absolute top-4 right-4 left-4 flex justify-between items-center z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-xs font-urdu font-bold text-[#E5D7BE] backdrop-blur-xl shadow-lg">
                <Video className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>ویڈیو ٹور {videoItem.videoDuration ? `(${videoItem.videoDuration})` : ""}</span>
              </span>
              <span className="px-3.5 py-1 rounded-full bg-black/60 text-[11px] font-urdu text-stone-200 backdrop-blur-md border border-white/10 shadow-sm">
                {videoItem.category || "مرکزی کیمپس"}
              </span>
            </div>

            {/* Center Play Button Pulse with Glowing Ring */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-[#C9B38D]/30 blur-md group-hover:bg-[#C9B38D]/60 transition-all duration-300 animate-pulse" />
                <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white/95 text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_0_35px_rgba(201,179,141,0.95)] group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-[#120A05] text-[#120A05] mr-1" />
                </div>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 p-6 sm:p-8 text-right bg-gradient-to-t from-[#120A05]/95 via-[#120A05]/75 to-transparent">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C9B38D] font-urdu mb-1">
                <span>{videoItem.location || "مرکزی کیمپس، احسن آباد کراچی"}</span>
              </div>
              <h3 className="font-urdu font-bold text-white text-lg sm:text-2xl leading-[2.1] group-hover:text-[#E8D7B8] transition-colors">
                {videoItem.title}
              </h3>
              <p className="font-urdu text-xs sm:text-sm text-stone-200 mt-2 leading-[2.3] line-clamp-2">
                {videoItem.description}
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARDS 2 TO 5: THE 4 IMAGES (2x2 grid on desktop)         */}
          {/* ========================================================= */}
          {imageItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedMedia(item)}
              className="group relative rounded-[24px] overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-[#120A05]/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 hover:border-[#C9B38D] shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.18)] hover:shadow-[0_20px_50px_rgba(201,179,141,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer min-h-[220px] sm:min-h-[235px] flex flex-col justify-end"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.85]"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/45 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent pointer-events-none" />

              {/* Top Tag & Zoom icon */}
              <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/20 text-[11px] font-urdu font-medium text-[#E5D7BE] backdrop-blur-md shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-[#C9B38D]" />
                  <span>{item.category || "تصویر"}</span>
                </span>
                
                <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-stone-300 group-hover:text-white group-hover:bg-[#C9B38D] group-hover:text-[#120A05] transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 p-4 sm:p-5 text-right bg-gradient-to-t from-[#120A05]/95 via-[#120A05]/70 to-transparent">
                <span className="text-[10px] text-[#C9B38D] font-urdu block mb-0.5">
                  {item.location}
                </span>
                <h4 className="font-urdu font-bold text-white text-sm sm:text-base leading-[2.1] group-hover:text-[#E8D7B8] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="font-urdu text-[11px] text-stone-300 mt-1 leading-[2.1] line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

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
