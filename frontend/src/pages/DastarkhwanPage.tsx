import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";
import { api } from "@/services/api";
import { HeartHandshake, ShieldCheck, Heart, ArrowDown, BookOpen } from "lucide-react";

export default function DastarkhwanPage() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [homeData, setHomeData] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [resHome, resSettings] = await Promise.all([
          api.homepage.get(),
          api.settings.get(),
        ]);
        if (resHome.success && resHome.data) {
          setHomeData(resHome.data);
        }
        if (resSettings.success && resSettings.data) {
          setSettings(resSettings.data);
        }
      } catch (err) {
        console.error("Failed to load page data:", err);
      }
    };
    fetchData();
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#120A05] text-[#FAF7F2] font-urdu selection:bg-[#C9B38D] selection:text-[#120A05]">
      {/* 1. Navbar */}
      <Navbar
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenDonation={() => handleScrollToSection("donation-accounts")}
        onOpenContact={() => handleScrollToSection("contact")}
      />

      {/* 2. Welfare & Donations Dedicated Hero Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#1E110A] via-[#160D07] to-[#120A05] border-b border-[#C9B38D]/25">
        {/* Background glow and ambient pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,179,141,0.18)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,185,0,0.1)_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#D9C7A7] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg shadow-black/40">
            <HeartHandshake className="w-4 h-4 text-[#C9B38D]" />
            <span>فلاحی و تبرکاتی خدمات</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2] select-none">
            فلاحی و تبرکاتی خدمات اور تعاون
          </h1>

          <p className="text-lg sm:text-2xl text-[#D9C7A7] font-bold max-w-3xl mx-auto leading-relaxed">
            مدرسہ صاحب الزمانؑ کے دینی، تعلیمی اور فلاحی شعبہ جات میں معاونت
          </p>

          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            علومِ آلِ محمدؑ کے طلباء کی دینی و عصری تعلیم، کتب خانہ، ہاسٹل، اور فلاحی امور میں آپ کا مخلصانہ تعاون صدقہ جاریہ اور آخرت کا بہترین ذخیرہ ہے۔
          </p>

          {/* Key Stat Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <span className="px-4 py-2 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/35 text-[#D9C7A7] text-xs sm:text-sm font-bold shadow-md">
              ✨ صدقہ جاریہ و نصرتِ دین
            </span>
            <span className="px-4 py-2 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/35 text-[#D9C7A7] text-xs sm:text-sm font-bold shadow-md">
              📚 دینی طلباء کی مکمل کفالت
            </span>
            <span className="px-4 py-2 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/35 text-[#D9C7A7] text-xs sm:text-sm font-bold shadow-md">
              🛡️ ۱۰۰٪ شرعی و شفاف مالیاتی نظام
            </span>
          </div>

          {/* Quick Jump Action Button */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => handleScrollToSection("donation-accounts")}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#D9C7A7] to-[#C9B38D] text-[#120A05] font-bold text-base shadow-[0_10px_25px_rgba(201,179,141,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-[#120A05]" />
              <span>بینک اکاؤنٹس و آن لائن تعاون</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Complete Donation Section (Bank Accounts, JazzCash, EasyPaisa, Slips) */}
      <div id="donation-accounts">
        <DonationSection
          header={homeData?.sections?.donations || {
            badge: "تعاون و نصرتِ دین",
            title: "فلاحی و تبرکاتی خدمات اور تعاون",
            subtitle: "سہمِ امامؑ، سہمِ سادات، کفالتِ طلباء اور تعمیراتی منصوبوں میں اپنا حصہ ڈالیں"
          }}
          donationInfo={homeData?.donationInfo}
        />
      </div>

      {/* 5. Footer */}
      <Footer settings={settings} />

      {/* 6. Admission Modal */}
      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />
    </div>
  );
}
