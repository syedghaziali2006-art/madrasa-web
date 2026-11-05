import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Save,
  Upload,
  Image as ImageIcon,
  Video,
  Film,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  MapPin,
  RefreshCw,
  Sliders,
  Check,
  HeartHandshake,
  MessageSquare,
  Star,
  X,
  Edit3,
  Quote,
  User,
  SlidersHorizontal,
  Building2,
  BookOpen,
  Trophy,
  Compass,
  Award
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api } from "@/services/api";

interface BadgeItem {
  id: string;
  text: string;
}

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<"hero" | "sections" | "campusMedia" | "donations" | "testimonials" | "media">("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingQuickMedia, setUploadingQuickMedia] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingDonationBox, setUploadingDonationBox] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/images/logo.png");

  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const posterFileInputRef = useRef<HTMLInputElement>(null);
  const quickMediaFileInputRef = useRef<HTMLInputElement>(null);
  const donationBoxInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [heroData, setHeroData] = useState({
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    title: "مدرسہ صاحب الزمان",
    titleSuffix: "(عج)",
    tagline:
      "دینی و عصری علوم کا بین الاقوامی اسلامی ادارہ | حوزوی تعلیم، تجوید، خطابت، انگلش اور کمپیوٹر کا مثالی سنگم برائے کردار سازی",
    bgType: "image" as "image" | "video",
    bgMediaUrl: "/images/hero-banner.png",
    badges: [
      { id: "1", text: "۵ سالہ حوزوی نصاب" },
      { id: "2", text: "مفت ہاسٹل و معیاری طعام" },
      { id: "3", text: "کمپیوٹر لیب و لائبریری" }
    ] as BadgeItem[],
    addressText: "پلاٹ بی 25، احسن آباد، گلزارِ ہجری، اسکیم 33، کراچی، پاکستان",
    googleMapsUrl:
      "https://maps.google.com/?q=Madarsa+Sahib+uz+Zaman+Ahsanabad+3+Gulzar-e-Hijri+Scheme+33+Karachi",
    admissionBtnText: "داخلہ لیں",
    contactBtnText: "ہم سے رابطہ کریں",
    posterImage: "/images/admission-poster.jpeg",
    posterTitle: "داخلہ پراسپیکٹس و شرائط — مدرسہ صاحب الزمان (عج)"
  });

  const [sectionsData, setSectionsData] = useState<Record<string, any>>({
    campus: {
      enabled: true,
      badge: "سیکشن ۱: تصویری و ویڈیو جھلکیاں",
      title: "مدرسہ صاحب الزمان کیمپس اور عمارات",
      subtitle: "کیمپس کی شاندار تعمیر، پرسکون ماحول، وسیع درسگاہیں اور روحانی فضا کی چند دلکش جھلکیاں"
    },
    library: {
      enabled: true,
      badge: "سیکشن ۲: علمی و تحقیقی خزانہ",
      title: "مرکزی کتب خانہ و ڈیجیٹل لائبریری",
      subtitle: "۲۵ ہزار سے زائد مستند تفاسیر، احادیث، فقہی متون اور نایاب مخطوطات پر مشتمل پُرامن کتب خانہ"
    },
    books: {
      enabled: true,
      badge: "سیکشن ۳: منتخب مطبوعات",
      title: "مدرسہ کے اساتذہ و اکابرین کی کتب",
      subtitle: "علومِ آلِ محمدؑ اور عصری اسلامی افکار پر مشتمل مستند کتب و تصانیف کا مطالعہ فرمائیں"
    },
    picnic: {
      enabled: true,
      badge: "سیکشن ۴: مطالعاتی و تفریحی ٹورز",
      title: "طلبہ کے سالانہ پکنک اور تفریحی مقامات کے دورے",
      subtitle: "سمندر کنارے پرلطف لمحات، تاریخی و تفریحی مقامات کے مطالعاتی دورے اور باہمی ہم آہنگی"
    },
    activities: {
      enabled: true,
      badge: "سیکشن ۵: جسمانی صحت و تفریح",
      title: "طلبہ کے کھیل کود اور اسپورٹس سرگرمیاں",
      subtitle: "صحت مند دماغ کے لیے صحت مند جسم — کرکٹ، فٹ بال، بیڈمنٹن اور روایتی کھیلوں کے مقابلے"
    },
    celebrations: {
      enabled: true,
      badge: "سیکشن ۶: جشن و ولادت کے ایام",
      title: "میلادِ معصومینؑ اور سالانہ دستار بندی تقاریب",
      subtitle: "اہلِ بیتؑ کی خوشیوں میں جشن، منقبت خوانی، اعزازات کی تقسیم اور طلبہ کے خطابات"
    },
    donations: {
      enabled: true,
      badge: "تعاون و نصرتِ دین",
      title: "دسترخوانِ امام زمانہؑ اور فلاحی معاونت",
      subtitle: "سہمِ امامؑ، سہمِ سادات، افطار و طعام اور تعمیراتی منصوبوں میں اپنا حصہ ڈالیں"
    },
    testimonials: {
      enabled: true,
      badge: "اکابرین و سرپرستوں کے تاثرات",
      title: "علمائے کرام، والدین اور فارغ التحصیل طلبہ کی آراء",
      subtitle: "مدرسہ کی علمی و اخلاقی خدمات پر جید علماء اور سرپرستوں کے تاثرات"
    }
  });

  // Donations Data State
  const [donationData, setDonationData] = useState({
    hadithArabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
    hadithUrdu: "صدقہ کبھی مال میں کمی نہیں کرتا، بلکہ برکت، حفاظت اور درجات کی بلندی کا سبب بنتا ہے۔",
    hadithSource: "فرمانِ معصوم علیہ السلام",
    boxImage: "/images/layout/donation-box.jpg",
    studentSponsorship: "ماہانہ طالب علم کفالت: 1500 روپے",
    foodSponsorship: "طعام کفالت: 10,000 روپے",
    presetAmounts: ["1500", "2500", "5000", "10000", "25000"]
  });

  // Testimonials Data State
  const [testimonialsData, setTestimonialsData] = useState<any[]>([]);
  const [testimonialsFilter, setTestimonialsFilter] = useState("all");
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  // Campus Media State (1 Video + 4 Images)
  const defaultCampusMedia = [
    {
      id: "campus-vid-1",
      title: "مدرسہ کا مرکزی بیرونی منظر و گنبد",
      category: "مرکزی کیمپس",
      type: "video",
      videoDuration: "",
      videoUrl: "",
      imageUrl: "",
      date: "تعلیمی سال ۲۰۲۶",
      location: "احسن آباد کیمپس، کراچی",
      description: "مدرسہ صاحب الزمان کی پرشکوہ اسلامی طرزِ تعمیر کی حامل عمارت، محرابیں اور وسیع دالان کا مکمل ویڈیو ٹور۔"
    },
    {
      id: "campus-img-1",
      title: "دار الحدیث و مرکزی تدریسی ہال",
      category: "تدریسی ہال",
      type: "image",
      imageUrl: "/images/layout/congregation.jpg",
      date: "رجب المرجب",
      location: "دوسری منزل، مرکزی ہال",
      description: "طلبہ کے روزمرہ دروس، کتبِ اربعہ اور منطق و بلاغت کی محفلِ درس کا خوبصورت منظر۔"
    },
    {
      id: "campus-img-2",
      title: "حوزوی کلاس رومز و کتب خوانی",
      category: "تعلیمی بلاک",
      type: "image",
      imageUrl: "/images/layout/quran-study.jpg",
      date: "روزانہ تدریس",
      location: "پہلی منزل، کمرہ نمبر ۱۰",
      description: "طلبہ کے لیے پرسکون، کشادہ اور جدید سہولیات سے آراستہ درس گاہیں جہاں اساتذہ انفرادی توجہ دیتے ہیں۔"
    },
    {
      id: "campus-img-3",
      title: "مرکزی کتب خانہ و ریڈنگ ہال",
      category: "کتب خانہ",
      type: "image",
      imageUrl: "/images/gallery/library-interior.jpg",
      date: "جدید سہولیات",
      location: "لائبریری بلاک",
      description: "۲۵ ہزار سے زائد مستند دینی و تحقیقی کتب اور مطالعہ کے لیے پرسکون ماحول۔"
    },
    {
      id: "campus-img-4",
      title: "وسیع صحن و بیرونی راہداری",
      category: "کیمپس ایریا",
      type: "image",
      imageUrl: "/images/layout/sunset-mosque.jpg",
      date: "تفریحی ماحول",
      location: "مرکزی کورٹ یارڈ",
      description: "طلبہ کے لیے سرسبز و شاداب قدرتی ماحول، چہل قدمی اور فکری مباحثوں کی کشادہ جگہ۔"
    }
  ];

  const defaultLibraryMedia = [
    {
      id: "lib-1",
      title: "مرکزی مطالعہ ہال و کتب الماری",
      category: "مطالعہ و کتب",
      type: "image",
      imageUrl: "/images/gallery/library-interior.jpg",
      date: "کتب خانہ صاحب الزمان",
      location: "ہال نمبر ۱ - حوزوی کتب",
      description: "شاہکار لکڑی کی الماریوں میں سجی ہزاروں کتب، پرسکون ماحول اور طلبہ کے لیے وسیع اسٹڈی ٹیبلز۔"
    },
    {
      id: "lib-2",
      title: "قدیم نایاب خطی نسخے و قلمی نوادرات",
      category: "مخطوطات و نوادرات",
      type: "image",
      imageUrl: "/images/library.jpg",
      date: "نایاب کتب",
      location: "خصوصی ریسرچ سیکشن",
      description: "صدیوں پرانے قلمی نسخے، تفاسیر اور علمائے سلف کے نایاب ہاتھ کے لکھے ہوئے کتب کے اوراق۔"
    },
    {
      id: "lib-3",
      title: "کتبِ تفاسیر، احادیث و فقہی انسائیکلوپیڈیا",
      category: "علومِ آلِ محمدؑ",
      type: "image",
      imageUrl: "/images/books/book-3.jpg",
      date: "بنیادی مآخذ",
      location: "شعبہ تحقیق و فقہ",
      description: "کتبِ اربعہ، بحار الانوار، وسائل الشیعہ اور تفاسیر قرآن کا عظیم الشان اور مستند مجموعہ۔"
    },
    {
      id: "lib-4",
      title: "ڈیجیٹل لائبریری و آن لائن ریسرچ سسٹم",
      category: "ڈیجیٹل کیٹلاگ",
      type: "image",
      imageUrl: "/images/books/book-2.jpg",
      date: "جدید تحقیق",
      location: "کمپیوٹر کیٹلاگ کارنر",
      description: "آن لائن پورٹل جہاں سے طلبہ دنیا بھر کے اسلامی مقالات اور پی ڈی ایف کتب تک رسائی حاصل کرتے ہیں۔"
    },
    {
      id: "lib-5",
      title: "محققین و اساتذہ کا فکری کارنر",
      category: "ریسرچ کارنر",
      type: "image",
      imageUrl: "/images/books/book-5.jpg",
      date: "علمی نشستیں",
      location: "سیمینار روم",
      description: "اساتذہ اور محقق طلبہ کے سنجیدہ فکری مباحث اور علمی مقالہ نگاری کے لیے مختص جگہ۔"
    }
  ];

  const defaultActivitiesMedia = [
    {
      id: "sports-cricket",
      title: "سالانہ کرکٹ ٹورنامنٹ ۲۰۲۶ - فائنل میچ اور بچوں کی خوشی",
      category: "کھیل کود و اسپورٹس",
      type: "video",
      videoDuration: "۰۳:۲۰",
      videoUrl: "",
      imageUrl: "/images/gallery/sports-day.jpg",
      date: "ہفتہ وار اسپورٹس ڈے",
      location: "مدرسہ صاحب الزمان پلے گراؤنڈ",
      description: "طلبہ کے درمیان تفریحی کرکٹ میچ کی پُرجوش جھلکیاں، چھکے چوکے اور فاتح ٹیم کی فتح کا جشن۔"
    },
    {
      id: "indoor-games",
      title: "ان ڈور گیمز - کیرم اور شطرنج کے مقابلے",
      category: "ذہنی تفریح",
      type: "image",
      imageUrl: "/images/gallery/indoor-games.jpg",
      date: "شام کا تفریحی وقت",
      location: "اسٹوڈنٹس ایکٹیویٹی روم",
      description: "کیرم بورڈ، شطرنج اور فکری کھیلوں میں طلبہ کی بھرپور دلچسپی، مسکراہٹیں اور باہمی رفاقت۔"
    },
    {
      id: "morning-exercise",
      title: "صبح کی باقاعدہ پی ٹی اور جسمانی ورزش",
      category: "صحت و تندرستی",
      type: "video",
      videoDuration: "۰۱:۴۵",
      videoUrl: "",
      imageUrl: "/images/gallery/exercise.jpg",
      date: "روزانہ فجر کے بعد",
      location: "مرکزی کورٹ یارڈ و گراؤنڈ",
      description: "صحت مند دماغ کے لیے تندرست جسم — روزانہ صبح باقاعدہ اسٹریچنگ، جاگنگ اور نظم و ضبط۔"
    },
    {
      id: "tug-of-war",
      title: "رسی کشی کا سنسنی خیز اور دوستانہ مقابلہ",
      category: "اسپورٹس فیسٹیول",
      type: "image",
      imageUrl: "/images/gallery/tug-of-war.jpg",
      date: "سالانہ فیسٹیول",
      location: "اوپن گراؤنڈ",
      description: "مختلف کلاسوں کے طلبہ کے درمیان زور آزمائی، اجتماعی ٹیم ورک اور بچوں کی پرلطف ہنسی۔"
    },
    {
      id: "friendly-badminton",
      title: "بیڈمنٹن چیمپئن شپ اور طلبہ کی مسکراہٹیں",
      category: "میدانی کھیل",
      type: "video",
      videoDuration: "۰۲:۱۰",
      videoUrl: "",
      imageUrl: "/images/gallery/badminton.jpg",
      date: "عصر کے بعد",
      location: "بیڈمنٹن کورٹ",
      description: "طلبہ کی چستی، مہارت اور کھیل کے دوران باہمی محبت، اخوت اور اسپورٹس مین اسپرٹ کا مظاہرہ۔"
    }
  ];

  const defaultPicnicMedia = [
    {
      id: "picnic-beach",
      title: "ساحلِ سمندر (سی ویو) کی تفریحی پکنک ۲۰۲۵",
      category: "سالانہ پکنک",
      type: "video",
      videoDuration: "۰۴:۵۰",
      videoUrl: "",
      imageUrl: "/images/gallery/picnic-beach.jpg",
      date: "اکتوبر ۲۰۲۵",
      location: "کلفٹن و سی ویو ساحل، کراچی",
      description: "طلبہ اور اساتذہ کا ساحلِ سمندر کا یادگار سفر، باجماعت نماز، لذیذ ظہرانہ اور ساحلی ہوائیں و کھیل۔"
    },
    {
      id: "botanical-garden",
      title: "باغِ ابنِ قاسم کا تفریحی و علمی وزٹ",
      category: "تعلیمی دورہ",
      type: "image",
      imageUrl: "/images/layout/sunset-mosque.jpg",
      date: "بہار ۲۰۲۵",
      location: "باغِ ابن قاسم، کراچی",
      description: "قدرت کے مناظر، سرسبز باغات اور طلبہ کے لیے معلوماتی تفریحی واک۔"
    },
    {
      id: "amusement-park",
      title: "تفریحی پارک میں طلبہ کی پرلطف مسکراہٹیں",
      category: "ایکٹیویٹی ڈے",
      type: "video",
      videoDuration: "۰۲:۱۵",
      videoUrl: "",
      imageUrl: "/images/layout/lattice-prayer.jpg",
      date: "دسمبر ۲۰۲۵",
      location: "تھیم پارک، کراچی",
      description: "جھولوں کی تفریح، دوستانہ محفل اور طلبہ کے چہروں پر مسکراہٹیں اور خوشیاں۔"
    },
    {
      id: "hill-view-lunch",
      title: "پہاڑی مقام پر ظہرانہ اور روحانی دعا",
      category: "سیر و سیاحت",
      type: "image",
      imageUrl: "/images/layout/congregation.jpg",
      date: "جنوری ۲۰۲۶",
      location: "پکنک پوائنٹ",
      description: "کھلے آسمان تلے باجماعت دعا اور اساتذہ کی رفاقت میں یادگار لمحات۔"
    }
  ];

  const defaultCelebrationsMedia = [
    {
      id: "event-convocation",
      title: "سالانہ تقریبِ تقسیمِ اسناد، انعامات اور شیلڈز ۲۰۲۶",
      category: "تقسیمِ انعامات",
      type: "video",
      videoDuration: "۰۶:۳۰",
      videoUrl: "",
      imageUrl: "/images/gallery/celebration-stage.jpg",
      date: "شعبان المعظم ۱۴۴۷ھ",
      location: "مرکزی پنڈال و اسٹیج",
      description: "ممتاز پوزیشن حاصل کرنے والے ہونہار طلبہ کو علمائے کرام کے دستِ مبارک سے اعزازی شیلڈز، کتب اور سرٹیفکیٹس کی تقسیم۔"
    },
    {
      id: "event-milad",
      title: "جشنِ ولادتِ باسعادت حضرت محمد مصطفیٰ ﷺ و امام جعفر صادقؑ",
      category: "جشن و میلاد",
      type: "image",
      imageUrl: "/images/layout/mosque-arches.jpg",
      date: "۱۷ ربیع الاول",
      location: "مرکزی کانفرنس ہال",
      description: "عطر بیز محفلِ میلاد، بچوں کی نعت خوانی، قصیدہ گوئی اور شیرینی کی تقسیم کا بابرکت منظر۔"
    },
    {
      id: "event-quran-comp",
      title: "آل پاکستان مقابلہ حسنِ قرائت و تجویدِ قرآن",
      category: "قرآنی مقابلہ",
      type: "video",
      videoDuration: "۰۳:۴۵",
      videoUrl: "",
      imageUrl: "/images/layout/quran-study.jpg",
      date: "رمضان المبارک",
      location: "مسجد صاحب الزمان",
      description: "ملک بھر کے نامور قراء کی موجودگی میں طلبہ کے درمیان لحنِ داؤدی اور تجوید کے روح پرور مقابلے۔"
    },
    {
      id: "event-turban",
      title: "روحانی تقریبِ عمامہ پوشی برائے فارغ التحصیل علماء",
      category: "عمامہ پوشی",
      type: "image",
      imageUrl: "/images/layout/congregation.jpg",
      date: "عیدِ غدیر",
      location: "مرکزی حسینیہ",
      description: "حوزوی نصاب مکمل کرنے والے فاضل طلبہ کو مراجعِ عظام کے نمائندگان کے ہاتھوں تاجِ رسول ﷺ پہنانے کی تقریب۔"
    }
  ];

  const [campusMediaData, setCampusMediaData] = useState<any[]>(defaultCampusMedia);
  const [libraryMediaData, setLibraryMediaData] = useState<any[]>(defaultLibraryMedia);
  const [activitiesMediaData, setActivitiesMediaData] = useState<any[]>(defaultActivitiesMedia);
  const [picnicMediaData, setPicnicMediaData] = useState<any[]>(defaultPicnicMedia);
  const [celebrationsMediaData, setCelebrationsMediaData] = useState<any[]>(defaultCelebrationsMedia);

  const [uploadingCampusIdx, setUploadingCampusIdx] = useState<number | null>(null);
  const [uploadingCampusVideo, setUploadingCampusVideo] = useState(false);
  const [uploadingSectionMedia, setUploadingSectionMedia] = useState<{ section: string; idx: number } | null>(null);

  // Quick Media State
  const [quickMedia, setQuickMedia] = useState({
    title: "",
    section: "campus",
    category: "کیمپس و عمارات",
    type: "image" as "image" | "video",
    imageUrl: "",
    videoDuration: "",
    videoUrl: "",
    date: "تعلیمی سال ۲۰۲۶",
    location: "کراچی کیمپس",
    description: "",
    featured: true
  });
  const [quickMediaSuccess, setQuickMediaSuccess] = useState(false);

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      const res = await api.homepage.get();
      if (res.success && res.data) {
        if (res.data.hero) setHeroData(res.data.hero);
        if (res.data.sections) setSectionsData(res.data.sections);
        if (res.data.donationInfo) setDonationData(res.data.donationInfo);
        if (res.data.testimonialsList) setTestimonialsData(res.data.testimonialsList);
        if (res.data.campusMedia && Array.isArray(res.data.campusMedia) && res.data.campusMedia.length > 0) {
          setCampusMediaData(res.data.campusMedia);
        }
        if (res.data.libraryMedia && Array.isArray(res.data.libraryMedia) && res.data.libraryMedia.length > 0) {
          setLibraryMediaData(res.data.libraryMedia);
        }
        if (res.data.activitiesMedia && Array.isArray(res.data.activitiesMedia) && res.data.activitiesMedia.length > 0) {
          setActivitiesMediaData(res.data.activitiesMedia);
        }
        if (res.data.picnicMedia && Array.isArray(res.data.picnicMedia) && res.data.picnicMedia.length > 0) {
          setPicnicMediaData(res.data.picnicMedia);
        }
        if (res.data.celebrationsMedia && Array.isArray(res.data.celebrationsMedia) && res.data.celebrationsMedia.length > 0) {
          setCelebrationsMediaData(res.data.celebrationsMedia);
        }
      }

      try {
        const sRes = await api.settings.get();
        if (sRes?.data?.logo) setLogoUrl(sRes.data.logo);
      } catch {}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingLogo(true);
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        setLogoUrl(res.fileUrl);
        await api.settings.update({ logo: res.fileUrl });
        window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: res.fileUrl } }));
      }
    } catch (err: any) {
      alert("لوگو اپلوڈ میں خرابی: " + err.message);
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      setSaveSuccess(false);
      const payload = {
        hero: heroData,
        sections: sectionsData,
        donationInfo: donationData,
        testimonialsList: testimonialsData,
        campusMedia: campusMediaData,
        libraryMedia: libraryMediaData,
        activitiesMedia: activitiesMediaData,
        picnicMedia: picnicMediaData,
        celebrationsMedia: celebrationsMediaData
      };
      const res = await api.homepage.update(payload);
      if (logoUrl) {
        await api.settings.update({ logo: logoUrl });
        window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: logoUrl } }));
      }
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      }
    } catch (err: any) {
      alert("محفوظ کرنے میں خرابی: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const getSectionMediaList = (secKey: string): any[] => {
    switch (secKey) {
      case "campus":
        return campusMediaData;
      case "library":
        return libraryMediaData;
      case "activities":
        return activitiesMediaData;
      case "picnic":
        return picnicMediaData;
      case "celebrations":
        return celebrationsMediaData;
      default:
        return [];
    }
  };

  const updateSectionMediaItem = (secKey: string, index: number, field: string, value: any) => {
    const updater = (prev: any[]) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    };
    switch (secKey) {
      case "campus":
        setCampusMediaData(updater);
        break;
      case "library":
        setLibraryMediaData(updater);
        break;
      case "activities":
        setActivitiesMediaData(updater);
        break;
      case "picnic":
        setPicnicMediaData(updater);
        break;
      case "celebrations":
        setCelebrationsMediaData(updater);
        break;
    }
  };

  const handleSectionMediaUpload = async (
    secKey: string,
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingSectionMedia({ section: secKey, idx: index });
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        updateSectionMediaItem(secKey, index, "imageUrl", res.fileUrl);
      }
    } catch (err: any) {
      alert("تصویر اپلوڈ کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingSectionMedia(null);
    }
  };

  const addSectionMediaItem = (secKey: string, type: "image" | "video" = "image") => {
    const newItem = {
      id: `${secKey}-${Date.now()}`,
      title: type === "video" ? "نئی ویڈیو جھلک" : "نئی تصویر",
      category: "جھلکیاں",
      type,
      imageUrl:
        type === "video"
          ? "/images/layout/mosque-arches.jpg"
          : "/images/layout/congregation.jpg",
      videoUrl: type === "video" ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : "",
      videoDuration: type === "video" ? "۰۲:۳۰" : "",
      location: "کراچی کیمپس",
      date: "تعلیمی سال ۲۰۲۶",
      description: ""
    };
    const appender = (prev: any[]) => [...prev, newItem];
    switch (secKey) {
      case "campus":
        setCampusMediaData(appender);
        break;
      case "library":
        setLibraryMediaData(appender);
        break;
      case "activities":
        setActivitiesMediaData(appender);
        break;
      case "picnic":
        setPicnicMediaData(appender);
        break;
      case "celebrations":
        setCelebrationsMediaData(appender);
        break;
    }
  };

  const removeSectionMediaItem = (secKey: string, index: number) => {
    if (confirm("کیا آپ واقعی اس میڈیا آئٹم کو حذف کرنا چاہتے ہیں؟")) {
      const remover = (prev: any[]) => prev.filter((_, i) => i !== index);
      switch (secKey) {
        case "campus":
          setCampusMediaData(remover);
          break;
        case "library":
          setLibraryMediaData(remover);
          break;
        case "activities":
          setActivitiesMediaData(remover);
          break;
        case "picnic":
          setPicnicMediaData(remover);
          break;
        case "celebrations":
          setCelebrationsMediaData(remover);
          break;
      }
    }
  };

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return !!url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);
  };

  const generateThumbnailFromVideo = (videoFile: File): Promise<File | null> => {
    return new Promise((resolve) => {
      try {
        const video = document.createElement("video");
        const url = URL.createObjectURL(videoFile);
        video.src = url;
        video.muted = true;
        video.playsInline = true;
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          video.currentTime = Math.min(0.5, video.duration > 0.5 ? 0.5 : 0.1);
        };

        video.onseeked = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 360;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              canvas.toBlob(
                (blob) => {
                  URL.revokeObjectURL(url);
                  if (blob) {
                    const thumbFile = new File([blob], `thumb-${Date.now()}.jpg`, {
                      type: "image/jpeg",
                    });
                    resolve(thumbFile);
                  } else {
                    resolve(null);
                  }
                },
                "image/jpeg",
                0.88
              );
            } else {
              URL.revokeObjectURL(url);
              resolve(null);
            }
          } catch {
            URL.revokeObjectURL(url);
            resolve(null);
          }
        };

        video.onerror = () => {
          URL.revokeObjectURL(url);
          resolve(null);
        };
      } catch {
        resolve(null);
      }
    });
  };

  const handleCampusMediaUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCampusIdx(index);

      // If user uploaded a video into the poster field for campus video (index 0)
      if (index === 0 && file.type.startsWith("video/")) {
        const res = await api.upload.file(file);
        if (res.success && res.fileUrl) {
          let thumbUrl = "";
          try {
            const thumbFile = await generateThumbnailFromVideo(file);
            if (thumbFile) {
              const resThumb = await api.upload.file(thumbFile);
              if (resThumb.success) thumbUrl = resThumb.fileUrl;
            }
          } catch {}
          setCampusMediaData((prev) => {
            const next = [...prev];
            next[0] = {
              ...next[0],
              videoUrl: res.fileUrl,
              imageUrl: thumbUrl || res.fileUrl,
            };
            return next;
          });
        }
        return;
      }

      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        setCampusMediaData((prev) => {
          const next = [...prev];
          next[index] = { ...next[index], imageUrl: res.fileUrl };
          return next;
        });
      }
    } catch (err: any) {
      alert("فائل اپلوڈ کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingCampusIdx(null);
    }
  };

  const handleCampusVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCampusVideo(true);
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        let generatedThumbUrl = "";
        try {
          const thumbFile = await generateThumbnailFromVideo(file);
          if (thumbFile) {
            const thumbRes = await api.upload.file(thumbFile);
            if (thumbRes.success && thumbRes.fileUrl) {
              generatedThumbUrl = thumbRes.fileUrl;
            }
          }
        } catch (thumbErr) {
          console.warn("Could not generate thumbnail image:", thumbErr);
        }

        setCampusMediaData((prev) => {
          const next = [...prev];
          next[0] = {
            ...next[0],
            videoUrl: res.fileUrl,
            imageUrl: generatedThumbUrl || res.fileUrl,
          };
          return next;
        });
      }
    } catch (err: any) {
      alert("ویڈیو اپلوڈ کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingCampusVideo(false);
    }
  };

  const updateCampusMediaItem = (index: number, field: string, value: any) => {
    setCampusMediaData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Upload handler for Hero Background
  const handleBgFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingBg(true);
      const isVid = file.type.startsWith("video/");
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        setHeroData((prev) => ({
          ...prev,
          bgMediaUrl: res.fileUrl,
          bgType: isVid ? "video" : "image"
        }));
      }
    } catch (err: any) {
      alert("فائل اپلوڈ کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingBg(false);
    }
  };

  // Upload handler for Admission Poster
  const handlePosterFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPoster(true);
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        setHeroData((prev) => ({
          ...prev,
          posterImage: res.fileUrl
        }));
      }
    } catch (err: any) {
      alert("پوسٹر اپلوڈ کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingPoster(false);
    }
  };

  // Upload handler for Quick Media Image/Video
  const handleQuickMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingQuickMedia(true);
      const isVid = file.type.startsWith("video/");
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        if (isVid) {
          setQuickMedia((prev) => ({
            ...prev,
            type: "video",
            videoUrl: res.fileUrl,
            imageUrl: prev.imageUrl || "/images/layout/mosque-arches.jpg"
          }));
        } else {
          setQuickMedia((prev) => ({
            ...prev,
            imageUrl: res.fileUrl
          }));
        }
      }
    } catch (err: any) {
      alert("میڈیا اپلوڈ میں خرابی: " + err.message);
    } finally {
      setUploadingQuickMedia(false);
    }
  };

  const handleAddQuickMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMedia.title || !quickMedia.imageUrl) {
      alert("براہ کرم عنوان اور تصویر فراہم فرمائیں۔");
      return;
    }

    try {
      setUploadingQuickMedia(true);
      await api.gallery.create(quickMedia);
      setQuickMediaSuccess(true);
      setQuickMedia({
        title: "",
        section: quickMedia.section,
        category: "عام",
        type: "image",
        imageUrl: "",
        videoDuration: "",
        videoUrl: "",
        date: "تعلیمی سال ۲۰۲۶",
        location: "کراچی کیمپس",
        description: "",
        featured: true
      });
      setTimeout(() => setQuickMediaSuccess(false), 3000);
    } catch (err: any) {
      alert("میڈیا شامل کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingQuickMedia(false);
    }
  };

  // Badge Management
  const handleAddBadge = () => {
    const newBadge: BadgeItem = {
      id: Date.now().toString(),
      text: "نئی خصوصیت یا سہولت"
    };
    setHeroData((prev) => ({
      ...prev,
      badges: [...(prev.badges || []), newBadge]
    }));
  };

  const handleUpdateBadge = (id: string, text: string) => {
    setHeroData((prev) => ({
      ...prev,
      badges: prev.badges.map((b) => (b.id === id ? { ...b, text } : b))
    }));
  };

  const handleRemoveBadge = (id: string) => {
    setHeroData((prev) => ({
      ...prev,
      badges: prev.badges.filter((b) => b.id !== id)
    }));
  };

  // Upload handler for Donation Box image
  const handleDonationBoxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingDonationBox(true);
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl) {
        setDonationData((prev) => ({ ...prev, boxImage: res.fileUrl }));
      }
    } catch (err: any) {
      alert("تصویر اپلوڈ کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingDonationBox(false);
    }
  };

  // Upload handler for Testimonial Avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingAvatar(true);
      const res = await api.upload.file(file);
      if (res.success && res.fileUrl && editingTestimonial) {
        setEditingTestimonial((prev: any) => ({ ...prev, avatar: res.fileUrl }));
      }
    } catch (err: any) {
      alert("اواتار اپلوڈ کرنے میں خرابی: " + err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Testimonial Handlers
  const handleOpenNewTestimonialModal = () => {
    setEditingTestimonial({
      id: Date.now(),
      category: "scholars",
      categoryLabel: "علمائے کرام",
      badge: "جید عالمِ دین",
      name: "",
      role: "",
      association: "",
      location: "کراچی",
      date: "۱۴۴۶ھ",
      quote: "",
      rating: 5,
      avatar: "/images/faculty/principal-scholar.jpg",
      initialLikes: 25
    });
    setIsTestimonialModalOpen(true);
  };

  const handleOpenEditTestimonialModal = (t: any) => {
    setEditingTestimonial({ ...t });
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial || !editingTestimonial.name || !editingTestimonial.quote) {
      alert("برائے مہربانی نام اور تاثر (Quote) درج فرمائیں۔");
      return;
    }
    setTestimonialsData((prev) => {
      const exists = prev.some((x) => String(x.id) === String(editingTestimonial.id));
      if (exists) {
        return prev.map((x) => (String(x.id) === String(editingTestimonial.id) ? editingTestimonial : x));
      } else {
        return [editingTestimonial, ...prev];
      }
    });
    setIsTestimonialModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: any) => {
    if (confirm("کیا آپ واقعی اس تاثر / ریویو کو حذف کرنا چاہتے ہیں؟")) {
      setTestimonialsData((prev) => prev.filter((x) => String(x.id) !== String(id)));
    }
  };

  const sectionMeta: Record<string, { name: string; icon: string }> = {
    campus: { name: "کیمپس و عمارت کی تصاویر / ویڈیوز", icon: "Building2" },
    library: { name: "کتب خانہ و لائبریری شوکیس", icon: "BookOpen" },
    books: { name: "منتخب مطبوعات و کتب سیکشن", icon: "BookmarkCheck" },
    activities: { name: "طلبہ کھیل کود و اسپورٹس", icon: "Trophy" },
    picnic: { name: "طلبہ پکنک و ٹورز پولرائڈ", icon: "Compass" },
    celebrations: { name: "جشن، تقاریب و تقسیمِ اسناد", icon: "Award" },
    donations: { name: "عطیات و دسترخوانِ امام زمانہؑ", icon: "HeartHandshake" },
    testimonials: { name: "اکابرین و سرپرستوں کے تاثرات", icon: "MessageSquare" }
  };

  return (
    <div className="flex-1 pb-16 font-urdu" dir="rtl">
      {/* Header with Save and Live Preview buttons */}
      <AdminHeader
        title="صفحہ اول (ہوم پیج) کنٹرول"
        subtitle="ہیرو بینر، ویڈیوز، تصاویر، داخلہ پوسٹر، اور تمام سیکشنز کا مکمل متحرک انتظام"
      >
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ہوم پیج دیکھیں</span>
          </a>

          <button
            onClick={() => handleSaveAll()}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>محفوظ ہو رہا ہے...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>تبدیلیاں محفوظ کریں</span>
              </>
            )}
          </button>
        </div>
      </AdminHeader>

      {/* Main Container */}
      <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto">
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-bold">
              صفحہ اول کی تمام ترتیبات اور مواد کامیابی سے محفوظ ہو گئے ہیں! ہوم پیج ریفریش کر کے چیک کریں۔
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/20">
          <button
            onClick={() => setActiveTab("hero")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === "hero"
                ? "bg-gradient-to-r from-[#C9B38D] to-[#EFE5D2] text-[#120A05] shadow-lg"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            
            <span>ہیرو سیکشن و بینر (Main Hero)</span>
          </button>

          <button
            onClick={() => setActiveTab("sections")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === "sections"
                ? "bg-gradient-to-r from-[#C9B38D] to-[#EFE5D2] text-[#120A05] shadow-lg"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>سیکشنز کے عنوانات و کنٹرول (Sections CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab("campusMedia")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === "campusMedia"
                ? "bg-gradient-to-r from-[#C9B38D] to-[#EFE5D2] text-[#120A05] shadow-lg"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>کیمپس میڈیا: ۱ ویڈیو + ۴ تصاویر</span>
          </button>

          <button
            onClick={() => setActiveTab("donations")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === "donations"
                ? "bg-gradient-to-r from-[#C9B38D] to-[#EFE5D2] text-[#120A05] shadow-lg"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>عطیات و دسترخوان (Donations CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === "testimonials"
                ? "bg-gradient-to-r from-[#C9B38D] to-[#EFE5D2] text-[#120A05] shadow-lg"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>اکابرین و سرپرستوں کے تاثرات (Testimonials CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === "media"
                ? "bg-gradient-to-r from-[#C9B38D] to-[#EFE5D2] text-[#120A05] shadow-lg"
                : "text-stone-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>فوری تصاویر و ویڈیوز اپلوڈ (Quick Media Uploader)</span>
          </button>
        </div>

        {/* TAB 1: HERO SECTION CONFIGURATION */}
        {activeTab === "hero" && (
          <form onSubmit={handleSaveAll} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Text & Content Inputs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/25 space-y-5 shadow-xl">
                  <h3 className="text-base font-bold text-[#C9B38D] flex items-center gap-2 border-b border-[#C9B38D]/20 pb-3">
                    
                    <span>عنوان، تعارف اور مشن (Titles & Branding)</span>
                  </h3>

                  {/* Official Madrasa Logo Uploader */}
                  <div className="p-4 rounded-2xl bg-[#120A05] border border-[#C9B38D]/25 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-[#C9B38D] flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#C9B38D]" />
                        <span>ادارے کا آفیشل لوگو (Madrasa Logo)</span>
                      </label>
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
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C9B38D] to-[#DFCBB0] text-[#120A05] text-xs font-bold hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 shadow cursor-pointer disabled:opacity-50"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingLogo ? "اپلوڈ جاری ہے..." : "نیا لوگو اپلوڈ کریں"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            setLogoUrl("/images/logo.png");
                            await api.settings.update({ logo: "/images/logo.png" });
                            window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: "/images/logo.png" } }));
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-300 text-xs transition cursor-pointer"
                        >
                          ڈیفالٹ
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl bg-[#0D0704] border border-[#C9B38D]/50 flex items-center justify-center p-1.5 shrink-0 shadow overflow-hidden">
                        <Image
                          src={logoUrl || "/images/logo.png"}
                          alt="لوگو"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain filter drop-shadow"
                          unoptimized={Boolean(logoUrl?.startsWith("http"))}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={logoUrl || ""}
                          onChange={async (e) => {
                            const val = e.target.value;
                            setLogoUrl(val);
                            await api.settings.update({ logo: val });
                            window.dispatchEvent(new CustomEvent("msz_logo_updated", { detail: { logo: val } }));
                          }}
                          placeholder="/images/logo.png یا تصویری URL"
                          className="w-full px-3 py-1.5 rounded-xl bg-[#1C1009] border border-white/15 text-white font-mono text-xs focus:border-[#C9B38D] focus:outline-none"
                          dir="ltr"
                        />
                        <p className="text-[10px] text-stone-400 mt-1">
                          نیویگیشن بار، فوٹر اور ایڈمن سائڈبار پر خودکار طور پر یہی لوگو ظاہر ہوگا۔
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bismillah */}
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      بسم اللہ یا قرآنی کلمہ
                    </label>
                    <input
                      type="text"
                      value={heroData.bismillah}
                      onChange={(e) => setHeroData({ ...heroData, bismillah: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white font-arabic text-lg focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>

                  {/* Main Title & Suffix */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        مدرسہ کا مرکزی نام (Title)
                      </label>
                      <input
                        type="text"
                        value={heroData.title}
                        onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-base focus:border-[#C9B38D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        لاحقہ / دعائیہ کلمہ
                      </label>
                      <input
                        type="text"
                        value={heroData.titleSuffix}
                        onChange={(e) => setHeroData({ ...heroData, titleSuffix: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-[#C9B38D] font-bold text-base focus:border-[#C9B38D] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tagline / Mission */}
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      تعارفی سلوگن / مشن اسٹیٹمنٹ (Tagline)
                    </label>
                    <textarea
                      rows={3}
                      value={heroData.tagline}
                      onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-sm leading-[2.2] focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>

                  {/* Badges / Highlights */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-stone-300">
                        نمایاں سہولیات و بیجز (Institutional Badges)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddBadge}
                        className="text-xs font-bold text-[#C9B38D] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>نیا بیج شامل کریں</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {heroData.badges?.map((badge, idx) => (
                        <div key={badge.id} className="flex items-center gap-2">
                          <span className="text-xs text-[#C9B38D] font-mono w-5 text-center">
                            {idx + 1}.
                          </span>
                          <input
                            type="text"
                            value={badge.text}
                            onChange={(e) => handleUpdateBadge(badge.id, e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveBadge(badge.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address and Map */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        پتہ (Location Address)
                      </label>
                      <input
                        type="text"
                        value={heroData.addressText}
                        onChange={(e) => setHeroData({ ...heroData, addressText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        گوگل میپس لنک (Google Maps URL)
                      </label>
                      <input
                        type="text"
                        value={heroData.googleMapsUrl}
                        onChange={(e) => setHeroData({ ...heroData, googleMapsUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Buttons Labels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        پرائمری بٹن (داخلہ لیں)
                      </label>
                      <input
                        type="text"
                        value={heroData.admissionBtnText}
                        onChange={(e) =>
                          setHeroData({ ...heroData, admissionBtnText: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-300 mb-1.5">
                        سیکنڈری بٹن (رابطہ کریں)
                      </label>
                      <input
                        type="text"
                        value={heroData.contactBtnText}
                        onChange={(e) => setHeroData({ ...heroData, contactBtnText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Background Media & Admission Poster (5 cols) */}
              <div className="lg:col-span-5 space-y-6">

                {/* Background Media Card */}
                <div className="p-6 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/25 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#C9B38D]/20 pb-3">
                    <h3 className="text-base font-bold text-[#C9B38D] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>ہیرو پس منظر میڈیا (Background Video / Image)</span>
                    </h3>

                    {/* Media Type Selector */}
                    <div className="flex items-center gap-1 bg-[#120A05] p-1 rounded-xl border border-[#C9B38D]/30 text-xs">
                      <button
                        type="button"
                        onClick={() => setHeroData({ ...heroData, bgType: "image" })}
                        className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                          heroData.bgType === "image"
                            ? "bg-[#C9B38D] text-[#120A05]"
                            : "text-stone-300 hover:text-white"
                        }`}
                      >
                        تصویر
                      </button>
                      <button
                        type="button"
                        onClick={() => setHeroData({ ...heroData, bgType: "video" })}
                        className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                          heroData.bgType === "video"
                            ? "bg-[#C9B38D] text-[#120A05]"
                            : "text-stone-300 hover:text-white"
                        }`}
                      >
                        ویڈیو
                      </button>
                    </div>
                  </div>

                  {/* Live Media Preview Box */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-[#C9B38D]/30">
                    {heroData.bgType === "video" || heroData.bgMediaUrl?.endsWith(".mp4") ? (
                      <video
                        src={heroData.bgMediaUrl}
                        controls
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={heroData.bgMediaUrl}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Upload button or URL input */}
                  <div className="space-y-3 pt-1">
                    <input
                      type="file"
                      ref={bgFileInputRef}
                      onChange={handleBgFileUpload}
                      accept="image/*,video/mp4,video/webm"
                      className="hidden"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => bgFileInputRef.current?.click()}
                        disabled={uploadingBg}
                        className="flex-1 h-10 px-4 rounded-xl bg-gradient-to-l from-[#C9B38D]/20 to-[#EFE5D2]/30 hover:from-[#C9B38D]/30 hover:to-[#EFE5D2]/40 text-[#FAF7F2] border border-[#C9B38D]/40 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                        <span>
                          {uploadingBg
                            ? "فائل اپلوڈ ہو رہی ہے..."
                            : "کمپیوٹر سے تصویر یا ویڈیو اپلوڈ کریں"}
                        </span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 mb-1">
                        یا براہِ راست میڈیا URL درج کریں:
                      </label>
                      <input
                        type="text"
                        value={heroData.bgMediaUrl}
                        onChange={(e) => setHeroData({ ...heroData, bgMediaUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs font-mono focus:border-[#C9B38D] focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Admission Poster Flyer Card */}
                <div className="p-6 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/25 space-y-4 shadow-xl">
                  <h3 className="text-base font-bold text-[#C9B38D] flex items-center gap-2 border-b border-[#C9B38D]/20 pb-3">
                    <ImageIcon className="w-4 h-4" />
                    <span>داخلہ پوسٹر و فلائر (Admission Poster Flyer)</span>
                  </h3>

                  <div className="flex gap-4 items-center">
                    <div className="relative w-28 aspect-[3/4] rounded-xl overflow-hidden bg-black/60 border border-[#C9B38D]/40 shrink-0">
                      <img
                        src={heroData.posterImage}
                        alt="Poster Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <input
                        type="file"
                        ref={posterFileInputRef}
                        onChange={handlePosterFileUpload}
                        accept="image/*"
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => posterFileInputRef.current?.click()}
                        disabled={uploadingPoster}
                        className="w-full h-9 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-[#C9B38D]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                        <span>
                          {uploadingPoster ? "پوسٹر اپلوڈ ہو رہا ہے..." : "نیا داخلہ پوسٹر اپلوڈ کریں"}
                        </span>
                      </button>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-400 mb-1">
                          پوسٹر کی تصویر کا URL:
                        </label>
                        <input
                          type="text"
                          value={heroData.posterImage}
                          onChange={(e) => setHeroData({ ...heroData, posterImage: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs font-mono focus:border-[#C9B38D] focus:outline-none"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Save Bar */}
            <div className="p-4 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/30 flex items-center justify-between">
              <span className="text-xs text-stone-300">
                تبدیلیوں کو مکمل محفوظ کرنے کے لیے "تبدیلیاں محفوظ کریں" دبائیں۔
              </span>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-sm font-bold hover:brightness-105 shadow transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "محفوظ ہو رہا ہے..." : "تبدیلیاں محفوظ کریں"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: SECTIONS TITLES & ENABLE / DISABLE */}
        {activeTab === "sections" && (
          <form onSubmit={handleSaveAll} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(sectionsData).map((secKey) => {
                const sec = sectionsData[secKey] || {};
                const meta = sectionMeta[secKey] || { name: secKey, icon: "Layers" };

                return (
                  <div
                    key={secKey}
                    className={`p-5 sm:p-6 rounded-3xl bg-[#1C1009] border transition-all duration-300 ${
                      ["campus", "library", "activities", "picnic", "celebrations"].includes(secKey)
                        ? "md:col-span-2 border-[#C9B38D]/50 shadow-2xl"
                        : ""
                    } ${
                      sec.enabled !== false
                        ? "border-[#C9B38D]/40 shadow-lg"
                        : "border-stone-800 opacity-60"
                    }`}
                  >
                    {/* Header with Enable Toggle */}
                    <div className="flex items-center justify-between border-b border-[#C9B38D]/20 pb-3 mb-4">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D]" />
                          <span>{meta.name}</span>
                        </h4>
                        <span className="text-[11px] text-stone-400 font-mono">
                          ID: {secKey}
                        </span>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <span className="text-xs font-bold text-stone-300">
                          {sec.enabled !== false ? "صفحہ پر فعال" : "غیر فعال"}
                        </span>
                        <input
                          type="checkbox"
                          checked={sec.enabled !== false}
                          onChange={(e) =>
                            setSectionsData({
                              ...sectionsData,
                              [secKey]: { ...sec, enabled: e.target.checked }
                            })
                          }
                          className="w-4 h-4 accent-[#C9B38D] rounded cursor-pointer"
                        />
                      </label>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-400 mb-1">
                          اوپری بیج ٹیکسٹ (Badge Label)
                        </label>
                        <input
                          type="text"
                          value={sec.badge || ""}
                          onChange={(e) =>
                            setSectionsData({
                              ...sectionsData,
                              [secKey]: { ...sec, badge: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-400 mb-1">
                          سیکشن کا مرکزی عنوان (Main Title)
                        </label>
                        <input
                          type="text"
                          value={sec.title || ""}
                          onChange={(e) =>
                            setSectionsData({
                              ...sectionsData,
                              [secKey]: { ...sec, title: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs font-bold focus:border-[#C9B38D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-400 mb-1">
                          ذیلی تفصیل / تعارف (Subtitle)
                        </label>
                        <textarea
                          rows={2}
                          value={sec.subtitle || ""}
                          onChange={(e) =>
                            setSectionsData({
                              ...sectionsData,
                              [secKey]: { ...sec, subtitle: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs leading-[2.1] focus:border-[#C9B38D] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* INLINE MEDIA CONTROLS FOR CAMPUS (1 VIDEO + 4 PHOTOS) */}
                    {secKey === "campus" && (
                      <div className="mt-6 pt-5 border-t-2 border-[#C9B38D]/30 space-y-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#2A160D]/50 p-3 rounded-2xl border border-[#C9B38D]/30">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                            <h5 className="text-xs sm:text-sm font-bold text-[#E5D7BE] flex items-center gap-1.5">
                              <Film className="w-4 h-4 text-[#C9B38D]" />
                              <span>اس سیکشن کی ویڈیو اور تصاویر (1 ویڈیو + 4 تصاویر)</span>
                            </h5>
                          </div>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#120A05] text-[#C9B38D] border border-[#C9B38D]/40 font-bold">
                            براہِ راست تبدیلی
                          </span>
                        </div>

                        {/* PART 1: THE 1 FEATURED VIDEO TOUR */}
                        <div className="p-4 rounded-2xl bg-[#120A05] border border-[#C9B38D]/40 space-y-3 shadow-inner">
                          <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="text-xs font-bold text-[#E5D7BE] flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5 text-red-400" />
                              <span>مرکزی ویڈیو کارڈ (Featured Video - 1 Video)</span>
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              پوسٹر + یوٹیوب یا MP4 لنک
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-black/60 border border-[#C9B38D]/40 shrink-0 flex items-center justify-center">
                              {(() => {
                                const directVideo = isVideoUrl(campusMediaData[0]?.videoUrl)
                                  ? campusMediaData[0]?.videoUrl
                                  : isVideoUrl(campusMediaData[0]?.imageUrl)
                                  ? campusMediaData[0]?.imageUrl
                                  : null;

                                if (campusMediaData[0]?.imageUrl && !isVideoUrl(campusMediaData[0]?.imageUrl)) {
                                  return (
                                    <img
                                      src={campusMediaData[0].imageUrl}
                                      alt="Video Poster"
                                      className="w-full h-full object-cover"
                                    />
                                  );
                                }

                                if (directVideo) {
                                  return (
                                    <video
                                      src={`${directVideo}#t=0.5`}
                                      preload="metadata"
                                      muted
                                      playsInline
                                      className="w-full h-full object-cover pointer-events-none"
                                    />
                                  );
                                }

                                return (
                                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 bg-[#120A05]">
                                    <Film className="w-6 h-6 text-[#C9B38D]/50 mb-1" />
                                    <span className="text-[10px] text-stone-400">کوئی ویڈیو نہیں</span>
                                  </div>
                                );
                              })()}
                            </div>

                            <div className="flex-1 w-full space-y-1.5">
                              <label className="block text-[11px] font-bold text-stone-400">
                                ویڈیو کی پوسٹر / تھمب نیل تصویر (اختیاری - خودکار طریقے سے ویڈیو کا پہلا فریم نظر آئے گا):
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  dir="ltr"
                                  value={campusMediaData[0]?.imageUrl || ""}
                                  onChange={(e) => updateCampusMediaItem(0, "imageUrl", e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-xl bg-[#1C1009] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                                  placeholder="خودکار ویڈیو فریم یا کسٹم تصویر کا ربط"
                                />
                                <label className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition flex items-center gap-1 cursor-pointer shrink-0">
                                  <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                                  <span>{uploadingCampusIdx === 0 ? "..." : "پوسٹر چنیں"}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleCampusMediaUpload(0, e)}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                ویڈیو کا عنوان (Title)
                              </label>
                              <input
                                type="text"
                                value={campusMediaData[0]?.title || ""}
                                onChange={(e) => updateCampusMediaItem(0, "title", e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-[#1C1009] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                                placeholder="مدرسہ کا مرکزی بیرونی منظر و گنبد"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-stone-300 mb-1">
                                دورانیہ (Duration)
                              </label>
                              <input
                                type="text"
                                value={campusMediaData[0]?.videoDuration || ""}
                                onChange={(e) => updateCampusMediaItem(0, "videoDuration", e.target.value)}
                                className="w-full px-3 py-1.5 rounded-xl bg-[#1C1009] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none text-right"
                                placeholder="۰۴:۱۵"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-300 mb-1">
                              ویڈیو کا ربط (YouTube URL یا MP4 ویڈیو فائل)
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                dir="ltr"
                                value={campusMediaData[0]?.videoUrl || ""}
                                onChange={(e) => updateCampusMediaItem(0, "videoUrl", e.target.value)}
                                className="flex-1 px-3 py-1.5 rounded-xl bg-[#1C1009] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none text-left"
                                placeholder="https://www.youtube.com/watch?v=... یا MP4 ویڈیو لنک"
                              />
                              <label className="px-3.5 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition flex items-center gap-1 cursor-pointer shrink-0">
                                <Video className="w-3.5 h-3.5 text-[#C9B38D]" />
                                <span>{uploadingCampusVideo ? "..." : "ویڈیو چنیں"}</span>
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={handleCampusVideoUpload}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* PART 2: THE 4 SURROUNDING IMAGES */}
                        <div className="space-y-3">
                          <span className="text-xs font-bold text-[#E5D7BE] flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-[#C9B38D]" />
                            <span>چار تصویری کارڈز (4 Images)</span>
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {[1, 2, 3, 4].map((idx) => {
                              const item = campusMediaData[idx] || {
                                id: `campus-img-${idx}`,
                                title: `تصویر #${idx}`,
                                category: "کیمپس",
                                type: "image",
                                imageUrl: "/images/layout/congregation.jpg",
                                location: "احسن آباد کیمپس"
                              };

                              return (
                                <div
                                  key={idx}
                                  className="p-3.5 rounded-2xl bg-[#120A05] border border-[#C9B38D]/20 space-y-2.5 hover:border-[#C9B38D]/50 transition"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-[#C9B38D] px-2 py-0.5 rounded-full bg-[#1C1009] border border-[#C9B38D]/25">
                                      تصویر #{idx}
                                    </span>
                                    <input
                                      type="text"
                                      value={item.category || ""}
                                      onChange={(e) => updateCampusMediaItem(idx, "category", e.target.value)}
                                      className="text-[10px] px-2 py-0.5 rounded-lg bg-[#1C1009] border border-white/10 text-stone-300 w-28 text-right"
                                      placeholder="زمرہ / بیج"
                                    />
                                  </div>

                                  <div className="flex gap-2.5 items-center">
                                    <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-black/60 border border-white/15 shrink-0">
                                      <img
                                        src={item.imageUrl || "/images/layout/congregation.jpg"}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>

                                    <div className="flex-1 space-y-1.5">
                                      <div className="flex items-center gap-1.5">
                                        <input
                                          type="text"
                                          dir="ltr"
                                          value={item.imageUrl || ""}
                                          onChange={(e) => updateCampusMediaItem(idx, "imageUrl", e.target.value)}
                                          className="flex-1 px-2.5 py-1 rounded-lg bg-[#1C1009] border border-white/10 text-white text-[11px] focus:outline-none"
                                          placeholder="/images/..."
                                        />
                                        <label className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-stone-200 text-[11px] font-bold border border-white/10 transition flex items-center gap-1 cursor-pointer shrink-0">
                                          <Upload className="w-3 h-3 text-[#C9B38D]" />
                                          <span>{uploadingCampusIdx === idx ? "..." : "اپلوڈ"}</span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleCampusMediaUpload(idx, e)}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      value={item.title || ""}
                                      onChange={(e) => updateCampusMediaItem(idx, "title", e.target.value)}
                                      className="w-full px-2.5 py-1 rounded-lg bg-[#1C1009] border border-white/10 text-white text-[11px] font-bold focus:border-[#C9B38D] focus:outline-none"
                                      placeholder="تصویر کا عنوان..."
                                    />
                                    <input
                                      type="text"
                                      value={item.location || ""}
                                      onChange={(e) => updateCampusMediaItem(idx, "location", e.target.value)}
                                      className="w-full px-2.5 py-1 rounded-lg bg-[#1C1009] border border-white/10 text-stone-300 text-[10px] focus:border-[#C9B38D] focus:outline-none"
                                      placeholder="مقام..."
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* INLINE MEDIA CONTROLS FOR LIBRARY, ACTIVITIES, PICNIC, CELEBRATIONS */}
                    {["library", "activities", "picnic", "celebrations"].includes(secKey) && (
                      <div className="mt-6 pt-5 border-t-2 border-[#C9B38D]/30 space-y-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#2A160D]/50 p-3.5 rounded-2xl border border-[#C9B38D]/30">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#C9B38D] animate-pulse" />
                            <h5 className="text-xs sm:text-sm font-bold text-[#E5D7BE] flex items-center gap-1.5">
                              <Film className="w-4 h-4 text-[#C9B38D]" />
                              <span>اس سیکشن کی ویڈیوز اور تصاویر ({getSectionMediaList(secKey).length} آئٹمز)</span>
                            </h5>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => addSectionMediaItem(secKey, "image")}
                              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 text-[#C9B38D]" />
                              <span>+ نئی تصویر شامل کریں</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => addSectionMediaItem(secKey, "video")}
                              className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-200 text-xs font-bold border border-red-500/40 transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Video className="w-3.5 h-3.5 text-red-400" />
                              <span>+ نئی ویڈیو شامل کریں</span>
                            </button>
                          </div>
                        </div>

                        {/* Media Items Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {getSectionMediaList(secKey).map((item: any, idx: number) => {
                            const isVid = item.type === "video";
                            const isUploading =
                              uploadingSectionMedia?.section === secKey &&
                              uploadingSectionMedia?.idx === idx;

                            return (
                              <div
                                key={item.id || idx}
                                className={`p-4 rounded-2xl bg-[#120A05] border space-y-3 transition shadow-md ${
                                  isVid
                                    ? "border-red-500/35 hover:border-red-400/60"
                                    : "border-[#C9B38D]/25 hover:border-[#C9B38D]/50"
                                }`}
                              >
                                {/* Item Card Header */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-[#C9B38D] px-2 py-0.5 rounded-md bg-[#1C1009] border border-[#C9B38D]/25">
                                      آئٹم #{idx + 1}
                                    </span>

                                    <div className="flex items-center rounded-lg bg-[#1C1009] p-0.5 border border-white/10 text-[10px]">
                                      <button
                                        type="button"
                                        onClick={() => updateSectionMediaItem(secKey, idx, "type", "image")}
                                        className={`px-2 py-0.5 rounded-md transition font-bold flex items-center gap-1 cursor-pointer ${
                                          !isVid
                                            ? "bg-[#C9B38D] text-[#120A05]"
                                            : "text-stone-400 hover:text-white"
                                        }`}
                                      >
                                        <ImageIcon className="w-3 h-3" />
                                        <span>تصویر</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => updateSectionMediaItem(secKey, idx, "type", "video")}
                                        className={`px-2 py-0.5 rounded-md transition font-bold flex items-center gap-1 cursor-pointer ${
                                          isVid
                                            ? "bg-red-500 text-white"
                                            : "text-stone-400 hover:text-white"
                                        }`}
                                      >
                                        <Video className="w-3 h-3" />
                                        <span>ویڈیو</span>
                                      </button>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => removeSectionMediaItem(secKey, idx)}
                                    className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition cursor-pointer"
                                    title="ڈیلیٹ کریں"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {/* Thumbnail Preview & Upload / URL */}
                                <div className="flex gap-3 items-center">
                                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-black/60 border border-white/15 shrink-0 group">
                                    <img
                                      src={item.imageUrl || "/images/layout/mosque-arches.jpg"}
                                      alt={item.title || "Preview"}
                                      className="w-full h-full object-cover"
                                    />
                                    {isVid && (
                                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Video className="w-5 h-5 text-red-400 drop-shadow" />
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex-1 space-y-1.5">
                                    <label className="block text-[11px] font-bold text-stone-400">
                                      {isVid ? "ویڈیو تھمب نیل / پوسٹر تصویر:" : "تصویر کا ربط (Image URL):"}
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        dir="ltr"
                                        value={item.imageUrl || ""}
                                        onChange={(e) => updateSectionMediaItem(secKey, idx, "imageUrl", e.target.value)}
                                        className="flex-1 px-2.5 py-1.5 rounded-xl bg-[#1C1009] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                                        placeholder="/images/..."
                                      />
                                      <label className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition flex items-center gap-1 cursor-pointer shrink-0">
                                        <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                                        <span>{isUploading ? "..." : "اپلوڈ"}</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => handleSectionMediaUpload(secKey, idx, e)}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                {/* If video: Video Link and Duration */}
                                {isVid && (
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#1C1009]/60 p-2.5 rounded-xl border border-red-500/20">
                                    <div className="sm:col-span-2">
                                      <label className="block text-[10px] font-bold text-stone-300 mb-1">
                                        ویڈیو لنک (YouTube یا MP4 URL)
                                      </label>
                                      <input
                                        type="text"
                                        dir="ltr"
                                        value={item.videoUrl || ""}
                                        onChange={(e) => updateSectionMediaItem(secKey, idx, "videoUrl", e.target.value)}
                                        className="w-full px-2.5 py-1 rounded-lg bg-[#120A05] border border-red-500/30 text-white text-xs focus:border-red-400 focus:outline-none text-left"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-stone-300 mb-1">
                                        دورانیہ (Duration)
                                      </label>
                                      <input
                                        type="text"
                                        value={item.videoDuration || ""}
                                        onChange={(e) => updateSectionMediaItem(secKey, idx, "videoDuration", e.target.value)}
                                        className="w-full px-2.5 py-1 rounded-lg bg-[#120A05] border border-red-500/30 text-white text-xs focus:border-red-400 focus:outline-none text-right font-mono"
                                        placeholder="۰۳:۲۰"
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Title & Category */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[10px] font-bold text-stone-400 mb-0.5">
                                      عنوان (Title)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.title || ""}
                                      onChange={(e) => updateSectionMediaItem(secKey, idx, "title", e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#1C1009] border border-white/10 text-white text-xs font-bold focus:border-[#C9B38D] focus:outline-none"
                                      placeholder="عنوان درج کریں..."
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-stone-400 mb-0.5">
                                      زمرہ / بیج (Category)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.category || ""}
                                      onChange={(e) => updateSectionMediaItem(secKey, idx, "category", e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#1C1009] border border-white/10 text-stone-300 text-xs focus:border-[#C9B38D] focus:outline-none"
                                      placeholder="زمرہ..."
                                    />
                                  </div>
                                </div>

                                {/* Location & Date */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[10px] font-bold text-stone-400 mb-0.5">
                                      مقام (Location)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.location || ""}
                                      onChange={(e) => updateSectionMediaItem(secKey, idx, "location", e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#1C1009] border border-white/10 text-stone-300 text-xs focus:border-[#C9B38D] focus:outline-none"
                                      placeholder="مقام..."
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-stone-400 mb-0.5">
                                      تاریخ / سال (Date)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.date || ""}
                                      onChange={(e) => updateSectionMediaItem(secKey, idx, "date", e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#1C1009] border border-white/10 text-stone-300 text-xs focus:border-[#C9B38D] focus:outline-none"
                                      placeholder="تعلیمی سال ۲۰۲۶..."
                                    />
                                  </div>
                                </div>

                                {/* Description */}
                                <div>
                                  <label className="block text-[10px] font-bold text-stone-400 mb-0.5">
                                    مختصر وضاحت (Description)
                                  </label>
                                  <textarea
                                    rows={1}
                                    value={item.description || ""}
                                    onChange={(e) => updateSectionMediaItem(secKey, idx, "description", e.target.value)}
                                    className="w-full px-2.5 py-1 rounded-xl bg-[#1C1009] border border-white/10 text-stone-300 text-xs leading-[2] focus:border-[#C9B38D] focus:outline-none"
                                    placeholder="مختصر تفصیل..."
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/30 flex items-center justify-between">
              <span className="text-xs text-stone-300">
                سیکشنز کے عنوانات و فعال/غیر فعال کیفیت محفوظ کرنے کے لیے بٹن دبائیں۔
              </span>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-sm font-bold hover:brightness-105 shadow transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "محفوظ ہو رہا ہے..." : "تبدیلیاں محفوظ کریں"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: CAMPUS MEDIA SECTION (1 VIDEO + 4 IMAGES) */}
        {activeTab === "campusMedia" && (
          <form onSubmit={handleSaveAll} className="space-y-6">
            {/* Top Info Banner */}
            <div className="p-6 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A160D] border border-[#C9B38D]/40 text-[#C9B38D] text-xs font-bold mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>سیکشن ۱: کیمپس و عمارات میڈیا (Bento Grid)</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  کیمپس میڈیا: ۱ مرکزی ویڈیو ٹور اور ۴ اطراف کی تصاویر
                </h3>
                <p className="text-xs text-stone-300 mt-1 leading-[2.1]">
                  اس سیکشن میں کل ۵ آئٹمز ہوتے ہیں: ایک بڑی ویڈیو (کارڈ نمبر ۱) اور چار اطراف کی تصاویر (کارڈ ۲ تا ۵)۔ آپ کسی بھی وقت ان کے لنکس، عنوان اور تصاویر تبدیل کر سکتے ہیں۔
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition cursor-pointer shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "محفوظ ہو رہا ہے..." : "تبدیلیاں محفوظ کریں"}</span>
              </button>
            </div>

            {/* PART 1: THE 1 FEATURED VIDEO (CARD 0) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#1C1009] border-2 border-[#C9B38D]/45 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#C9B38D]/25 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400">
                    <Video className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      مرکزی ویڈیو کارڈ (Featured Video - 1 Video)
                    </h4>
                    <span className="text-[11px] text-[#C9B38D]">
                      یہ کارڈ ہوم پیج پر ۲ کالمز اور ۲ قطاروں میں نمایاں ویڈیو پلیئر کے ساتھ نظر آتا ہے
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold">
                  ویڈیو ٹور
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    ویڈیو کا عنوان (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={campusMediaData[0]?.title || ""}
                    onChange={(e) => updateCampusMediaItem(0, "title", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    placeholder="مثال: مدرسہ کا مرکزی بیرونی منظر و گنبد"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    ویڈیو کا دورانیہ (Duration)
                  </label>
                  <input
                    type="text"
                    value={campusMediaData[0]?.videoDuration || ""}
                    onChange={(e) => updateCampusMediaItem(0, "videoDuration", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none text-right"
                    placeholder="مثال: ۰۴:۱۵"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    ویڈیو کا ربط (YouTube URL یا MP4 Link) *
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={campusMediaData[0]?.videoUrl || ""}
                    onChange={(e) => updateCampusMediaItem(0, "videoUrl", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none text-left"
                    placeholder="https://www.youtube.com/watch?v=... یا /videos/campus.mp4"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    یوٹیوب کا کوئی بھی ویڈیو لنک ڈالیں، یہ ماڈل میں خود بخود پلیئر بن جائے گا
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    کیٹیگری بیج (Badge Label)
                  </label>
                  <input
                    type="text"
                    value={campusMediaData[0]?.category || ""}
                    onChange={(e) => updateCampusMediaItem(0, "category", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    placeholder="مثال: مرکزی کیمپس"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    مقام (Location)
                  </label>
                  <input
                    type="text"
                    value={campusMediaData[0]?.location || ""}
                    onChange={(e) => updateCampusMediaItem(0, "location", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    placeholder="احسن آباد کیمپس، کراچی"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    مختصر تفصیل (Description)
                  </label>
                  <input
                    type="text"
                    value={campusMediaData[0]?.description || ""}
                    onChange={(e) => updateCampusMediaItem(0, "description", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    placeholder="مدرسہ کی خوبصورت عمارت کا مکمل ورچوئل ٹور"
                  />
                </div>
              </div>

              {/* Poster / Thumbnail Image with Upload and Live Preview */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  ویڈیو کی پوسٹر / تھمب نیل تصویر (Poster Image):
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-2xl bg-[#120A05] border border-[#C9B38D]/25">
                  <div className="relative w-36 h-22 rounded-xl overflow-hidden bg-black/60 border border-[#C9B38D]/40 shrink-0">
                    <img
                      src={campusMediaData[0]?.imageUrl || "/images/layout/mosque-arches.jpg"}
                      alt="Video Poster Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        dir="ltr"
                        value={campusMediaData[0]?.imageUrl || ""}
                        onChange={(e) => updateCampusMediaItem(0, "imageUrl", e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-[#1C1009] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                        placeholder="/images/layout/mosque-arches.jpg"
                      />
                      <label className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition flex items-center gap-1.5 cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                        <span>{uploadingCampusIdx === 0 ? "اپلوڈ..." : "تصویر چنیں"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleCampusMediaUpload(0, e)}
                        />
                      </label>
                    </div>
                    <span className="text-[10px] text-stone-400 block">
                      ویڈیو پلے ہونے سے پہلے یہ تصویر نظر آئے گی۔ آپ اپنے کمپیوٹر سے کوئی بھی نئی تصویر اپلوڈ کر سکتے ہیں۔
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PART 2: THE 4 IMAGES (CARDS 1, 2, 3, 4) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#C9B38D]" />
                    <span>چار اطراف کے تصویری کارڈز (4 Images)</span>
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    یہ چاروں تصاویر ویڈیو کے دائیں بائیں اور نیچے ۲x۲ بینٹو گرڈ میں نظر آتی ہیں
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((idx) => {
                  const item = campusMediaData[idx] || {
                    id: `campus-img-${idx}`,
                    title: `تصویر #${idx}`,
                    category: "کیمپس",
                    type: "image",
                    imageUrl: "/images/layout/congregation.jpg",
                    location: "احسن آباد کیمپس",
                    description: ""
                  };

                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/25 space-y-4 shadow-lg hover:border-[#C9B38D]/60 transition"
                    >
                      <div className="flex items-center justify-between border-b border-[#C9B38D]/15 pb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2A160D] border border-[#C9B38D]/30 text-[11px] font-bold text-[#C9B38D]">
                          تصویر کارڈ #{idx}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {item.category || "تصویر"}
                        </span>
                      </div>

                      <div className="flex gap-3 items-center">
                        <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-black/60 border border-[#C9B38D]/30 shrink-0">
                          <img
                            src={item.imageUrl || "/images/layout/congregation.jpg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              dir="ltr"
                              value={item.imageUrl || ""}
                              onChange={(e) => updateCampusMediaItem(idx, "imageUrl", e.target.value)}
                              className="flex-1 px-2.5 py-1.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                              placeholder="/images/layout/..."
                            />
                            <label className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition flex items-center gap-1 cursor-pointer shrink-0">
                              <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                              <span>{uploadingCampusIdx === idx ? "..." : "اپلوڈ"}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleCampusMediaUpload(idx, e)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">
                            عنوان (Title)
                          </label>
                          <input
                            type="text"
                            value={item.title || ""}
                            onChange={(e) => updateCampusMediaItem(idx, "title", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                            placeholder="مثال: دار الحدیث و تدریسی ہال"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">
                            زمرہ / کیٹیگری (Category)
                          </label>
                          <input
                            type="text"
                            value={item.category || ""}
                            onChange={(e) => updateCampusMediaItem(idx, "category", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                            placeholder="مثال: تدریسی ہال"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">
                            مقام (Location)
                          </label>
                          <input
                            type="text"
                            value={item.location || ""}
                            onChange={(e) => updateCampusMediaItem(idx, "location", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                            placeholder="دوسری منزل، مرکزی ہال"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">
                            مختصر تفصیل (Description)
                          </label>
                          <input
                            type="text"
                            value={item.description || ""}
                            onChange={(e) => updateCampusMediaItem(idx, "description", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                            placeholder="طلبہ کے دروس کا منظر"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Save Bar */}
            <div className="p-4 rounded-2xl bg-[#1C1009] border border-[#C9B38D]/30 flex items-center justify-between">
              <span className="text-xs text-stone-300">
                کیمپس میڈیا (1 ویڈیو اور 4 تصاویر) کو ہوم پیج پر لائیو کرنے کے لیے بٹن دبائیں۔
              </span>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-sm font-bold hover:brightness-105 shadow transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "محفوظ ہو رہا ہے..." : "کیمپس میڈیا کی تبدیلیاں محفوظ کریں"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: DONATIONS SECTION CONFIGURATION */}
        {activeTab === "donations" && (
          <form onSubmit={handleSaveAll} className="space-y-6 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/30 shadow-2xl space-y-6">
              <div className="border-b border-[#C9B38D]/20 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-[#C9B38D]" />
                    <span>عطیات، صدقات و دسترخوانِ امام زمانہؑ ترتیبات</span>
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 leading-[2.1]">
                    ہوم پیج پر نظر آنے والی حدیث مبارکہ، کفالت کے پیکجز، صدقہ باکس تصویر اور پیشگی رقم کے بٹن تبدیل کریں۔
                  </p>
                </div>
                <a
                  href="/admin/donations"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-[#C9B38D]/40 transition"
                >
                  <span>بینک اکاؤنٹس مینج کریں</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C9B38D]" />
                </a>
              </div>

              {/* Hadith Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    فرمان / حدیث معصومؑ کا عنوان (مثال: فرمانِ معصوم علیہ السلام):
                  </label>
                  <input
                    type="text"
                    value={donationData.hadithSource}
                    onChange={(e) => setDonationData({ ...donationData, hadithSource: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs font-bold focus:border-[#C9B38D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    عربی حدیث کا متن (Hadith in Arabic):
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={donationData.hadithArabic}
                    onChange={(e) => setDonationData({ ...donationData, hadithArabic: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-amber-200 text-sm font-arabic font-bold focus:border-[#C9B38D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    اردو مفہوم / ترجمہ (Urdu Explanation):
                  </label>
                  <input
                    type="text"
                    value={donationData.hadithUrdu}
                    onChange={(e) => setDonationData({ ...donationData, hadithUrdu: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-stone-200 text-xs leading-[2.1] focus:border-[#C9B38D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Sponsorship Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-[#C9B38D]/20">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    طالب علم کفالت ٹیکسٹ / رقم:
                  </label>
                  <input
                    type="text"
                    value={donationData.studentSponsorship}
                    onChange={(e) => setDonationData({ ...donationData, studentSponsorship: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs font-bold focus:border-[#C9B38D] focus:outline-none"
                    placeholder="ماہانہ طالب علم کفالت: 1500 روپے"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    طعام و راشن کفالت ٹیکسٹ / رقم:
                  </label>
                  <input
                    type="text"
                    value={donationData.foodSponsorship}
                    onChange={(e) => setDonationData({ ...donationData, foodSponsorship: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs font-bold focus:border-[#C9B38D] focus:outline-none"
                    placeholder="طعام کفالت: 10,000 روپے"
                  />
                </div>
              </div>

              {/* Preset Amounts */}
              <div className="pt-3 border-t border-[#C9B38D]/20">
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  فوری منتخب کرنے کی پیشگی رقوم (Preset Amounts - کوما لگا کر لکھیں):
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={Array.isArray(donationData.presetAmounts) ? donationData.presetAmounts.join(", ") : donationData.presetAmounts}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const arr = raw.split(",").map((s) => s.trim()).filter(Boolean);
                    setDonationData({ ...donationData, presetAmounts: arr });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs font-mono font-bold focus:border-[#C9B38D] focus:outline-none"
                  placeholder="1500, 2500, 5000, 10000, 25000"
                />
                <span className="text-[11px] text-stone-400 mt-1 block">
                  مثال: 1500, 2500, 5000, 10000, 25000
                </span>
              </div>

              {/* Donation Box Image */}
              <div className="pt-3 border-t border-[#C9B38D]/20">
                <label className="block text-xs font-bold text-stone-300 mb-2">
                  عطیات باکس کی تصویر (Donation Box Photo):
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-[#C9B38D]/40 bg-[#120A05] shrink-0 shadow">
                    {donationData.boxImage ? (
                      <img
                        src={donationData.boxImage}
                        alt="Donation Box"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-500">
                        تصویر نہیں ہے
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 flex-1">
                    <input
                      type="text"
                      dir="ltr"
                      value={donationData.boxImage}
                      onChange={(e) => setDonationData({ ...donationData, boxImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                      placeholder="/images/layout/donation-box.jpg"
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        ref={donationBoxInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleDonationBoxUpload}
                      />
                      <button
                        type="button"
                        disabled={uploadingDonationBox}
                        onClick={() => donationBoxInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                        <span>{uploadingDonationBox ? "اپلوڈ ہو رہی ہے..." : "کمپیوٹر سے نئی تصویر اپلوڈ کریں"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C9B38D]/20 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-sm font-bold hover:brightness-105 shadow transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "محفوظ ہو رہا ہے..." : "عطیات کی ترتیبات محفوظ کریں"}</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB: TESTIMONIALS SECTION CONFIGURATION */}
        {activeTab === "testimonials" && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/30 shadow-2xl space-y-6">
              <div className="border-b border-[#C9B38D]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#C9B38D]" />
                    <span>اکابرین، علمائے کرام و سرپرستوں کے تاثرات کا انتظام (Testimonials CMS)</span>
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 leading-[2.1]">
                    ہوم پیج پر ظاہر ہونے والے تمام ریویوز اور تاثرات یہاں سے شامل کریں، تبدیل کریں یا حذف کریں۔
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenNewTestimonialModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>نیا تاثر شامل کریں</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveAll()}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-[#C9B38D]" />
                    <span>{saving ? "محفوظ ہو رہا ہے..." : "تبدیلیاں محفوظ کریں"}</span>
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "تمام تاثرات" },
                  { id: "scholars", label: "علمائے کرام" },
                  { id: "parents", label: "محترم سرپرست و والدین" },
                  { id: "alumni", label: "فارغ التحصیل طلبہ" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setTestimonialsFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      testimonialsFilter === cat.id
                        ? "bg-[#C9B38D] text-[#120A05]"
                        : "bg-[#120A05] text-stone-300 hover:text-white border border-[#C9B38D]/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
                <span className="text-xs text-stone-400 mr-auto">
                  کل تاثرات: {testimonialsData.length}
                </span>
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonialsData
                  .filter((t) => testimonialsFilter === "all" || t.category === testimonialsFilter)
                  .map((t, idx) => (
                    <div
                      key={t.id || idx}
                      className="p-5 rounded-2xl bg-[#120A05] border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 transition shadow-lg space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C9B38D]/40 bg-stone-900 shrink-0">
                              <img
                                src={t.avatar || "/images/layout/avatar1.jpg"}
                                alt={t.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-right">
                              <h4 className="font-bold text-white text-xs">{t.name}</h4>
                              <span className="text-[11px] text-[#C9B38D] block">{t.role}</span>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1C1009] border border-[#C9B38D]/30 text-[#C9B38D] font-semibold">
                            {t.badge || t.categoryLabel}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className={`w-3.5 h-3.5 ${
                                sIdx < (t.rating || 5)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-stone-600"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-xs text-stone-300 font-urdu leading-[2.2] line-clamp-4">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                        <span>{t.location} • {t.date}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditTestimonialModal(t)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-[#C9B38D] transition"
                            title="تبدیل کریں"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition"
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
          </div>
        )}

        {/* TAB 3: QUICK MEDIA UPLOADER (For any Homepage Section) */}
        {activeTab === "media" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1009] border border-[#C9B38D]/30 shadow-2xl max-w-4xl mx-auto space-y-6">
            <div className="border-b border-[#C9B38D]/20 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-[#C9B38D]" />
                <span>ہوم پیج کے کسی بھی سیکشن کے لیے نئی تصویر یا ویڈیو شامل کریں</span>
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-[2.1]">
                یہاں سے شامل کی جانے والی تصاویر اور ویڈیوز فوراً ہوم پیج کے متعلقہ سیکشن میں ظاہر ہوں گی۔
              </p>
            </div>

            {quickMediaSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold">
                  میڈیا آئٹم کامیابی سے شامل ہو گیا اور ہوم پیج پر لائیو ہو گیا ہے!
                </span>
              </div>
            )}

            <form onSubmit={handleAddQuickMedia} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Target Homepage Section */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    ہوم پیج کا سیکشن منتخب فرمائیں:
                  </label>
                  <select
                    value={quickMedia.section}
                    onChange={(e) => setQuickMedia({ ...quickMedia, section: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                  >
                    <option value="campus">سیکشن ۱: کیمپس و عمارات (Campus Media)</option>
                    <option value="library">سیکشن ۲: کتب خانہ و لائبریری (Library Gallery)</option>
                    <option value="activities">سیکشن ۳: بچوں کے کھیل کود (Student Activities)</option>
                    <option value="picnic">سیکشن ۴: بچوں کی پکنک (Student Picnic)</option>
                    <option value="celebrations">سیکشن ۵: جشن و تقاریب (Celebrations)</option>
                  </select>
                </div>

                {/* Media Type */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    میڈیا کی قسم:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickMedia({ ...quickMedia, type: "image" })}
                      className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition cursor-pointer ${
                        quickMedia.type === "image"
                          ? "bg-[#C9B38D] text-[#120A05] border-[#C9B38D]"
                          : "bg-[#120A05] text-stone-300 border-[#C9B38D]/30"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>تصویر (Image)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickMedia({ ...quickMedia, type: "video" })}
                      className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition cursor-pointer ${
                        quickMedia.type === "video"
                          ? "bg-[#C9B38D] text-[#120A05] border-[#C9B38D]"
                          : "bg-[#120A05] text-stone-300 border-[#C9B38D]/30"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>ویڈیو (Video Clip)</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    میڈیا کا عنوان (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: کرکٹ ٹورنامنٹ فائنل یا مرکزی لائبریری ہال"
                    value={quickMedia.title}
                    onChange={(e) => setQuickMedia({ ...quickMedia, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    کیٹیگری (Category)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: کھیل کود، تقاریب"
                    value={quickMedia.category}
                    onChange={(e) => setQuickMedia({ ...quickMedia, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Upload or URL for Media */}
              <div className="p-4 rounded-2xl bg-[#120A05] border border-[#C9B38D]/30 space-y-3">
                <label className="block text-xs font-bold text-[#C9B38D]">
                  فائل اپلوڈ کریں یا براہ راست لنک دیں:
                </label>

                <input
                  type="file"
                  ref={quickMediaFileInputRef}
                  onChange={handleQuickMediaUpload}
                  accept="image/*,video/mp4,video/webm"
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => quickMediaFileInputRef.current?.click()}
                    disabled={uploadingQuickMedia}
                    className="px-5 py-2.5 rounded-xl bg-[#C9B38D]/20 hover:bg-[#C9B38D]/30 text-[#FAF7F2] border border-[#C9B38D]/40 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                    <span>
                      {uploadingQuickMedia
                        ? "اپلوڈ ہو رہا ہے..."
                        : "کمپیوٹر سے فائل اپلوڈ کریں (تصویر یا ویڈیو)"}
                    </span>
                  </button>

                  {quickMedia.imageUrl && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      فائل منتخب ہے
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 mb-1">
                      تصویر کا URL (Poster Image):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="/images/... یا https://..."
                      value={quickMedia.imageUrl}
                      onChange={(e) => setQuickMedia({ ...quickMedia, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/25 text-white text-xs font-mono focus:border-[#C9B38D] focus:outline-none"
                      dir="ltr"
                    />
                  </div>

                  {quickMedia.type === "video" && (
                    <div>
                      <label className="block text-[11px] font-bold text-stone-400 mb-1">
                        ویڈیو کا URL یا یوٹیوب لنک:
                      </label>
                      <input
                        type="text"
                        placeholder="https://youtube.com/watch?v=... یا /uploads/video.mp4"
                        value={quickMedia.videoUrl}
                        onChange={(e) => setQuickMedia({ ...quickMedia, videoUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/25 text-white text-xs font-mono focus:border-[#C9B38D] focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  )}
                </div>

                {quickMedia.type === "video" && (
                  <div>
                    <label className="block text-[11px] font-bold text-stone-400 mb-1">
                      ویڈیو کا دورانیہ (مثال: ۰۳:۱۵):
                    </label>
                    <input
                      type="text"
                      placeholder="۰۳:۱۵"
                      value={quickMedia.videoDuration}
                      onChange={(e) =>
                        setQuickMedia({ ...quickMedia, videoDuration: e.target.value })
                      }
                      className="w-40 px-3 py-1.5 rounded-xl bg-[#1A0E08] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Description, Date, Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    تاریخ یا موقع (Date):
                  </label>
                  <input
                    type="text"
                    value={quickMedia.date}
                    onChange={(e) => setQuickMedia({ ...quickMedia, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    مقام (Location):
                  </label>
                  <input
                    type="text"
                    value={quickMedia.location}
                    onChange={(e) => setQuickMedia({ ...quickMedia, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  تفصیل / کیپشن (Description):
                </label>
                <textarea
                  rows={2}
                  value={quickMedia.description}
                  onChange={(e) => setQuickMedia({ ...quickMedia, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/30 text-white text-xs leading-[2.1] focus:border-[#C9B38D] focus:outline-none"
                  placeholder="اس تصویر یا ویڈیو کے متعلق مختصر وضاحتی جملہ..."
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={uploadingQuickMedia}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-sm font-bold hover:brightness-105 shadow-xl transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>یہ میڈیا ہوم پیج پر شامل کریں</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Testimonial Add/Edit Modal */}
        {isTestimonialModalOpen && editingTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
            <div className="bg-[#1C1009] border border-[#C9B38D]/40 p-6 sm:p-8 rounded-3xl max-w-2xl w-full shadow-2xl relative my-8">
              <button
                type="button"
                onClick={() => setIsTestimonialModalOpen(false)}
                className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-white hover:text-[#C9B38D] transition"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C9B38D]" />
                <span>{editingTestimonial.name ? "تاثر / ریویو کی تفصیل تبدیل کریں" : "نیا تاثر شامل کریں"}</span>
              </h3>

              <form onSubmit={handleSaveTestimonial} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      نامِ گرامی *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingTestimonial.name}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                      placeholder="مثال: علامہ سید عابد رضوی"
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      عہدہ / حیثیت (Role)
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.role}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                      placeholder="مثال: فاضل حوزہ علمیہ قم و محقق"
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      کیٹیگری (Category)
                    </label>
                    <select
                      value={editingTestimonial.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        const labelMap: any = {
                          scholars: "علمائے کرام",
                          parents: "محترم سرپرست و والدین",
                          alumni: "فارغ التحصیل طلبہ"
                        };
                        setEditingTestimonial({
                          ...editingTestimonial,
                          category: val,
                          categoryLabel: labelMap[val] || "علمائے کرام"
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none cursor-pointer"
                    >
                      <option value="scholars">علمائے کرام</option>
                      <option value="parents">محترم سرپرست و والدین</option>
                      <option value="alumni">فارغ التحصیل طلبہ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      بیج (Badge Label)
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.badge}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, badge: e.target.value })}
                      placeholder="مثال: جید عالمِ دین"
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      اسٹارز ریٹنگ (1-5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={editingTestimonial.rating || 5}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      شہر / مقام (Location)
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.location}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                      placeholder="کراچی / قم"
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1">
                      تاریخ یا سال (Date)
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.date}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, date: e.target.value })}
                      placeholder="شوال ۱۴۴۵ھ"
                      className="w-full px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    اواتار تصویر (Avatar URL):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      dir="ltr"
                      value={editingTestimonial.avatar}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs focus:border-[#C9B38D] focus:outline-none"
                      placeholder="/images/layout/avatar1.jpg"
                    />
                    <input
                      type="file"
                      ref={avatarInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <button
                      type="button"
                      disabled={uploadingAvatar}
                      onClick={() => avatarInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold border border-white/10 transition flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#C9B38D]" />
                      <span>{uploadingAvatar ? "اپلوڈ..." : "تصویر چنیں"}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    تاثر / ریویو کا مکمل متن (Quote) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingTestimonial.quote}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120A05] border border-[#C9B38D]/25 text-white text-xs font-urdu leading-[2.3] focus:border-[#C9B38D] focus:outline-none"
                    placeholder="مدرسہ کے متعلق تاثرات یہاں درج کریں..."
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-bold transition"
                  >
                    منسوخ کریں
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-l from-[#C9B38D] to-[#EFE5D2] text-[#120A05] text-xs font-bold hover:brightness-105 shadow transition cursor-pointer"
                  >
                    محفوظ کریں
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
