import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Phone,
  ShieldCheck,
  Info,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminWhatsAppPage() {
  const [config, setConfig] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testPhone, setTestPhone] = useState("+923353160301");
  const [testStatus, setTestStatus] = useState("approved");
  const [testResult, setTestResult] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [configRes, historyRes] = await Promise.all([
        api.whatsapp.getConfig().catch(() => ({ success: false, data: {} })),
        api.whatsapp.history().catch(() => ({ success: false, data: [] }))
      ]);

      if (configRes.success && configRes.data) {
        setConfig(configRes.data);
      }
      if (historyRes.success && historyRes.data) {
        setHistory(historyRes.data || []);
      }
    } catch (err) {
      console.error("Failed to load WhatsApp data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone) return;

    try {
      setTesting(true);
      setTestResult(null);

      const res = await api.whatsapp.test({
        phone: testPhone,
        status: testStatus,
        name: "ٹیسٹ صارف",
        inquiryId: "TEST-" + Math.floor(1000 + Math.random() * 9000)
      });

      setTestResult({
        success: res.success,
        message: res.message || "ٹیسٹ مکمل ہو گیا۔",
        data: res.data
      });

      // Refresh message history
      const historyRes = await api.whatsapp.history().catch(() => ({ success: false, data: [] }));
      if (historyRes.success) setHistory(historyRes.data || []);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "ٹیسٹ میسج بھیجنے میں خرابی۔"
      });
      // Refresh history to see failed record
      const historyRes = await api.whatsapp.history().catch(() => ({ success: false, data: [] }));
      if (historyRes.success) setHistory(historyRes.data || []);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="واٹس ایپ نوٹیفکیشن و میسجنگ کنٹرول"
        subtitle="میٹا کلاؤڈ API انٹیگریشن، لائیو ٹیسٹنگ اور میسج ہسٹری مانیٹرنگ"
      />

      <div className="p-6 space-y-8 max-w-[1400px] mx-auto">
        {/* Status & Important Sandbox Alert */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Connection Status */}
          <div className="p-6 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/25 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-stone-400">کنکشن اسٹیٹس</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  منسلک (Active)
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Meta WhatsApp Cloud API</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                ایپ آئی ڈی اور فون آئی ڈی کامیابی سے .env سے لوڈ ہو رہے ہیں۔
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>فون نمبر آئی ڈی:</span>
                <span className="font-mono text-[#C9B38D]" dir="ltr">
                  {config?.phoneNumberId || "1421597001038925"}
                </span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>بزنس ٹیسٹ نمبر:</span>
                <span className="font-mono text-stone-200" dir="ltr">
                  +1 555-193-6940
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 & 3: Meta Sandbox & Recipient Policy Info */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Info className="w-5 h-5 shrink-0" />
                <span>میٹا ڈویلپر سینڈ باکس (Meta Sandbox) اہم ہدایات</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed">
                اگر آپ کا Meta App ابھی <strong>Development Mode</strong> میں ہے اور آپ ٹیسٹ نمبر (+1 555-193-6940) استعمال کر رہے ہیں:
              </p>
              <ul className="text-xs text-stone-300 space-y-1.5 list-disc list-inside">
                <li>
                  میٹا صرف ان فون نمبرز پر میسج جانے کی اجازت دیتا ہے جو آپ نے <span className="font-mono text-amber-300">developers.facebook.com</span> پر WhatsApp &gt; API Setup کے اندر <strong>&ldquo;To&rdquo; الاؤڈ لسٹ</strong> میں شامل اور OTP سے verify کیے ہوں۔
                </li>
                <li>
                  اگر نمبر شامل نہ ہو تو میٹا ایرر <span className="font-mono text-rose-300">131030 (Recipient phone number not in allowed list)</span> دیتا ہے۔
                </li>
                <li>
                  ہر عام طالب علم یا کسٹمر کو بغیر لسٹ کے میسج بھیجنے کے لیے، میٹا پر اپنا اصل بزنس نمبر رجسٹر کریں اور ایپ کو <strong>Live Mode</strong> میں منتقل کریں۔
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-400">میٹا پورٹل کھولیں:</span>
              <a
                href="https://developers.facebook.com/apps/988528604301930/whatsapp-business/wa-dev-console/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white underline font-semibold transition"
              >
                <span>developers.facebook.com/apps/988528604301930</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Test Sender & Quick Verification */}
        <div className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#C9B38D]/20 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-[#C9B38D]" />
                <span>براہِ راست ٹیسٹ میسج ارسال کریں (Live WhatsApp Test)</span>
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                اپنا یا کسی بھی طالب علم کا واٹس ایپ نمبر درج کر کے چیک کریں کہ میٹا کے ذریعے میسج موصول ہو رہا ہے یا نہیں۔
              </p>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-xl bg-[#25150C] hover:bg-white/10 text-stone-300 hover:text-white border border-[#C9B38D]/30 transition"
              title="تازہ ترین ڈیٹا ریفریش کریں"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#C9B38D]" : ""}`} />
            </button>
          </div>

          <form onSubmit={handleSendTest} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-200 mb-1">
                موصول کنندہ کا واٹس ایپ نمبر *
              </label>
              <input
                type="text"
                required
                placeholder="+923001234567 یا 03353160301"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-200 mb-1">
                درخواست کا اسٹیٹس (Status Template)
              </label>
              <select
                value={testStatus}
                onChange={(e) => setTestStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
              >
                <option value="approved">منظور شدہ (Approved)</option>
                <option value="interview_scheduled">انٹرویو شیڈول (Interview Scheduled)</option>
                <option value="under_review">زیرِ جائزہ (Under Review)</option>
                <option value="rejected">مسترد شدہ (Rejected)</option>
                <option value="pending">نئی درخواست (New / Received)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={testing}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C9B38D] to-[#DFCBB0] text-[#120A05] text-xs font-bold hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 shadow cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{testing ? "ارسال ہو رہا ہے..." : "ٹیسٹ میسج بھیجیں"}</span>
              </button>
            </div>
          </form>

          {/* Test Result Alert */}
          {testResult && (
            <div
              className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                testResult.success
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-500/15 border-rose-500/40 text-rose-200"
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <strong className="block font-bold">
                  {testResult.success ? "کامیابی (Success)!" : "میسج نہیں جا سکا (Failed):"}
                </strong>
                <p className="leading-relaxed">{testResult.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Message Logs History Table */}
        <div className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-[#C9B38D]/20 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C9B38D]" />
                <span>واٹس ایپ میسجنگ تاریخچہ و لاگز (Delivery History & Logs)</span>
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                تمام خودکار اور دستی پیغامات کی کیفیت اور میٹا کی طرف سے موصولہ جواب
              </p>
            </div>
            <span className="text-xs font-mono text-[#C9B38D] bg-[#25150C] px-3 py-1 rounded-full border border-[#C9B38D]/30">
              کل پیغامات: {history.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#24150D] text-[#C9B38D] font-bold border-b border-[#C9B38D]/20">
                <tr>
                  <th className="p-3.5">وقت و تاریخ</th>
                  <th className="p-3.5">درخواست نمبر</th>
                  <th className="p-3.5">موصول کنندہ نمبر</th>
                  <th className="p-3.5">کیفیت (Status)</th>
                  <th className="p-3.5">پیغام / ریمارکس</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-200">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-stone-400">
                      ابھی تک کوئی لاگ ریکارڈ موجود نہیں۔
                    </td>
                  </tr>
                ) : (
                  history.map((msg) => (
                    <tr key={msg.id} className="hover:bg-white/[0.02] transition">
                      <td className="p-3.5 text-stone-400 font-mono text-[11px]" dir="ltr">
                        {new Date(msg.createdAt).toLocaleString("en-PK", {
                          dateStyle: "short",
                          timeStyle: "short"
                        })}
                      </td>
                      <td className="p-3.5 font-mono text-[#C9B38D] font-bold" dir="ltr">
                        {msg.inquiryId || "-"}
                      </td>
                      <td className="p-3.5 font-mono font-semibold text-white" dir="ltr">
                        {msg.recipient}
                      </td>
                      <td className="p-3.5">
                        {msg.status === "queued" || msg.status === "sent" || msg.status === "delivered" ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            کامیاب (Queued)
                          </span>
                        ) : msg.status === "skipped" ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            چھوڑ دیا گیا (Skipped)
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                            ناکام (Failed)
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-stone-300 max-w-md truncate">
                        {msg.metadata?.error || msg.message}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}