"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Target,
  Users,
  Sparkles,
  BookOpen,
  GraduationCap,
  Image as ImageIcon,
  HeartHandshake,
  MessageCircle,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";
import { removeAuthToken, api } from "@/services/api";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("/images/logo.png");

  useEffect(() => {
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
  }, []);

  const navItems = [
    {
      title: "ڈیش بورڈ (خلاصہ)",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "صفحہ اول (ہوم پیج) مواد",
      href: "/admin/homepage",
      icon: FileText,
    },
    {
      title: "تعارف و مقاصد",
      href: "/admin/policy",
      icon: Target,
    },
    {
      title: "سفر و اساتذہ",
      href: "/admin/staff",
      icon: Users,
    },
    {
      title: "شعبہ خواتین",
      href: "/admin/womens",
      icon: Sparkles,
    },
    {
      title: "کتب خانہ و فرمائشیں",
      href: "/admin/books",
      icon: BookOpen,
    },
    {
      title: "داخلہ درخواستیں",
      href: "/admin/admissions",
      icon: GraduationCap,
    },
    {
      title: "میڈیا و گیلری",
      href: "/admin/gallery",
      icon: ImageIcon,
    },
    {
      title: "عطیات و بینک اکاؤنٹس",
      href: "/admin/donations",
      icon: HeartHandshake,
    },
    {
      title: "واٹس ایپ نوٹیفکیشنز",
      href: "/admin/whatsapp",
      icon: MessageCircle,
    },
    {
      title: "عمومی ترتیبات",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    if (confirm("کیا آپ واقعی ایڈمن پینل سے لاگ آؤٹ کرنا چاہتے ہیں؟")) {
      removeAuthToken();
      router.push("/admin/login");
    }
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  const NavContent = () => (
    <div className="admin-sidebar-shell flex flex-col h-screen text-[#FAF7F2] font-urdu" dir="rtl">
      {/* Top Header / Logo */}
      <div className="p-3.5 sm:p-4 lg:p-5 border-b border-[#C9B38D]/20 flex items-center justify-between bg-[#110D0A]/40">
        <Link href="/admin" className="flex items-center gap-3 group min-w-0">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#C9B38D]/80 shadow-[0_0_20px_rgba(201,179,141,0.32)] shrink-0 bg-white p-1 transition-transform duration-200 group-hover:scale-[1.03]">
            <Image
              src={logoUrl}
              alt="مدرسہ صاحب الزمان لوگو"
              fill
              className="object-contain p-0.5"
              unoptimized={logoUrl.startsWith("http")}
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-white leading-tight truncate">
              ایڈمن پورٹل
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#C9B38D] font-medium truncate">
              مدرسہ صاحب الزمان (عج)
            </p>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 backdrop-blur-2xl backdrop-saturate-150 px-2.5 sm:px-3 py-3 sm:py-4 space-y-1 overflow-y-auto">
        <div className="px-2.5 pb-2 text-[10px] sm:text-[11px] font-semibold text-[#C9B38D]/70 uppercase tracking-wider">
          مرکزی مینو
        </div>
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-2.5 sm:px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group ${
                active
                  ? "bg-gradient-to-l from-[#C9B38D]/25 to-[#1E473B]/40 text-white border-r-4 border-[#C9B38D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                  : "text-stone-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    active ? "text-[#C9B38D]" : "text-stone-400 group-hover:text-[#C9B38D]"
                  }`}
                />
                <span className="truncate">{item.title}</span>
              </div>
              <ChevronLeft
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                  active ? "text-[#C9B38D] translate-x-1" : "text-stone-500 opacity-0 group-hover:opacity-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-3 sm:p-4 border-t border-[#C9B38D]/20 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-medium text-stone-300 hover:text-white hover:bg-white/5 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#C9B38D]" />
            ویب سائٹ دیکھیں
          </span>
          <span className="text-[9px] sm:text-[10px] bg-[#C9B38D]/20 text-[#C9B38D] px-1.5 sm:px-2 py-0.5 rounded-md">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-2.5 sm:px-3.5 py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>لاگ آؤٹ کریں</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button - Floating when closed */}
      <div className="lg:hidden fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-3.5 rounded-full bg-[#C9B38D] text-[#120A05] shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center hover:scale-105 active:scale-95 transition"
          aria-label="مینو کھولیں"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NavContent />
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex lg:w-[clamp(16rem,18vw,18rem)] shrink-0 h-screen sticky top-0 self-start shadow-2xl z-30">
        <NavContent />
      </aside>
    </>
  );
}
