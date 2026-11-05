"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  ArrowLeft,
  ZoomIn,
  CheckCircle2,
  X,
  ExternalLink,
  GraduationCap,
  Building,
} from "lucide-react";
import { madarsaInfo } from "@/data/madarsaData";

export interface HeroData {
  bismillah?: string;
  title?: string;
  titleSuffix?: string;
  calligraphyImage?: string;
  tagline?: string;
  bgType?: "image" | "video";
  bgMediaUrl?: string;
  badges?: Array<{ id: string; text: string }>;
  addressText?: string;
  googleMapsUrl?: string;
  admissionBtnText?: string;
  contactBtnText?: string;
  posterImage?: string;
  posterTitle?: string;
}

interface HeroProps {
  data?: HeroData;
  onOpenAdmission: () => void;
  onOpenContact?: () => void;
  onExploreCourses?: () => void;
}

export default function Hero({ data, onOpenAdmission, onOpenContact, onExploreCourses }: HeroProps) {
  const [isPosterZoomed, setIsPosterZoomed] = useState(false);

  const bismillah = data?.bismillah || madarsaInfo.bismillah || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
  const title = data?.title || "مدرسہ صاحب الزمان";
  const titleSuffix = data?.titleSuffix || "(عج)";
  const calligraphyImage = data?.calligraphyImage || "/images/madrasa-calligraphy.png";
  const tagline =
    data?.tagline ||
    "دینی و عصری علوم کا بین الاقوامی اسلامی ادارہ | حوزوی تعلیم، تجوید، خطابت، انگلش اور کمپیوٹر کا مثالی سنگم برائے کردار سازی";
  const bgType = data?.bgType || "image";
  const bgMediaUrl = data?.bgMediaUrl || "/images/hero-banner.png";
  const isBgVideo =
    bgType === "video" ||
    bgMediaUrl.endsWith(".mp4") ||
    bgMediaUrl.endsWith(".webm") ||
    bgMediaUrl.endsWith(".ogg");
  const badges = data?.badges && data.badges.length > 0
    ? data.badges
    : [
        { id: "1", text: "۵ سالہ حوزوی نصاب" },
        { id: "2", text: "مفت ہاسٹل و معیاری طعام" },
        { id: "3", text: "کمپیوٹر لیب و لائبریری" }
      ];
  const addressText =
    data?.addressText || "پلاٹ بی 25، احسن آباد، گلزارِ ہجری، اسکیم 33، کراچی، پاکستان";
  const googleMapsUrl =
    data?.googleMapsUrl ||
    "https://maps.google.com/?q=" +
      encodeURIComponent("Madarsa Sahib uz Zaman Ahsanabad 3 Gulzar-e-Hijri Scheme 33 Karachi");
  const admissionBtnText = data?.admissionBtnText || "داخلہ لیں";
  const contactBtnText = data?.contactBtnText || "ہم سے رابطہ کریں";
  const posterImage = data?.posterImage || "/images/admission-poster.jpeg";
  const posterTitle = data?.posterTitle || "داخلہ پراسپیکٹس و شرائط — مدرسہ صاحب الزمان (عج)";

  return (
    <section
      id="hero"
      dir="rtl"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#070E18] text-right"
    >
      {/* ============================================================== */}
      {/* 1. BACKGROUND LAYER: Scenic madrasa building with trees &      */}
      {/*    cinematic gradient (bg-cover bg-center)                     */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0">
        {isBgVideo ? (
          <video
            src={bgMediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-100"
          />
        ) : (
          <Image
            src={bgMediaUrl}
            alt="مدرسہ کی خوبصورت عمارت اور سرسبز درخت"
            fill
            priority
            className="object-cover object-center scale-100 transform transition-transform duration-1000 ease-out"
          />
        )}

        {/* Dark Cinematic Warm Brown Gradient Overlay for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120A05]/95 via-[#1A0E08]/75 to-[#120A05]/85" />

        {/* Ambient Top & Bottom Depth Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9B38D]/10 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. HERO MAIN CONTENT AREA (Split Grid / Flex Container)        */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center">

          {/* ---------------------------------------------------------- */}
          {/* RIGHT / MAIN COLUMN (md:col-span-7)                        */}
          {/* Madrasa Branding & Heading in Urdu                         */}
          {/* ---------------------------------------------------------- */}
          <div className="md:col-span-7 flex flex-col items-start text-right order-1 md:order-1">

            {/* A. Bismillah Subheading: Transparent background, blinking golden dot, white text */}
            <div className="inline-flex items-center gap-3 select-none">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C9B38D] animate-blink-gold shrink-0" />
              <p className="font-arabic text-lg sm:text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {bismillah}
              </p>
            </div>

            {/* B. Main Title: Large, Prominent Golden Calligraphy Artwork */}
            <div className="w-full">
              {/* Semantic Heading with Golden Calligraphy Artwork */}
              <h1 className="select-none py-1 flex justify-start w-full">
                <span className="sr-only">
                  {title || "مدرسہ صاحب الزمان"} {titleSuffix || "(عج)"}
                </span>
                <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] xl:max-w-[680px] aspect-[560/125]">
                  <Image
                    src={calligraphyImage}
                    alt={title || "مدرسہ صاحب الزمان (عج)"}
                    fill
                    priority
                    className="object-contain object-right drop-shadow-[0_12px_35px_rgba(201,179,141,0.35)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                  />
                </div>
              </h1>

              {/* Urdu Tagline & Mission */}
              <p className="font-urdu text-base sm:text-lg md:text-xl text-[#FAF7F2] leading-[2.4] sm:leading-[2.6] max-w-3xl font-medium drop-shadow-md pt-1 sm:pt-2">
                {tagline}
              </p>
            </div>

            {/* C. Quick Institutional Feature Badges in White & Dull Gold */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 font-urdu text-xs sm:text-sm">
              {badges.map((b) => (
                <span
                  key={b.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A0E08]/80 border border-[#C9B38D]/35 text-[#D9C7A7] backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9B38D]" />
                  {b.text}
                </span>
              ))}
            </div>

            {/* D. Location Tag (Urdu Address with Red Location Pin) */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl mt-4 bg-gradient-to-b from-[#2a1e14]/55 to-[#140e09]/75 hover:from-[#38281b]/65 backdrop-blur-lg border border-[#f5deb3]/15 hover:border-[#f5deb3]/35 shadow-[inset_0_1px_1px_0_rgba(255,245,230,0.18),0_12px_32px_-8px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_2px_0_rgba(255,245,230,0.28),0_16px_36px_-8px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out group cursor-pointer"
              title="گوگل میپس پر لوکیشن دیکھیں"
            >
              {/* Subtle glass sheen sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <MapPin className="relative w-4 h-4 text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
              </span>
              <span className="font-urdu text-xs sm:text-sm text-stone-200 group-hover:text-white transition-colors">
                {addressText}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#f5deb3] group-hover:translate-x-0.5 group-hover:text-white transition-all" />
            </a>

            {/* E. Call-To-Action Buttons: White & Dull Golden Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Button 1: White Pill Button with Dull Gold Border */}
              <button
                onClick={onOpenAdmission}
                className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 h-11 sm:h-12 px-7 sm:px-9 rounded-full bg-white hover:bg-stone-100 border-2 border-[#C9B38D] text-[#120A05] font-urdu font-bold text-lg sm:text-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(201,179,141,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                aria-label="آن لائن داخلہ لیں"
              >
                <span>{admissionBtnText}</span>
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C6D3F] transition-transform duration-300 group-hover:-translate-x-1" />
              </button>

              {/* Button 2: Dull Golden Border & Translucent Dark Brown Pill with White Text */}
              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-[#1A0E08]/75 hover:bg-[#C9B38D]/20 text-white font-urdu font-bold text-base sm:text-lg border border-[#C9B38D] transition-all duration-300 backdrop-blur-md hover:scale-[1.02] active:scale-95 cursor-pointer shadow-md"
                >
                  <span>{contactBtnText}</span>
                </button>
              )}
            </div>

          </div>

          {/* ---------------------------------------------------------- */}
          {/* LEFT / SIDE COLUMN: Admission Poster Image Div             */}
          {/* ---------------------------------------------------------- */}
          <div className="md:col-span-5 order-2 md:order-2 flex justify-center items-center w-full">
            <div
              onClick={() => setIsPosterZoomed(true)}
              className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[330px] lg:max-w-[370px] xl:max-w-[400px] p-[2px] rounded-[22px] bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(201,179,141,0.5)] cursor-pointer group transition-all duration-300"
              title="داخلہ پوسٹر بڑا کر کے دیکھیں"
            >
              <div className="relative w-full rounded-[20px] overflow-hidden bg-[#1A0E07]">
                <Image
                  src={posterImage}
                  alt={posterTitle}
                  width={720}
                  height={994}
                  priority
                  className="w-full h-auto block select-none group-hover:scale-[1.015] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <span className="bg-black/90 text-amber-300 font-urdu text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border border-amber-400 shadow-xl flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>پوسٹر بڑا کریں 🔍</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. LIGHTBOX MODAL: Full View of Original Admission Flyer       */}
      {/* ============================================================== */}
      {isPosterZoomed && (
        <div
          className="fixed inset-0 z-50  backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsPosterZoomed(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[95vh] flex flex-col items-center backdrop-blur-2xl backdrop-saturate-150 rounded-3xl p-4 sm:p-6 border-2 border-amber-500/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-amber-500/30 mb-3">
              <span className="font-urdu text-sm sm:text-base font-bold text-amber-300">
                {posterTitle}
              </span>
              <button
                onClick={() => setIsPosterZoomed(false)}
                className="text-white hover:text-amber-400 text-sm font-bold bg-white/10 hover:bg-white/20 px-3.5 py-1 rounded-full border border-white/20 transition flex items-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-8" />
                <span>بند کریں</span>
              </button>
            </div>

            {/* Poster Graphic Container */}
            <div className="relative w-full h-[62vh] sm:h-[70vh] rounded-2xl overflow-hidden bg-black/60 border border-amber-500/30">
              <Image
                src={posterImage}
                alt={posterTitle}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 w-full font-urdu">
              <button
                onClick={() => {
                  setIsPosterZoomed(false);
                  onOpenAdmission();
                }}
                className="flex-1 max-w-sm text-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black py-2.5 px-6 rounded-full shadow-lg text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                
                <span>آن لائن داخلہ فارم پر جائیں</span>
              </button>

              <button
                onClick={() => setIsPosterZoomed(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-full text-sm border border-white/20 transition cursor-pointer"
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
