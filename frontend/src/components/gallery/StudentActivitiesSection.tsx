"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trophy, Play, Video, Sparkles, Smile, Eye, Activity } from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";

import { api } from "@/services/api";

interface StudentActivitiesSectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
}

export default function StudentActivitiesSection({ header }: StudentActivitiesSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const defaultActivities: MediaItem[] = [
    {
      id: "sports-cricket",
      title: "سالانہ کرکٹ ٹورنامنٹ ۲۰۲۶ - فائنل میچ اور بچوں کی خوشی",
      category: "کھیل کود و اسپورٹس",
      type: "video",
      videoDuration: "۰۳:۲۰",
      imageUrl: "/images/gallery/sports-day.jpg",
      date: "ہفتہ وار اسپورٹس ڈے",
      location: "مدرسہ صاحب الزمان پلے گراؤنڈ",
      description: "طلبہ کے درمیان تفریحی کرکٹ میچ کی پُرجوش جھلکیاں، چھکے چوکے اور فاتح ٹیم کی فتح کا جشن۔",
    },
    {
      id: "indoor-games",
      title: "ان ڈور گیمز - کیرم اور شطرنج کے مقابلے",
      category: "ذہنی تفریح",
      type: "image",
      imageUrl: "/images/gallery/indoor-games.jpg",
      date: "شام کا تفریحی وقت",
      location: "اسٹوڈنٹس ایکٹیویٹی روم",
      description: "کیرم بورڈ، شطرنج اور فکری کھیلوں میں طلبہ کی بھرپور دلچسپی، مسکراہٹیں اور باہمی رفاقت۔",
    },
    {
      id: "morning-exercise",
      title: "صبح کی باقاعدہ پی ٹی اور جسمانی ورزش",
      category: "صحت و تندرستی",
      type: "video",
      videoDuration: "۰۱:۴۵",
      imageUrl: "/images/gallery/exercise.jpg",
      date: "روزانہ فجر کے بعد",
      location: "مرکزی کورٹ یارڈ و گراؤنڈ",
      description: "صحت مند دماغ کے لیے تندرست جسم — روزانہ صبح باقاعدہ اسٹریچنگ، جاگنگ اور نظم و ضبط۔",
    },
    {
      id: "tug-of-war",
      title: "رسی کشی کا سنسنی خیز اور دوستانہ مقابلہ",
      category: "اسپورٹس فیسٹیول",
      type: "image",
      imageUrl: "/images/gallery/tug-of-war.jpg",
      date: "سالانہ فیسٹیول",
      location: "اوپن گراؤنڈ",
      description: "مختلف کلاسوں کے طلبہ کے درمیان زور آزمائی، اجتماعی ٹیم ورک اور بچوں کی پرلطف ہنسی۔",
    },
    {
      id: "friendly-badminton",
      title: "بیڈمنٹن چیمپئن شپ اور طلبہ کی مسکراہٹیں",
      category: "میدانی کھیل",
      type: "video",
      videoDuration: "۰۲:۱۰",
      imageUrl: "/images/gallery/badminton.jpg",
      date: "عصر کے بعد",
      location: "بیڈمنٹن کورٹ",
      description: "طلبہ کی چستی، مہارت اور کھیل کے دوران باہمی محبت، اخوت اور اسپورٹس مین اسپرٹ کا مظاہرہ۔",
    },
  ];

  const [activities, setActivities] = useState<MediaItem[]>(defaultActivities);

  React.useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.gallery.getAll({ section: "activities" });
        if (res.success && res.data && res.data.length > 0) {
          setActivities(res.data);
        }
      } catch (err) {
        // fallback
      }
    };
    fetchActivities();
  }, []);

  return (
    <section id="student-activities" className="py-20 sm:py-28 bg-[#140B06] islamic-dark-pattern relative overflow-hidden" dir="rtl">
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-[#C9B38D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <Trophy className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "نشاط و جسمانی صحت"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "بچوں کے کھیل کود اور سرگرمیاں"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "تعلیم و تربیت کے ساتھ ساتھ طلبہ کی جسمانی تندرستی، کرکٹ، بیڈمنٹن اور دوستانہ مقابلوں کی پُرشوق جھلکیاں"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <div
            onClick={() => setSelectedMedia(activities[0])}
            className="md:col-span-2 lg:col-span-2 group rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E110A] to-[#120A05] border border-[#C9B38D]/30 hover:border-[#C9B38D] shadow-[0_20px_45px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_55px_rgba(201,179,141,0.35)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative w-full h-[260px] sm:h-[340px] overflow-hidden bg-[#0A0503]">
              <Image
                src={activities[0].imageUrl}
                alt={activities[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08] via-transparent to-black/30" />

              <div className="absolute top-4 right-4 left-4 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120A05]/90 border border-[#C9B38D] text-xs font-urdu font-bold text-[#C9B38D] backdrop-blur-md shadow-lg">
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  <span>ویڈیو کلپ ({activities[0].videoDuration})</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 text-xs font-urdu text-stone-300 border border-white/10 backdrop-blur-sm">
                  {activities[0].date}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_0_30px_rgba(201,179,141,0.9)] group-hover:scale-115 transition-transform duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#120A05] text-[#120A05] mr-1" />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 text-right">
              <span className="inline-block text-xs font-urdu font-semibold text-[#C9B38D] bg-[#24130A] px-3 py-1 rounded-full border border-[#C9B38D]/30 mb-2">
                {activities[0].category}
              </span>
              <h3 className="font-urdu font-bold text-white text-xl sm:text-2xl leading-[2.1] group-hover:text-[#D9C7A7] transition-colors">
                {activities[0].title}
              </h3>
              <p className="font-urdu text-xs sm:text-sm text-stone-200 mt-2.5 leading-[2.3]">
                {activities[0].description}
              </p>
            </div>
          </div>

          {activities.slice(1).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.3)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden bg-[#0A0503]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1009] via-transparent to-black/30" />

                <div className="absolute top-3 right-3 left-3 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#120A05]/90 border border-[#C9B38D]/40 text-xs font-urdu font-semibold text-[#C9B38D] backdrop-blur-sm">
                    {item.type === "video" ? (
                      <>
                        <Video className="w-3 h-3 text-red-400" />
                        <span>{item.videoDuration}</span>
                      </>
                    ) : (
                      <>
                        <Smile className="w-3 h-3 text-[#C9B38D]" />
                        <span>تصویر</span>
                      </>
                    )}
                  </span>
                  <span className="text-[11px] font-urdu text-stone-300 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                    {item.date}
                  </span>
                </div>

                {item.type === "video" ? (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#120A05] border border-[#C9B38D] flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform">
                      <Play className="w-5 h-5 fill-[#120A05] text-[#120A05] mr-0.5" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                    <span className="w-10 h-10 rounded-full bg-white text-[#120A05] border border-[#C9B38D] flex items-center justify-center shadow-lg">
                      <Eye className="w-5 h-5 text-[#8C6D3F]" />
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 text-right">
                <span className="text-[11px] font-urdu font-semibold text-[#C9B38D] block mb-1">
                  {item.category}
                </span>
                <h4 className="font-urdu font-bold text-white text-base leading-[2.1] group-hover:text-[#D9C7A7] transition-colors min-h-[56px] flex items-center">
                  {item.title}
                </h4>
                <p className="font-urdu text-xs text-stone-300 mt-2.5 leading-[2.3] line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MediaLightboxModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
}
