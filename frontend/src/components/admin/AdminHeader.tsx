"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredUser } from "@/services/api";
import { Shield, Bell, User, Clock, ExternalLink } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, children }: AdminHeaderProps) {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
    }

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("ur-PK", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateTime();
  }, []);

  return (
    <header className="admin-header-shell px-6 py-4 sticky top-0 z-20" dir="rtl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-urdu">
        {/* Title and breadcrumbs */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side controls / user badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {children}

          {/* Date Badge */}
          {currentTime && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#C9B38D]/20 text-xs text-stone-300 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-[#C9B38D]" />
              <span>{currentTime}</span>
            </div>
          )}

          {/* User profile capsule */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[#C9B38D]/30 shadow-sm backdrop-blur-md">
            <div className="w-7 h-7 rounded-full bg-[#C9B38D]/20 border border-[#C9B38D] flex items-center justify-center text-[#C9B38D]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-white leading-tight">
                {user?.name || "ایڈمنسٹریٹر"}
              </span>
              <span className="block text-[10px] text-[#C9B38D]">
                مدرسہ مینیجر
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
