import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Play,
  Calendar,
  MapPin,
  X
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState("all");
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    section: "campus",
    category: "کیمپس و عمارات",
    type: "image",
    imageUrl: "/images/layout/mosque-arches.jpg",
    videoDuration: "",
    videoUrl: "",
    date: "شعبان ۱۴۴۷ھ",
    location: "احسن آباد کیمپس، کراچی",
    description: "",
    featured: true
  });
  const [saving, setSaving] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.gallery.getAll();
      if (res.success) {
        setItems(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredItems = items.filter((item) => {
    if (selectedSection === "all") return true;
    return item.section === selectedSection;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      section: "campus",
      category: "کیمپس و عمارات",
      type: "image",
      imageUrl: "/images/layout/mosque-arches.jpg",
      videoDuration: "",
      videoUrl: "",
      date: "شعبان ۱۴۴۷ھ",
      location: "احسن آباد کیمپس، کراچی",
      description: "",
      featured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      section: item.section || "campus",
      category: item.category || "عام",
      type: item.type || "image",
      imageUrl: item.imageUrl || "",
      videoDuration: item.videoDuration || "",
      videoUrl: item.videoUrl || "",
      date: item.date || "",
      location: item.location || "",
      description: item.description || "",
      featured: item.featured ?? true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        await api.gallery.update(editingId, formData);
      } else {
        await api.gallery.create(formData);
      }
      await fetchGallery();
      setIsModalOpen(false);
    } catch (err: any) {
      alert("خرابی: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`کیا آپ واقعی "${title}" کو گیلری سے حذف کرنا چاہتے ہیں؟`)) return;
    try {
      await api.gallery.delete(id);
      await fetchGallery();
    } catch (err: any) {
      alert("خرابی: " + err.message);
    }
  };

  const sectionLabels: Record<string, string> = {
    campus: "کیمپس و عمارت",
    library: "کتب خانہ",
    activities: "کھیل کود و سرگرمیاں",
    picnic: "پکنک و ٹورز",
    celebrations: "جشن و تقریبات",
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      <AdminHeader
        title="شعبہ گیلری و ملٹی میڈیا"
        subtitle="کیمپس، لائبریری، پکنک، اور سالانہ تقریبات کی تصاویر اور ویڈیوز کا کنٹرول"
      >
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>نیا میڈیا آئٹم شامل کریں</span>
        </button>
      </AdminHeader>

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/20">
          {[
            { id: "all", label: "تمام میڈیا فائلز" },
            { id: "campus", label: "کیمپس و عمارت" },
            { id: "library", label: "کتب خانہ" },
            { id: "activities", label: "کھیل کود" },
            { id: "picnic", label: "طلبہ پکنک" },
            { id: "celebrations", label: "جشن و تقاریب" },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedSection === sec.id
                  ? "bg-[#C9B38D] text-[#120A05] shadow"
                  : "bg-[#25150C] text-stone-300 hover:text-white"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1C1009] border border-[#C9B38D]/25 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C9B38D]/60 transition shadow-lg group"
            >
              <div>
                <div className="relative aspect-video w-full bg-[#24150D] overflow-hidden">
                  <img
                    src={item.imageUrl || "/images/layout/mosque-arches.jpg"}
                    alt={item.title}
                    className="object-cover group-hover:scale-105 transition w-full h-full object-cover"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-10 h-10 rounded-full bg-[#C9B38D] text-[#120A05] flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-[#120A05] ml-0.5" />
                      </div>
                      {item.videoDuration && (
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono" dir="ltr">
                          {item.videoDuration}
                        </span>
                      )}
                    </div>
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-[#C9B38D] backdrop-blur-sm">
                    {sectionLabels[item.section] || item.section}
                  </span>
                </div>

                <div className="p-4">
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-2">
                    {item.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C9B38D]" />
                        {item.date}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C9B38D]" />
                        {item.location}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-stone-300 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-3 border-t border-white/5 flex items-center justify-between text-xs bg-[#24150D]">
                <span className="text-[10px] text-[#C9B38D]">
                  {item.type === "video" ? "ویڈیو ریکارڈنگ" : "تصویر"}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-[#25150C] hover:bg-[#C9B38D] text-stone-300 hover:text-[#120A05] border border-[#C9B38D]/25 transition"
                    title="ترمیم کریں"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
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

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1C1009] border-2 border-[#C9B38D]/40 rounded-3xl w-full max-w-xl my-6 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {editingId ? "میڈیا آئٹم میں ترمیم" : "نیا میڈیا آئٹم اپلوڈ / شامل کریں"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-200 mb-1">عنوان / نام *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">شعبہ / سیکشن</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  >
                    <option value="campus">کیمپس و عمارت (Campus)</option>
                    <option value="library">کتب خانہ (Library)</option>
                    <option value="activities">کھیل کود و سرگرمیاں (Activities)</option>
                    <option value="picnic">طلبہ پکنک و ٹور (Picnic)</option>
                    <option value="celebrations">جشن و تقاریب (Celebrations)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">نوعیت (Type)</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  >
                    <option value="image">تصویر (Image)</option>
                    <option value="video">ویڈیو کلپ (Video)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">تصویر کا یو آر ایل (Image URL) *</label>
                <input
                  type="text"
                  required
                  placeholder="/images/layout/mosque-arches.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              {formData.type === "video" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-200 mb-1">ویڈیو کا دورانیہ</label>
                    <input
                      type="text"
                      placeholder="۰۴:۲۰"
                      value={formData.videoDuration}
                      onChange={(e) => setFormData({ ...formData, videoDuration: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-200 mb-1">ویڈیو یو آر ایل (YouTube / MP4)</label>
                    <input
                      type="text"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">تاریخ یا مناسبت</label>
                  <input
                    type="text"
                    placeholder="شعبان المعظم ۱۴۴۷ھ"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-200 mb-1">مقام</label>
                  <input
                    type="text"
                    placeholder="مرکزی پنڈال و آڈیٹوریم"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-200 mb-1">تفصیل / کیپشن</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#24150D] border border-[#C9B38D]/30 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-stone-300 hover:bg-white/10"
                >
                  منسوخ کریں
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-[#C9B38D] text-[#120A05] font-bold hover:bg-[#D9C7A7]"
                >
                  {saving ? "محفوظ ہو رہا ہے..." : "محفوظ کریں"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
