import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Users,
  Image as ImageIcon,
  HeartHandshake,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  ArrowRight,
  TrendingUp,
  FileText
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.stats.getDashboard();
      if (res.success) {
        setStats(res.stats);
        setRecentAdmissions(res.recentAdmissions || []);
        setRecentRequests(res.recentRequests || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickStatusChange = async (admissionId: string, newStatus: string) => {
    try {
      setUpdatingId(admissionId);
      await api.admissions.update(admissionId, { status: newStatus });
      await fetchDashboardData();
    } catch (err: any) {
      alert("کیفیت تبدیل کرنے میں خرابی: " + err.message);
    } finally {
      setUpdatingId(null);
    }
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
        title="مرکزی انتظامی ڈیش بورڈ"
        subtitle="مدرسہ صاحب الزمان (عج) کے تمام شعبہ جات کا مجموعی خلاصہ و سرگرمیاں"
      >
        <Link
          to="/admin/admissions"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
        >
          <GraduationCap className="w-4 h-4" />
          <span>داخلہ جات کی فہرست</span>
        </Link>
      </AdminHeader>

      <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Admissions */}
          <div className="p-5 rounded-2xl backdrop-blur-[40px] border border-[#C9B38D]/25 shadow-lg relative overflow-hidden group hover:border-[#C9B38D]/50 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#C9B38D] font-semibold">آن لائن داخلے</span>
              <div className="w-10 h-10 rounded-xl bg-[#C9B38D]/10 text-[#C9B38D] flex items-center justify-center border border-[#C9B38D]/20">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold text-white font-sans">
                {stats?.admissions?.total ?? "..."}
              </h3>
              <div className="text-xs text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                {stats?.admissions?.pending ?? 0} زیرِ غور
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-300">
              <span>منظور شدہ: <b className="text-emerald-400 font-sans">{stats?.admissions?.approved ?? 0}</b></span>
              <Link to="/admin/admissions" className="text-[#C9B38D] hover:underline flex items-center gap-1">
                دیکھیں <ArrowRight className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Card 2: Books in Library */}
          <div className="p-5 rounded-2xl backdrop-blur-xl border border-[#C9B38D]/25 shadow-lg relative overflow-hidden group hover:border-[#C9B38D]/50 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#C9B38D] font-semibold">کتب خانہ (کتب)</span>
              <div className="w-10 h-10 rounded-xl bg-[#C9B38D]/10 text-[#C9B38D] flex items-center justify-center border border-[#C9B38D]/20">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold text-white font-sans">
                {stats?.books?.total ?? "..."}
              </h3>
              <div className="text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                {stats?.bookRequests?.pending ?? 0} فرمائشیں
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-300">
              <span>عطیات کتب: <b className="text-white font-sans">{stats?.bookDonations?.total ?? 0}</b></span>
              <Link to="/admin/books" className="text-[#C9B38D] hover:underline flex items-center gap-1">
                انتظام کریں <ArrowRight className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Card 3: Staff & Faculty */}
          <div className="p-5 rounded-2xl backdrop-blur-xl border border-[#C9B38D]/25 shadow-lg relative overflow-hidden group hover:border-[#C9B38D]/50 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#C9B38D] font-semibold">اساتذہ و عملہ</span>
              <div className="w-10 h-10 rounded-xl bg-[#C9B38D]/10 text-[#C9B38D] flex items-center justify-center border border-[#C9B38D]/20">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-bold text-white font-sans">
                {stats?.staff?.total ?? "..."}
              </h3>
              <span className="text-xs text-stone-400">تمام فعال</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-300">
              <span>حوزوی و عصری اساتذہ</span>
              <Link to="/admin/staff" className="text-[#C9B38D] hover:underline flex items-center gap-1">
                فہرست دیکھیں <ArrowRight className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Card 4: Verified Donations */}
          <div className="p-5 rounded-2xl backdrop-blur-xl border border-[#C9B38D]/25 shadow-lg relative overflow-hidden group hover:border-[#C9B38D]/50 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#C9B38D] font-semibold">موصولہ عطیات (روپے)</span>
              <div className="w-10 h-10 rounded-xl bg-[#C9B38D]/10 text-[#C9B38D] flex items-center justify-center border border-[#C9B38D]/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#C9B38D] font-sans">
                {stats?.donations?.verifiedTotalAmount ? `Rs. ${stats.donations.verifiedTotalAmount.toLocaleString()}` : "Rs. 0"}
              </h3>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-300">
              <span>رسیدیں جمع: <b className="text-white font-sans">{stats?.donations?.totalSubmissions ?? 0}</b></span>
              <Link to="/admin/donations" className="text-[#C9B38D] hover:underline flex items-center gap-1">
                تصدیق کریں <ArrowRight className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="p-5 rounded-2xl backdrop-blur-xl border border-[#C9B38D]/20">
          <h4 className="text-sm font-bold text-white mb-3.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9B38D]" />
            فوری انتظامی کارروائی (Quick Actions)
          </h4>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/admissions"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md border border-[#C9B38D]/30 text-xs font-semibold text-white transition hover:border-[#C9B38D]"
            >
              <GraduationCap className="w-4 h-4 text-[#C9B38D]" />
              <span>داخلہ درخواستوں کا جائزہ لیں</span>
            </Link>
            <Link
              to="/admin/books"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md border border-[#C9B38D]/30 text-xs font-semibold text-white transition hover:border-[#C9B38D]"
            >
              <Plus className="w-4 h-4 text-[#C9B38D]" />
              <span>نئی کتاب شامل کریں</span>
            </Link>
            <Link
              to="/admin/staff"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md border border-[#C9B38D]/30 text-xs font-semibold text-white transition hover:border-[#C9B38D]"
            >
              <Plus className="w-4 h-4 text-[#C9B38D]" />
              <span>نیا استاد / عملہ شامل کریں</span>
            </Link>
            <Link
              to="/admin/gallery"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md border border-[#C9B38D]/30 text-xs font-semibold text-white transition hover:border-[#C9B38D]"
            >
              <ImageIcon className="w-4 h-4 text-[#C9B38D]" />
              <span>گیلری میڈیا اپلوڈ کریں</span>
            </Link>
            <Link
              to="/admin/settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md border border-[#C9B38D]/30 text-xs font-semibold text-white transition hover:border-[#C9B38D]"
            >
              <FileText className="w-4 h-4 text-[#C9B38D]" />
              <span>مدرسہ ترتیبات و فیس تبدیل کریں</span>
            </Link>
          </div>
        </div>

        {/* Recent Admissions Section */}
        <div className="rounded-2xl backdrop-blur-xl border border-[#C9B38D]/25 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-[#C9B38D]/20 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                حالیہ موصول ہونے والی داخلہ درخواستیں
              </h3>
              <p className="text-xs text-stone-300">
                طالب علموں کے آن لائن فارم اور ان کی فوری کیفیت
              </p>
            </div>
            <Link
              to="/admin/admissions"
              className="text-xs font-bold text-[#C9B38D] hover:underline flex items-center gap-1"
            >
              تمام درخواستیں دیکھیں
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="backdrop-blur-md text-[#C9B38D] text-xs font-bold border-b border-[#C9B38D]/20">
                <tr>
                  <th className="p-3.5">درخواست نمبر</th>
                  <th className="p-3.5">طالب علم کا نام</th>
                  <th className="p-3.5">والد کا نام</th>
                  <th className="p-3.5">مطلوبہ شعبہ</th>
                  <th className="p-3.5">فون / رابطہ</th>
                  <th className="p-3.5">موجودہ کیفیت</th>
                  <th className="p-3.5">فوری ایکشن</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-200">
                {recentAdmissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-400">
                      فی الوقت کوئی داخلہ درخواست موجود نہیں ہے۔
                    </td>
                  </tr>
                ) : (
                  recentAdmissions.map((adm) => (
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
                      <td className="p-3.5 text-stone-300">
                        {adm.selectedCourse}
                      </td>
                      <td className="p-3.5 font-mono text-stone-300" dir="ltr">
                        {adm.phone}
                      </td>
                      <td className="p-3.5">
                        {getStatusBadge(adm.status)}
                      </td>
                      <td className="p-3.5">
                        <select
                          disabled={updatingId === adm.id}
                          value={adm.status}
                          onChange={(e) => handleQuickStatusChange(adm.id, e.target.value)}
                          className="bg-[#24150D] border border-[#C9B38D]/30 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none cursor-pointer"
                        >
                          <option value="pending">زیرِ جائزہ (Pending)</option>
                          <option value="interview_scheduled">انٹرویو مقرر کریں</option>
                          <option value="approved">منظور کریں (Approve)</option>
                          <option value="rejected">مسترد کریں (Reject)</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Book Requests */}
        <div className="rounded-2xl backdrop-blur-xl border border-[#C9B38D]/25 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-[#C9B38D]/20 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                طلبہ و محققین کی کتب کی فرمائشیں
              </h3>
              <p className="text-xs text-stone-300">
                لائبریری میں نایاب کتب کی مانگ
              </p>
            </div>
            <Link
              to="/admin/books"
              className="text-xs font-bold text-[#C9B38D] hover:underline flex items-center gap-1"
            >
              کتب خانہ مینیج کریں
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="backdrop-blur-md text-[#C9B38D] text-xs font-bold border-b border-[#C9B38D]/20">
                <tr>
                  <th className="p-3.5">نام طالب علم / محقق</th>
                  <th className="p-3.5">رابطہ نمبر</th>
                  <th className="p-3.5">مطلوبہ کتاب</th>
                  <th className="p-3.5">مصنف کا نام</th>
                  <th className="p-3.5">مقصد</th>
                  <th className="p-3.5">کیفیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-200">
                {recentRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-stone-400">
                      کوئی فرمائش موجود نہیں ہے۔
                    </td>
                  </tr>
                ) : (
                  recentRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/[0.02] transition">
                      <td className="p-3.5 font-bold text-white">
                        {req.name}
                      </td>
                      <td className="p-3.5 font-mono text-stone-300" dir="ltr">
                        {req.phone}
                      </td>
                      <td className="p-3.5 font-bold text-[#C9B38D]">
                        {req.bookName}
                      </td>
                      <td className="p-3.5 text-stone-300">
                        {req.authorName || "نامعلوم"}
                      </td>
                      <td className="p-3.5 text-stone-300">
                        {req.purpose}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {req.status === "pending" ? "زیرِ تلاش" : req.status}
                        </span>
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
