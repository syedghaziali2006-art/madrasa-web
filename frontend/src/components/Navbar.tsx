"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Heart,
  HeartHandshake,
  PhoneCall,
  Shield,
  Home,
  Compass,
  GraduationCap,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { api } from "@/services/api";

interface NavbarProps {
  onOpenAdmission?: () => void;
  onOpenDonation?: () => void;
  onOpenContact?: () => void;
  logo?: string;
}

export default function Navbar({ onOpenAdmission, onOpenDonation, onOpenContact, logo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>(logo || "/images/logo.png");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch dynamic logo from backend settings & listen for live updates
  useEffect(() => {
    if (logo) {
      setLogoUrl(logo);
      return;
    }
    let isMounted = true;
    api.settings
      .get()
      .then((res) => {
        if (isMounted && res?.data?.logo) {
          setLogoUrl(res.data.logo);
        }
      })
      .catch(() => {});

    const handleLogoUpdate = (e: any) => {
      if (e?.detail?.logo) {
        setLogoUrl(e.detail.logo);
      }
    };
    window.addEventListener("msz_logo_updated", handleLogoUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("msz_logo_updated", handleLogoUpdate);
    };
  }, [logo]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "صفحہ اول", href: "/#hero" },
    { name: "تعارف و مقاصد", href: "/policy" },
    { name: "سفر و اساتذہ", href: "/history-staff" },
    { name: "شعبہ خواتین", href: "/womens-department" },
    { name: "کتب خانہ", href: "/library" },
  ];

  // 8 Radial items for circular wheel menu (matching user reference image)
  const wheelItems = [
    { name: "ہوم", icon: Home, href: "/#hero" },
    { name: "تعارف", icon: Compass, href: "/policy" },
    { name: "اساتذہ", icon: GraduationCap, href: "/history-staff" },
    { name: "کتب خانہ", icon: BookOpen, href: "/library" },
    { name: "تعاون", icon: HeartHandshake, href: "/dastarkhwan" },
    { name: "خواتین", icon: Heart, href: "/womens-department" },
    { name: "داخلہ لیں", icon: CheckCircle2, action: onOpenAdmission },
    { name: "رابطہ", icon: PhoneCall, action: onOpenContact },
  ];

  return (
    <>
      {/* ============================================================== */}
      {/* CIRCULAR RADIAL GLASS WHEEL MENU (Matching User UI Image)      */}
      {/* ============================================================== */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-3xl backdrop-saturate-150 flex flex-col items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
          dir="rtl"
        >
          {/* Wheel Dish Card Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center justify-center select-none"
          >
            {/* Outer Circular Frosted Glass Disc */}
            <div className="relative w-[310px] h-[310px] sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-br from-[#23150D]/95 via-[#140B06]/95 to-black/98 shadow-[0_30px_80px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.3)] backdrop-blur-3xl flex items-center justify-center">
              
              {/* Subtle Concentric Rings */}
              <div className="absolute inset-5 rounded-full pointer-events-none" />
              <div className="absolute inset-16 rounded-full pointer-events-none" />

              {/* CENTER: White Circle with Black "X" (Close Button) */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white text-[#120A05] hover:bg-stone-100 shadow-[0_6px_25px_rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 z-30 group"
                aria-label="مینو بند کریں"
                title="بند کریں"
              >
                <X className="w-6 h-6 text-black group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* 8 RADIAL ICON BUTTONS IN A CIRCLE */}
              {wheelItems.map((item, index) => {
                const radius = 112; // Radius in pixels for mobile circular wheel
                const angle = (index * 360 / 8) - 90; // Top is index 0 (-90 deg)
                const angleRad = (angle * Math.PI) / 180;
                const x = Math.round(radius * Math.cos(angleRad));
                const y = Math.round(radius * Math.sin(angleRad));
                const Icon = item.icon;

                return (
                  <a
                    key={item.name}
                    href={item.href || "#"}
                    onClick={(e) => {
                      if (item.action) {
                        e.preventDefault();
                        setIsOpen(false);
                        item.action();
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute w-13 h-13 sm:w-15 sm:h-15 rounded-full text-white flex flex-col items-center justify-center gap-0.5 transition-all duration-300 hover:scale-110 active:scale-90 group cursor-pointer z-20"
                    title={item.name}
                  >
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C9B38D] group-hover:text-white transition-colors" />
                    <span className="font-urdu text-[10px] sm:text-[11px] leading-tight font-bold text-stone-200 group-hover:text-white text-center px-0.5">
                      {item.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DESKTOP & TOP FLOATING NAVBAR                                  */}
      {/* ============================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "pt-2.5 sm:pt-3.5 px-3 sm:px-6 pointer-events-none"
            : "pt-3.5 sm:pt-5 px-4 sm:px-8 bg-transparent"
        }`}
        dir="rtl"
      >
        <div
          className={`relative mx-auto transition-all duration-500 ${
            scrolled
              ? "pointer-events-auto max-w-[1400px] rounded-full backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] px-4 sm:px-7 py-1.5 sm:py-2"
              : "max-w-[1500px] bg-transparent backdrop-blur-none border-none shadow-none px-0 py-0"
          }`}
        >
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* 1. RIGHT SIDE: Madrasa Dynamic Logo & Branding */}
            <div className="flex items-center gap-3">
              <a href="#hero" className="flex items-center gap-3 group" title="مدرسہ صاحب الزمان (عج)">
                <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border border-[#C9B38D]/70 shadow-md group-hover:border-[#C9B38D] transition-colors shrink-0 bg-white p-1">
                  <Image
                    src={logoUrl}
                    alt="مدرسہ صاحب الزمان لوگو"
                    fill
                    className="object-contain p-0.5"
                    priority
                  />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-urdu font-bold text-base sm:text-lg text-white group-hover:text-[#D9C7A7] transition-colors leading-tight">
                    مدرسہ صاحب الزمان
                  </span>
                  <span className="font-urdu text-[11px] text-[#C9B38D] leading-tight">
                    عجل اللہ تعالیٰ فرجہ الشریف
                  </span>
                </div>
              </a>
            </div>

            {/* 2. CENTER: Main Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-urdu">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-200 hover:text-[#C9B38D] transition-colors text-sm sm:text-base font-medium py-1 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#C9B38D] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* 3. LEFT SIDE: Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenContact}
                className="font-urdu text-xs sm:text-sm font-bold px-5 py-2 rounded-full text-white hover:text-[#C9B38D] bg-white/[0.04] hover:bg-white/[0.12] border border-[#f5deb3]/20 hover:border-[#f5deb3]/45 shadow-[inset_0_1px_1px_rgba(255,245,230,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C9B38D] group-hover:text-[#D9C7A7] group-hover:scale-110 transition-all duration-300" />
                <span>رابطہ کریں</span>
              </button>

              <a
                href="/dastarkhwan"
                className="font-urdu text-xs sm:text-sm font-bold px-6 py-2 rounded-full bg-white/90 hover:bg-white text-[#120A05] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.2),inset_0_1px_1px_rgba(255,255,255,1)] border border-white hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-[#8C6D3F]" />
                <span>تعاون</span>
              </a>
            </div>

            {/* Mobile Toggle Button (Circular Glass Hamburger) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenAdmission}
                className="bg-white/90 backdrop-blur-md text-[#120A05] border border-white font-urdu text-xs font-bold px-3.5 py-1.5 rounded-full shadow active:scale-95 cursor-pointer"
              >
                داخلہ لیں
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] text-white active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="مینو کھولیں"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}