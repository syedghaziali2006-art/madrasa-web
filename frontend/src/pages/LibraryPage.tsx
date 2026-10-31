"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Search,
  Library,
  Bookmark,
  Globe,
  Clock,
  Calendar,
  ChevronLeft,
  CheckCircle2,
  Download,
  Eye,
  X,
  Copy,
  Check,
  Share2,
  FileText,
  Layers,
  Award,
  Users,
  ShieldCheck,
  Send,
  HelpCircle,
  ExternalLink,
  Laptop,
  GraduationCap,
  HeartHandshake,
  PhoneCall,
  Info,
  BookMarked,
  SlidersHorizontal,
  FolderOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";
import { api } from "@/services/api";

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  coverImage: string;
  volumes?: string;
  pages: number;
  shelfCode: string;
  isDigitalAvailable: boolean;
  isReferenceOnly?: boolean;
  isManuscript?: boolean;
  description: string;
  highlights: string[];
}

export default function LibraryPage() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("تمام کتب");
  const [selectedLanguage, setSelectedLanguage] = useState("سب زبانیں");
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modals for Request and Donation
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    name: "",
    phone: "",
    bookName: "",
    authorName: "",
    purpose: "تحقیقی مقالہ",
    notes: ""
  });
  const [requestSuccess, setRequestSuccess] = useState(false);

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [donationFormData, setDonationFormData] = useState({
    name: "",
    phone: "",
    city: "",
    bookCount: "10-50 کتب",
    topic: "دینی و حوزوی کتب",
    message: ""
  });
  const [donationSuccess, setDonationSuccess] = useState(false);

  const categories = [
    { name: "تمام کتب", count: 12 },
    { name: "علومِ قرآن و تفاسیر", count: 2 },
    { name: "حدیث و روایات", count: 3 },
    { name: "فقہ و احکام", count: 2 },
    { name: "تاریخ و سوانح", count: 2 },
    { name: "کلام و فلسفہ", count: 1 },
    { name: "اخلاق و عرفان", count: 1 },
    { name: "نایاب خطی مخطوطات", count: 1 }
  ];

  const languages = ["سب زبانیں", "عربی", "اردو", "فارسی"];

  const booksList: BookItem[] = [
    {
      id: "book-nahj",
      title: "نہج البلاغۃ (مع جامع اردو ترجمہ و شرح)",
      author: "امیر المؤمنین علی بن ابی طالبؑ (جمع: شریف رضیؒ)",
      category: "حدیث و روایات",
      language: "عربی / اردو",
      coverImage: "/images/books/book-1.jpg",
      volumes: "۱ جلد (ضخیم)",
      pages: 820,
      shelfCode: "رف ۰۱ - الماری الف - حدیث ۱",
      isDigitalAvailable: true,
      description: "امیر المؤمنین حضرت علی بن ابی طالبؑ کے خطبات، مکتوبات اور کلماتِ حکمت کا لاجواب اور فصیح و بلیغ شاہکار۔ حکمت، بلاغت اور عدل و سیاست کا بے مثال سمندر جس کی ہر سطر بصیرت کا سرچشمہ ہے۔",
      highlights: ["شریف رضیؒ کا مستند نسخہ", "جامع تحقیقی اردو ترجمہ و حواشی", "حکمت و معرفت کے اصول"]
    },
    {
      id: "book-kafi",
      title: "الکافی فی الاصول و الفروع و الروضۃ",
      author: "ثقۃ الاسلام محمد بن یعقوب الکلینیؒ (متوفی ۳۲۹ھ)",
      category: "حدیث و روایات",
      language: "عربی",
      coverImage: "/images/books/book-3.jpg",
      volumes: "۸ جلدیں",
      pages: 4200,
      shelfCode: "رف ۰۲ - الماری الف - کتب اربعہ",
      isDigitalAvailable: true,
      isReferenceOnly: true,
      description: "شیعہ اثنا عشری مکتب فکر کی کتبِ اربعہ میں سب سے اہم، مستند اور جامع ترین کتاب۔ غیبتِ صغریٰ کے دور میں لکھی گئی یہ کتاب اصولِ دین، فروعی احکام اور اخلاقیات پر مشتمل ۱۶ ہزار سے زائد روایات کا گنجینہ ہے۔",
      highlights: ["کتبِ اربعہ کا بنیادی ستون", "غیبتِ صغریٰ کے مبارک دور کی تالیف", "مکمل اعراب شدہ دار الحدیث ایڈیشن"]
    },
    {
      id: "book-mizan",
      title: "المیزان فی تفسیر القرآن",
      author: "علامہ سید محمد حسین طباطبائیؒ",
      category: "علومِ قرآن و تفاسیر",
      language: "عربی / اردو",
      coverImage: "/images/books/book-2.jpg",
      volumes: "۲۰ جلدیں",
      pages: 7800,
      shelfCode: "رف ۰۱ - الماری ب - تفاسیر ۲",
      isDigitalAvailable: true,
      description: "عصرِ حاضر کی سب سے انقلابی، فکری اور عمیق تفسیر جس میں 'تفسیر القرآن بالقرآن' کا قرآنی و استدلالی طریقہ اپنایا گیا ہے۔ قرآنی آیات کی روشنی میں عصر حاضر کے شکوک و شبہات کے تسلی بخش جوابات۔",
      highlights: ["تفسیر القرآن بالقرآن کا اعجاز", "فلسفی و کلامی عمیق تحقیقات", "جدید فکری تقاضوں کا احاطہ"]
    },
    {
      id: "book-namoona",
      title: "تفسیر نمونہ (جامع اردو ایڈیشن)",
      author: "آیت اللہ العظمیٰ ناصر مکارم شیرازی و جمعی از محققین",
      category: "علومِ قرآن و تفاسیر",
      language: "اردو",
      coverImage: "/images/books/book-4.jpg",
      volumes: "۲۷ جلدیں",
      pages: 9400,
      shelfCode: "رف ۰۲ - الماری ب - تفاسیر ۳",
      isDigitalAvailable: true,
      description: "سلیس، عام فہم اور جدید فکری تقاضوں سے ہم آہنگ اردو زبان کی سب سے مقبول تفسیر۔ قرآن کی سماجی، اخلاقی اور سائنسی تعلیمات کا جدید دور کے انسان کے لیے قابل عمل نمونہ۔",
      highlights: ["عام فہم اور دلنشین اردو اسلوب", "سماجی و اخلاقی مسائل کا قرآنی حل", "مکمل ۲۷ جلدوں کا مستند سیٹ"]
    },
    {
      id: "book-wasail",
      title: "وسائل الشیعۃ الی تحصیل مسائل الشریعۃ",
      author: "محدثِ کبیر شیخ محمد بن حسن حر عاملیؒ",
      category: "فقہ و احکام",
      language: "عربی",
      coverImage: "/images/books/book-5.jpg",
      volumes: "۳۰ جلدیں",
      pages: 11500,
      shelfCode: "رف ۰۱ - الماری ج - فقہ الروایۃ",
      isDigitalAvailable: true,
      isReferenceOnly: true,
      description: "فقہی استنباط اور حوزہ علمیہ کی درسِ خارج کے لیے فقہِ روایات کا سب سے عظیم دائرۃ المعارف۔ طہارت سے لے کر دیات تک فقہ کے ہر باب کی تمام معتبر احادیث کا منظم ترین احاطہ۔",
      highlights: ["حوزوی استنباط کا بنیادی مآخذ", "۳۵ ہزار سے زائد فقہی روایات", "تحقیقِ مؤسسہ آل البیتؑ"]
    },
    {
      id: "book-bihar",
      title: "بحار الانوار الجامعۃ لدرر اخبار الائمۃ الاطہار",
      author: "علامہ محمد باقر مجلسیؒ",
      category: "حدیث و روایات",
      language: "عربی",
      coverImage: "/images/books/book-3.jpg",
      volumes: "۱۱۰ جلدیں",
      pages: 45000,
      shelfCode: "الماری د - دائرۃ المعارف ۱ تا ۱۰",
      isDigitalAvailable: true,
      isReferenceOnly: true,
      description: "عالمِ اسلام کا سب سے ضخیم روائی و تاریخی انسائیکلوپیڈیا۔ علامہ مجلسیؒ نے دنیا بھر سے نایاب اور ناپید ہوتی ہوئی ہزاروں قلمی کتب کو جمع کر کے اس عظیم مجموعے میں ہمیشہ کے لیے محفوظ کر دیا۔",
      highlights: ["۱۱۰ جلدوں کا مکمل انسائیکلوپیڈیا", "اسلامی علوم کا عظیم ترین ذخیرہ", "نایاب احادیث و تاریخی دستاویزات"]
    },
    {
      id: "book-rawza",
      title: "روضۃ الشہداء (کلاسیکل مقتل)",
      author: "علامہ ملا حسین واعظ کاشفیؒ",
      category: "تاریخ و سوانح",
      language: "فارسی / اردو",
      coverImage: "/images/books/book-3.jpg",
      volumes: "۱ جلد",
      pages: 450,
      shelfCode: "رف ۰۳ - الماری ہ - مقتل ۲",
      isDigitalAvailable: true,
      description: "فارسی و اردو کی معروف ترین کلاسیکل مقتل کی تصنیف جس میں انبیائے کرامؑ اور شہدائے کربلا کے مصائب و فضائل کا رقت آمیز اور ادبی بیان قلمبند کیا گیا ہے۔",
      highlights: ["کلاسیکل مرثیہ و مقتل", "فارسی اصل مع مستند اردو ترجمہ", "تاریخی فضائل و مصائب"]
    },
    {
      id: "book-ashoor",
      title: "تاریخِ عاشور (حقائق و اسرار)",
      author: "ڈاکٹر ابراہیم آیتی",
      category: "تاریخ و سوانح",
      language: "اردو",
      coverImage: "/images/books/book-5.jpg",
      volumes: "۱ جلد",
      pages: 290,
      shelfCode: "رف ۰۲ - الماری ہ - عاشوراء",
      isDigitalAvailable: true,
      description: "عاشوراء کے دن کے لمحہ بہ لمحہ واقعات، خطبات، اصحابِ امام حسینؑ کی فداکاریوں اور کربلا کے تاریخی و دینی اسباب پر لکھی گئی محققانہ اور تاریخ ساز کتاب۔",
      highlights: ["مستند تاریخی اسناد", "منظم وقتی اور تاریخی ترتیب", "فکری تجزیہ و مدلل تحقیق"]
    },
    {
      id: "book-lumah",
      title: "شرح اللمعۃ الدمشقیۃ (حوزوی نصاب)",
      author: "الشہید الاول و الشہید الثانیؒ",
      category: "فقہ و احکام",
      language: "عربی",
      coverImage: "/images/books/book-1.jpg",
      volumes: "۴ جلدیں",
      pages: 1800,
      shelfCode: "رف ۰۲ - الماری ج - حوزوی متون",
      isDigitalAvailable: true,
      description: "حوزاتِ علمیہ کے سطح کے درجات کی سب سے بنیادی اور معیاری نصابی کتاب۔ فقہِ جعفری کے فتاویٰ اور ادلہ کا انتہائی جامع، شستہ اور دقیق بیان۔",
      highlights: ["حوزوی نصاب کا شاہکار متن", "جامع استدلالی قواعد", "طلبہ و اساتذہ کے لیے لازمی مرجع"]
    },
    {
      id: "book-kashf",
      title: "کشف المراد فی شرح تجرید الاعتقاد",
      author: "علامہ حسن بن یوسف حلیؒ (متن: خواجہ نصیر الدین طوسیؒ)",
      category: "کلام و فلسفہ",
      language: "عربی",
      coverImage: "/images/books/book-4.jpg",
      volumes: "۱ جلد",
      pages: 580,
      shelfCode: "رف ۰۱ - الماری و - علم الکلام",
      isDigitalAvailable: true,
      description: "اسلامی علمِ کلام و عقائد کا سب سے بلند پایہ کلاسیکل استدلالی متن۔ توحید، عدل، نبوت، امامت اور معاد پر عقلی اور منطقی براہین کا مکمل دائرۃ المعارف۔",
      highlights: ["خواجہ طوسیؒ کا محکم متن", "علامہ حلیؒ کی شہرہ آفاق شرح", "عقلی و کلامی براہین کا خزانہ"]
    },
    {
      id: "book-miraj",
      title: "معراج السعادۃ (تزکیۂ نفس و اخلاق)",
      author: "علامہ ملا احمد نراقیؒ",
      category: "اخلاق و عرفان",
      language: "فارسی / اردو",
      coverImage: "/images/books/book-2.jpg",
      volumes: "۱ جلد",
      pages: 680,
      shelfCode: "رف ۰۱ - الماری ز - اخلاقیات",
      isDigitalAvailable: true,
      description: "علم الاخلاق اور باطنی امراض کے علاج پر لکھی گئی شاہکار کتاب۔ غصہ، حسد، کینہ، تکبر اور ریا سے نفس کو پاک کرنے اور تقویٰ و معرفتِ الٰہی کے حصول کا عملی نسخہ۔",
      highlights: ["باطنی امراض کا شافی علاج", "سیرتِ ائمہؑ کی روشنی میں رہنمائی", "جامع خود سازی پروگرام"]
    },
    {
      id: "book-manuscript",
      title: "قلمی نسخۂ قرآن مجید (خطِ ریحانی و ثلث - سن ۱۰۲۴ھ)",
      author: "خطاطِ دربارِ سلف (نایاب قلمی نسخہ)",
      category: "نایاب خطی مخطوطات",
      language: "عربی",
      coverImage: "/images/books/book-3.jpg",
      volumes: "۱ جلد (نوادرات)",
      pages: 604,
      shelfCode: "تجھوری نوادرات - لاکر ۰۴",
      isDigitalAvailable: true,
      isReferenceOnly: true,
      isManuscript: true,
      description: "چار سو سال سے زائد قدیم ہاتھ سے لکھا ہوا نایاب مصحفِ قرآن۔ قدرتی نباتی روشنائی اور طلائی تذہیب و تزئین سے مرصع یہ نسخہ کتب خانے کا تاریخی علمی اثاثہ ہے۔",
      highlights: ["۴۰۰ سال قدیم اصلی قلمی نسخہ", "طلائی تذہیب اور نباتی سیاہی", "محققین کے لیے خصوصی معائنہ"]
    }
  ];

  const libraryHeaderStats = [
    { count: "۲۵,۰۰۰+", label: "مطبوعہ کتب", sub: "فقہ، حدیث، تفاسیر و تاریخ" },
    { count: "۵۰۰+", label: "قلمی مخطوطات", sub: "علمائے سلف کے تاریخی نوادرات" },
    { count: "۱۵,۰۰۰+", label: "ڈیجیٹل ریسرچ فائلز", sub: "نور سافٹ وئیرز و پی ڈی ایف کتب" },
    { count: "۱۵۰+", label: "مطالعہ کی نشستیں", sub: "مکمل ایئر کنڈیشنڈ پرسکون ہال" },
  ];

  const libraryWings = [
    {
      id: "wing-encyclopedia",
      title: "شعبہ امہات المآخذ و موسوعات",
      subtitle: "کتبِ اربعہ، بحار الانوار، وسائل الشیعہ اور تفاسیر کا عظیم مجموعہ",
      icon: BookOpen,
      badge: "مرکزی علمی خزانہ",
      desc: "اس شعبے میں شیعہ اور سنی مکاتب فکر کے بنیادی مآخذ، جامع لغات (لسان العرب، مجمع البحرین)، فقہی استدلالی کتب (جواہر الکلام، مکاسب) اور عظیم الشان تفاسیر رکھی گئی ہیں۔ حوزہ علمیہ کے اعلیٰ درجات کے طلبہ اور اساتذہ کے لیے یہ سیکشن ریفرنس ہال کا درجہ رکھتا ہے۔"
    },
    {
      id: "wing-manuscript",
      title: "شعبہ نایاب خطی مخطوطات",
      subtitle: "صدیوں قدیم قلمی نسخے، مراجعِ عظام کی تحریروں کا محفوظ ریکارڈ",
      icon: Sparkles,
      badge: "تاریخی نوادرات",
      desc: "کتب خانے کی سب سے بیش قیمت خصوصیت قدیم خطی نسخے ہیں۔ خصوصی درجہ حرارت اور نمی کے کنٹرول والے شیشے کے محفوظ لاکرز میں رکھے گئے ان نسخوں کو اسکین کر کے ہائی ریزولیوشن ڈیجیٹل فارمیٹ میں بھی محققین کے لیے محفوظ کیا جا رہا ہے۔"
    },
    {
      id: "wing-digital",
      title: "ڈیجیٹل ریسرچ لیب و کمپیوٹر سنٹر",
      subtitle: "نور سافٹ ویئرز، تیز رفتار انٹرنیٹ اور ہزاروں ای بکس تک رسائی",
      icon: Laptop,
      badge: "جدید ٹیکنالوجی",
      desc: "کمپیوٹر ٹرمینلز پر جامع التفاسیر، جامع الاحادیث، مکتبہ اہل بیتؑ اور درجنوں تخصصی سافٹ ویئرز انسٹال ہیں۔ طلبہ چند سیکنڈز میں کسی بھی موضوع، آیت یا حدیث کی اسناد و تخریج دنیا بھر کے ماخذوں سے نکال سکتے ہیں۔"
    },
    {
      id: "wing-women",
      title: "شعبہ مطالعہ برائے خواتین و طالبات",
      subtitle: "مکمل پردے، تقدس اور پرامن ماحول میں بہنوں کے لیے مخصوص ہال",
      icon: ShieldCheck,
      badge: "شعبہ خواتین",
      desc: "مدرسہ صاحب الزمان کے شعبہ خواتین کی طالبات، معلمات اور پردہ دار محقق بہنوں کے لیے لائبریری کا الگ ونگ مختص کیا گیا ہے، جہاں اسلامی نسوانی فقہ، سیرتِ معصوماتؑ اور تعلیمی کتب باآسانی دستیاب ہیں۔"
    }
  ];

  const libraryTimings = [
    { day: "پیر تا جمعرات", studentHours: "صبح 8:00 تا رات 10:00", externalHours: "صبح 9:00 تا شام 5:00", notes: "تمام کتب و ڈیجیٹل لیب دستیاب" },
    { day: "جمعہ المبارک", studentHours: "صبح 8:00 تا دوپہر 12:00", externalHours: "تعطیل برائے نمازِ جمعہ", notes: "عصر تا مغرب خصوصی دعائیہ نشستیں" },
    { day: "ہفتہ و اتوار", studentHours: "صبح 9:00 تا رات 9:00", externalHours: "صبح 10:00 تا شام 4:00", notes: "بیرونی محققین کے لیے مطالعہ کی کھلی نشستیں" },
    { day: "شعبہ خواتین کے اوقات", studentHours: "روزانہ دوپہر 2:00 تا شام 5:00", externalHours: "ہفتہ وار ریسرچ سرکلز", notes: "خواتین کے لیے مکمل مخصوص پردہ دار ہال" },
  ];

  const borrowingRules = [
    "مدرسے کے باقاعدہ طلبہ بیک وقت ۲ کتب ۷ یوم کے لیے مستعار لے سکتے ہیں۔",
    "کتبِ نایاب، مخطوطات اور کتبِ مرجع (بحار، وسائل وغیرہ) صرف ہال کے اندر مطالعہ کے لیے مخصوص ہیں۔",
    "کتب پر پینسل، پین یا ہائی لائٹر سے نشان لگانا یا صفحات موڑنا سختی سے منع ہے۔",
    "لائبریری ہال کے اندر مکمل خاموشی، ادب اور موبائل فون کو سائلنٹ پر رکھنا لازم ہے۔",
    "بیرونی محققین اور معزز قارئین شناختی کارڈ یا تعلیمی کارڈ جمع کروا کے ریڈنگ روم استعمال کر سکتے ہیں۔"
  ];

  // Filtering Logic
  const filteredBooks = useMemo(() => {
    return booksList.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.shelfCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "تمام کتب" || book.category === selectedCategory;

      const matchesLanguage =
        selectedLanguage === "سب زبانیں" || book.language.includes(selectedLanguage);

      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [searchQuery, selectedCategory, selectedLanguage]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.bookRequests.submitRequest(requestFormData);
    } catch (err) {
      console.warn("Backend request error:", err);
    }
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setIsRequestModalOpen(false);
      setRequestFormData({
        name: "",
        phone: "",
        bookName: "",
        authorName: "",
        purpose: "تحقیقی مقالہ",
        notes: ""
      });
    }, 2500);
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.bookRequests.submitDonation(donationFormData);
    } catch (err) {
      console.warn("Backend donation error:", err);
    }
    setDonationSuccess(true);
    setTimeout(() => {
      setDonationSuccess(false);
      setIsDonationModalOpen(false);
      setDonationFormData({
        name: "",
        phone: "",
        city: "",
        bookCount: "10-50 کتب",
        topic: "دینی و حوزوی کتب",
        message: ""
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#120A05] text-[#FAF7F2] selection:bg-[#C9B38D] selection:text-[#120A05]" dir="rtl">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenDonation={() => {
          window.location.href = "/#donation";
        }}
        onOpenContact={() => {
          window.location.href = "/#contact";
        }}
      />

      {/* ======================================================== */}
      {/* 2. HERO BANNER: Cohesive Center Header Matching Policy    */}
      {/* ======================================================== */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#120A05] border-b border-[#C9B38D]/20 overflow-hidden">
        {/* Ambient Radial Lights */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#C9B38D]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#1A0E08] rounded-full blur-[130px] pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10 text-center">
          
          {/* Breadcrumb Navigation Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08]/85 border border-[#C9B38D]/40 text-xs sm:text-sm font-urdu font-semibold text-[#D9C7A7] mb-6 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition">صفحہ اول</Link>
            <ChevronLeft className="w-3.5 h-3.5 text-[#C9B38D]" />
            <span>کتب خانہ و ڈیجیٹل لائبریری</span>
          </div>

          {/* Section Glowing Badge */}
          <div className="block mb-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#C9B38D]/15 via-[#C9B38D]/10 to-transparent border border-[#C9B38D]/40 text-[#D9C7A7] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">علم و تحقیق کا عظیم الشان گہوارہ</span>
            </div>
          </div>

          {/* Majestic Urdu Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-urdu font-bold text-white leading-[1.8] sm:leading-[1.7] mb-6">
            مرکزی کتب خانہ و <span className="text-[#C9B38D]">ڈیجیٹل ریسرچ لائبریری</span>
          </h1>

          {/* Golden Center Divider */}
          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full mb-6 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-200 font-urdu leading-[2.2] sm:leading-[2.4] max-w-3xl mx-auto font-medium">
            مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف) کا مرکزی کتب خانہ تشنگانِ علم و تحقیق کے لیے ایک بے مثال علمی نخلستان ہے۔ جہاں ۲۵ ہزار سے زائد مستند تفاسیر، کتبِ احادیث، فقہ، تاریخ، اصول اور نایاب قلمی مخطوطات کے ساتھ ساتھ جدید ڈیجیٹل ریسرچ لیب بھی ہمہ وقت فعال ہے۔
          </p>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            <a
              href="#catalog"
              className="font-urdu text-xs sm:text-sm font-bold px-7 py-3 rounded-full bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] transition-all duration-300 shadow-[0_10px_25px_rgba(201,179,141,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#120A05]" />
              <span>آن لائن کیٹلاگ تلاش کریں</span>
            </a>

            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="font-urdu text-xs sm:text-sm font-bold px-6 py-3 rounded-full bg-[#1A0E08] hover:bg-[#25150C] text-white border border-[#C9B38D]/50 hover:border-[#C9B38D] transition-all duration-300 shadow-md flex items-center gap-2 active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-[#C9B38D]" />
              <span>کتاب کی طلب فرمائیں</span>
            </button>

            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="font-urdu text-xs sm:text-sm font-bold px-6 py-3 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] transition-all duration-300 shadow-sm flex items-center gap-2 active:scale-95"
            >
              <HeartHandshake className="w-4 h-4 text-[#8C6D3F]" />
              <span>عطیہ کتب (ہدیہ)</span>
            </button>
          </div>

          {/* Top 4 Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-[#C9B38D]/20">
            {libraryHeaderStats.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/25 hover:border-[#C9B38D]/60 transition-colors">
                <span className="text-2xl sm:text-3xl font-bold font-urdu text-[#C9B38D] block">{item.count}</span>
                <span className="text-xs font-urdu font-bold text-white mt-1 block">{item.label}</span>
                <span className="text-[11px] font-urdu text-stone-300 mt-0.5 block">{item.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. SHOWCASE SECTION: Photo with Gold Border + Details     */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Image Column with Champagne Gold Border */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <div className="bg-[#1A0E08] rounded-[28px] p-2.5 overflow-hidden">
                  <div className="relative h-80 sm:h-[450px] rounded-[22px] overflow-hidden group">
                    <Image
                      src="/images/gallery/library-interior.jpg"
                      alt="مدرسہ صاحب الزمان لائبریری"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent opacity-85" />
                    
                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-[#120A05]/85 border border-[#C9B38D]/40 backdrop-blur-md shadow-lg flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-urdu text-xs font-bold text-white">مطالعہ ہال کھلا ہے</span>
                    </div>

                    <div className="absolute bottom-4 right-4 left-4 p-4 bg-gradient-to-b from-[#1E110A]/95 to-[#120A05]/95 border border-[#C9B38D]/40 rounded-xl text-right backdrop-blur-md shadow-lg">
                      <span className="text-xs text-[#C9B38D] font-urdu font-bold block">مرکزی لائبریری ہال</span>
                      <p className="text-xs text-stone-200 font-urdu mt-0.5 leading-[1.8]">
                        کتبِ تفاسیر، فقہ، احادیث اور معاصر اسلامی ریسرچ کا پرسکون ماحول
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-right">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0E08] border border-[#C9B38D]/30 text-xs font-urdu text-[#C9B38D]">
                <Library className="w-4 h-4" />
                <span>حوزوی علوم و عصری ریسرچ کا حسین امتزاج</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-urdu font-bold text-white leading-[1.8]">
                علمی پیاس بجھانے کے لیے <br />
                <span className="text-[#C9B38D]">عظیم الشان ذخیرہ و پرسکون ماحول</span>
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-[#C9B38D] to-transparent rounded-full shadow-sm" />

              <p className="text-sm sm:text-base text-stone-300 font-urdu leading-[2.3]">
                ہماری لائبریری میں شیعہ اثنا عشری مکتب فکر کی بنیادی کتب (کتب اربعہ، بحار الانوار، وسائل الشیعہ وغیرہ) کے ساتھ ساتھ کتب اہلسنت، تفاسیر، تاریخ اسلام، اور عصری فلسفہ و کمپیوٹر سائنس پر مشتمل پچیس ہزار سے زائد جلدیں دستیاب ہیں۔
              </p>

              {/* 3 Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#24130A] border border-[#C9B38D]/30 flex items-center justify-center shrink-0 text-[#C9B38D]">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-urdu font-bold text-white text-sm">نور سافٹ ویئرز اور ڈیجیٹل سسٹم</h4>
                    <p className="font-urdu text-xs text-stone-300 mt-0.5 leading-[1.8]">
                      مکتبہ اہل بیتؑ، جامع الاحادیث اور جامع التفاسیر کے ذریعے سیکنڈوں میں تخریج روایات۔
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#24130A] border border-[#C9B38D]/30 flex items-center justify-center shrink-0 text-[#C9B38D]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-urdu font-bold text-white text-sm">خواتین و طالبات کے لیے الگ مخصوص ونگ</h4>
                    <p className="font-urdu text-xs text-stone-300 mt-0.5 leading-[1.8]">
                      طالبات اور معلمات کے لیے مکمل پردے کے ساتھ مخصوص مطالعہ ہال اور اسلامی نسوانی متون۔
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1A0E08]/80 border border-[#C9B38D]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#24130A] border border-[#C9B38D]/30 flex items-center justify-center shrink-0 text-[#C9B38D]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-urdu font-bold text-white text-sm">نایاب خطی مخطوطات کا تحفظ</h4>
                    <p className="font-urdu text-xs text-stone-300 mt-0.5 leading-[1.8]">
                      صدیوں قدیم قلمی نسخے جو خصوصی ماحولیاتی کنٹرول والے شیشے کے لاکرز میں محفوظ ہیں۔
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. DIGITAL CATALOG & SEARCH SECTION                       */}
      {/* ======================================================== */}
      <section id="catalog" className="py-20 sm:py-28 bg-[#160C07] islamic-navy-pattern relative border-y border-[#C9B38D]/20 overflow-hidden">
        {/* Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C9B38D]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
              <Search className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">آن لائن کیٹلاگ سرچ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
              کتب خانہ کا <span className="text-[#C9B38D]">آن لائن کیٹلاگ</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
              کتاب کا عنوان، مؤلف، موضوع یا الماری کوڈ تلاش کریں اور دستیابی کا فوری جائزہ لیں
            </p>
          </div>

          {/* Search Box with Gold Outline & Inner Gradient */}
          <div className="max-w-4xl mx-auto mb-10 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="کتاب کا نام، مصنف (مثلاً کلینی، طباطبائی، مودودی)، یا موضوع تلاش کریں..."
                className="w-full bg-[#1C1009] border-2 border-[#C9B38D]/40 focus:border-[#C9B38D] text-white rounded-full py-4 pr-14 pl-12 text-sm sm:text-base font-urdu outline-none transition shadow-[0_10px_30px_rgba(0,0,0,0.5)] placeholder-stone-500"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9B38D]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
                  title="تلاش ختم کریں"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language Selector & Result Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-urdu px-2">
              <div className="flex items-center gap-2 text-stone-400">
                <span>زبان فلٹر کریں:</span>
                <div className="flex gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3.5 py-1 rounded-full text-xs font-semibold transition ${
                        selectedLanguage === lang
                          ? "bg-[#C9B38D] text-[#120A05] font-bold shadow-md"
                          : "bg-[#1C1009] text-stone-300 hover:bg-[#25150C] border border-[#C9B38D]/20"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-stone-300">
                <span>دستیاب کتب: </span>
                <span className="font-bold text-[#C9B38D]">{filteredBooks.length} کتب</span>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none font-urdu">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                  selectedCategory === cat.name
                    ? "bg-white text-[#120A05] border border-[#C9B38D] shadow-lg scale-105"
                    : "bg-[#1A0E08] text-stone-300 border border-[#C9B38D]/25 hover:border-[#C9B38D] hover:text-white"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.name ? "bg-[#120A05]/20 text-[#120A05]" : "bg-white/10 text-stone-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Books Grid */}
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 bg-[#1A0E08]/60 border border-[#C9B38D]/20 rounded-3xl max-w-2xl mx-auto">
              <BookOpen className="w-12 h-12 text-[#C9B38D] mx-auto mb-4 opacity-60" />
              <h3 className="font-urdu text-xl font-bold text-white mb-2">کوئی کتاب نہیں ملی</h3>
              <p className="font-urdu text-sm text-stone-400 max-w-md mx-auto mb-6">
                آپ کی تلاش کردہ کتاب اس فہرست میں نظر نہیں آئی۔ آپ ہماری کیٹلاگ میں شامل کرنے کی درخواست کر سکتے ہیں۔
              </p>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="font-urdu text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full bg-[#C9B38D] text-[#120A05] hover:bg-[#D9C7A7] transition shadow"
              >
                کتاب کی طلبی کی درخواست بھیجیں
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="group relative flex flex-col justify-between p-5 rounded-3xl bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#100703] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.3)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <div>
                    {/* Top Row Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-urdu font-semibold text-[#C9B38D] bg-[#24130A] px-3 py-1 rounded-full border border-[#C9B38D]/30 truncate max-w-[140px]">
                        {book.category}
                      </span>
                      {book.isManuscript ? (
                        <span className="text-[10px] font-urdu font-bold text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          قلمی نسخہ
                        </span>
                      ) : (
                        <span className="text-[11px] font-urdu text-stone-400">
                          {book.language}
                        </span>
                      )}
                    </div>

                    {/* Book Cover Container with Spine Border */}
                    <div className="relative w-full aspect-[1/1.35] max-w-[180px] mx-auto mb-5 rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.85)] group-hover:shadow-[0_16px_36px_rgba(201,179,141,0.35)] transition-all duration-500 group-hover:scale-105 bg-[#0D0603] border-r-2 border-stone-800">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="w-10 h-10 rounded-full bg-white text-[#120A05] border border-[#C9B38D] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Eye className="w-5 h-5 text-[#8C6D3F]" />
                        </span>
                      </div>
                    </div>

                    {/* Book Title and Author */}
                    <div className="text-center">
                      <h3 className="font-urdu font-bold text-white text-base sm:text-lg leading-[1.8] group-hover:text-[#D9C7A7] transition-colors min-h-[54px] flex items-center justify-center">
                        {book.title}
                      </h3>
                      <p className="text-xs font-urdu text-[#C9B38D] mt-1 line-clamp-1">
                        {book.author}
                      </p>
                    </div>

                    {/* Shelf Location Tag */}
                    <div className="mt-4 p-2.5 rounded-xl bg-[#140A05] border border-[#C9B38D]/15 flex items-center justify-between text-[11px] font-urdu text-stone-300">
                      <span className="text-stone-400">مقام:</span>
                      <span className="text-[#C9B38D] font-bold truncate max-w-[170px]">{book.shelfCode}</span>
                    </div>
                  </div>

                  {/* Card Bottom CTA Button */}
                  <div className="mt-5 pt-3 border-t border-[#C9B38D]/20">
                    <button
                      className="w-full py-2.5 rounded-full bg-[#1A0E08] hover:bg-[#C9B38D] text-stone-200 hover:text-[#120A05] border border-[#C9B38D]/30 font-urdu text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>تفصیلات و مطالعہ</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. SPECIALIZED LIBRARY WINGS & SECTIONS                   */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#120A05] islamic-dark-pattern relative overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
              <Layers className="w-4 h-4 text-[#C9B38D]" />
              <span className="font-urdu">منظم شعبہ جاتی ترتیب</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[1.8]">
              کتب خانے کے <span className="text-[#C9B38D]">اہم شعبہ جات</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

            <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.2] sm:leading-[2.4] max-w-2xl mx-auto font-medium">
              محققین، علماء، اساتذہ اور طالبات کی سہولت کے لیے کتب خانے کو جدید اور منظم ونگز میں تقسیم کیا گیا ہے
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {libraryWings.map((wing) => {
              const Icon = wing.icon;
              return (
                <div
                  key={wing.id}
                  className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/25 hover:border-[#C9B38D] transition-all duration-300 shadow-xl space-y-4 group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#24130A] border border-[#C9B38D]/40 flex items-center justify-center text-[#C9B38D] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-urdu font-bold text-[#C9B38D] bg-[#140A05] px-3.5 py-1.5 rounded-full border border-[#C9B38D]/30">
                      {wing.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white group-hover:text-[#D9C7A7] transition-colors leading-[1.7]">
                    {wing.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-urdu font-semibold text-[#C9B38D]">
                    {wing.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm font-urdu text-stone-300 leading-[2.3]">
                    {wing.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TIMINGS, BORROWING SYSTEM & RULES                      */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#180D07] islamic-navy-pattern relative border-t border-[#C9B38D]/20 overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Timings Schedule */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md">
                <Clock className="w-4 h-4 text-[#C9B38D]" />
                <span className="font-urdu">اوقاتِ کار و شیڈول</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-urdu font-bold text-white leading-[1.8]">
                کتب خانہ کے <span className="text-[#C9B38D]">اوقات برائے مطالعہ</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 font-urdu leading-[2.3]">
                مدرسہ صاحب الزمان کی لائبریری ہفتے کے تمام دن طلبہ، اساتذہ اور عام محققین کے لیے کھلی رہتی ہے۔
              </p>

              <div className="space-y-3 pt-2">
                {libraryTimings.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#120A05] border border-[#C9B38D]/20 hover:border-[#C9B38D]/50 transition shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-urdu font-bold text-base text-white">{item.day}</span>
                      <span className="font-urdu text-xs text-[#C9B38D] bg-[#22130B] px-3 py-1 rounded-full border border-[#C9B38D]/25">
                        {item.notes}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-urdu text-stone-300 pt-2 border-t border-stone-800">
                      <div>
                        <span className="text-stone-400">طلبہ و اساتذہ: </span>
                        <span className="text-white font-semibold">{item.studentHours}</span>
                      </div>
                      <div>
                        <span className="text-stone-400">بیرونی محققین: </span>
                        <span className="text-white font-semibold">{item.externalHours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Borrowing Rules & Membership */}
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1C1009] to-[#120A05] border border-[#C9B38D]/30 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#24130A] border border-[#C9B38D]/40 flex items-center justify-center text-[#C9B38D]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-urdu font-bold text-white">ضوابط و آدابِ کتب خانہ</h3>
                    <p className="text-xs text-[#C9B38D] font-urdu">علمی وقار اور کتب کی نگہداشت</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {borrowingRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-urdu text-stone-300 leading-[2.2]">
                      <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0 mt-1" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>

                {/* Membership Callout Box */}
                <div className="mt-8 p-4 rounded-2xl bg-[#140A05] border border-[#C9B38D]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-right">
                    <span className="text-xs text-stone-400 font-urdu block">رکنیت و رسائی:</span>
                    <span className="text-sm font-urdu font-bold text-white">بیرونی محققین کے لیے مفت کارڈ</span>
                  </div>
                  <button
                    onClick={() => setIsAdmissionOpen(true)}
                    className="font-urdu text-xs font-bold px-5 py-2.5 rounded-full bg-white text-[#120A05] border border-[#C9B38D] hover:bg-stone-100 transition shadow shrink-0 active:scale-95"
                  >
                    رکنیت کارڈ بنوائیں
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. CALL TO ACTION: Book Request & Donation Cards         */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#120A05] islamic-dark-pattern relative overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Request a Book */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#1E110A] to-[#140B06] border border-[#C9B38D]/30 hover:border-[#C9B38D] transition shadow-xl space-y-4 text-right group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#25150C] border border-[#C9B38D]/40 flex items-center justify-center text-[#C9B38D]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-urdu font-bold text-white leading-[1.7]">کوئی کتاب نہیں مل رہی؟</h3>
              <p className="text-sm font-urdu text-stone-300 leading-[2.3]">
                اگر آپ کسی خاص موضوع، فقہی مقالے یا نایاب کتاب کی تلاش میں ہیں اور وہ ہماری فہرست میں موجود نہیں، تو ہمیں مطلع فرمائیں۔ ہماری انتظامیہ جلد از جلد اس کی فراہمی ممکن بنائے گی۔
              </p>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="font-urdu text-sm font-bold px-6 py-2.5 rounded-full bg-[#C9B38D] text-[#120A05] hover:bg-[#D9C7A7] transition shadow flex items-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>کتاب کی طلبی کی درخواست درج کریں</span>
              </button>
            </div>

            {/* Card 2: Donate Books (Sadqah-e-Jariyah) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#1E110A] to-[#140B06] border border-[#C9B38D]/30 hover:border-[#C9B38D] transition shadow-xl space-y-4 text-right group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#25150C] border border-[#C9B38D]/40 flex items-center justify-center text-[#C9B38D]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-urdu font-bold text-white leading-[1.7]">کتب خانہ کے لیے کتب کا عطیہ</h3>
              <p className="text-sm font-urdu text-stone-300 leading-[2.3]">
                علم پھیلانا بہترین صدقہ جاریہ ہے۔ اپنے ذاتی کتب خانے کی دینی و علمی کتب، تفاسیر یا تاریخ کے نوادرات مدرسہ صاحب الزمان کی لائبریری کو ہدیہ کریں تاکہ آئندہ نسلیں اور طلبہ مستفید ہو سکیں۔
              </p>
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="font-urdu text-sm font-bold px-6 py-2.5 rounded-full bg-white text-[#120A05] border border-[#C9B38D] hover:bg-stone-100 transition shadow flex items-center gap-2 active:scale-95"
              >
                <HeartHandshake className="w-4 h-4 text-[#8C6D3F]" />
                <span>کتب ہدیہ / عطیہ فرمائیں</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. BOOK DETAIL MODAL                                     */}
      {/* ======================================================== */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1E110A] via-[#160B06] to-[#120A05] border-2 border-[#C9B38D]/50 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-right">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-5 left-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition flex items-center justify-center"
              aria-label="بند کریں"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start pt-2">
              
              {/* Cover Column */}
              <div className="sm:col-span-5 text-center">
                <div className="relative w-full aspect-[1/1.35] max-w-[210px] mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-[#C9B38D]/40 bg-[#0D0603]">
                  <Image
                    src={selectedBook.coverImage}
                    alt={selectedBook.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 p-3 rounded-xl bg-[#140A05] border border-[#C9B38D]/20 text-xs font-urdu space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">کتاب کا کوڈ:</span>
                    <button
                      onClick={() => handleCopyCode(selectedBook.shelfCode)}
                      className="text-[#C9B38D] hover:text-white font-mono flex items-center gap-1 transition"
                      title="کاپی کریں"
                    >
                      <span>{selectedBook.shelfCode}</span>
                      {copiedCode === selectedBook.shelfCode ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-stone-400" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">زبان:</span>
                    <span className="text-white font-semibold">{selectedBook.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">حجم:</span>
                    <span className="text-white font-semibold">
                      {selectedBook.volumes || `${selectedBook.pages} صفحات`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Information Column */}
              <div className="sm:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-urdu font-bold text-[#C9B38D] bg-[#2A160D] px-3 py-1 rounded-full border border-[#C9B38D]/30">
                    {selectedBook.category}
                  </span>
                  {selectedBook.isManuscript && (
                    <span className="text-xs font-urdu font-bold text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-500/40">
                      قلمی نوادرات
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white leading-[1.8]">
                  {selectedBook.title}
                </h3>

                <p className="text-xs sm:text-sm font-urdu font-semibold text-[#C9B38D]">
                  مؤلف / محقق: {selectedBook.author}
                </p>

                <p className="text-xs sm:text-sm font-urdu text-stone-300 leading-[2.3] pt-1">
                  {selectedBook.description}
                </p>

                {/* Highlights */}
                <div className="pt-2">
                  <span className="text-xs font-urdu font-bold text-white block mb-2">اہم خصوصیات:</span>
                  <div className="space-y-1.5">
                    {selectedBook.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-urdu text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9B38D]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedBook(null);
                      setIsRequestModalOpen(true);
                      setRequestFormData((prev) => ({
                        ...prev,
                        bookName: selectedBook.title,
                        authorName: selectedBook.author
                      }));
                    }}
                    className="font-urdu text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full bg-[#C9B38D] text-[#120A05] hover:bg-[#D9C7A7] transition shadow active:scale-95 flex items-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4 text-[#120A05]" />
                    <span>مستعار لینے کی درخواست کریں</span>
                  </button>

                  <button
                    onClick={() => {
                      alert(`کتاب "${selectedBook.title}" کا ڈیجیٹل نسخہ لائبریری کی انٹرانیٹ لیب پر دستیاب ہے۔ ہال وزٹ فرمائیں۔`);
                    }}
                    className="font-urdu text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4 text-[#C9B38D]" />
                    <span>ڈیجیٹل کاپی دیکھیں</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. BOOK REQUEST MODAL                                    */}
      {/* ======================================================== */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1E110A] to-[#120A05] border-2 border-[#C9B38D]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-right">
            
            <button
              onClick={() => setIsRequestModalOpen(false)}
              className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition flex items-center justify-center"
              aria-label="بند کریں"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A160D] border border-[#C9B38D]/30 text-[#C9B38D] text-xs font-urdu mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>شعبہ خدماتِ کتب</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white leading-[1.7]">کتاب کی طلبی کی درخواست</h3>
              <p className="text-xs text-stone-300 font-urdu mt-1 leading-[1.8]">
                اپنی مطلوبہ کتاب کا نام اور تفصیل درج کریں، ہماری لائبریری ٹیم آپ سے رابطہ کرے گی۔
              </p>
            </div>

            {requestSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-urdu font-bold text-lg text-white">درخواست کامیابی سے موصول ہو گئی!</h4>
                <p className="font-urdu text-xs text-stone-200">
                  شکریہ! کتاب کی دستیابی پر آپ کو ایس ایم ایس یا کال کے ذریعے مطلع کر دیا جائے گا۔
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 font-urdu text-xs sm:text-sm">
                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">آپ کا نام *</label>
                  <input
                    type="text"
                    required
                    value={requestFormData.name}
                    onChange={(e) => setRequestFormData({ ...requestFormData, name: e.target.value })}
                    placeholder="مثلاً: محمد رضا رضوی"
                    className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">موبائل / واٹس ایپ نمبر *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={requestFormData.phone}
                    onChange={(e) => setRequestFormData({ ...requestFormData, phone: e.target.value })}
                    placeholder="03001234567"
                    className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none text-right"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">مطلوبہ کتاب کا نام *</label>
                    <input
                      type="text"
                      required
                      value={requestFormData.bookName}
                      onChange={(e) => setRequestFormData({ ...requestFormData, bookName: e.target.value })}
                      placeholder="مثلاً: الغدیر فی الکتاب و السنۃ"
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">مصنف کا نام</label>
                    <input
                      type="text"
                      value={requestFormData.authorName}
                      onChange={(e) => setRequestFormData({ ...requestFormData, authorName: e.target.value })}
                      placeholder="مثلاً: علامہ عبد الحسین امینیؒ"
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">مطالعہ کا مقصد</label>
                  <select
                    value={requestFormData.purpose}
                    onChange={(e) => setRequestFormData({ ...requestFormData, purpose: e.target.value })}
                    className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                  >
                    <option value="تحقیقی مقالہ">تحقیقی مقالہ و ریسرچ</option>
                    <option value="حوزوی نصاب">حوزوی نصاب و درسی مطالعہ</option>
                    <option value="ذاتی مطالعہ">ذاتی فکری و دینی مطالعہ</option>
                    <option value="مجلس و خطابت">مجلس و خطابت کی تیاری</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full font-urdu font-bold text-sm py-3 rounded-full bg-[#C9B38D] hover:bg-[#D9C7A7] text-[#120A05] transition shadow-lg mt-2 active:scale-95"
                >
                  درخواست ارسال کریں
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 10. BOOK DONATION MODAL                                  */}
      {/* ======================================================== */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1E110A] to-[#120A05] border-2 border-[#C9B38D]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-right">
            
            <button
              onClick={() => setIsDonationModalOpen(false)}
              className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition flex items-center justify-center"
              aria-label="بند کریں"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A160D] border border-[#C9B38D]/30 text-[#C9B38D] text-xs font-urdu mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>وقف و صدقۂ جاریہ</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-urdu font-bold text-white leading-[1.7]">کتب خانہ کے لیے کتب کا عطیہ</h3>
              <p className="text-xs text-stone-300 font-urdu mt-1 leading-[1.8]">
                دینی و علمی ذخائر کو مدرسے کی لائبریری میں ہدیہ کر کے تا قیامت ثوابِ جاریہ حاصل کریں۔
              </p>
            </div>

            {donationSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-urdu font-bold text-lg text-white">جزاکم اللہ خیراً و احسن الجزاء</h4>
                <p className="font-urdu text-xs text-stone-200">
                  آپ کی معلومات درج ہو گئی ہیں۔ ہماری ٹیم کتب کی وصولی کے لیے جلد آپ سے رابطہ کرے گی۔
                </p>
              </div>
            ) : (
              <form onSubmit={handleDonationSubmit} className="space-y-4 font-urdu text-xs sm:text-sm">
                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">عطیہ کنندہ کا نام *</label>
                  <input
                    type="text"
                    required
                    value={donationFormData.name}
                    onChange={(e) => setDonationFormData({ ...donationFormData, name: e.target.value })}
                    placeholder="اپنا پورا نام درج کریں"
                    className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">موبائل نمبر *</label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={donationFormData.phone}
                      onChange={(e) => setDonationFormData({ ...donationFormData, phone: e.target.value })}
                      placeholder="03001234567"
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">شہر کا نام</label>
                    <input
                      type="text"
                      value={donationFormData.city}
                      onChange={(e) => setDonationFormData({ ...donationFormData, city: e.target.value })}
                      placeholder="مثلاً: کراچی / لاہور"
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">کتب کی متوقع تعداد</label>
                    <select
                      value={donationFormData.bookCount}
                      onChange={(e) => setDonationFormData({ ...donationFormData, bookCount: e.target.value })}
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                    >
                      <option value="1-10 کتب">۱ تا ۱۰ کتب</option>
                      <option value="10-50 کتب">۱۰ تا ۵۰ کتب</option>
                      <option value="50-200 کتب">۵۰ تا ۲۰۰ کتب</option>
                      <option value="مکمل ذاتی لائبریری">مکمل ذاتی لائبریری (۲۰۰+ کتب)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1 font-semibold">موضوعاتی نوعیت</label>
                    <input
                      type="text"
                      value={donationFormData.topic}
                      onChange={(e) => setDonationFormData({ ...donationFormData, topic: e.target.value })}
                      placeholder="مثلاً: تفاسیر، فقہ، تاریخ"
                      className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold">اضافی تفصیل یا پتہ</label>
                  <textarea
                    rows={2}
                    value={donationFormData.message}
                    onChange={(e) => setDonationFormData({ ...donationFormData, message: e.target.value })}
                    placeholder="کتب کی حالت، پبلشر، یا کوئی خاص ہدایات درج کریں..."
                    className="w-full bg-[#140A05] border border-[#C9B38D]/30 focus:border-[#C9B38D] rounded-xl px-4 py-2 text-white outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-urdu font-bold text-sm py-3 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border border-[#C9B38D] transition shadow-lg mt-2 active:scale-95"
                >
                  عطیہ کی اطلاع ارسال کریں
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 11. Footer */}
      <Footer />

      {/* 12. Admission Application Modal */}
      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />
    </div>
  );
}
