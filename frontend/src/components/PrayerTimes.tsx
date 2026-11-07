"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, Calendar, Sun, Moon, Bell } from "lucide-react";

export default function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      setCurrentDate(now.toLocaleDateString("ur-PK", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const prayers = [
    { name: "فجر", nameEng: "Fajr", iqamah: "5:50 AM", azan: "5:20 AM", icon: Moon },
    { name: "ظہر", nameEng: "Zuhr", iqamah: "1:30 PM", azan: "1:00 PM", icon: Sun },
    { name: "عصر", nameEng: "Asr", iqamah: "5:15 PM", azan: "4:45 PM", icon: Sun },
    { name: "مغرب", nameEng: "Maghrib", iqamah: "6:55 PM", azan: "6:35 PM", icon: Moon },
    { name: "عشاء", nameEng: "Isha", iqamah: "8:30 PM", azan: "8:00 PM", icon: Moon },
  ];

  return (
    <section id="prayer-times" className="py-24 bg-[#1A0E08] islamic-navy-pattern relative">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white mb-4 leading-relaxed">
            اوقاتِ باجماعت <span className="text-[#C9B38D]">نماز و عبادات</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
          <p className="text-base sm:text-lg text-stone-300 font-urdu leading-relaxed max-w-2xl mx-auto">
            مدرسہ اور جامع مسجد صاحب الزمان (عج) میں باجماعت نمازوں، اذان اور ہفتہ وار دعاؤں کے مقررہ اوقات۔
          </p>
        </div>

        {/* Featured Prayer Times Royal Card in Champagne Gold Frame */}
        <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          <div className="relative rounded-[30px] overflow-hidden bg-gradient-to-b from-[#1E110A] to-[#120A05] text-white p-6 sm:p-10">
            
            {/* Background Mosque Domes Wallpaper with Overlay */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <Image
                src="/images/layout/prayer-bg.jpg"
                alt="مسجد گنبد پس منظر"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/85 to-[#120A05]/90" />
            </div>

            <div className="relative z-10">
              {/* Header: Madarsa Prayer Center */}
              <div className="text-center mb-6">
                <span className="text-xs sm:text-sm tracking-widest uppercase text-[#C9B38D] font-urdu font-bold block">
                  مدرسہ و جامع مسجد صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف)
                </span>
                <h3 className="text-lg sm:text-2xl font-urdu font-bold text-white mt-1">
                  احسن آباد 3، گلزار ہجری، اسکیم 33، کراچی — اوقاتِ پنجگانہ
                </h3>
              </div>

              {/* Central Clock & Highlights Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 my-8">
                
                {/* Right Box (Jummah Prayer) in RTL */}
                <div className="order-2 md:order-1 flex justify-center md:justify-start">
                  <div className="w-full max-w-[220px] rounded-2xl bg-[#1A0E08]/90 border border-[#C9B38D]/20 hover:border-[#C9B38D]/40 p-4 text-center backdrop-blur-md shadow-lg transition">
                    <span className="text-xs font-urdu font-bold text-[#C9B38D] block mb-1">
                      نمازِ جمعۃ المبارک
                    </span>
                    <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white" dir="ltr">
                      1:00 PM
                    </div>
                    <div className="text-[11px] text-stone-400 mt-1" dir="ltr">
                      خطبہ و اذان: 12:30 PM
                    </div>
                  </div>
                </div>

                {/* Big Digital Clock (Center) */}
                <div className="order-1 md:order-2 text-center">
                  <div className="inline-block py-2.5 px-8 rounded-3xl bg-[#120A05]/90 border border-[#C9B38D]/50 backdrop-blur-md shadow-[0_0_35px_rgba(201,179,141,0.25)]">
                    <div className="text-4xl sm:text-6xl md:text-7xl font-bold font-mono tracking-wider text-[#C9B38D] drop-shadow-md" dir="ltr">
                      {currentTime || "12:21:00"}
                    </div>
                  </div>
                  <div className="text-sm sm:text-base text-stone-300 mt-3 font-urdu font-medium flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9B38D]" />
                    <span>{currentDate || "کراچی وقت"}</span>
                    <span className="text-stone-600">•</span>
                    <span className="text-[#C9B38D] font-arabic">باجماعت نماز کا وقت</span>
                  </div>
                </div>

                {/* Left Box (Weekly Dua) */}
                <div className="order-3 flex justify-center md:justify-end">
                  <div className="w-full max-w-[220px] rounded-2xl bg-[#1A0E08]/90 border border-[#C9B38D]/20 hover:border-[#C9B38D]/40 p-4 text-center backdrop-blur-md shadow-lg transition">
                    <span className="text-xs font-urdu font-bold text-[#C9B38D] block mb-1">
                      دعائے توسل و کمیل
                    </span>
                    <div className="text-base sm:text-lg font-urdu font-bold text-white">
                      شبِ جمعہ
                    </div>
                    <div className="text-[11px] text-stone-400 font-urdu mt-1">
                      بعد نمازِ مغربین
                    </div>
                  </div>
                </div>

              </div>

              {/* 5 Daily Prayers Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-8 pt-6 border-t border-[#C9B38D]/20">
                {prayers.map((prayer, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-gradient-to-b from-[#1E110A]/80 to-[#120A05]/90 hover:bg-[#22130B] border border-[#C9B38D]/20 hover:border-[#C9B38D]/60 p-4 text-center transition-all duration-300 hover:-translate-y-1 shadow-md group"
                  >
                    <div className="text-xs text-stone-400 uppercase tracking-wider font-sans mb-1" dir="ltr">
                      {prayer.nameEng}
                    </div>
                    <div className="text-lg sm:text-xl font-urdu font-bold text-[#C9B38D]">
                      {prayer.name}
                    </div>
                    <div className="my-2 py-1 px-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white font-mono text-base sm:text-lg font-bold" dir="ltr">
                      {prayer.iqamah}
                    </div>
                    <div className="text-[11px] text-stone-400" dir="ltr">
                      اذان: {prayer.azan}
                    </div>
                  </div>
                ))}
              </div>

              {/* Note banner */}
              <div className="mt-6 text-center text-xs font-urdu text-stone-300 flex items-center justify-center gap-2">
                <Bell className="w-3.5 h-3.5 text-[#C9B38D]" />
                <span>تمام نمازیں جامع مسجد صاحب الزمان (عج) میں اپنے مقررہ وقت پر باجماعت ادا کی جاتی ہیں۔</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
