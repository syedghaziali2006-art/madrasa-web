"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  BookOpenCheck,
  Users,
  Award,
  Shield,
  BookCheck,
  Heart,
  ChevronLeft,
  ArrowLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";
import { api } from "@/services/api";

const iconMap: Record<string, any> = {
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  BookOpenCheck,
  Users,
  Award,
  Shield,
  BookCheck,
  Heart
};

const defaultPolicyData = {
  header: {
    badge: "تعارف اور اغراض و مقاصد",
    title: "علومِ آلِ محمدؑ کا امین اور فکری رہنمائی کا مرکز",
    subtitle: "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) دینِ اسلام کی سربلندی، عقائدِ حقہ کی ترویج، اور نسلِ نو کو جدید تقاضوں کے مطابق باعمل مسلمان بنانے کے لیے کوشاں ہے۔"
  },
  stats: [
    { id: "stat-1", title: "حکومتی و حوزوی الحاق", desc: "منظور شدہ باضابطہ اسناد", icon: "Shield" },
    { id: "stat-2", title: "معیاری تعلیمی نصاب", desc: "دینی و عصری علوم کا امتزاج", icon: "BookCheck" },
    { id: "stat-3", title: "مکمل فلاحی نظام", desc: "مفت رہائش، طعام و کتب", icon: "Heart" }
  ],
  campusCard: {
    tag: "کیمپس مدرسہ و جامع مسجد",
    address: "احسن آباد 3، گلزار ہجری، کراچی",
    description: "وسیع و عریض تعلیمی، روحانی و فلاحی کیمپس",
    image: "/images/hero-banner.webp"
  },
  hadith: {
    arabic: "مَنْ تَعَلَّمَ الْعِلْمَ وَعَمِلَ بِهِ وَعَلَّمَ لِلَّهِ دُعِيَ فِي مَلَكُوتِ السَّمَاوَاتِ عَظِيمًا",
    urdu: "جو علم حاصل کرے، اس پر عمل کرے اور اللہ کی خاطر دوسروں کو سکھائے، وہ آسمانوں کی بادشاہت میں عظیم پکارا جاتا ہے۔",
    reference: "— امام جعفر صادق علیہ السلام (اصولِ کافی)"
  },
  sectionHeader: {
    badge: "ادارہ کے اہداف و ترجیحات",
    title: "ہماری بنیادی تعلیمی اور تربیتی پالیسی",
    description: "ادارے کا مقصد صرف کتب پڑھانا نہیں بلکہ طالب علم کے فکر، عمل، کردار اور اخلاق کو اسوہ معصومینؑ کے مطابق نکھارنا ہے۔"
  },
  policyGoals: [
    {
      id: "goal-1",
      badge: "بنیادی عقائد",
      title: "بچوں کے عقائد پر خصوصی توجہ",
      desc: "توحید، عدل، نبوت، امامت اور قیامت کے بنیادی اور گہرے عقائد کی مدلل اور دلنشین تفہیم تاکہ بچہ عقائدی لحاظ سے پختہ اور ثابت قدم رہے۔",
      icon: "ShieldCheck"
    },
    {
      id: "goal-2",
      badge: "اخلاق و کردار",
      title: "بچوں کی اخلاقی تربیت پر خصوصی توجہ",
      desc: "تزکیہ نفس، احترامِ والدین، سچائی، امانت داری، ایثار اور سیرتِ معصومینؑ کے مطابق مثالی اخلاق و کردار سازی۔",
      icon: "HeartHandshake"
    },
    {
      id: "goal-3",
      badge: "اہلِ علم اساتذہ",
      title: "جدید تقاضوں سے ہم آہنگ تربیت یافتہ اساتذہ",
      desc: "حوزاتِ علمیہ سے فارغ التحصیل اور جدید پیڈاگوجی کے ماہر شفیق و باصلاحیت اساتذہ کرام جو انفرادی توجہ اور شفقت سے تدریس کرتے ہیں۔",
      icon: "GraduationCap"
    },
    {
      id: "goal-4",
      badge: "دینی و عصری سنگم",
      title: "دینی تعلیم کے ساتھ عصری علوم کی تعلیم",
      desc: "قرآنی و حوزوی علوم کے ساتھ ساتھ انگلش، سائنس، ریاضی اور کمپیوٹر کی متوازن تدریس تاکہ طالب علم دونوں جہانوں میں سرخرو ہو۔",
      icon: "BookOpenCheck"
    },
    {
      id: "goal-5",
      badge: "باہمی رابطہ",
      title: "والدین کے ساتھ مکمل ہم آہنگی",
      desc: "بچے کی فکری، اخلاقی اور تعلیمی ترقی پر والدین کے ساتھ مسلسل اور باقاعدہ رابطہ، مشاورت اور تربیتی سیشنز کا اہتمام۔",
      icon: "Users"
    },
    {
      id: "goal-6",
      badge: "۵ سالہ نصاب",
      title: "معیاری نصابِ تعلیم",
      desc: "پانچ سالہ منظم اور ہمہ جہت تعلیمی نصاب جو حوزوی علوم قم و نجف کے روایتی دروس اور معاصر تعلیمی اصولوں کا شاہکار امتزاج ہے۔",
      icon: "Award"
    }
  ],
  admissionCallout: {
    title: "تعلیمی سال ۲۰۲۶ - ۲۰۲۷ کے لیے داخلے جاری ہیں",
    desc: "چھٹی جماعت پاس طلبہ جن کی عمر ۱۱ تا ۱۶ سال ہو، ٹیسٹ و انٹرویو کے لیے اپلائی کر سکتے ہیں۔",
    btnText: "آن لائن داخلہ فارم"
  }
};

export default function PolicyPage() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [policyData, setPolicyData] = useState(defaultPolicyData);

  useEffect(() => {
    let isMounted = true;
    api.policy
      .get()
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setPolicyData((prev) => ({
            ...prev,
            ...res.data,
            header: { ...prev.header, ...res.data.header },
            campusCard: { ...prev.campusCard, ...res.data.campusCard },
            hadith: { ...prev.hadith, ...res.data.hadith },
            sectionHeader: { ...prev.sectionHeader, ...res.data.sectionHeader },
            admissionCallout: { ...prev.admissionCallout, ...res.data.admissionCallout },
            stats: res.data.stats || prev.stats,
            policyGoals: res.data.policyGoals || prev.policyGoals,
          }));
        }
      })
      .catch((err) => {
        console.error("Policy content load error:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#120A05] text-[#FAF7F2] selection:bg-[#C9B38D] selection:text-[#120A05]" dir="rtl">
      <Navbar
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenDonation={() => {
          window.location.href = "/#donation";
        }}
        onOpenContact={() => {
          window.location.href = "/#contact";
        }}
      />

      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#120A05] border-b border-[#C9B38D]/20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#C9B38D]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#1A0E08] rounded-full blur-[130px] pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-urdu font-bold text-white leading-[1.7] mb-6">
            {policyData.header.title}
          </h1>

          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full mb-6 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] max-w-3xl mx-auto font-medium">
            {policyData.header.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-[#C9B38D]/20">
            {policyData.stats.map((st: any, idx: number) => {
              const IconComp = iconMap[st.icon] || Shield;
              return (
                <div key={st.id || idx} className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25">
                  <IconComp className="w-5 h-5 text-[#C9B38D] mx-auto mb-1.5" />
                  <span className="text-xs font-urdu font-bold text-white block">{st.title}</span>
                  <span className="text-[11px] font-urdu text-stone-300 mt-0.5 block">{st.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] sticky top-28">
                <div className="bg-[#1A0E08] rounded-[28px] p-3 overflow-hidden">
                  <div className="relative h-96 sm:h-[460px] rounded-[22px] overflow-hidden group">
                    <Image
                      src={policyData.campusCard.image || "/images/hero-banner.webp"}
                      alt={policyData.campusCard.tag}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent opacity-90" />

                    <div className="absolute bottom-20 right-5 left-5 text-right z-10">
                      <span className="bg-white text-[#120A05] border border-[#C9B38D] text-xs font-bold font-urdu px-4 py-1.5 rounded-full shadow-md">
                        {policyData.campusCard.tag}
                      </span>
                      <h3 className="text-xl font-bold text-white font-urdu mt-2.5 drop-shadow-md">
                        {policyData.campusCard.address}
                      </h3>
                      <p className="text-xs text-stone-200 font-urdu mt-1">
                        {policyData.campusCard.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative -mt-14 mx-2 bg-gradient-to-b from-[#24130B]/95 to-[#120A05]/95 border-2 border-[#C9B38D]/50 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-center">
                    <p className="text-sm sm:text-base font-arabic font-bold text-[#EFE5D2] leading-[2.2]" dir="rtl">
                      &ldquo;{policyData.hadith.arabic}&rdquo;
                    </p>
                    <p className="text-xs text-stone-300 font-urdu mt-2 leading-[2.0]">
                      &ldquo;{policyData.hadith.urdu}&rdquo;
                    </p>
                    <p className="text-[11px] text-[#C9B38D] font-urdu font-bold mt-2">
                      {policyData.hadith.reference}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-right">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9B38D] font-urdu block mb-2">
                  {policyData.sectionHeader.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-urdu font-bold text-white leading-[2.1] sm:leading-[2.2]">
                  {policyData.sectionHeader.title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent rounded-full my-3.5 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
                <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.4]">
                  {policyData.sectionHeader.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {policyData.policyGoals.map((goal: any) => {
                  const IconComp = iconMap[goal.icon] || ShieldCheck;
                  return (
                    <div
                      key={goal.id}
                      className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#1E110A] via-[#160B06] to-[#100703] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.25)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3.5">
                          <span className="px-3 py-1 rounded-full bg-[#24130A] text-[11px] font-urdu font-bold text-[#C9B38D] border border-[#C9B38D]/30">
                            {goal.badge}
                          </span>
                          <div className="w-10 h-10 rounded-2xl bg-[#120A05] border border-[#C9B38D]/40 flex items-center justify-center text-[#C9B38D] group-hover:scale-110 transition-transform">
                            <IconComp className="w-5 h-5 text-[#C9B38D]" />
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-urdu font-bold text-white mb-2.5 leading-[2.1] group-hover:text-[#D9C7A7] transition-colors">
                          {goal.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.35]">
                          {goal.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1A0E08] via-[#24130A] to-[#1A0E08] border border-[#C9B38D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 shadow-xl text-center sm:text-right">
                <div>
                  <h4 className="font-urdu font-bold text-white text-base sm:text-lg">
                    {policyData.admissionCallout.title}
                  </h4>
                  <p className="font-urdu text-xs sm:text-sm text-stone-300 mt-1 leading-[2.0]">
                    {policyData.admissionCallout.desc}
                  </p>
                </div>

                <button
                  onClick={() => setIsAdmissionOpen(true)}
                  className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-sm shrink-0 shadow-lg transition active:scale-95 cursor-pointer"
                >
                  {policyData.admissionCallout.btnText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />
    </div>
  );
}
