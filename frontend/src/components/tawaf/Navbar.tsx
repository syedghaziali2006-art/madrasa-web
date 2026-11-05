"use client";

import React, { useState } from "react";
import { Heart,
  MapPin,
  Phone,
  Mail,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  } from "lucide-react";

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenLogin, onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("الرئيسية");

  const navLinks = [
    { name: "الرئيسية", href: "#hero" },
    { name: "عن المنصة", href: "#about" },
    { name: "الحجوزات", href: "#packages" },
    { name: "الخدمات الإلكترونية", href: "#services" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  return (
    <header className="w-full relative z-50">
      {/* 1. Top Announcement / Contact Bar */}
      <div className="w-full bg-gradient-to-r from-[#4A2F1F] via-[#3D2518] to-[#2D1B11] text-[#EAD8CA] text-xs py-2 px-4 sm:px-8 border-b border-[#5C3A27]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Right info (Saudi phone, location, email) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <span className="w-5 h-5 rounded-full bg-[#5D3823] flex items-center justify-center text-[#E5C158]">
                <MapPin className="w-3 h-3" />
              </span>
              <span>جدة - المملكة العربية السعودية</span>
            </div>

            <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer dir-ltr">
              <span className="w-5 h-5 rounded-full bg-[#5D3823] flex items-center justify-center text-[#E5C158]">
                <Phone className="w-3 h-3" />
              </span>
              <span className="font-mono">+966534093333</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <span className="w-5 h-5 rounded-full bg-[#5D3823] flex items-center justify-center text-[#E5C158]">
                <Mail className="w-3 h-3" />
              </span>
              <span>info@tawaf.com.sa</span>
            </div>
          </div>

          {/* Left info (Language selector & Social icons) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-5 h-5 rounded-full bg-[#5D3823]/80 hover:bg-[#825034] text-[#EAD8CA] flex items-center justify-center transition-all hover:scale-110 text-[10px]"
              >
                📸
              </a>
              <a
                href="https://wa.me/966534093333"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-5 h-5 rounded-full bg-[#5D3823]/80 hover:bg-[#825034] text-[#EAD8CA] flex items-center justify-center transition-all hover:scale-110 text-[10px]"
              >
                💬
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-5 h-5 rounded-full bg-[#5D3823]/80 hover:bg-[#825034] text-[#EAD8CA] flex items-center justify-center transition-all hover:scale-110 text-[10px]"
              >
                👍
              </a>
            </div>

            {/* Language dropdown */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#5D3823]/50 text-[11px] cursor-pointer hover:bg-[#5D3823] transition-colors">
              <Globe className="w-3 h-3 text-[#E5C158]" />
              <span>العربية</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="w-full bg-[#180E08]/95 backdrop-blur-md text-white border-b border-[#3D2518]/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Right side: Logo & Navigation Links */}
          <div className="flex items-center gap-8 lg:gap-12">
            {/* Tawaf Brand Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#946142] via-[#C59B27] to-[#E5C158] p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#1F120A] rounded-full flex items-center justify-center">
                  <span className="text-lg">🕋</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight text-[#FAF4EF] font-cairo">
                    طَوَاف
                  </span>
                  <span className="text-xs text-[#E5C158] font-bold">✨</span>
                </div>
                <span className="text-[10px] text-[#C49774] font-light -mt-1 tracking-wider">
                  منصة خدمات الحج والعمرة
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveLink(link.name)}
                    className={`relative py-1 transition-colors hover:text-[#DFC1A5] ${
                      isActive ? "text-[#FAF4EF] font-bold" : "text-[#CBB6A5]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#C59B27] rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Left side: Login Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 bg-[#754428] hover:bg-[#8C5332] active:scale-95 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#9A5F3A] transition-all shadow-md"
            >
              <User className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#2D1B11] text-[#EAD8CA] hover:text-white border border-[#4D2D1B]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1F120A] border-t border-[#3D2518] px-4 py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeLink === link.name
                    ? "bg-[#754428] text-white"
                    : "text-[#D6C4B4] hover:bg-[#2D1B11]"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-[#3D2518]/60 flex flex-col gap-2 text-xs text-[#C49774]">
              <div className="flex items-center gap-2 py-1">
                <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>جدة - المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2 py-1 dir-ltr justify-end">
                <span className="font-mono text-[#EAD8CA]">+966534093333</span>
                <Phone className="w-3.5 h-3.5 text-[#E5C158]" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
