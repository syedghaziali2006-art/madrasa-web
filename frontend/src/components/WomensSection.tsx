"use client";

import React from "react";
import Image from "next/image";
import { womensWingFeatures } from "@/data/madarsaData";
import { Shield, Heart, GraduationCap, CheckCircle } from "lucide-react";

interface WomensSectionProps {
  onOpenAdmission: () => void;
}

export default function WomensSection({ onOpenAdmission }: WomensSectionProps) {
  return (
    <section id="womens-campus" className="py-24 relative overflow-hidden bg-[#1A0E08] islamic-navy-pattern">
      <div id="women" className="sr-only" />
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#120A05]/80 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
            
            <span className="font-urdu">خصوصی شعبہ برائے طالبات و خواتین</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white mb-4 leading-relaxed">
            جامعہ سیدہ فاطمہ الزہراء <span className="text-[#C9B38D]">(سلام اللہ علیہا)</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
          <p className="text-base sm:text-lg text-stone-300 font-urdu leading-relaxed max-w-2xl mx-auto">
            خواتین و طالبات کے لیے شرعی اصولوں کے عین مطابق مکمل پردہ دار، باوقار اور جدید دینی تعلیمی ادارہ۔
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Right Column: Features and Mission */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 transition-all duration-300 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#C9B38D]" />
                <span>عظمتِ نسواں اور فکری و روحانی بالیدگی</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-300 font-urdu leading-relaxed mb-6">
                شعبہ خواتین کا قیام اس مقصد کے تحت عمل میں لایا گیا ہے تاکہ ہماری مائیں، بہنیں اور بیٹیاں حضرت فاطمۃ الزہراءؑ اور حضرت زینبِ کبریٰؑ کے اسوہ حسنہ پر عمل کرتے ہوئے اسلامی احکام، قرآنی علوم، اور تربیتِ اولاد میں مکمل دسترس حاصل کر سکیں۔
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {womensWingFeatures.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#1A0E08]/90 border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm font-urdu font-bold text-white mb-1.5">
                      <CheckCircle className="w-4 h-4 text-[#C9B38D] shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-stone-300/80 font-urdu leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenAdmission}
                className="inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-7 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base shadow-lg shadow-black/50 transition-all duration-300 active:scale-95"
              >
                <GraduationCap className="w-5 h-5 text-[#C9B38D]" />
                <span>شعبہ خواتین میں آن لائن داخلہ لیں</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-urdu text-stone-300 bg-[#120A05] px-4 py-3 rounded-full border border-[#C9B38D]/30">
                <Shield className="w-4 h-4 text-[#C9B38D]" />
                <span>۱۰۰٪ معلمات و مستورات کے زیرِ انتظام کیمپس اور آن لائن کلاسز</span>
              </div>
            </div>
          </div>

          {/* Left Column: Image Card with Champagne Gold Border */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              <div className="bg-[#1A0E08] rounded-[26px] p-2.5 overflow-hidden">
                <div className="relative h-80 sm:h-[460px] w-full rounded-[20px] overflow-hidden group">
                  <Image
                    src="/images/women-campus.jpg"
                    alt="جامعہ سیدہ فاطمہ الزہراء کیمپس عمارت"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-gradient-to-b from-[#1E110A]/95 to-[#120A05]/95 border border-[#C9B38D]/40 backdrop-blur-md text-right shadow-xl">
                    <span className="text-xs font-urdu font-bold px-3 py-1 rounded-full bg-white text-[#120A05] border border-[#C9B38D] inline-block mb-1.5 shadow">
                      خصوصی پردہ دار کیمپس
                    </span>
                    <h4 className="text-base font-urdu font-bold text-white">
                      جامعہ سیدہ فاطمۃ الزہراء (س) برائے طالبات
                    </h4>
                    <p className="text-xs text-stone-300 font-urdu mt-1">
                      مکمل سکون، روحانی ماحول اور جدید تعلیمی سہولیات سے آراستہ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
