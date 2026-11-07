"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Compass, Play, MapPin, Video, Camera } from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";

import { api } from "@/services/api";

interface StudentPicnicSectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  items?: MediaItem[];
}

export default function StudentPicnicSection({ header, items }: StudentPicnicSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const defaultPicnicMoments: MediaItem[] = [
    {
      id: "picnic-beach",
      title: "ساحلِ سمندر (سی ویو) کی تفریحی پکنک ۲۰۲۵",
      category: "سالانہ پکنک",
      type: "video",
      videoDuration: "۰۴:۵۰",
      imageUrl: "/images/gallery/picnic-beach.jpg",
      date: "اکتوبر ۲۰۲۵",
      location: "کلفٹن و سی ویو ساحل، کراچی",
      description: "طلبہ اور اساتذہ کا ساحلِ سمندر کا یادگار سفر، باجماعت نماز، لذیذ ظہرانہ اور ساحلی ہوائیں و کھیل۔",
    },
    {
      id: "botanical-garden",
      title: "باغِ ابنِ قاسم کا تفریحی و علمی وزٹ",
      category: "تعلیمی دورہ",
      type: "image",
      imageUrl: "/images/layout/sunset-mosque.jpg",
      date: "بہار ۲۰۲۵",
      location: "باغِ ابن قاسم، کراچی",
      description: "قدرت کے مناظر، سرسبز باغات اور طلبہ کے لیے معلوماتی تفریحی واک۔",
    },
    {
      id: "amusement-park",
      title: "تفریحی پارک میں طلبہ کی پرلطف مسکراہٹیں",
      category: "ایکٹیویٹی ڈے",
      type: "video",
      videoDuration: "۰۲:۱۵",
      imageUrl: "/images/layout/lattice-prayer.jpg",
      date: "دسمبر ۲۰۲۵",
      location: "تھیم پارک، کراچی",
      description: "جھولوں کی تفریح، دوستانہ محفل اور طلبہ کے چہروں پر مسکراہٹیں اور خوشیاں۔",
    },
    {
      id: "hill-view-lunch",
      title: "پہاڑی مقام پر ظہرانہ اور روحانی دعا",
      category: "سیر و سیاحت",
      type: "image",
      imageUrl: "/images/layout/congregation.jpg",
      date: "جنوری ۲۰۲۶",
      location: "گڈاپ و مضافاتی قدرتی پہاڑیاں",
      description: "کھلے آسمان تلے دسترخوان، لذیذ کھانا اور امام زمانہ (عج) کے ظہور کے لیے اجتماعی دعا۔",
    },
  ];

  const [picnicMoments, setPicnicMoments] = useState<MediaItem[]>(
    items && items.length > 0 ? items : defaultPicnicMoments
  );

  React.useEffect(() => {
    if (items && items.length > 0) {
      setPicnicMoments(items);
      return;
    }
    const fetchPicnic = async () => {
      try {
        const res = await api.gallery.getAll({ section: "picnic" });
        if (res.success && res.data && res.data.length > 0) {
          setPicnicMoments(res.data);
        }
      } catch (err) {
        // fallback
      }
    };
    fetchPicnic();
  }, [items]);

  // Specific rotation classes for authentic polaroid scrapbook aesthetic
  const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3"];

  return (
    <section id="student-picnic" className="py-20 sm:py-28 bg-[#180E09] islamic-navy-pattern relative overflow-hidden" dir="rtl">
      {/* Warm Ambient Glow */}
      <div className="absolute top-1/3 right-1/3 w-[600px] h-[300px] bg-[#C9B38D]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "بچوں کی پکنک کی تصویریں اور ویڈیوز"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "مدرسے کے بچوں کے تفریحی دوروں، ساحلِ سمندر کی پکنک، اور قدرتی مناظر میں گزارے ہوئے ناقابلِ فراموش ایام"}
          </p>
        </div>

        {/* Polaroid / Scrapbook Style Grid (Section 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 pt-4 pb-6">
          {picnicMoments.map((item, idx) => {
            const rotClass = rotations[idx % rotations.length];
            return (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className={`group relative bg-[#FAF7F2] rounded-2xl p-3 sm:p-3.5 pb-6 shadow-[0_20px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_50px_rgba(201,179,141,0.4)] transition-all duration-500 cursor-pointer ${rotClass} hover:rotate-0 hover:scale-105 z-10 hover:z-20 flex flex-col`}
              >
                {/* Washi Tape / Tape Accent at Top Center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#C9B38D]/45 backdrop-blur-sm border-x border-[#8C6D3F]/40 shadow-sm rotate-1 z-20 pointer-events-none" />

                {/* Photo Container */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/10 border border-stone-300">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Video Play Overlay */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-[#120A05] border border-[#C9B38D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-[#120A05] text-[#120A05] mr-0.5" />
                      </div>
                      <span className="absolute bottom-2 left-2 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 rounded-md">
                        {item.videoDuration}
                      </span>
                    </div>
                  )}

                  {/* Top Category Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#120A05]/80 text-[#C9B38D] font-urdu text-[10px] font-bold backdrop-blur-sm border border-[#C9B38D]/40">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Polaroid Handwritten-Style Caption Area */}
                <div className="pt-3.5 px-1 text-right flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-urdu font-bold text-[#140B06] text-sm sm:text-base leading-[2.1] group-hover:text-[#8C6D3F] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="font-urdu text-xs text-stone-600 mt-2 leading-[2.1] line-clamp-1">
                      {item.location}
                    </p>
                  </div>

                  {/* Date & Camera Icon */}
                  <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-200 text-[11px] font-urdu text-stone-500">
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-[#8C6D3F]" />
                      <span>{item.date}</span>
                    </span>
                    <span className="text-[#8C6D3F] font-bold">بڑا کریں 🔍</span>
                  </div>
                </div>
              </div>
            );
          })}
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
