"use client";

import React from "react";
import { ArrowUpLeft, Compass } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
  onOpenBooking: () => void;
}

export default function Hero({ onExplore, onOpenBooking }: HeroProps) {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Background with panoramic image and dark gradient overlay */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] w-full flex items-center justify-center pt-8 pb-32 sm:pb-36 px-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('/images/tawaf/hero_kaaba.jpg'), url('/images/tawaf/hero_bg.jpg'), url('/images/layout/kaaba.jpg')`,
          }}
        />

        {/* Sophisticated Dark Vignette Overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180E08]/85 via-[#23140C]/75 to-[#1A0E08]/90 backdrop-brightness-75" />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B2418]/85 text-[#F2DFCE] text-xs sm:text-sm font-medium border border-[#6D4229]/70 backdrop-blur-md shadow-sm mb-5 hover:border-[#C59B27] transition-all">
            <span>مرحباً بك في منصة طواف!</span>
          </div>

          {/* Main Title Line 1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.25] sm:leading-[1.2] mb-3">
            مع طواف: نسهل لك الطريق إلى
          </h1>

          {/* Main Title Badge: "بيت الله الحرام" */}
          <div className="my-2 sm:my-3 inline-block">
            <div className="bg-white/95 text-[#734123] px-6 sm:px-12 py-2 sm:py-3.5 rounded-2xl sm:rounded-3xl shadow-2xl font-black text-2xl sm:text-4xl lg:text-5xl border border-[#EDE2D5] tracking-wide inline-flex items-center justify-center transform hover:scale-[1.02] transition-transform">
              بيت الله الحرام
            </div>
          </div>

          {/* Subtitle Description */}
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-[#E2D2C3] font-normal leading-relaxed mt-4 sm:mt-5 px-4 sm:px-0">
            نحرص على تقديم خدمات متكاملة للعمرة بكل سهولة وراحة، بدءاً من الحجز وحتى العودة بسلام، مع توفير خطط على خياراتك، ونحن نهتم بالباقي.
          </p>

          {/* CTA Button: "اختر رحلتك ↗" */}
          <div className="mt-6 sm:mt-8">
            <button
              onClick={onOpenBooking}
              className="group flex items-center gap-2.5 bg-[#825034] hover:bg-[#6E4027] active:scale-95 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 rounded-full shadow-xl shadow-[#4A2814]/40 border border-[#9A5F3A] transition-all"
            >
              <span className="text-base">🕋</span>
              <span>اختر رحلتك</span>
              <ArrowUpLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
