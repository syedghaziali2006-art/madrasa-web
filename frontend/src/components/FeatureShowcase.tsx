"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, GraduationCap, Users2, CheckCircle2 } from "lucide-react";

export default function FeatureShowcase() {
  const features = [
    {
      icon: BookOpen,
      title: "دینی و علمی رسائل و کتب کی اشاعت",
      titleEng: "Publishing Islamic Magazines",
      desc: "قرآنی معارف، فرامینِ چہاردہ معصومین علیہم السلام اور فقہی مسائل پر مستند کتب، تحقیقی مقالات اور ماہانہ علمی رسائل کی اشاعت۔",
    },
    {
      icon: GraduationCap,
      title: "جامع حوزوی نصاب و عصری تعلیم",
      titleEng: "Hawza Studies & Modern Education",
      desc: "درسِ نظامی، فقہ استدلالی، اصول، عربی ادب کے ساتھ ساتھ کمپیوٹر سائنس، آئی ٹی اور انگلش لینگویج کے الحاق شدہ تعلیمی کورسز۔",
    },
    {
      icon: Users2,
      title: "شعبہ خواتین و خاندانی رہنمائی",
      titleEng: "Women Campus & Family Guidance",
      desc: "جامعہ سیدہ فاطمۃ الزہراء (س) کے زیر اہتمام خواتین کے لیے مکمل شرعی پردے میں دینی تعلیم، تربیتِ اولاد اور خاندانی مشاورت۔",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white islamic-subtle-pattern relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Side 1: Two Tall Photos side-by-side */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Photo 1 */}
              <div className="relative h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden shadow-lg border-2 border-amber-100 group">
                <Image
                  src="/images/layout/mosque-arches.jpg"
                  alt="مسجد و حوزہ اندرونی محراب"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-white text-right">
                  <span className="text-xs bg-[#E5A93C] font-semibold px-2.5 py-1 rounded-full">
                    محراب و حوزہ
                  </span>
                </div>
              </div>

              {/* Photo 2 (Offset downwards for artistic visual rhythm) */}
              <div className="relative h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden shadow-lg border-2 border-amber-100 translate-y-6 sm:translate-y-8 group">
                <Image
                  src="/images/layout/lattice-prayer.jpg"
                  alt="مسجد و عبادت گاہ جالی"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-white text-right">
                  <span className="text-xs bg-slate-800 font-semibold px-2.5 py-1 rounded-full">
                    روحانی ماحول
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side 2: 3 Feature Items with Golden Circular Icons */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8 text-right">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#E5A93C] text-xs font-semibold mb-3 border border-amber-200">
                
                <span>ہماری بنیادی ترجیحات</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight font-heading">
                علمِ نافع اور اخلاقِ فاضلہ کی ترویج
              </h2>
              <div className="w-16 h-1 bg-[#E5A93C] rounded-full my-3" />
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) اپنے علمی و فلاحی ونگز کے ذریعے معاشرے میں مثبت فکری تبدیلی اور دینی بیداری کے لیے متحرک ہے۔
              </p>
            </div>

            {/* List of 3 features */}
            <div className="space-y-6 pt-2">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-100"
                  >
                    {/* Golden Circular Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#E5A93C] text-white flex items-center justify-center shrink-0 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div>
                      <span className="text-[11px] text-gray-400 uppercase font-sans tracking-wider block" dir="ltr">
                        {item.titleEng}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 font-heading">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
