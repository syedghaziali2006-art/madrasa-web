import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Trash2,
  Edit,
  Mail,
  Phone,
  GraduationCap,
  Award,
  X,
  CheckCircle2,
  Clock,
  History,
  Heart,
  Sparkles,
  Save,
  Calendar,
  Layers,
  ArrowRight,
  BookOpen
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

type MainTab = "currentStaff" | "milestones" | "formerFaculty" | "founderStats";

export default function AdminStaffPage() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("currentStaff");

  // Staff List State
  const [staffList, setStaffList] = useState<any[]>([]);
  const [selectedStaffCategory, setSelectedStaffCategory] = useState("all");
  const [staffLoading, setStaffLoading] = useState(true);

  // History Content State
  const [historyContent, setHistoryContent] = useState<any>(null);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historySaving, setHistorySaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Modals State
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({
    name: "",
    title: "",
    category: "faculty",
    department: "",
    qualification: "",
    experience: "",
    image: "/images/layout/avatar1.jpg",
    email: "",
    phone: "",
    isOnlineActive: true,
    order: 10,
  });

  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [milestoneForm, setMilestoneForm] = useState({
    year: "",
    hijriYear: "",
    title: "",
    subtitle: "",
    description: "",
    highlight: "",
  });

  const [isFormerModalOpen, setIsFormerModalOpen] = useState(false);
  const [editingFormerId, setEditingFormerId] = useState<string | null>(null);
  const [formerForm, setFormerForm] = useState({
    name: "",
    title: "",
    tenure: "",
    department: "",
    contribution: "",
    image: "/images/faculty/founder-scholar.jpg",
    status: "رحمۃ اللہ علیہ",
  });

  // Fetch Current Staff
  const fetchStaff = async () => {
    try {
      setStaffLoading(true);
      const res = await api.staff.getAll();
      if (res.success) {
        setStaffList(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStaffLoading(false);
    }
  };

  // Fetch History Content
  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await api.history.get();
      if (res.success) {
        setHistoryContent(res.data);
      }
    } catch (err) {
      console.error("Error loading history content:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchHistory();
  }, []);

  // Save entire history content helper
  const saveHistoryContent = async (updated: any) => {
    try {
      setHistorySaving(true);
      const res = await api.history.update(updated);
      if (res.success) {
        setHistoryContent(res.data);
        setSaveSuccessMsg("سفر و اساتذہ کا مواد کامیابی سے محفوظ ہو گیا!");
        setTimeout(() => setSaveSuccessMsg(""), 4000);
      }
    } catch (err: any) {
      alert("محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setHistorySaving(false);
    }
  };

  // --- STAFF ACTIONS ---
  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    setStaffForm({
      name: "",
      title: "",
      category: "faculty",
      department: "",
      qualification: "",
      experience: "",
      image: "/images/layout/avatar1.jpg",
      email: "",
      phone: "",
      isOnlineActive: true,
      order: (staffList.length + 1) * 2,
    });
    setIsStaffModalOpen(true);
  };

  const handleOpenEditStaff = (staff: any) => {
    setEditingStaffId(staff.id);
    setStaffForm({
      name: staff.name,
      title: staff.title,
      category: staff.category || "faculty",
      department: staff.department || "",
      qualification: staff.qualification || "",
      experience: staff.experience || "",
      image: staff.image || "/images/layout/avatar1.jpg",
      email: staff.email || "",
      phone: staff.phone || "",
      isOnlineActive: staff.isOnlineActive ?? true,
      order: staff.order || 10,
    });
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStaffLoading(true);
      if (editingStaffId) {
        await api.staff.update(editingStaffId, staffForm);
      } else {
        await api.staff.create(staffForm);
      }
      await fetchStaff();
      setIsStaffModalOpen(false);
    } catch (err: any) {
      alert("محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setStaffLoading(false);
    }
  };

  const handleDeleteStaff = async (id: string, name: string) => {
    if (!confirm(`کیا آپ واقعی "${name}" کو فہرست سے حذف کرنا چاہتے ہیں؟`)) return;
    try {
      await api.staff.delete(id);
      await fetchStaff();
    } catch (err: any) {
      alert("حذف کرنے میں خرابی: " + err.message);
    }
  };

  // --- MILESTONES ACTIONS ---
  const handleOpenAddMilestone = () => {
    setEditingMilestoneId(null);
    setMilestoneForm({
      year: "",
      hijriYear: "",
      title: "",
      subtitle: "",
      description: "",
      highlight: "",
    });
    setIsMilestoneModalOpen(true);
  };

  const handleOpenEditMilestone = (m: any) => {
    setEditingMilestoneId(m.id || m.year);
    setMilestoneForm({
      year: m.year,
      hijriYear: m.hijriYear || "",
      title: m.title,
      subtitle: m.subtitle || "",
      description: m.description,
      highlight: m.highlight || "",
    });
    setIsMilestoneModalOpen(true);
  };

  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!historyContent) return;

    let updatedMilestones = [...(historyContent.milestones || [])];
    if (editingMilestoneId) {
      updatedMilestones = updatedMilestones.map((item) =>
        (item.id === editingMilestoneId || item.year === editingMilestoneId)
          ? { ...item, ...milestoneForm }
          : item
      );
    } else {
      const newM = {
        id: "m_" + Date.now(),
        ...milestoneForm,
      };
      updatedMilestones.push(newM);
    }

    const updated = { ...historyContent, milestones: updatedMilestones };
    await saveHistoryContent(updated);
    setIsMilestoneModalOpen(false);
  };

  const handleDeleteMilestone = async (id: string, title: string) => {
    if (!confirm(`کیا آپ واقعی "${title}" کو حذف کرنا چاہتے ہیں؟`)) return;
    if (!historyContent) return;

    const updatedMilestones = (historyContent.milestones || []).filter(
      (item: any) => item.id !== id && item.year !== id
    );
    const updated = { ...historyContent, milestones: updatedMilestones };
    await saveHistoryContent(updated);
  };

  // --- FORMER FACULTY ACTIONS ---
  const handleOpenAddFormer = () => {
    setEditingFormerId(null);
    setFormerForm({
      name: "",
      title: "",
      tenure: "",
      department: "",
      contribution: "",
      image: "/images/faculty/founder-scholar.jpg",
      status: "رحمۃ اللہ علیہ",
    });
    setIsFormerModalOpen(true);
  };

  const handleOpenEditFormer = (f: any) => {
    setEditingFormerId(f.id);
    setFormerForm({
      name: f.name,
      title: f.title,
      tenure: f.tenure,
      department: f.department,
      contribution: f.contribution,
      image: f.image || "/images/faculty/founder-scholar.jpg",
      status: f.status || "رحمۃ اللہ علیہ",
    });
    setIsFormerModalOpen(true);
  };

  const handleSaveFormer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!historyContent) return;

    let updatedList = [...(historyContent.formerFaculty || [])];
    if (editingFormerId) {
      updatedList = updatedList.map((item) =>
        item.id === editingFormerId ? { ...item, ...formerForm } : item
      );
    } else {
      const newF = {
        id: "ff_" + Date.now(),
        ...formerForm,
      };
      updatedList.push(newF);
    }

    const updated = { ...historyContent, formerFaculty: updatedList };
    await saveHistoryContent(updated);
    setIsFormerModalOpen(false);
  };

  const handleDeleteFormer = async (id: string, name: string) => {
    if (!confirm(`کیا آپ واقعی سابق استاد "${name}" کو حذف کرنا چاہتے ہیں؟`)) return;
    if (!historyContent) return;

    const updatedList = (historyContent.formerFaculty || []).filter((item: any) => item.id !== id);
    const updated = { ...historyContent, formerFaculty: updatedList };
    await saveHistoryContent(updated);
  };

  // Filtered Current Staff
  const filteredStaff = staffList.filter((s) => {
    if (selectedStaffCategory === "all") return true;
    return s.category === selectedStaffCategory;
  });

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="شعبہ سفر و اساتذہ مواد منیجمنٹ"
        subtitle="تاریخی سفر کے سنگِ میل، بانیِ ادارہ، سابقہ اکابرین اور موجودہ اساتذہ کرام کا مکمل لائیو کنٹرول"
      >
        <div className="flex items-center gap-2">
          {saveSuccessMsg && (
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl animate-fade-in">
              {saveSuccessMsg}
            </span>
          )}
          {activeMainTab === "currentStaff" && (
            <button
              onClick={handleOpenAddStaff}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>نیا استاد / عملہ شامل کریں</span>
            </button>
          )}
          {activeMainTab === "milestones" && (
            <button
              onClick={handleOpenAddMilestone}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>نیا سنگِ میل شامل کریں</span>
            </button>
          )}
          {activeMainTab === "formerFaculty" && (
            <button
              onClick={handleOpenAddFormer}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>سابق استاد شامل کریں</span>
            </button>
          )}
        </div>
      </AdminHeader>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Main Section Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/20">
          <button
            onClick={() => setActiveMainTab("currentStaff")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === "currentStaff"
                ? "bg-[#C9B38D] text-[#120A05] shadow-[0_4px_15px_rgba(201,179,141,0.3)]"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>موجودہ اساتذہ و عملہ</span>
            <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full">{staffList.length}</span>
          </button>

          <button
            onClick={() => setActiveMainTab("milestones")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === "milestones"
                ? "bg-[#C9B38D] text-[#120A05] shadow-[0_4px_15px_rgba(201,179,141,0.3)]"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <History className="w-4 h-4" />
            <span>سفر و سنگِ میل ٹائم لائن</span>
            <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full">
              {historyContent?.milestones?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab("formerFaculty")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === "formerFaculty"
                ? "bg-[#C9B38D] text-[#120A05] shadow-[0_4px_15px_rgba(201,179,141,0.3)]"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>سابقہ اساتذہ و اکابرین</span>
            <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full">
              {historyContent?.formerFaculty?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab("founderStats")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === "founderStats"
                ? "bg-[#C9B38D] text-[#120A05] shadow-[0_4px_15px_rgba(201,179,141,0.3)]"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>بانی، تعارف و اعدادوشمار</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: CURRENT STAFF */}
        {/* ============================================================== */}
        {activeMainTab === "currentStaff" && (
          <div className="space-y-6">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/20">
              {[
                { id: "all", label: "تمام عملہ و اساتذہ" },
                { id: "leadership", label: "قیادت و سرپرستی" },
                { id: "faculty", label: "اساتذہ درسِ نظامی و عصری" },
                { id: "quran", label: "اساتذہ شعبہ حفظ و تجوید" },
                { id: "admin", label: "شعبہ انتظامیہ" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedStaffCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedStaffCategory === cat.id
                      ? "bg-[#C9B38D] text-[#120A05] shadow"
                      : "bg-[#25150C] text-stone-300 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-2xl p-5 flex flex-col justify-between hover:border-[#C9B38D]/60 transition shadow-lg relative group"
                >
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9B38D] bg-[#24150D] shrink-0 shadow-[0_0_15px_rgba(201,179,141,0.3)]">
                        <img
                          src={staff.image || "/images/layout/avatar1.jpg"}
                          alt={staff.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] bg-[#C9B38D]/20 text-[#C9B38D] px-2 py-0.5 rounded mb-1">
                          {staff.category === "leadership"
                            ? "قیادت"
                            : staff.category === "quran"
                            ? "دار القرآن"
                            : staff.category === "admin"
                            ? "انتظامیہ"
                            : "حوزوی تدریس"}
                        </span>
                        <h4 className="text-base font-bold text-white leading-tight">
                          {staff.name}
                        </h4>
                        <p className="text-xs text-[#C9B38D] mt-0.5">{staff.title}</p>
                        <p className="text-[11px] text-stone-400 mt-0.5">{staff.department}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-300 bg-[#24150D] p-3 rounded-xl mb-4 border border-white/5">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-[#C9B38D] shrink-0" />
                        <span className="line-clamp-1">{staff.qualification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-[#C9B38D] shrink-0" />
                        <span>{staff.experience}</span>
                      </div>
                      {staff.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#C9B38D] shrink-0" />
                          <span className="font-mono" dir="ltr">{staff.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-400 font-mono">ترتیب: #{staff.order}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditStaff(staff)}
                        className="p-1.5 rounded-lg bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/25 transition"
                        title="ترمیم کریں"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(staff.id, staff.name)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                        title="حذف کریں"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: MILESTONES TIMELINE */}
        {/* ============================================================== */}
        {activeMainTab === "milestones" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#1C1009] p-4 rounded-2xl border border-[#C9B38D]/20">
              <div>
                <h3 className="text-base font-bold text-white">تاریخی سنگِ میل و ارتقائی سفر</h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  ویب سائٹ کے &ldquo;تاریخ اور پس منظر&rdquo; والے سیکشن میں نمائش کے لیے
                </p>
              </div>
              <button
                onClick={handleOpenAddMilestone}
                className="px-3.5 py-1.5 rounded-xl bg-[#C9B38D] text-[#120A05] text-xs font-bold hover:brightness-105 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>نیا سنگِ میل</span>
              </button>
            </div>

            <div className="space-y-4">
              {(historyContent?.milestones || []).map((m: any, idx: number) => (
                <div
                  key={m.id || idx}
                  className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-2xl p-5 hover:border-[#C9B38D]/60 transition flex flex-col md:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-[#C9B38D]/20 text-[#C9B38D] font-bold text-sm">
                        {m.year}
                      </span>
                      {m.hijriYear && (
                        <span className="text-xs text-stone-400">{m.hijriYear}</span>
                      )}
                      {m.highlight && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#24130A] border border-[#C9B38D]/30 text-amber-200">
                          {m.highlight}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white leading-tight">{m.title}</h4>
                    {m.subtitle && (
                      <p className="text-xs font-semibold text-[#D9C7A7]">{m.subtitle}</p>
                    )}
                    <p className="text-xs text-stone-300 leading-relaxed max-w-4xl">
                      {m.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => handleOpenEditMilestone(m)}
                      className="p-2 rounded-xl bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/25 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMilestone(m.id || m.year, m.title)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: FORMER FACULTY MEMORIAL */}
        {/* ============================================================== */}
        {activeMainTab === "formerFaculty" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#1C1009] p-4 rounded-2xl border border-[#C9B38D]/20">
              <div>
                <h3 className="text-base font-bold text-white">محسنین و سابق اساتذہ کرام</h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  جن اساتذہ نے مدرسے کے لیے ماضی میں بے لوث خدمات انجام دیں
                </p>
              </div>
              <button
                onClick={handleOpenAddFormer}
                className="px-3.5 py-1.5 rounded-xl bg-[#C9B38D] text-[#120A05] text-xs font-bold hover:brightness-105 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>سابق استاد شامل کریں</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(historyContent?.formerFaculty || []).map((f: any) => (
                <div
                  key={f.id}
                  className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-2xl p-5 flex flex-col justify-between hover:border-[#C9B38D]/60 transition shadow-lg"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C9B38D]/40 bg-[#24150D] shrink-0">
                        <img
                          src={f.image || "/images/faculty/founder-scholar.jpg"}
                          alt={f.name}
                          className="object-cover w-full h-full sepia-[0.3]"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] bg-[#22130A] text-[#C9B38D] px-2 py-0.5 rounded-full border border-[#C9B38D]/30 inline-block mb-1">
                          {f.status}
                        </span>
                        <h4 className="text-base font-bold text-white truncate">{f.name}</h4>
                        <p className="text-xs text-stone-300 truncate">{f.title}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#24150D] border border-white/5 text-xs text-[#D9C7A7] flex items-center justify-between mb-3">
                      <span>مدتِ خدمت:</span>
                      <span className="font-bold text-white">{f.tenure}</span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed line-clamp-3 mb-2">
                      {f.contribution}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-400">شعبہ: {f.department}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditFormer(f)}
                        className="p-1.5 rounded-lg bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/25 transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFormer(f.id, f.name)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: FOUNDER & STATS */}
        {/* ============================================================== */}
        {activeMainTab === "founderStats" && historyContent && (
          <div className="space-y-6">
            {/* Hero & Top Stats */}
            <div className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#C9B38D]/20 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">صفحہ کے اوپری بینر اور اعداد و شمار (Stats)</h3>
                  <p className="text-xs text-stone-400">سفر و اساتذہ پیج کے سب سے اوپر نظر آنے والے اعداد و شمار</p>
                </div>
                <button
                  onClick={() => saveHistoryContent(historyContent)}
                  disabled={historySaving}
                  className="px-5 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] text-xs font-bold hover:brightness-105 flex items-center gap-2 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>{historySaving ? "محفوظ ہو رہا ہے..." : "تبدیلیاں محفوظ کریں"}</span>
                </button>
              </div>

              {/* Stats 4-box Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(historyContent.stats || []).map((st: any, idx: number) => (
                  <div key={st.id || idx} className="p-4 rounded-2xl bg-[#24150D] border border-[#C9B38D]/20 space-y-2">
                    <label className="block text-[11px] font-semibold text-stone-300">نمبر / قدر</label>
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const updated = [...historyContent.stats];
                        updated[idx].value = e.target.value;
                        setHistoryContent({ ...historyContent, stats: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#180E09] border border-[#C9B38D]/30 text-white font-bold text-sm text-center"
                    />
                    <label className="block text-[11px] font-semibold text-stone-400">لیبل / تفصیل</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const updated = [...historyContent.stats];
                        updated[idx].label = e.target.value;
                        setHistoryContent({ ...historyContent, stats: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#180E09] border border-[#C9B38D]/30 text-stone-200 text-xs text-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Founder Section Manager */}
            <div className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#C9B38D]/20 pb-4">
                <h3 className="text-lg font-bold text-white">بانی و مؤسس پروفائل (Founder Section)</h3>
                <p className="text-xs text-stone-400">حضرت علامہ سید کاظم موسویؒ (باباجان) کا اختصاصی بلاک</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">بیج (Badge)</label>
                  <input
                    type="text"
                    value={historyContent.founder?.badge || ""}
                    onChange={(e) =>
                      setHistoryContent({
                        ...historyContent,
                        founder: { ...historyContent.founder, badge: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">عنوان (Title)</label>
                  <input
                    type="text"
                    value={historyContent.founder?.title || ""}
                    onChange={(e) =>
                      setHistoryContent({
                        ...historyContent,
                        founder: { ...historyContent.founder, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">تفصیلی تعارف (Subtitle)</label>
                <textarea
                  rows={3}
                  value={historyContent.founder?.subtitle || ""}
                  onChange={(e) =>
                    setHistoryContent({
                      ...historyContent,
                      founder: { ...historyContent.founder, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">مبارک قول (Quote)</label>
                  <input
                    type="text"
                    value={historyContent.founder?.quote || ""}
                    onChange={(e) =>
                      setHistoryContent({
                        ...historyContent,
                        founder: { ...historyContent.founder, quote: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">تصویر کا ربط (Image URL)</label>
                  <input
                    type="text"
                    value={historyContent.founder?.image || ""}
                    onChange={(e) =>
                      setHistoryContent({
                        ...historyContent,
                        founder: { ...historyContent.founder, image: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white text-xs font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Founder Achievements / Features */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <h4 className="text-sm font-bold text-[#C9B38D]">بانیِ ادارہ کے نمایاں کارنامے و اوصاف:</h4>
                <div className="space-y-3">
                  {(historyContent.founder?.features || []).map((feat: any, idx: number) => (
                    <div key={feat.id || idx} className="p-3.5 rounded-xl bg-[#24150D] border border-white/10 space-y-2">
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => {
                          const updated = [...historyContent.founder.features];
                          updated[idx].title = e.target.value;
                          setHistoryContent({
                            ...historyContent,
                            founder: { ...historyContent.founder, features: updated },
                          });
                        }}
                        placeholder="کارنامے کا عنوان"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#180E09] border border-[#C9B38D]/30 text-white font-bold text-xs"
                      />
                      <textarea
                        rows={2}
                        value={feat.desc}
                        onChange={(e) => {
                          const updated = [...historyContent.founder.features];
                          updated[idx].desc = e.target.value;
                          setHistoryContent({
                            ...historyContent,
                            founder: { ...historyContent.founder, features: updated },
                          });
                        }}
                        placeholder="تفصیل"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#180E09] border border-[#C9B38D]/30 text-stone-300 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => saveHistoryContent(historyContent)}
                  disabled={historySaving}
                  className="px-8 py-2.5 rounded-xl bg-[#C9B38D] text-[#120A05] text-xs font-bold hover:brightness-105 flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>{historySaving ? "محفوظ ہو رہا ہے..." : "تمام تبدیلیاں محفوظ کریں"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL: STAFF ADD / EDIT */}
      {/* ============================================================== */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-xl my-6 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsStaffModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {editingStaffId ? "استاد / عملہ کی تفصیلات میں ترمیم" : "نئے استاد / عملہ کا اندراج"}
            </h3>
            <form onSubmit={handleSaveStaff} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">نام گرامی *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">عہدہ / منصب *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.title}
                    onChange={(e) => setStaffForm({ ...staffForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">زمرہ (Category)</label>
                  <select
                    value={staffForm.category}
                    onChange={(e) => setStaffForm({ ...staffForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  >
                    <option value="leadership">قیادت و سرپرستی</option>
                    <option value="faculty">اساتذہ درسِ نظامی و عصری</option>
                    <option value="quran">اساتذہ شعبہ حفظ و تجوید</option>
                    <option value="admin">شعبہ انتظامیہ</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">شعبہ / ڈیپارٹمنٹ</label>
                  <input
                    type="text"
                    value={staffForm.department}
                    onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">علمی اسناد و قابلیت</label>
                <input
                  type="text"
                  placeholder="فاضل حوزہ علمیہ قم، درسِ خارج و اصول"
                  value={staffForm.qualification}
                  onChange={(e) => setStaffForm({ ...staffForm, qualification: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">تدریسی تجربہ</label>
                  <input
                    type="text"
                    placeholder="۱۵ سالہ تدریسی تجربہ"
                    value={staffForm.experience}
                    onChange={(e) => setStaffForm({ ...staffForm, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">تصویر (Image URL)</label>
                  <input
                    type="text"
                    value={staffForm.image}
                    onChange={(e) => setStaffForm({ ...staffForm, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">فون نمبر (اختیاری)</label>
                  <input
                    type="text"
                    value={staffForm.phone}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">ای میل (اختیاری)</label>
                  <input
                    type="email"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 hover:bg-white/10"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={staffLoading}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] font-bold hover:bg-[#D9C7A7]"
                >
                  {staffLoading ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: MILESTONE ADD / EDIT */}
      {/* ============================================================== */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-xl my-6 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsMilestoneModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {editingMilestoneId ? "تاریخی سنگِ میل میں ترمیم" : "نیا سنگِ میل شامل کریں"}
            </h3>
            <form onSubmit={handleSaveMilestone} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">عیسوی سال (مثلاً ۱۹۹۸ء) *</label>
                  <input
                    type="text"
                    required
                    value={milestoneForm.year}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">ہجری سال (مثلاً ۱۴۱۹ھ)</label>
                  <input
                    type="text"
                    value={milestoneForm.hijriYear}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, hijriYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">عنوان (Title) *</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">ذیلی عنوان (Subtitle)</label>
                <input
                  type="text"
                  value={milestoneForm.subtitle}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">تفصیل (Description) *</label>
                <textarea
                  rows={4}
                  required
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">نمایاں جھلک (Highlight Badge)</label>
                <input
                  type="text"
                  placeholder="مثلاً: ۲۰ طلبہ اور ۲ اساتذہ سے تاریخی ابتدا"
                  value={milestoneForm.highlight}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, highlight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 hover:bg-white/10"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={historySaving}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] font-bold hover:bg-[#D9C7A7]"
                >
                  {historySaving ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: FORMER FACULTY ADD / EDIT */}
      {/* ============================================================== */}
      {isFormerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-xl my-6 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsFormerModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {editingFormerId ? "سابق استاد کے تعارف میں ترمیم" : "نئے سابق استاد کا اندراج"}
            </h3>
            <form onSubmit={handleSaveFormer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">نام گرامی *</label>
                  <input
                    type="text"
                    required
                    value={formerForm.name}
                    onChange={(e) => setFormerForm({ ...formerForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">لقب / دعا (Status)</label>
                  <input
                    type="text"
                    value={formerForm.status}
                    onChange={(e) => setFormerForm({ ...formerForm, status: e.target.value })}
                    placeholder="رحمۃ اللہ علیہ / دامت برکاتہ"
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">عہدہ / خدمات *</label>
                  <input
                    type="text"
                    required
                    value={formerForm.title}
                    onChange={(e) => setFormerForm({ ...formerForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">مدتِ خدمت (Tenure) *</label>
                  <input
                    type="text"
                    required
                    placeholder="۱۹۹۸ء تا ۲۰۱۲ء"
                    value={formerForm.tenure}
                    onChange={(e) => setFormerForm({ ...formerForm, tenure: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">شعبہ (Department)</label>
                  <input
                    type="text"
                    value={formerForm.department}
                    onChange={(e) => setFormerForm({ ...formerForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">تصویر (Image URL)</label>
                  <input
                    type="text"
                    value={formerForm.image}
                    onChange={(e) => setFormerForm({ ...formerForm, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">نمایاں کارنامہ / حصہ (Contribution) *</label>
                <textarea
                  rows={3}
                  required
                  value={formerForm.contribution}
                  onChange={(e) => setFormerForm({ ...formerForm, contribution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFormerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 hover:bg-white/10"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={historySaving}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] font-bold hover:bg-[#D9C7A7]"
                >
                  {historySaving ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
