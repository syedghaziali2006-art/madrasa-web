"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Search, Library, Bookmark, Globe } from "lucide-react";

export default function LibrarySection() {
  const libraryStats = [
    { label: "مطبوعہ کتب", count: "۲۵,۰۰۰+", desc: "فقہ، اصول، حدیث، تاریخ و ادب" },
    { label: "نایاب خطی نسخے", count: "۵۰۰+", desc: "قدیم علماء کے قلمی نوادرات" },
    { label: "ڈیجیٹل مقالات", count: "۱۵,۰۰۰+", desc: "آن لائن رسائی اور پی ڈی ایف" },
    { label: "مطالعہ کے لیے نشستیں", count: "۱۵۰+", desc: "پرسکون اور ایئر کنڈیشنڈ ہال" },
  ];

  return (
    <section id="library" className="py-24 relative overflow-hidden bg-[#120A05] islamic-dark-pattern">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white mb-4 leading-relaxed">
            مرکزی کتب خانہ و <span className="text-[#C9B38D]">ڈیجیٹل لائبریری</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
          <p className="text-base sm:text-lg text-stone-300 font-urdu leading-relaxed max-w-2xl mx-auto">
            محققین، علماء اور تشنگانِ علم کے لیے اسلامی علوم و فنون کا عظیم الشان ذخیرہ۔
          </p>
        </div>

        {/* Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Image with Dull Champagne Gold Gradient Border */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              <div className="bg-[#1A0E08] rounded-[26px] p-2.5 overflow-hidden">
                <div className="relative h-80 sm:h-[450px] rounded-[20px] overflow-hidden group">
                  <Image
                    src="/images/library.jpg"
                    alt="مدرسہ صاحب الزمان لائبریری"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent opacity-85" />
                  <div className="absolute bottom-4 right-4 left-4 p-3.5 bg-gradient-to-b from-[#1E110A]/95 to-[#120A05]/95 border border-[#C9B38D]/40 rounded-xl text-right backdrop-blur-md shadow-lg">
                    <span className="text-xs text-[#C9B38D] font-urdu font-bold block">مرکزی لائبریری ہال</span>
                    <p className="text-xs text-stone-200 font-urdu mt-0.5">کتبِ تفاسیر، فقہ، احادیث اور معاصر اسلامی ریسرچ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info and Stats */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 transition-all duration-300 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white mb-3 flex items-center gap-2.5">
                <Library className="w-6 h-6 text-[#C9B38D]" />
                <span>حوزوی علوم و عصری ریسرچ کا حسین امتزاج</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-300 font-urdu leading-relaxed mb-6">
                ہماری لائبریری میں شیعہ اثنا عشری مکتب فکر کی بنیادی کتب (کتب اربعہ، بحار الانوار، وسائل الشیعہ وغیرہ) کے ساتھ ساتھ کتب اہلسنت، تفاسیر، تاریخ اسلام، اور عصری فلسفہ و کمپیوٹر سائنس پر مشتمل پچیس ہزار سے زائد جلدیں دستیاب ہیں۔
              </p>

              <div className="grid grid-cols-2 gap-3.5">
                {libraryStats.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#1A0E08]/90 border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 transition-colors">
                    <div className="text-2xl font-bold text-[#C9B38D] font-urdu mb-0.5">{item.count}</div>
                    <div className="text-xs font-bold text-white font-urdu mb-0.5">{item.label}</div>
                    <div className="text-[11px] text-stone-400 font-urdu">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/20 flex items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/30 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-[#C9B38D]" />
                </div>
                <div>
                  <h4 className="text-sm font-urdu font-bold text-white">آن لائن ڈیجیٹل کیٹلاگ</h4>
                  <p className="text-xs text-stone-400 font-urdu">گھر بیٹھے کتب کی دستیابی اور ریسرچ مواد تلاش کریں</p>
                </div>
              </div>
              <span className="text-xs font-urdu font-bold text-[#120A05] bg-white border border-[#C9B38D] px-4 py-1.5 rounded-full shrink-0 shadow">
                جلد فعال
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
