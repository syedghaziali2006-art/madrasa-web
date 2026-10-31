"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, Send, Check, Facebook, Twitter, Instagram, Youtube, Phone, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { madarsaInfo as fallbackInfo } from "@/data/madarsaData";
import { api } from "@/services/api";

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings: propSettings }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [settings, setSettings] = useState<any>(propSettings || fallbackInfo);

  useEffect(() => {
    if (propSettings) {
      setSettings(propSettings);
      return;
    }

    let isMounted = true;
    const fetchSettings = async () => {
      try {
        const res = await api.settings.get();
        if (isMounted && res.success && res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.warn("Using fallback settings in footer:", err);
      }
    };
    fetchSettings();
    return () => {
      isMounted = false;
    };
  }, [propSettings]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3500);
    }
  };

  const address = settings?.address || fallbackInfo.address;
  const shortAddress = settings?.shortAddress || settings?.address || fallbackInfo.address;
  const phone = settings?.phone || fallbackInfo.phone;
  const madarsaName = settings?.madarsaName || "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف)";
  const googleMapsUrl = "https://maps.google.com/?q=" + encodeURIComponent("Madarsa Sahib uz Zaman " + address);

  return (
    <footer id="contact" className="bg-[#0D0704] text-white pt-16 pb-8 border-t border-[#C9B38D]/25 relative overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#C9B38D]/15">
          
          {/* Column 1: Brand & Social Media */}
          <div className="lg:col-span-5 space-y-5 text-right">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9B38D] shadow-[0_0_20px_rgba(201,179,141,0.35)]">
                <Image
                  src="/images/logo.png"
                  alt="مدرسہ صاحب الزمان لوگو"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-urdu font-bold tracking-tight text-white">
                  مدرسہ صاحب الزمان <span className="text-sm font-semibold text-[#C9B38D]">(عج)</span>
                </h3>
                <p className="text-xs text-[#C9B38D] font-urdu tracking-wide">
                  {settings?.tagline || "دینی و عصری علوم کا بین الاقوامی اسلامی ادارہ"}
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-300 font-urdu leading-[2.2] sm:leading-[2.4] max-w-md">
              ایک عظیم حوزوی و فلاحی ادارہ جو قرآنی فہم، علومِ آلِ محمدؑ اور جدید عصری تقاضوں کے ساتھ نئی نسل کی فکری، اخلاقی اور روحانی کردار سازی کے لیے ہمہ وقت کوشاں ہے۔
            </p>

            {/* Address & Map Pin */}
            <div className="pt-1">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300 hover:text-[#C9B38D] transition-colors p-3.5 rounded-2xl bg-[#1A0E08] border border-[#C9B38D]/20 hover:border-[#C9B38D]/40 max-w-md group"
              >
                <MapPin className="w-5 h-5 text-red-500 shrink-0 fill-red-500 mt-0.5" />
                <span className="leading-[2.2] font-urdu">
                  {address}
                </span>
                <ExternalLink className="w-4 h-4 text-[#C9B38D] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-urdu font-semibold text-stone-400 block mb-3">
                سوشل میڈیا پر ہمارے ساتھ جڑیں:
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  { icon: Facebook, label: "Facebook", href: "#" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                  { icon: Instagram, label: "Instagram", href: "#" },
                  { icon: Youtube, label: "YouTube", href: "#" },
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-[#1A0E08] hover:bg-white hover:text-[#120A05] transition flex items-center justify-center text-stone-300 border border-[#C9B38D]/20 hover:border-[#C9B38D] shadow-sm"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Newsletter & Link Columns */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Newsletter Subscription Box */}
            <div className="space-y-3">
              <h4 className="text-sm sm:text-base font-urdu font-bold text-white text-right">
                تازہ ترین اعلانات اور خبروں کے لیے سبسکرائب کریں:
              </h4>
              <form onSubmit={handleSubscribe} className="flex max-w-lg rounded-full bg-[#1A0E08] border border-[#C9B38D]/25 focus-within:border-[#C9B38D] p-1.5 transition shadow-inner">
                <button
                  type="submit"
                  className="bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] font-urdu font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition shadow flex items-center gap-1.5 shrink-0 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-[#120A05]" />
                  <span>سبسکرائب</span>
                </button>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="اپنا ای میل درج کریں..."
                  className="w-full bg-transparent px-4 text-sm text-white placeholder-stone-500 outline-none text-left"
                  dir="ltr"
                  required
                />
              </form>
              {subscribed && (
                <div className="text-xs text-green-400 font-urdu flex items-center gap-1 text-right">
                  <Check className="w-3.5 h-3.5" />
                  <span>آپ کی ای میل کامیابی سے درج کر لی گئی ہے۔ شکریہ!</span>
                </div>
              )}
            </div>

            {/* Quick Links in 2 Columns */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              
              {/* Column 1: Services */}
              <div className="space-y-3 text-right">
                <h5 className="text-sm font-urdu font-bold text-[#C9B38D] uppercase tracking-wider border-b border-[#C9B38D]/20 pb-2">
                  تربیتی و فکری مقاصد
                </h5>
                <ul className="space-y-3 text-xs sm:text-sm font-urdu text-stone-300">
                  <li>
                    <a href="/#about" className="hover:text-[#C9B38D] transition leading-[2.2]">قرآن و علومِ آلِ محمدؑ</a>
                  </li>
                  <li>
                    <a href="/#about" className="hover:text-[#C9B38D] transition leading-[2.2]">تربیتِ اخلاق و کردار سازی</a>
                  </li>
                  <li>
                    <a href="/#about" className="hover:text-[#C9B38D] transition leading-[2.2]">فقہی و عقائدی پختگی</a>
                  </li>
                  <li>
                    <a href="/#about" className="hover:text-[#C9B38D] transition leading-[2.2]">خدمتِ دین و انسانیت</a>
                  </li>
                  <li>
                    <a href="/#about" className="hover:text-[#C9B38D] transition leading-[2.2]">جدید فکری و عصری شعور</a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Useful Links */}
              <div className="space-y-3 text-right">
                <h5 className="text-sm font-urdu font-bold text-[#C9B38D] uppercase tracking-wider border-b border-[#C9B38D]/20 pb-2">
                  فوری رسائی
                </h5>
                <ul className="space-y-3 text-xs sm:text-sm font-urdu text-stone-300">
                  <li>
                    <a href="/#hero" className="hover:text-[#C9B38D] transition leading-[2.2]">صفحۂ اول</a>
                  </li>
                  <li>
                    <a href="/policy" className="hover:text-[#C9B38D] transition leading-[2.2]">تعارف و مقاصد</a>
                  </li>
                  <li>
                    <a href="/library" className="hover:text-[#C9B38D] transition leading-[2.2]">کتب خانہ و لائبریری</a>
                  </li>
                  <li>
                    <a href="/#donation" className="hover:text-[#C9B38D] transition leading-[2.2]">عطیات و صدقات</a>
                  </li>
                  <li>
                    <a href="/#contact" className="hover:text-[#C9B38D] transition leading-[2.2]">رابطہ و پتہ</a>
                  </li>
                  <li>
                    <a href="/admin" className="text-[#C9B38D] hover:underline transition leading-[2.2] flex items-center gap-1 font-bold">
                      <span>ایڈمن لاگ ان پورٹل</span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-urdu text-stone-400 gap-4">
          <p>© ۲۰۲۶ {madarsaName} — جملہ حقوق محفوظ ہیں۔</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>{shortAddress}</span>
            <span>•</span>
            <span className="text-[#C9B38D] font-mono" dir="ltr">{phone}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
