"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Play, ZoomIn, Building2, Eye, Video } from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";

import { api } from "@/services/api";

interface CampusMediaSectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
}

export default function CampusMediaSection({ header }: CampusMediaSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const defaultMediaList: MediaItem[] = [
    {
      id: "campus-tour",
      title: "مدرسہ صاحب الزمان کی مرکزی عمارت و بیرونی منظر (مکمل ویڈیو ٹور)",
      category: "کیمپس و عمارت",
      type: "video",
      videoDuration: "۰۴:۱۵",
      imageUrl: "/images/hero-banner.png",
      date: "تعلیمی سال ۲۰۲۶",
      location: "مرکزی کیمپس، احسن آباد کراچی",
      description: "مدرسہ صاحب الزمان (عج) کے وسیع و عریض کیمپس، بیرونی محرابوں، لان اور عمارت کا مکمل ورچوئل ویڈیو ٹور۔",
    },
    {
      id: "classrooms",
      title: "حوزوی و دینی تدریسی ہالز",
      category: "تدریسی شعبہ",
      type: "image",
      imageUrl: "/images/layout/quran-study.jpg",
      date: "روزانہ تدریس",
      location: "تعلیمی بلاک - منزل اول",
      description: "طلبہ کے لیے پرسکون، کشادہ اور جدید سہولیات سے آراستہ درس گاہیں جہاں اساتذہ انفرادی توجہ دیتے ہیں۔",
    },
    {
      id: "computer-lab",
      title: "جدید کمپیوٹر و ریسرچ لیب",
      category: "عصری علوم",
      type: "image",
      imageUrl: "/images/layout/mosque-arches.jpg",
      date: "جدید سہولیات",
      location: "سائنس و انفارمیشن بلاک",
      description: "عصری علوم کی تدریس کے لیے انٹرنیٹ سے لیس کمپیوٹر لیب جہاں طلبہ کو آئی ٹی اور سافٹ ویئر سکھائے جاتے ہیں۔",
    },
    {
      id: "prayer-hall",
      title: "مسجد و مرکزی نماز ہال",
      category: "عبادت و روحانیت",
      type: "video",
      videoDuration: "۰۲:۳۰",
      imageUrl: "/images/layout/congregation.jpg",
      date: "باجماعت نماز",
      location: "مرکزی ہال",
      description: "باجماعت پنجگانہ نماز، دعاؤں کی محافل اور زیارات کے انعقاد کے لیے وسیع و روح پرور مسجد۔",
    },
    {
      id: "campus-courtyard",
      title: "وسیع صحن و بیرونی راہداری",
      category: "کیمپس ایریا",
      type: "image",
      imageUrl: "/images/layout/sunset-mosque.jpg",
      date: "تفریحی ماحول",
      location: "اوپن گراؤنڈ و کورٹ یارڈ",
      description: "طلبہ کے چہل قدمی، فکری مباحثوں اور پرسکون تفریح کے لیے سرسبز و شاداب قدرتی ماحول۔",
    },
  ];

  const [mediaList, setMediaList] = useState<MediaItem[]>(defaultMediaList);

  React.useEffect(() => {
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
  }, []);

  return (
    <section id="campus-media" className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden" dir="rtl">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C9B38D]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <Building2 className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "بصری و ویڈیو مشاہدہ"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "مدرسے کی تصویریں اور ویڈیوز"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "مدرسہ صاحب الزمان کی پروقار عمارت، جدید کلاس رومز، کمپیوٹر لیب اور روحانی ماحول کا تصویری و ویڈیو احاطہ"}
          </p>
        </div>

        {/* Asymmetric Bento Grid (Section 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Large Featured Card Spanning 2 Columns and 2 Rows on Desktop */}
          <div
            onClick={() => setSelectedMedia(mediaList[0])}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 group relative rounded-3xl overflow-hidden bg-[#1A0E08] border-2 border-[#C9B38D]/35 hover:border-[#C9B38D] shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(201,179,141,0.3)] transition-all duration-500 cursor-pointer min-h-[340px] sm:min-h-[420px] flex flex-col justify-end"
          >
            <Image
              src={mediaList[0].imageUrl}
              alt={mediaList[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88]"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 right-4 left-4 flex justify-between items-center z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120A05]/85 border border-[#C9B38D]/60 text-xs font-urdu font-bold text-[#C9B38D] backdrop-blur-md">
                <Video className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>ویڈیو ٹور ({mediaList[0].videoDuration})</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 text-[11px] font-urdu text-stone-300 backdrop-blur-sm border border-white/10">
                مرکزی کیمپس
              </span>
            </div>

            {/* Center Play Button Pulse */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_0_30px_rgba(201,179,141,0.9)] group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#120A05] text-[#120A05] mr-1" />
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 p-5 sm:p-7 text-right">
              <h3 className="font-urdu font-bold text-white text-lg sm:text-2xl leading-[2.1] group-hover:text-[#D9C7A7] transition-colors">
                {mediaList[0].title}
              </h3>
              <p className="font-urdu text-xs sm:text-sm text-stone-200 mt-2.5 leading-[2.3] line-clamp-2">
                {mediaList[0].description}
              </p>
            </div>
          </div>

          {/* Cards 2 to 5: Bento Surrounding Cards */}
          {mediaList.slice(1).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#1A0E08] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-lg hover:shadow-[0_10px_30px_rgba(201,179,141,0.25)] transition-all duration-300 cursor-pointer min-h-[220px] sm:min-h-[240px] flex flex-col justify-end"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/45 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#120A05]/85 border border-[#C9B38D]/40 text-[10px] sm:text-xs font-urdu text-[#C9B38D] backdrop-blur-sm">
                  {item.type === "video" ? (
                    <>
                      <Play className="w-3 h-3 fill-[#C9B38D]" />
                      <span>{item.videoDuration}</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 text-[#C9B38D]" />
                      <span>تصویر</span>
                    </>
                  )}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 p-4 text-right">
                <h4 className="font-urdu font-bold text-white text-sm sm:text-base leading-[2.05] group-hover:text-[#D9C7A7] transition-colors">
                  {item.title}
                </h4>
                <p className="font-urdu text-[11px] sm:text-xs text-stone-300 mt-1.5 leading-[2.1] line-clamp-1">
                  {item.location}
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
