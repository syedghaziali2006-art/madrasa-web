"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, BookCheck, Heart, Shield, Award, Users, BookOpenCheck } from "lucide-react";
import { institutionalGoals, madarsaInfo } from "@/data/madarsaData";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#120A05] islamic-dark-pattern">
      {/* Background Golden Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C9B38D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1A0E08] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C9B38D]/15 via-[#C9B38D]/10 to-transparent border border-[#C9B38D]/40 text-[#D9C7A7] text-xs sm:text-sm font-semibold backdrop-blur-md mb-10 sm:mb-14 shadow-sm">
            
            <span className="font-urdu">تعارف و اغراض و مقاصد</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-urdu font-bold text-white mb-5 leading-[1.7] pt-2">
            علومِ آلِ محمدؑ کا امین اور <span className="text-[#C9B38D]">فکری رہنمائی کا مرکز</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-5 shadow-[0_0_12px_rgba(201,179,141,0.4)]" />

          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] max-w-3xl mx-auto font-normal">
            مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) دینِ اسلام کی سربلندی، عقائدِ حقہ کی ترویج، اور نسلِ نو کو جدید تقاضوں کے مطابق باعمل مسلمان بنانے کے لیے کوشاں ہے۔
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Madrasa Campus Photo with Champagne Gold Frame) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              <div className="bg-[#1A0E08] rounded-[26px] p-2.5 overflow-hidden">
                <div className="relative h-96 sm:h-[460px] rounded-[20px] overflow-hidden group">
                  <Image
                    src="/images/hero-madarsa.jpg"
                    alt="مدرسہ صاحب الزمان کیمپس عمارت"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent opacity-90" />
                  
                  {/* Overlay Tag */}
                  <div className="absolute bottom-20 right-4 left-4 text-right">
                    <span className="bg-white text-[#120A05] border border-[#C9B38D] text-xs font-bold font-urdu px-3.5 py-1 rounded-full shadow-md">
                      کیمپس مدرسہ و جامع مسجد
                    </span>
                    <h3 className="text-lg font-bold text-white font-urdu mt-2 drop-shadow-md">
                      احسن آباد 3، گلزار ہجری، کراچی
                    </h3>
                  </div>
                </div>

                {/* Hadith Quote Card */}
                <div className="relative -mt-14 mx-2 bg-gradient-to-b from-[#22130B]/95 to-[#120A05]/95 border border-[#C9B38D]/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-center">
                  <p className="text-xs sm:text-sm font-arabic text-amber-100 leading-[2.2]" dir="rtl">
                    &ldquo;مَنْ تَعَلَّمَ الْعِلْمَ وَعَمِلَ بِهِ وَعَلَّمَ لِلَّهِ دُعِيَ فِي مَلَكُوتِ السَّمَاوَاتِ عَظِيمًا&rdquo;
                  </p>
                  <p className="text-[11px] text-[#C9B38D] font-urdu font-medium mt-1.5">
                    — امام جعفر صادق علیہ السلام (اصولِ کافی)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Institutional Goals (ادارہ کے اہداف) */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9B38D] font-urdu block mb-1">
                ادارہ کے اہداف و ترجیحات
              </span>
              <h3 className="text-2xl sm:text-3xl font-urdu font-bold text-white">
                ہماری بنیادی تعلیمی و تربیتی پالیسی
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {institutionalGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/20 hover:border-[#C9B38D]/70 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(201,179,141,0.15)] flex gap-3.5 items-start group hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2C190F] border border-[#C9B38D]/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#C9B38D] transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#C9B38D] group-hover:text-[#120A05] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-urdu font-bold text-white mb-1 group-hover:text-[#D9C7A7] transition-colors">
                      {goal.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300/90 font-urdu leading-[2.2] sm:leading-[2.3]">
                      {goal.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Badges Strip in White & Dull Gold */}
            <div className="pt-2 grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/25 hover:border-[#C9B38D]/50 text-center transition">
                <Shield className="w-5 h-5 text-[#C9B38D] mx-auto mb-1.5" />
                <span className="text-xs font-urdu font-semibold text-white">حکومتی و حوزوی الحاق</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/25 hover:border-[#C9B38D]/50 text-center transition">
                <BookCheck className="w-5 h-5 text-[#C9B38D] mx-auto mb-1.5" />
                <span className="text-xs font-urdu font-semibold text-white">معیاری تعلیمی نصاب</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/25 hover:border-[#C9B38D]/50 text-center transition">
                <Heart className="w-5 h-5 text-[#C9B38D] mx-auto mb-1.5" />
                <span className="text-xs font-urdu font-semibold text-white">مکمل فلاحی نظام</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
