import bcrypt from "bcryptjs";

export const getSeedData = () => {
  const adminHashedPassword = bcrypt.hashSync("admin123", 10);

  return {
    users: [
      {
        id: "admin-1",
        name: "ایڈمنسٹریٹر مدرسہ",
        email: "admin@sahibuzzaman.org",
        password: adminHashedPassword,
        role: "admin",
        createdAt: new Date().toISOString()
      }
    ],

    admissions: [
      {
        id: "MSZ-841920",
        fullName: "علی رضا کاظمی",
        fatherName: "سید محمد کاظمی",
        age: 14,
        gender: "طالب علم (مرد)",
        phone: "+92 300 1234567",
        city: "کراچی",
        selectedCourse: "شعبہ درسِ نظامی (حوزوی علوم)",
        previousEducation: "چھٹی جماعت پاس",
        residenceType: "رہائشی (ہاسٹل و طعام)",
        message: "میں حوزوی تعلیم حاصل کر کے دینِ اسلام کی خدمت کرنا چاہتا ہوں۔",
        status: "pending",
        interviewDate: "",
        notes: "",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "MSZ-519283",
        fullName: "زہراء بتول",
        fatherName: "غلام مرتضیٰ",
        age: 16,
        gender: "طالبہ (خاتون - جامعہ زہراء)",
        phone: "+92 321 9876543",
        city: "لاہور",
        selectedCourse: "شعبہ عقائد، اخلاق و معارف اہلِ بیتؑ",
        previousEducation: "میٹرک (Matric)",
        residenceType: "آن لائن / فاصلاتی",
        message: "آن لائن کلاسز کے ذریعے عقائد اور اخلاق کی تعلیم حاصل کرنا مقصود ہے۔",
        status: "interview_scheduled",
        interviewDate: "2026-11-05 11:00 AM",
        notes: "امیدوار کا تعلیمی ریکارڈ تسلی بخش ہے۔",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "MSZ-230911",
        fullName: "محمد مہدی رضوی",
        fatherName: "سید باقر رضوی",
        age: 13,
        gender: "طالب علم (مرد)",
        phone: "+92 333 4567890",
        city: "راولپنڈی",
        selectedCourse: "شعبہ حفظ و تجوید القرآن",
        previousEducation: "چھٹی جماعت پاس",
        residenceType: "رہائشی (ہاسٹل و طعام)",
        message: "حفظ القرآن کے ساتھ تجوید مکمل کرنا چاہتا ہوں۔",
        status: "approved",
        interviewDate: "2026-10-25",
        notes: "انٹرویو کامیاب، فیس ادا کر دی گئی ہے۔",
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],

    books: [
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
        pdfUrl: "",
        isReferenceOnly: false,
        isManuscript: false,
        description: "امیر المؤمنین حضرت علی بن ابی طالبؑ کے خطبات، مکتوبات اور کلماتِ حکمت کا لاجواب اور فصیح و بلیغ شاہکار۔ حکمت، بلاغت اور عدل و سیاست کا بے مثال سمندر جس کی ہر سطر بصیرت کا سرچشمہ ہے۔",
        highlights: ["شریف رضیؒ کا مستند نسخہ", "جامع تحقیقی اردو ترجمہ و حواشی", "حکمت و معرفت کے اصول"],
        createdAt: new Date().toISOString()
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
        pdfUrl: "",
        isReferenceOnly: true,
        isManuscript: false,
        description: "شیعہ اثنا عشری مکتب فکر کی کتبِ اربعہ میں سب سے اہم، مستند اور جامع ترین کتاب۔ غیبتِ صغریٰ کے دور میں لکھی گئی یہ کتاب اصولِ دین، فروعی احکام اور اخلاقیات پر مشتمل ۱۶ ہزار سے زائد روایات کا گنجینہ ہے۔",
        highlights: ["کتبِ اربعہ کا بنیادی ستون", "غیبتِ صغریٰ کے مبارک دور کی تالیف", "مکمل اعراب شدہ دار الحدیث ایڈیشن"],
        createdAt: new Date().toISOString()
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
        pdfUrl: "",
        isReferenceOnly: false,
        isManuscript: false,
        description: "عصرِ حاضر کی سب سے انقلابی، فکری اور عمیق تفسیر جس میں 'تفسیر القرآن بالقرآن' کا قرآنی و استدلالی طریقہ اپنایا گیا ہے۔ قرآنی آیات کی روشنی میں عصر حاضر کے شکوک و شبہات کے تسلی بخش جوابات۔",
        highlights: ["تفسیر القرآن بالقرآن کا اعجاز", "فلسفی و کلامی عمیق تحقیقات", "جدید فکری تقاضوں کا احاطہ"],
        createdAt: new Date().toISOString()
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
        pdfUrl: "",
        isReferenceOnly: false,
        isManuscript: false,
        description: "سلیس، عام فہم اور جدید فکری تقاضوں سے ہم آہنگ اردو زبان کی سب سے مقبول تفسیر۔ قرآن کی سماجی، اخلاقی اور سائنسی تعلیمات کا جدید دور کے انسان کے لیے قابل عمل نمونہ۔",
        highlights: ["عام فہم اور دلنشین اردو اسلوب", "سماجی و اخلاقی مسائل کا قرآنی حل", "مکمل ۲۷ جلدوں کا مستند سیٹ"],
        createdAt: new Date().toISOString()
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
        pdfUrl: "",
        isReferenceOnly: true,
        isManuscript: false,
        description: "فقہی استنباط اور حوزہ علمیہ کی درسِ خارج کے لیے فقہِ روایات کا سب سے عظیم دائرۃ المعارف۔ طہارت سے لے کر دیات تک فقہ کے ہر باب کی تمام معتبر احادیث کا منظم ترین احاطہ۔",
        highlights: ["حوزوی استنباط کا بنیادی مآخذ", "۳۵ ہزار سے زائد فقہی روایات", "تحقیقِ مؤسسہ آل البیتؑ"],
        createdAt: new Date().toISOString()
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
        pdfUrl: "",
        isReferenceOnly: true,
        isManuscript: false,
        description: "عالمِ اسلام کا سب سے ضخیم روائی و تاریخی انسائیکلوپیڈیا۔ علامہ مجلسیؒ نے دنیا بھر سے نایاب اور ناپید ہوتی ہوئی ہزاروں قلمی کتب کو جمع کر کے اس عظیم مجموعے میں ہمیشہ کے لیے محفوظ کر دیا۔",
        highlights: ["۱۱۰ جلدوں کا مکمل انسائیکلوپیڈیا", "اسلامی علوم کا عظیم ترین ذخیرہ", "نایاب احادیث و تاریخی دستاویزات"],
        createdAt: new Date().toISOString()
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
        pdfUrl: "",
        isReferenceOnly: false,
        isManuscript: false,
        description: "فارسی و اردو کی معروف ترین کلاسیکل مقتل کی تصنیف جس میں انبیائے کرامؑ اور شہدائے کربلا کے مصائب و فضائل کا رقت آمیز اور ادبی بیان قلمبند کیا گیا ہے۔",
        highlights: ["کلاسیکل مرثیہ و مقتل", "فارسی اصل مع مستند اردو ترجمہ", "تاریخی فضائل و مصائب"],
        createdAt: new Date().toISOString()
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
        pdfUrl: "",
        isReferenceOnly: false,
        isManuscript: false,
        description: "عاشوراء کے دن کے لمحہ بہ لمحہ واقعات، خطبات، اصحابِ امام حسینؑ کی فداکاریوں اور کربلا کے تاریخی و دینی اسباب پر لکھی گئی محققانہ اور تاریخ ساز کتاب۔",
        highlights: ["مستند تاریخی اسناد", "منظم وقتی اور تاریخی ترتیب", "فکری تجزیہ و مدلل تحقیق"],
        createdAt: new Date().toISOString()
      }
    ],

    bookRequests: [
      {
        id: "req-1",
        name: "محمد سجاد",
        phone: "+92 312 3456789",
        bookName: "اصولِ کافی شرح ملا صدرا",
        authorName: "صدر الدین محمد شیرازی (ملا صدرا)",
        purpose: "تحقیقی مقالہ",
        notes: "مجھے جلد اول کی ضرورت ہے برائے حوالہ جات۔",
        status: "pending",
        createdAt: new Date().toISOString()
      }
    ],

    bookDonations: [
      {
        id: "don-1",
        name: "ڈاکٹر اقبال کاظمی",
        phone: "+92 345 6789012",
        city: "اسلام آباد",
        bookCount: "10-50 کتب",
        topic: "دینی و حوزوی کتب اور تفاسیر",
        message: "والد صاحب کے ذاتی ذخیرے سے تفاسیر و احادیث کی کتب مدرسہ کو ہدیہ کرنی ہیں۔",
        status: "contacted",
        createdAt: new Date().toISOString()
      }
    ],

    staff: [
      {
        id: "cur-1",
        name: "علامہ سید مہدی موسوی",
        title: "مدیرِ اعلیٰ و پرنسپل مدرسہ",
        category: "leadership",
        department: "انتظامیہ و اعلیٰ تدریس",
        qualification: "فاضل حوزہ علمیہ قم، درسِ خارج و اصول",
        experience: "۲۲ سالہ تدریسی و تنظیمی تجربہ",
        image: "/images/faculty/principal-scholar.jpg",
        email: "principal@madrasasahibuzzaman.org",
        phone: "+92 300 1234567",
        isOnlineActive: true,
        order: 1,
        createdAt: new Date().toISOString()
      },
      {
        id: "cur-2",
        name: "مولانا سید عابد رضوی",
        title: "نائب مدیر و استادِ درسِ خارج و فقہ",
        category: "leadership",
        department: "شعبہ فقہ و کلام",
        qualification: "سطحِ چہارم (ڈاکٹریٹ کے مساوی) حوزہ نجف اشرف",
        experience: "۱۸ سالہ تدریسی تجربہ",
        image: "/images/layout/avatar1.jpg",
        email: "abid.rizvi@madrasasahibuzzaman.org",
        phone: "",
        isOnlineActive: true,
        order: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: "cur-3",
        name: "مولانا سید حسنین باقر نجفی",
        title: "صدر شعبہ علومِ قرآن و حدیث",
        category: "faculty",
        department: "شعبہ تفاسیر و احادیث",
        qualification: "ماسٹرز اسلامیات و حوزوی سندِ اجتہاد",
        experience: "۱۵ سالہ تدریسی تجربہ",
        image: "/images/layout/avatar2.jpg",
        email: "",
        phone: "",
        isOnlineActive: true,
        order: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: "cur-4",
        name: "قاری سید محمد رضا نقوی",
        title: "صدر شعبہ تجوید و حفظِ قرآن",
        category: "quran",
        department: "دار القرآن الکریم",
        qualification: "سند قراءاتِ عشرہ، مصر و مشہد مقدس",
        experience: "۱۲ سالہ تدریسی تجربہ",
        image: "/images/layout/child-quran.jpg",
        email: "",
        phone: "",
        isOnlineActive: true,
        order: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: "cur-5",
        name: "پروفیسر ڈاکٹر عمار کاظمی",
        title: "صدر شعبہ عصری علوم، انگلش و آئی ٹی",
        category: "faculty",
        department: "عصری تعلیم و ریسرچ",
        qualification: "پی ایچ ڈی کمپیوٹر سائنس و ایم اے انگلش",
        experience: "۱۴ سالہ تدریسی تجربہ",
        image: "/images/layout/avatar3.jpg",
        email: "",
        phone: "",
        isOnlineActive: true,
        order: 5,
        createdAt: new Date().toISOString()
      }
    ],

    gallery: [
      {
        id: "gal-campus-1",
        title: "مدرسہ کا مرکزی بیرونی منظر و گنبد",
        section: "campus",
        category: "عمارت و کیمپس",
        type: "image",
        imageUrl: "/images/layout/mosque-arches.jpg",
        videoDuration: "",
        date: "شعبان ۱۴۴۷ھ",
        location: "احسن آباد کیمپس، کراچی",
        description: "مدرسہ صاحب الزمان کی پرشکوہ اسلامی طرزِ تعمیر کی حامل عمارت، محرابیں اور وسیع دالان۔",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "gal-campus-2",
        title: "دار الحدیث و مرکزی تدریسی ہال",
        section: "campus",
        category: "تدریسی ہال",
        type: "video",
        imageUrl: "/images/layout/congregation.jpg",
        videoDuration: "۰۴:۲۰",
        date: "رجب المرجب",
        location: "دوسری منزل، مرکزی ہال",
        description: "طلبہ کے روزمرہ دروس، کتبِ اربعہ اور منطق و بلاغت کی محفلِ درس کا خوبصورت منظر۔",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "gal-lib-1",
        title: "مرکزی کتب خانہ و ریڈنگ ہال",
        section: "library",
        category: "کتب خانہ",
        type: "image",
        imageUrl: "/images/books/book-1.jpg",
        videoDuration: "",
        date: "محرم الحرام",
        location: "لائبریری بلاک",
        description: "۲۵ ہزار سے زائد مستند دینی و تحقیقی کتب پر مشتمل پرامن ریڈنگ ہال۔",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "gal-act-1",
        title: "سالانہ کرکٹ ٹورنامنٹ و اسپورٹس فیسٹیول",
        section: "activities",
        category: "کھیل کود",
        type: "image",
        imageUrl: "/images/layout/tasbih-hands.jpg",
        videoDuration: "",
        date: "شوال المکرم",
        location: "اسپورٹس گراؤنڈ",
        description: "طلبہ کی جسمانی صحت اور ذہنی نشوونما کے لیے منظم اسپورٹس گالا۔",
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: "gal-picnic-1",
        title: "طلبہ کا سالانہ تفریحی و علمی ٹور",
        section: "picnic",
        category: "پکنک و سیر",
        type: "image",
        imageUrl: "/images/layout/women-campus.jpg",
        videoDuration: "",
        date: "ربیع الثانی",
        location: "حب کینال و فارم ہاؤس",
        description: "سالانہ تعلیمی و تفریحی ٹور جس میں طلبہ کی اخلاقی و فکری ہم آہنگی کا خصوصی اہتمام کیا گیا۔",
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: "gal-cel-1",
        title: "سالانہ تقریبِ تقسیمِ اسناد، انعامات اور شیلڈز",
        section: "celebrations",
        category: "تقسیمِ انعامات",
        type: "video",
        imageUrl: "/images/gallery/celebration-stage.jpg",
        videoDuration: "۰۶:۳۰",
        date: "شعبان المعظم ۱۴۴۷ھ",
        location: "مرکزی پنڈال و اسٹیج",
        description: "ممتاز پوزیشن حاصل کرنے والے ہونہار طلبہ کو علمائے کرام کے دستِ مبارک سے اعزازی شیلڈز، کتب اور سرٹیفکیٹس کی تقسیم۔",
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "gal-cel-2",
        title: "جشنِ ولادتِ باسعادت حضرت محمد مصطفیٰ ﷺ و امام جعفر صادقؑ",
        section: "celebrations",
        category: "جشن و میلاد",
        type: "image",
        imageUrl: "/images/layout/mosque-arches.jpg",
        date: "۱۷ ربیع الاول",
        location: "مرکزی کانفرنس ہال",
        description: "عطر بیز محفلِ میلاد، بچوں کی نعت خوانی، قصیدہ گوئی اور شیرینی کی تقسیم کا بابرکت منظر۔",
        featured: true,
        createdAt: new Date().toISOString()
      }
    ],

    donationAccounts: [
      {
        id: "acc-1",
        bankName: "میزان بینک لمیٹڈ (Meezan Bank)",
        accountTitle: "Madarsa e Sahib uz Zaman Trust",
        accountNumber: "02010108923451",
        iban: "PK36MEZN0002010108923451",
        branch: "احسن آباد برانچ، کراچی",
        swiftCode: "MEZNPKKA",
        purpose: "سہمِ امامؑ، سہمِ سادات، دسترخوان اور امدادِ طلباء",
        isActive: true
      },
      {
        id: "acc-2",
        bankName: "جاز کیش / ایزی پیسہ (JazzCash / EasyPaisa)",
        accountTitle: "مدرسہ صاحب الزمان ٹرسٹ",
        accountNumber: "0300-1234567",
        iban: "فوری والٹ ٹرانسفر",
        branch: "ڈیجیٹل والٹ",
        swiftCode: "-",
        purpose: "تعاون برائے طعام و نصاب کتب",
        isActive: true
      }
    ],

    donorSubmissions: [
      {
        id: "sub-101",
        donorName: "حاجی غلام عباس",
        phone: "+92 300 9876543",
        amount: "50,000",
        bankName: "Meezan Bank",
        transactionId: "TXN-98421045",
        donationType: "سہمِ امامؑ و دسترخوان",
        receiptImage: "",
        notes: "ماہانہ تعاون برائے طعام طلبہ",
        status: "verified",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],

    settings: {
      madarsaName: "مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف)",
      madarsaNameEnglish: "Madarsa e Sahib uz Zaman (a.t.f.s)",
      tagline: "دینی و عصری علوم کا بین الاقوامی اسلامی ادارہ",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      address: "پلاٹ بی 25، احسن آباد 3، احسن آباد، گلزار ہجری، اسکیم 33، کراچی، پاکستان",
      shortAddress: "احسن آباد 3، گلزار ہجری، اسکیم 33، کراچی",
      phone: "+92 300 1234567",
      whatsapp: "+92 300 1234567",
      email: "info@sahibuzzaman.org",
      interviewTimings: "صبح 10 تا دوپہر 1 بجے تک",
      monthlyFee: "1500 روپے",
      admissionFee: "5000 روپے",
      securityFee: "25000 روپے (کورس مکمل کرنے پر قابل واپسی)",
      ageLimit: "11 تا 16 سال",
      minQualification: "چھٹی جماعت پاس",
      testSubjects: "اردو، انگلش، حساب اور قرآن مجید",
      marqueeNotice: "تعلیمی سال ۲۰۲۶ - ۲۰۲۷ کے لیے نئے داخلے جاری ہیں۔ ٹیسٹ و انٹرویو کے لیے آن لائن فارم پر کریں۔",
      isAdmissionOpen: true,
      stats: {
        studentsCount: "۱۲۰۰+",
        graduatesCount: "۸۵۰+",
        facultyCount: "۴۵+",
        dailyMealsCount: "۲۵۰۰+"
      }
    },

    homeContent: {
      hero: {
        bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        title: "مدرسہ صاحب الزمان",
        titleSuffix: "(عج)",
        tagline: "دینی و عصری علوم کا بین الاقوامی اسلامی ادارہ | حوزوی تعلیم، تجوید، خطابت، انگلش اور کمپیوٹر کا مثالی سنگم برائے کردار سازی",
        bgType: "image",
        bgMediaUrl: "/images/hero-banner.png",
        badges: [
          { id: "1", text: "۵ سالہ حوزوی نصاب" },
          { id: "2", text: "مفت ہاسٹل و معیاری طعام" },
          { id: "3", text: "کمپیوٹر لیب و لائبریری" }
        ],
        addressText: "پلاٹ بی 25، احسن آباد، گلزارِ ہجری، اسکیم 33، کراچی، پاکستان",
        googleMapsUrl: "https://maps.google.com/?q=Madarsa+Sahib+uz+Zaman+Ahsanabad+3+Gulzar-e-Hijri+Scheme+33+Karachi",
        admissionBtnText: "داخلہ لیں",
        contactBtnText: "ہم سے رابطہ کریں",
        posterImage: "/images/admission-poster.jpeg",
        posterTitle: "داخلہ پراسپیکٹس و شرائط — مدرسہ صاحب الزمان (عج)"
      },
      sections: {
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
        activities: {
          enabled: true,
          badge: "سیکشن ۴: جسمانی صحت و تفریح",
          title: "طلبہ کے کھیل کود اور اسپورٹس سرگرمیاں",
          subtitle: "صحت مند دماغ کے لیے صحت مند جسم — کرکٹ، فٹ بال، بیڈمنٹن اور روایتی کھیلوں کے مقابلے"
        },
        picnic: {
          enabled: true,
          badge: "سیکشن ۵: مطالعاتی و تفریحی ٹورز",
          title: "طلبہ کے سالانہ پکنک اور تفریحی مقامات کے دورے",
          subtitle: "سمندر کنارے پرلطف لمحات، تاریخی و تفریحی مقامات کے مطالعاتی دورے اور باہمی ہم آہنگی"
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
      }
    }
  };
};
