"use client";

import React from "react";
import Image from "next/image";
import { dastarkhwanDetails, facilitiesList } from "@/data/madarsaData";
import { Utensils, HeartHandshake, Check, Gift, Bed, Gamepad2, Palette, Monitor, CheckCircle2 } from "lucide-react";

interface DastarkhwanProps {
  onOpenDonation: () => void;
}

export default function DastarkhwanSection({ onOpenDonation }: DastarkhwanProps) {
  const facilityIcons = [
    { name: "بہترین طعام", sub: "دسترخوانِ امام زمانہؑ سے ۳ وقت با برکت کھانا", icon: Utensils },
    { name: "بہترین ہاسٹل", sub: "کشادہ کمرے، مکمل سکون اور شرعی نظم و ضبط", icon: Bed },
    { name: "ان ڈور گیمز", sub: "طلباء کی جسمانی اور ذہنی نشوونما کے لیے کھیل", icon: Gamepad2 },
    { name: "آرٹ و خطاطی", sub: "اسلامی خطاطی، خوشخطی اور فنی تربیت", icon: Palette },
    { name: "کمپیوٹر لیب", sub: "انٹرنیٹ، ایم ایس آفس اور آئی ٹی اسکلز", icon: Monitor },
  ];

  return (
    <section id="facilities" className="py-24 relative overflow-hidden bg-[#120A05] islamic-dark-pattern">
      <div id="dastarkhwan" className="sr-only" />
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#C9B38D]/15 via-[#C9B38D]/10 to-transparent border border-[#C9B38D]/40 text-[#D9C7A7] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
            
            <span className="font-urdu">سہولیات و خدماتِ عامہ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white mb-4 leading-relaxed">
            دسترخوانِ امام زمانہ <span className="text-[#C9B38D]">(عجل اللہ تعالیٰ فرجہ الشریف)</span> و سہولیات
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.4)]" />
          <p className="text-base sm:text-lg text-stone-300 font-urdu leading-relaxed max-w-2xl mx-auto">
            علومِ آلِ محمدؑ کے تشنگان، طلباء اور محتاجین کے لیے روزانہ ۳۶۵ دن باوقار اور با برکت طعام کا مستقل انتظام۔
          </p>
        </div>

        {/* 5 Facilities Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {facilityIcons.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/95 backdrop-blur-xl border border-[#C9B38D]/20 hover:border-[#C9B38D]/60 rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2C190F] border border-[#C9B38D]/40 mx-auto flex items-center justify-center mb-3 group-hover:bg-[#C9B38D] transition-colors">
                  <Icon className="w-6 h-6 text-[#C9B38D] group-hover:text-[#120A05] transition-colors" />
                </div>
                <h4 className="text-sm sm:text-base font-urdu font-bold text-white mb-1 group-hover:text-[#D9C7A7] transition-colors">
                  {fac.name}
                </h4>
                <p className="text-[11px] text-stone-400 font-urdu leading-tight">
                  {fac.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Dastarkhwan Highlight Card in Champagne Gold Frame */}
        <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-gradient-to-b from-[#22130B] to-[#120A05] rounded-[30px] p-6 sm:p-10 backdrop-blur-xl">
            
            {/* Left Column: Dastarkhwan Real Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-[430px] rounded-[22px] overflow-hidden border border-[#C9B38D]/40 shadow-2xl group">
                <Image
                  src="/images/dastarkhwan.jpg"
                  alt="دسترخوان امام زمانہ مدرسہ صاحب الزمان"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent opacity-90" />
                
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-gradient-to-b from-[#1E110A]/95 to-[#120A05]/95 border border-[#C9B38D]/40 text-center backdrop-blur-md shadow-xl">
                  <p className="text-xs sm:text-sm text-amber-100 font-arabic leading-relaxed" dir="rtl">
                    &ldquo;أَفْضَلُ الصَّدَقَةِ إِشْبَاعُ كَبِدٍ جَائِعَةٍ&rdquo;
                  </p>
                  <p className="text-[11px] text-[#C9B38D] font-urdu font-medium mt-1">
                    افضل ترین صدقہ بھوکے کو کھانا کھلانا ہے — رسول اللہ ﷺ
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Info & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-urdu font-bold px-3.5 py-1 rounded-full bg-[#2C190F] text-[#D9C7A7] border border-[#C9B38D]/40">
                  روزانہ ۳۶۵ دن فعال
                </span>
                <h3 className="text-2xl sm:text-3xl font-urdu font-bold text-white mt-3 mb-3">
                  طعام و تبرک میں شرکت اور برکات کا حصول
                </h3>
                <p className="text-sm sm:text-base text-stone-300 font-urdu leading-relaxed">
                  مدرسہ صاحب الزمان کے زیرِ اہتمام دسترخوان امام زمانہ (عج) سال کے ۳۶۵ دن بغیر کسی تعطل کے جاری رہتا ہے۔ یہاں زیر تعلیم طلباء، اساتذہ اور ضرورت مند افراد کے لیے حفظان صحت کے اصولوں کے مطابق بہترین غذائیت بخش کھانا ۳ وقت تیار کیا جاتا ہے۔
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {dastarkhwanDetails.map((detail, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#1A0E08]/90 border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 flex items-start gap-3 transition">
                    <div className="w-8 h-8 rounded-lg bg-[#2C190F] border border-[#C9B38D]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#C9B38D]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-urdu font-bold text-white mb-0.5">{detail.title}</h4>
                      <p className="text-xs text-stone-300/80 font-urdu leading-relaxed">{detail.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenDonation}
                  className="inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-7 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base shadow-lg transition-all duration-300 active:scale-95"
                >
                  <HeartHandshake className="w-4 h-4 text-[#8C6D3F]" />
                  <span>دسترخوان میں اپنا حصہ شامل کریں</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-urdu text-white bg-[#1A0E08] px-4 py-3 rounded-full border border-[#C9B38D]/25">
                  <Gift className="w-4 h-4 text-[#C9B38D]" />
                  <span>طالب علم کی ماہانہ خوراک و کفالت: ۱۰,۰۰۰ روپے</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
