"use client";

import React from "react";
import Image from "next/image";
import { Heart, Award, BookOpen, Quote, Star, CheckCircle2 } from "lucide-react";

interface FounderSectionProps {
  founder?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    quote?: string;
    features?: Array<{
      id?: string;
      title: string;
      desc: string;
    }>;
  };
}

export default function FounderSection({ founder }: FounderSectionProps = {}) {
  const achievements = founder?.features && founder.features.length > 0
    ? founder.features
    : [
        {
          title: "مدرسہ کا قیام و سنگِ بنیاد (۱۹۹۸ء)",
          desc: "محدود وسائل کے باوجود خلوصِ نیت سے علومِ آلِ محمدؑ کی تدریس کے لیے مدرسہ صاحب الزمان کی بنیاد رکھی。"
        },
        {
          title: "تزکیہ نفس و اخلاقی تربیت کی ترجیح",
          desc: "صرف کتابیں پڑھانے کے بجائے طلبہ کے دلوں میں عشقِ خدا، ولایتِ اہل بیتؑ اور احترامِ انسانیت بیدار کیا۔"
        },
        {
          title: "دسترخوانِ امام زمانہؑ کی ابتدا",
          desc: "دینی طلبہ اور نادار مومنین کی کفالت کے لیے بلا تفریق کھانا اور اقامت فراہم کرنے کا فلاحی مشن شروع کیا۔"
        },
        {
          title: "سینکڑوں فارغ التحصیل علماء و مربیان",
          desc: "ان کے تربیت یافتہ شاگرد آج ملک و بیرونِ ملک محراب و منبر اور علمی ریسرچ کے ذریعے دینِ حق کی خدمت کر رہے ہیں۔"
        }
      ];

  const badgeText = founder?.badge || "مؤسس و بانی";
  const titleText = founder?.title || "مؤسس و بانیِ ادارہ — باباجانؒ";
  const subtitleText = founder?.subtitle || "حضرت علامہ سید کاظم موسویؒ (باباجان) کا پرخلوص وژن، انتھک محنت، اور علومِ آلِ محمدؑ کے فروغ کے لیے تاحیات مقدس خدمات کا اعتراف";
  const quoteText = founder?.quote || "دینِ آلِ محمدؑ کی خدمت، یتیموں اور غریب بچوں کی کردار سازی، اور خلوصِ نیت کے ساتھ علم کا فروغ ہی ہماری دنیا اور آخرت کی نجات ہے۔";
  const imageUrl = founder?.image || "/images/faculty/founder-scholar.jpg";

  return (
    <section id="founder" className="py-20 sm:py-28 bg-[#160C07] islamic-navy-pattern relative overflow-hidden border-b border-[#C9B38D]/20" dir="rtl">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-[#C9B38D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-[#C9B38D]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
            <span className="text-[#C9B38D] text-sm">❖</span>
            <span className="font-urdu">{badgeText}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
            {titleText}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
            {subtitleText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[32px] shadow-[0_25px_65px_rgba(0,0,0,0.9)]">
              <div className="bg-[#1A0E08] rounded-[30px] p-3 overflow-hidden">
                <div className="relative h-96 sm:h-[480px] rounded-[24px] overflow-hidden group">
                  <Image
                    src={imageUrl}
                    alt={titleText}
                    fill
                    className="object-cover sepia-[0.25] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/25 to-transparent opacity-90" />

                  <div className="absolute bottom-20 right-5 left-5 text-right z-10">
                    <span className="bg-white text-[#120A05] border border-[#C9B38D] text-xs font-bold font-urdu px-3.5 py-1 rounded-full shadow-md">
                      {badgeText}
                    </span>
                    <h3 className="text-xl font-bold text-white font-urdu mt-2 drop-shadow-md">
                      {titleText}
                    </h3>
                  </div>
                </div>

                <div className="relative -mt-14 mx-2 bg-gradient-to-b from-[#24130B]/95 to-[#120A05]/95 border-2 border-[#C9B38D]/50 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-center">
                  <Quote className="w-6 h-6 text-[#C9B38D] mx-auto mb-2 opacity-80" />
                  <p className="text-xs sm:text-sm font-urdu font-medium text-amber-100 leading-[2.2]">
                    &ldquo;{quoteText}&rdquo;
                  </p>
                  <p className="text-[11px] text-[#C9B38D] font-urdu font-bold mt-2">
                    — فرموداتِ باباجانؒ
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-right">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9B38D] font-urdu block mb-2">
                سیرت، اخلاص اور تاریخی کارنامے
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-urdu font-bold text-white leading-[1.7]">
                ایک درویش صفت عالم کا لازوال مشن
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent rounded-full my-3 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
              <p className="text-sm sm:text-base text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] font-medium">
                حضرت علامہ سید کاظم موسویؒ (باباجان) نے ۱۹۹۸ء میں جب اس مدرسے کا سنگِ بنیاد رکھا تو وسائل انتہائی محدود تھے، مگر ان کا توکل علی اللہ اور خلوصِ قلب پہاڑوں سے زیادہ مضبوط تھا۔ انہوں نے اپنی تمام تر ذاتی توانائیاں اور وقت اس ادارے کے قیام، طلبہ کی رہائش اور مفت تعلیم کے لیے وقف کر دیا۔
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-b from-[#1E110A] via-[#160B06] to-[#100703] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2.5 text-sm font-urdu font-bold text-white mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.2]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[#140A05] border border-[#C9B38D]/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#24130A] border border-[#C9B38D]/30 flex items-center justify-center text-[#C9B38D] shrink-0">
                  <Star className="w-5 h-5 fill-[#C9B38D]" />
                </div>
                <div>
                  <h4 className="text-sm font-urdu font-bold text-white">
                    باباجانؒ کا لگایا ہوا پودا آج ایک تناور درخت ہے
                  </h4>
                  <p className="text-xs text-stone-400 font-urdu mt-0.5">
                    ان کے مشن کو موجودہ انتظامیہ اور اساتذہ اسی جذبے کے ساتھ آگے بڑھا رہے ہیں
                  </p>
                </div>
              </div>

              <span className="text-xs font-urdu font-bold text-[#120A05] bg-white border border-[#C9B38D] px-4 py-1.5 rounded-full shrink-0 shadow">
                رحمۃ اللہ علیہ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
