"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, ZoomIn, X } from "lucide-react";

export default function MosqueActivities() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const activities = [
    {
      id: "congregation",
      title: "باجماعت نماز اور خطباتِ جمعۃ المبارک",
      subtitle: "مدرسہ و جامع مسجد صاحب الزمان (عج)",
      image: "/images/layout/congregation.jpg",
    },
    {
      id: "quran-study",
      title: "طلباء کی روزانہ تلاوت و فہمِ قرآن",
      subtitle: "حفظ و ناظرہ کلاسز",
      image: "/images/layout/quran-study.jpg",
    },
    {
      id: "library",
      title: "مرکزی کتب خانہ اور علمی تحقیق",
      subtitle: "۲۵ ہزار کتب پر مشتمل لائبریری",
      image: "/images/library.jpg",
    },
    {
      id: "dastarkhwan",
      title: "دسترخوانِ امام زمانہؑ کی خدمات",
      subtitle: "روزانہ ۳۶۵ دن با برکت طعام",
      image: "/images/dastarkhwan.jpg",
    },
    {
      id: "sujud-rows",
      title: "شبہائے جمعہ و دعائے توسل و کمیل",
      subtitle: "روحانی و با برکت اجتماعات",
      image: "/images/layout/sujud-rows.jpg",
    },
    {
      id: "women-campus",
      title: "جامعہ سیدہ فاطمہ الزہراء (س)",
      subtitle: "شعبہ خواتین و طالبات",
      image: "/images/women-campus.jpg",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#120A05] islamic-dark-pattern relative">
      <div id="activities" className="sr-only" />
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/80 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
            
            <span className="font-urdu">تصویری گیلری و سرگرمیاں</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white mb-4 leading-relaxed">
            مدرسہ و مسجد کی <span className="text-[#C9B38D]">تصویری جھلکیاں</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
          <p className="text-base sm:text-lg text-stone-300 font-urdu leading-relaxed max-w-2xl mx-auto">
            باجماعت نماز، تدریسِ قرآن، دعاؤں کے اجتماعات، کتب خانہ، اور طلباء کی تعلیمی و فلاحی سرگرمیوں کے چند تصویری مناظر۔
          </p>
        </div>

        {/* 6-Image Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.image)}
              className="relative h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_15px_40px_rgba(201,179,141,0.25)] transition-all duration-500 group bg-[#1A0E08] border border-[#C9B38D]/20 hover:border-[#C9B38D]/70 cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Zoom badge top */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#120A05]/80 text-[#C9B38D] text-xs font-bold p-2.5 rounded-full border border-[#C9B38D]/50 backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-right">
                <span className="text-[11px] font-urdu font-bold text-[#C9B38D] block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-base sm:text-lg font-urdu font-bold text-white group-hover:text-[#C9B38D] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox for Gallery */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-[#120A05]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="self-end mb-3 text-white hover:text-[#C9B38D] text-sm font-urdu font-bold bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full border border-white/20 transition flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>بند کریں</span>
            </button>
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden border border-[#C9B38D]/60 shadow-2xl bg-[#120A05]">
              <Image
                src={activeImage}
                alt="تصویر گیلری بڑا منظر"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
