"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { api, setAuthToken, setStoredUser } from "@/services/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sahibuzzaman.org");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.auth.login({ email, password });
      if (res.success && res.token) {
        setAuthToken(res.token);
        setStoredUser(res.user);
        router.push("/admin");
      } else {
        setError(res.message || "لاگ ان کی معلومات غلط ہیں۔");
      }
    } catch (err: any) {
      setError(err.message || "سرور سے رابطہ نہ ہو سکا۔ برائے مہربانی بیک اینڈ سرور چلائیں۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0704] flex items-center justify-center p-4 relative overflow-hidden font-urdu" dir="rtl">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9B38D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card with Gold Gradient Border */}
        <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          <div className="bg-gradient-to-b from-[#1C1009] to-[#120A05] rounded-[30px] p-7 sm:p-9 text-center">
            
            {/* Logo */}
            <div className="relative w-20 h-20 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(201,179,141,0.4)]">
              <Image
                src="/images/logo.png"
                alt="مدرسہ صاحب الزمان لوگو"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A0E08] text-xs font-semibold text-[#C9B38D] border border-[#C9B38D]/40 mb-3">
              <Shield className="w-3.5 h-3.5 text-[#C9B38D]" />
              <span>ایڈمن کنٹرول پینل</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              لاگ ان ایڈمنسٹریٹر
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mb-6 leading-relaxed">
              مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) کا مرکزی انتظامی پورٹل
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 text-right">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-semibold text-stone-200 mb-1.5">
                  ای میل ایڈریس
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sahibuzzaman.org"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-sm focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none transition"
                    dir="ltr"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-200 mb-1.5">
                  خفیہ پاس ورڈ
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/30 text-white text-sm focus:border-[#C9B38D] focus:bg-[#22130B] focus:outline-none transition"
                    dir="ltr"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Default Credential helper pill */}
              <div className="p-2.5 rounded-xl bg-[#180E08] border border-[#C9B38D]/20 text-[11px] text-stone-400 text-right leading-relaxed">
                <span className="text-[#C9B38D] font-bold block mb-0.5">پہلے سے محفوظ لاگ ان معلومات:</span>
                ای میل: <code className="text-stone-200">admin@sahibuzzaman.org</code><br />
                پاس ورڈ: <code className="text-stone-200">admin123</code>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] hover:brightness-105 text-[#120A05] font-bold text-sm shadow-lg transition-all duration-300 disabled:opacity-60 active:scale-98 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#120A05]/30 border-t-[#120A05] rounded-full animate-spin" />
                ) : (
                  <>
                    <span>پورٹل میں داخل ہوں</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </>
                )}
              </button>
            </form>

            {/* Back link */}
            <div className="mt-6 pt-5 border-t border-[#C9B38D]/15 text-center">
              <a
                href="/"
                className="text-xs text-[#C9B38D] hover:underline inline-flex items-center gap-1.5"
              >
                <span>مرکزی ویب سائٹ پر واپس جائیں</span>
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
