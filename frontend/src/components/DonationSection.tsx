"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeartHandshake, ShieldCheck, Check, Copy, Landmark, Sparkles, Gift } from "lucide-react";
import { donationAccounts } from "@/data/madarsaData";

interface DonationSectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  onOpenDonationModal?: () => void;
}

export default function DonationSection({ header, onOpenDonationModal }: DonationSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState("2500");
  const [customAmount, setCustomAmount] = useState("2500");
  const [currency, setCurrency] = useState("PKR");
  const [frequency, setFrequency] = useState("One Time");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [showBankInfo, setShowBankInfo] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const presetAmounts = ["1500", "2500", "5000", "10000", "25000"];

  const handleSelectAmount = (amt: string) => {
    setSelectedAmount(amt);
    setCustomAmount(amt);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBankInfo(true);
  };

  return (
    <section id="donation" className="py-24 bg-[#120A05] islamic-dark-pattern relative">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A0E08]/80 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md mb-10 sm:mb-14 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "صدقہ جاریہ و خیرات"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-urdu font-bold text-white mb-5 leading-[2.1] sm:leading-[2.2] pt-2">
            {header?.title || "اپنا عطیہ اور صدقات پیش کریں"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-5 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />
          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-normal">
            {header?.subtitle || "دینی طلباء کی تعلیم و کفالت، دسترخوانِ امام زمانہؑ، اور کتب خانہ کے امور میں آپ کا مخلصانہ تعاون صدقہ جاریہ اور آخرت کا بہترین ذخیرہ ہے۔"}
          </p>
        </div>

        {/* 2-Column Donation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Column 1: Donation Box Photo & Hadith with Champagne Gold Frame */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              <div className="bg-[#1A0E08] rounded-[26px] p-2.5 overflow-hidden">
                <div className="relative h-[420px] sm:h-[520px] w-full rounded-[20px] overflow-hidden group">
                  <Image
                    src="/images/layout/donation-box.jpg"
                    alt="عطیات و صدقات مدرسہ صاحب الزمان"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/60 to-transparent opacity-95" />
                  
                  <div className="absolute bottom-6 right-6 left-6 text-white text-right space-y-2.5">
                    <span className="text-xs font-urdu font-bold px-3.5 py-1 rounded-full bg-white text-[#120A05] border border-[#C9B38D] inline-block shadow">
                      فرمانِ معصوم علیہ السلام
                    </span>
                    <p className="text-base sm:text-lg font-bold font-arabic text-[#D9C7A7]">
                      &ldquo;مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4]">
                      صدقہ کبھی مال میں کمی نہیں کرتا، بلکہ برکت، حفاظت اور درجات کی بلندی کا سبب بنتا ہے۔
                    </p>

                    <div className="pt-3 border-t border-[#C9B38D]/20 flex items-center justify-between text-xs font-urdu text-[#C9B38D] font-semibold">
                      <span>ماہانہ طالب علم کفالت: 1500 روپے</span>
                      <span>طعام کفالت: 10,000 روپے</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Donation Card with Champagne Gold Frame */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              <div className="bg-gradient-to-b from-[#1E110A] to-[#120A05] rounded-[30px] p-6 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* 1. Choose Preset Amount */}
                  <div>
                    <label className="block text-sm font-urdu font-bold text-white mb-3 text-right">
                      رقم کا انتخاب کریں (روپوں میں):
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {presetAmounts.map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          onClick={() => handleSelectAmount(amt)}
                          className={`py-2.5 text-center rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                            selectedAmount === amt
                              ? "bg-white text-[#120A05] border-2 border-[#C9B38D] shadow-md scale-105"
                              : "bg-[#1A0E08] text-stone-300 hover:bg-[#22130B] border border-[#C9B38D]/20"
                          }`}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Custom Amount Input */}
                  <div>
                    <label className="block text-sm font-urdu font-semibold text-stone-300 mb-2 text-right">
                      اپنی مرضی کی رقم درج کریں:
                    </label>
                    <div className="flex items-center rounded-2xl border border-[#C9B38D]/30 bg-[#1A0E08] overflow-hidden focus-within:border-[#C9B38D] transition">
                      <span className="px-4 text-[#C9B38D] font-urdu font-bold text-base">
                        {currency === "PKR" ? "روپے" : "$"}
                      </span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(e.target.value);
                        }}
                        placeholder="رقم درج کریں..."
                        className="w-full py-3 px-3 bg-transparent text-white font-bold text-lg outline-none text-left"
                        dir="ltr"
                        min="1"
                        required
                      />
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="bg-[#1E110A] py-3 px-3 text-xs font-semibold text-stone-200 outline-none border-r border-[#C9B38D]/20 cursor-pointer"
                      >
                        <option value="PKR">PKR (پاکستانی روپے)</option>
                        <option value="USD">USD (امریکی ڈالر)</option>
                      </select>
                    </div>
                  </div>

                  {/* 3. Frequency Tabs */}
                  <div className="flex rounded-2xl bg-[#1A0E08] p-1 border border-[#C9B38D]/20">
                    {[
                      { label: "ایک بار", val: "One Time" },
                      { label: "ماہانہ", val: "Monthly" },
                      { label: "سالانہ", val: "Yearly" },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.val}
                        onClick={() => setFrequency(tab.val)}
                        className={`flex-1 py-2 text-xs sm:text-sm font-urdu font-bold rounded-xl transition-all ${
                          frequency === tab.val
                            ? "bg-white text-[#120A05] border border-[#C9B38D] shadow"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* 4. Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="آپ کا نام (Full Name)"
                      className="w-full py-2.5 px-4 rounded-xl border border-[#C9B38D]/20 bg-[#1A0E08] text-white focus:border-[#C9B38D] outline-none text-sm placeholder:text-stone-500 font-urdu transition"
                    />
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="فون یا واٹس ایپ نمبر"
                      className="w-full py-2.5 px-4 rounded-xl border border-[#C9B38D]/20 bg-[#1A0E08] text-white focus:border-[#C9B38D] outline-none text-sm placeholder:text-stone-500 transition"
                      dir="ltr"
                    />
                  </div>

                  {/* 5. Message / Niyyah */}
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="مد / نیت (مثلاً: سہمِ امامؑ، سہمِ سادات، دسترخوان، صدقہ و خیرات)"
                    className="w-full py-2.5 px-4 rounded-xl border border-[#C9B38D]/20 bg-[#1A0E08] text-white focus:border-[#C9B38D] outline-none text-sm placeholder:text-stone-500 font-urdu transition"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base shadow-lg transition-all duration-300 active:scale-95"
                  >
                    <HeartHandshake className="w-5 h-5 text-[#C9B38D]" />
                    <span>بینک اکاؤنٹس دیکھیں اور تصدیق حاصل کریں</span>
                  </button>
                </form>

                {/* Official Bank Accounts Details */}
                {showBankInfo && (
                  <div className="mt-8 pt-6 border-t border-[#C9B38D]/20">
                    <div className="p-4 rounded-2xl bg-[#1A0E08]/90 border border-[#C9B38D]/30 mb-4 text-right">
                      <span className="text-xs font-urdu font-bold text-[#C9B38D] block mb-1">
                        جزاکم اللہ خیراً! برائے مہربانی نیچے دیے گئے باضابطہ اکاؤنٹس میں رقم منتقل فرمائیں:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4]">
                        رقم منتقلی کے بعد سکرین شاٹ واٹس ایپ پر ارسال فرما کر رسید حاصل کر سکتے ہیں۔
                      </p>
                    </div>

                    <div className="space-y-3">
                      {donationAccounts.map((acc, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 bg-[#1A0E08]/90 flex items-center justify-between text-xs transition"
                        >
                          <div className="text-right">
                            <span className="font-urdu font-bold text-white block">{acc.bankName}</span>
                            <span className="text-stone-400 font-urdu">{acc.accountTitle}</span>
                            <span className="font-mono font-bold text-[#C9B38D] block mt-0.5" dir="ltr">
                              {acc.accountNumber}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(acc.accountNumber, idx)}
                            className="px-4 py-2 rounded-xl bg-[#120A05] text-[#C9B38D] border border-[#C9B38D]/40 hover:bg-white hover:text-[#120A05] transition flex items-center gap-1.5 font-urdu font-bold text-xs"
                          >
                            {copiedIndex === idx ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-400" />
                                <span>کاپی ہو گیا</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>کاپی کریں</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
