import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Settings,
  Save,
  Lock,
  Building,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  BellRing,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    madarsaName: "",
    madarsaNameEnglish: "",
    tagline: "",
    logo: "/images/logo.png",
    address: "",
    shortAddress: "",
    phone: "",
    whatsapp: "",
    email: "",
    interviewTimings: "",
    monthlyFee: "",
    admissionFee: "",
    securityFee: "",
    ageLimit: "",
    minQualification: "",
    testSubjects: "",
    marqueeNotice: "",
    isAdmissionOpen: true
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.settings.get();
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("برائے مہربانی صرف تصویر (PNG, JPG, SVG, WebP) فائل منتخب کریں۔");
      return;
    }

    try {
      setUploadingLogo(true);
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        setSettings((prev: any) => ({ ...prev, logo: res.fileUrl }));
        window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: res.fileUrl } }));
      }
    } catch (err: any) {
      alert("لوگو اپلوڈ کرنے میں خرابی پیش آگئی: " + err.message);
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess(false);
    try {
      setSavingSettings(true);
      const res = await api.settings.update(settings);
      if (res.success) {
        setSettingsSuccess(true);
        if (settings.logo) {
          window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: settings.logo } }));
        }
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err: any) {
      alert("ترتیبات محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError("نیا پاس ورڈ کم از کم ۶ ہندسوں کا ہونا چاہیے۔");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("نیا پاس ورڈ اور تصدیقی پاس ورڈ مطابقت نہیں رکھتے۔");
      return;
    }

    try {
      setSavingPassword(true);
      const res = await api.auth.changePassword({ currentPassword, newPassword });
      if (res.success) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(false), 4000);
      } else {
        setPasswordError(res.message);
      }
    } catch (err: any) {
      setPasswordError(err.message || "پاس ورڈ تبدیل کرنے میں خرابی۔");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="عمومی ترتیبات و پاس ورڈ کنٹرول"
        subtitle="ادارے کی بنیادی معلومات، داخلہ فیس، رابطہ نمبرز اور ایڈمن سیکیورٹی"
      />

      <div className="p-6 space-y-8 max-w-[1200px] mx-auto">
        {/* Success Alert */}
        {settingsSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>ترتیبات کامیابی کے ساتھ محفوظ ہو گئی ہیں!</span>
          </div>
        )}

        {/* Form 1: General Info & Admissions */}
        <form onSubmit={handleSaveSettings} className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#C9B38D]/20 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-[#C9B38D]" />
              <span>مدرسہ کی معلومات و رابطہ</span>
            </h3>
            <label className="flex items-center gap-3 cursor-pointer bg-[#25150C] px-3.5 py-1.5 rounded-xl border border-[#C9B38D]/30">
              <span className="text-xs font-semibold text-white">
                داخلہ پورٹل فعال ہے
              </span>
              <input
                type="checkbox"
                checked={settings.isAdmissionOpen ?? true}
                onChange={(e) => setSettings({ ...settings, isAdmissionOpen: e.target.checked })}
                className="w-4 h-4 rounded text-[#C9B38D]"
              />
            </label>
          </div>

          {/* Madrasa Official Logo Upload & Live Preview */}
          <div className="p-5 rounded-2xl bg-[#24150D] border border-[#C9B38D]/30 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#C9B38D]" />
                  <span>ادارے کا آفیشل لوگو (Madrasa Official Logo)</span>
                </h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  یہ لوگو ویب سائٹ کے نیویگیشن بار، فوٹر اور ایڈمن پینل کے ہر صفحے پر براہِ راست اپڈیٹ ہوگا۔
                </p>
              </div>

              {/* Upload & Reset Buttons */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploadingLogo}
                  onClick={() => logoInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9B38D] to-[#DFCBB0] text-[#120A05] text-xs font-bold hover:brightness-110 active:scale-95 transition flex items-center gap-2 shadow cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingLogo ? "اپلوڈ ہو رہا ہے..." : "نیا لوگو اپلوڈ کریں"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSettings((prev: any) => ({ ...prev, logo: "/images/logo.png" }));
                    window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: "/images/logo.png" } }));
                  }}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white text-xs border border-white/15 transition cursor-pointer"
                  title="ڈیفالٹ لوگو بحال کریں"
                >
                  ڈیفالٹ بحال کریں
                </button>
              </div>
            </div>

            {/* Live Logo Preview Box */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-[#180C06] border border-white/10">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0D0704] border-2 border-[#C9B38D]/60 flex items-center justify-center p-2 shadow-lg overflow-hidden shrink-0 group">
                <Image
                  src={settings.logo || "/images/logo.png"}
                  alt="لوگو کا پیش منظر"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain filter drop-shadow"
                  unoptimized={Boolean(settings.logo?.startsWith("http"))}
                />
              </div>

              <div className="flex-1 w-full space-y-2 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    لوگو کا براہِ راست URL یا فائل ایڈریس:
                  </label>
                  <input
                    type="text"
                    value={settings.logo || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSettings({ ...settings, logo: val });
                      window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: val } }));
                    }}
                    placeholder="/images/logo.png یا مکمل URL"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white font-mono text-xs focus:outline-none"
                    dir="ltr"
                  />
                </div>
                <p className="text-[11px] text-stone-400">
                  تجاویز: شفاف بیک گراؤنڈ والی PNG یا SVG فائل بہترین نتائج دیتی ہے (تجویز کردہ سائز: 256x256 یا 512x512 پکسلز)۔
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نام ادارہ (اردو)</label>
              <input
                type="text"
                value={settings.madarsaName || ""}
                onChange={(e) => setSettings({ ...settings, madarsaName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نام ادارہ (انگریزی)</label>
              <input
                type="text"
                value={settings.madarsaNameEnglish || ""}
                onChange={(e) => setSettings({ ...settings, madarsaNameEnglish: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-sans"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">مرکزی فون نمبر</label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">واٹس ایپ نمبر</label>
              <input
                type="text"
                value={settings.whatsapp || ""}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">ای میل ایڈریس</label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-stone-200 mb-1">مکمل پتہ (کیمپس لوکیشن)</label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-stone-200 mb-1 flex items-center gap-1.5">
              <BellRing className="w-3.5 h-3.5 text-[#C9B38D]" />
              <span>اعلانیہ پٹی (Marquee Notice Banner)</span>
            </label>
            <input
              type="text"
              placeholder="ویب سائٹ پر چلنے والی متحرک اطلاع"
              value={settings.marqueeNotice || ""}
              onChange={(e) => setSettings({ ...settings, marqueeNotice: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
            />
          </div>

          {/* Fees Subsection */}
          <div className="pt-4 border-t border-[#C9B38D]/20">
            <h4 className="text-sm font-bold text-[#C9B38D] mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>فیس اور داخلہ ضوابط</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-200 mb-1">ماہانہ فیس</label>
                <input
                  type="text"
                  value={settings.monthlyFee || ""}
                  onChange={(e) => setSettings({ ...settings, monthlyFee: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-200 mb-1">داخلہ فیس (یک مشت)</label>
                <input
                  type="text"
                  value={settings.admissionFee || ""}
                  onChange={(e) => setSettings({ ...settings, admissionFee: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-200 mb-1">سیکورٹی فیس (قابل واپسی)</label>
                <input
                  type="text"
                  value={settings.securityFee || ""}
                  onChange={(e) => setSettings({ ...settings, securityFee: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingSettings}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] text-xs font-bold transition shadow"
            >
              <Save className="w-4 h-4" />
              <span>{savingSettings ? "محفوظ ہو رہا ہے..." : "ترتیبات محفوظ کریں"}</span>
            </button>
          </div>
        </form>

        {/* Form 2: Password Change */}
        <form onSubmit={handleChangePassword} className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="border-b border-[#C9B38D]/20 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#C9B38D]" />
              <span>ایڈمن پاس ورڈ تبدیل کریں</span>
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              اپنے اکاؤنٹ کو محفوظ رکھنے کے لیے پاس ورڈ باقاعدگی سے تبدیل کریں
            </p>
          </div>

          {passwordError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>پاس ورڈ کامیابی سے تبدیل کر دیا گیا ہے!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">موجودہ پاس ورڈ *</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نیا پاس ورڈ *</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-200 mb-1">نئے پاس ورڈ کی تصدیق *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold transition shadow"
            >
              <Lock className="w-4 h-4" />
              <span>{savingPassword ? "تبدیل ہو رہا ہے..." : "پاس ورڈ تبدیل کریں"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
