import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  X,
  FileSpreadsheet,
  Download,
  MessageCircle,
  Send,
  AlertCircle
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Edit State
  const [editStatus, setEditStatus] = useState("");
  const [editInterviewDate, setEditInterviewDate] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);
  const [whatsappNotice, setWhatsappNotice] = useState<{ success: boolean; message: string } | null>(null);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await api.admissions.getAll();
      if (res.success) {
        setAdmissions(res.data || []);
      }
    } catch (err) {
      console.error("Error fetching admissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  useEffect(() => {
    let list = [...admissions];

    if (selectedStatus !== "all") {
      list = list.filter((item) => item.status === selectedStatus);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.fullName.toLowerCase().includes(q) ||
          item.fatherName.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          (item.city && item.city.toLowerCase().includes(q)) ||
          item.selectedCourse.toLowerCase().includes(q)
      );
    }

    setFilteredAdmissions(list);
  }, [admissions, selectedStatus, searchQuery]);

  const handleOpenDetails = (item: any) => {
    setSelectedItem(item);
    setEditStatus(item.status);
    setEditInterviewDate(item.interviewDate || "");
    setEditNotes(item.notes || "");
    setWhatsappNotice(null);
  };

  const handleSaveDetails = async () => {
    if (!selectedItem) return;
    try {
      setSaving(true);
      const res = await api.admissions.update(selectedItem.id, {
        status: editStatus,
        interviewDate: editInterviewDate,
        notes: editNotes,
      });
      await fetchAdmissions();
      
      let msg = "درخواست کی تفصیلات کامیابی کے ساتھ محفوظ ہو گئیں۔";
      if (res?.whatsapp) {
        if (res.whatsapp.success) {
          msg += "\n\n✅ واٹس ایپ نوٹیفکیشن کامیابی کے ساتھ موصول کنندہ کو ارسال ہو گئی!";
        } else if (res.whatsapp.status !== "skipped") {
          msg += `\n\n⚠️ واٹس ایپ نوٹیفکیشن کا نوٹ:\n${res.whatsapp.reason}`;
        }
      }
      alert(msg);
      setSelectedItem(null);
    } catch (err: any) {
      alert("محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleManualSendWhatsApp = async () => {
    if (!selectedItem) return;
    try {
      setSendingWhatsApp(true);
      setWhatsappNotice(null);
      const res = await api.admissions.sendWhatsApp(selectedItem.id, editStatus);
      if (res.success) {
        setWhatsappNotice({
          success: true,
          message: "واٹس ایپ نوٹیفکیشن کامیابی کے ساتھ ارسال ہو گئی!"
        });
      } else {
        setWhatsappNotice({
          success: false,
          message: res.message || res.data?.reason || "واٹس ایپ نوٹیفکیشن نہیں جا سکی۔"
        });
      }
    } catch (err: any) {
      setWhatsappNotice({
        success: false,
        message: err.message || "نوٹیفکیشن بھیجنے میں خرابی پیش آگئی۔"
      });
    } finally {
      setSendingWhatsApp(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`کیا آپ واقعی درخواست نمبر ${id} کو مستقل طور پر حذف کرنا چاہتے ہیں؟`)) {
      return;
    }
    try {
      await api.admissions.delete(id);
      await fetchAdmissions();
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err: any) {
      alert("حذف کرنے میں خرابی: " + err.message);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">منظور شدہ (Approved)</span>;
      case "interview_scheduled":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">انٹرویو طے شدہ</span>;
      case "rejected":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">مسترد (Rejected)</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">زیرِ جائزہ (Pending)</span>;
    }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="شعبہ داخلہ جات (Admissions Management)"
        subtitle="آن لائن داخلہ فارمز، انٹرویو شیڈولنگ اور طلبہ کی منظوری کا مکمل نظام"
      />

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Filters and Search Bar */}
        <div className="p-5 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/25 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "تمام درخواستیں" },
              { id: "pending", label: "زیرِ جائزہ" },
              { id: "interview_scheduled", label: "انٹرویو مقرر" },
              { id: "approved", label: "منظور شدہ" },
              { id: "rejected", label: "مسترد شدہ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedStatus === tab.id
                    ? "bg-[#C9B38D] text-[#120A05] shadow"
                    : "bg-[#25150C] text-stone-300 hover:text-white border border-[#C9B38D]/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="نام، فون، شہر یا درخواست نمبر سے تلاش کریں..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white text-xs placeholder:text-stone-400 focus:outline-none focus:border-[#C9B38D]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Admissions Table */}
        <div className="rounded-2xl bg-[#1C1009] border border-[#C9B38D]/25 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-[#24150D] text-[#C9B38D] text-xs font-bold border-b border-[#C9B38D]/20">
                <tr>
                  <th className="p-3.5">درخواست نمبر</th>
                  <th className="p-3.5">امیدوار کا نام</th>
                  <th className="p-3.5">والد کا نام</th>
                  <th className="p-3.5">شعبہ / کورس</th>
                  <th className="p-3.5">شہر</th>
                  <th className="p-3.5">رابطہ فون</th>
                  <th className="p-3.5">تعلیمی قابلیت</th>
                  <th className="p-3.5">کیفیت</th>
                  <th className="p-3.5 text-center">ایکشن</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-200">
                {filteredAdmissions.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-10 text-center text-stone-400">
                      کوئی ریکارڈ نہیں ملا۔
                    </td>
                  </tr>
                ) : (
                  filteredAdmissions.map((adm) => (
                    <tr key={adm.id} className="hover:bg-white/[0.02] transition">
                      <td className="p-3.5 font-mono font-bold text-[#C9B38D]" dir="ltr">
                        {adm.id}
                      </td>
                      <td className="p-3.5 font-bold text-white">
                        {adm.fullName}
                      </td>
                      <td className="p-3.5 text-stone-300">
                        {adm.fatherName}
                      </td>
                      <td className="p-3.5 text-stone-300 max-w-[200px] truncate">
                        {adm.selectedCourse}
                      </td>
                      <td className="p-3.5 text-stone-300">
                        {adm.city || "-"}
                      </td>
                      <td className="p-3.5 font-mono text-stone-300" dir="ltr">
                        {adm.phone}
                      </td>
                      <td className="p-3.5 text-stone-300">
                        {adm.previousEducation}
                      </td>
                      <td className="p-3.5">
                        {getStatusBadge(adm.status)}
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenDetails(adm)}
                            className="p-1.5 rounded-lg bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/30 transition"
                            title="تفصیلات دیکھیں و ایڈٹ کریں"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(adm.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                            title="حذف کریں"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Detail / Edit Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-2xl my-6 p-6 sm:p-8 relative shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 border-b border-[#C9B38D]/20 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25150C] border border-[#C9B38D]/30 text-xs text-[#C9B38D] font-mono mb-2" dir="ltr">
                ID: {selectedItem.id}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                تفصیلاتِ درخواستِ داخلہ
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                موصولہ تاریخ: {new Date(selectedItem.createdAt).toLocaleDateString("ur-PK")}
              </p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-3 rounded-xl bg-[#24150D] border border-white/5">
                <span className="text-stone-400 block mb-0.5">نام امیدوار:</span>
                <span className="text-sm font-bold text-white">{selectedItem.fullName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#24150D] border border-white/5">
                <span className="text-stone-400 block mb-0.5">والد / سرپرست:</span>
                <span className="text-sm font-bold text-white">{selectedItem.fatherName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#24150D] border border-white/5">
                <span className="text-stone-400 block mb-0.5">شعبہ / کورس:</span>
                <span className="text-sm font-bold text-[#C9B38D]">{selectedItem.selectedCourse}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#24150D] border border-white/5">
                <span className="text-stone-400 block mb-0.5">رابطہ نمبر:</span>
                <span className="text-sm font-mono text-white" dir="ltr">{selectedItem.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#24150D] border border-white/5">
                <span className="text-stone-400 block mb-0.5">عمر اور جنس:</span>
                <span className="text-sm text-white">{selectedItem.age ? `${selectedItem.age} سال` : "-"} ({selectedItem.gender})</span>
              </div>
              <div className="p-3 rounded-xl bg-[#24150D] border border-white/5">
                <span className="text-stone-400 block mb-0.5">شہر و رہائش:</span>
                <span className="text-sm text-white">{selectedItem.city || "-"} - {selectedItem.residenceType}</span>
              </div>
              <div className="sm:col-span-2 p-3 rounded-xl bg-[#24150D] border border-white/5">
                <span className="text-stone-400 block mb-0.5">سابقہ تعلیمی قابلیت:</span>
                <span className="text-sm text-white">{selectedItem.previousEducation}</span>
              </div>
              {selectedItem.message && (
                <div className="sm:col-span-2 p-3 rounded-xl bg-[#24150D] border border-white/5">
                  <span className="text-stone-400 block mb-0.5">اضافی نوٹ / پیغام:</span>
                  <p className="text-xs text-stone-200 leading-relaxed">{selectedItem.message}</p>
                </div>
              )}
            </div>

            {/* Admin Management Section */}
            <div className="p-4 rounded-2xl bg-[#25150C] border border-[#C9B38D]/30 space-y-4">
              <h4 className="text-xs font-bold text-[#C9B38D]">
                انتظامی کارروائی و انٹرویو شیڈول
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-200 mb-1">
                    درخواست کی کیفیت (Status)
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1C1009] border border-[#C9B38D]/30 text-white text-xs focus:outline-none"
                  >
                    <option value="pending">زیرِ جائزہ (Pending)</option>
                    <option value="interview_scheduled">انٹرویو مقرر کریں (Interview Scheduled)</option>
                    <option value="approved">منظور کریں (Approved)</option>
                    <option value="rejected">مسترد کریں (Rejected)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-200 mb-1">
                    انٹرویو کی تاریخ و وقت
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 05 نومبر 2026 صبح 11 بجے"
                    value={editInterviewDate}
                    onChange={(e) => setEditInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1C1009] border border-[#C9B38D]/30 text-white text-xs focus:outline-none placeholder:text-stone-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-200 mb-1">
                  ایڈمن کے نوٹس / ریمارکس (صرف انتظامیہ کے لیے)
                </label>
                <textarea
                  rows={2}
                  placeholder="انٹرویو نتیجہ یا فیس کی تفصیلات..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#1C1009] border border-[#C9B38D]/30 text-white text-xs focus:outline-none placeholder:text-stone-500 resize-none"
                />
              </div>

              {/* WhatsApp Notification Direct Trigger */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <MessageCircle className="w-4 h-4 text-[#C9B38D]" />
                  <span className="text-stone-300">واٹس ایپ الرٹ:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    selectedItem.whatsappConsent
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                  }`}>
                    {selectedItem.whatsappConsent ? "اجازت موجود ہے (Consent Given)" : "عام نوٹیفکیشن"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleManualSendWhatsApp}
                  disabled={sendingWhatsApp}
                  className="px-3.5 py-1.5 rounded-xl bg-[#25150C] hover:bg-[#C9B38D] text-stone-200 hover:text-[#120A05] text-xs font-bold border border-[#C9B38D]/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  title="منتخب کردہ اسٹیٹس کے مطابق ابھی واٹس ایپ پیغام بھیجیں"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sendingWhatsApp ? "بھیجا جا رہا ہے..." : "ابھی واٹس ایپ میسج بھیجیں"}</span>
                </button>
              </div>

              {/* WhatsApp Notice in Modal */}
              {whatsappNotice && (
                <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                  whatsappNotice.success
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                    : "bg-rose-500/15 border-rose-500/40 text-rose-300"
                }`}>
                  {whatsappNotice.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{whatsappNotice.message}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                onClick={handlePrintSlip}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs transition"
              >
                <Printer className="w-4 h-4 text-[#C9B38D]" />
                <span>سلپ پرنٹ کریں</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 text-xs hover:bg-white/10 transition"
                >
                  منسوخ کریں
                </button>
                <button
                  onClick={handleSaveDetails}
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] text-xs font-bold transition shadow"
                >
                  {saving ? "محفوظ ہو رہا ہے..." : "تبدیلیاں محفوظ کریں"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
