"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import {
  ZoomIn,
  Play,
  GraduationCap,
  MapPin,
  FileCheck,
} from "lucide-react";
import MediaLightboxModal, { MediaItem } from "./MediaLightboxModal";
import { api } from "@/services/api";

export interface LibraryGallerySectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    description?: string;
  };
  items?: MediaItem[];
  className?: string;
}

export default function LibraryGallerySection({
  header,
  items,
  className,
  ...props
}: LibraryGallerySectionProps) {
  const [selectedMedia, setSelectedMedia] = React.useState<MediaItem | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(2);
  const [windowWidth, setWindowWidth] = React.useState<number>(1200);

  const defaultExamItems: MediaItem[] = [
    {
      id: "exam-1",
      title: "سالانہ امتحانات کا پروقار انعقاد و ہال کا منظر",
      category: "سالانہ امتحانات",
      type: "image",
      imageUrl: "/images/gallery/library-interior.jpg",
      date: "تعلیمی سال ۲۰۲۵-۲۰۲۶",
      location: "مرکزی امتحانی ہال",
      description: "طلبہ کے سالانہ تحریری امتحانات، مکمل نظم و ضبط، پرسکون ماحول اور نگران اساتذہ کی موجودگی کا منظر۔",
    },
    {
      id: "exam-2",
      title: "زبانی امتحانات و کتبِ درسیہ کی علمی جانچ",
      category: "زبانی امتحانات",
      type: "image",
      imageUrl: "/images/library.jpg",
      date: "ششماہی امتحان",
      location: "کمیٹی روم نمبر ۲",
      description: "جید اساتذہ کے روبرو طلبہ کے زبانی ٹیسٹ، تجوید اور فقہی سوالات کے جوابات کا پروقار سیشن۔",
    },
    {
      id: "exam-3",
      title: "حفظِ قرآن کریم کا باقاعدہ امتحانی اجلاس",
      category: "شعبہ تحفیظ",
      type: "image",
      imageUrl: "/images/books/book-3.jpg",
      date: "ماہانہ ٹیسٹ",
      location: "دار القرآن والحدیث",
      description: "حفاظِ کرام کی حسنِ قرائت، تجوید کے قواعد اور یادداشت کی کڑی جانچ کا روحانی منظر۔",
    },
    {
      id: "exam-4",
      title: "امتحانی نتائج کا اعلان و پوزیشن ہولڈرز کی حوصلہ افزائی",
      category: "تقسیمِ اسناد",
      type: "image",
      imageUrl: "/images/books/book-2.jpg",
      date: "اختتامی تقریب",
      location: "مرکزی آڈیٹوریم",
      description: "نمایاں پوزیشن حاصل کرنے والے ہونہار طلبہ میں انعامات، تمغات اور تعریفی اسناد کی تقسیم۔",
    },
    {
      id: "exam-5",
      title: "نگران اساتذہ و ممتحنین کی مشاورتی نشست",
      category: "مجلسِ امتحانات",
      type: "image",
      imageUrl: "/images/books/book-5.jpg",
      date: "امتحانی بورڈ",
      location: "دفترِ نظامتِ تعلیمات",
      description: "امتحانی پرچہ جات کی جانچ، معیار کے جائزے اور شفاف نتائج کے لیے اساتذہ کی فکری نشست۔",
    },
  ];

  const [libraryItems, setLibraryItems] = React.useState<MediaItem[]>(
    items && items.length > 0 ? items : defaultExamItems
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  React.useEffect(() => {
    if (items && items.length > 0) {
      setLibraryItems(items);
      return;
    }
    const fetchLibraryMedia = async () => {
      try {
        const res = await api.gallery.getAll({ section: "library" });
        if (res.success && res.data && res.data.length > 0) {
          setLibraryItems(res.data);
        }
      } catch (err) {
        // fallback to defaultExamItems
      }
    };
    fetchLibraryMedia();
  }, [items]);

  // Framer Motion InView controls
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Helper function to calculate the final transform values for each card
  const getCardState = (index: number, total: number) => {
    const centerIndex = (total - 1) / 2;
    const distanceFromCenter = index - centerIndex;

    // Responsive horizontal spread
    const spreadX =
      windowWidth < 640 ? 52 : windowWidth < 1024 ? 85 : 120;
    const x = distanceFromCenter * spreadX;
    // Vertical lift to form the curved arch
    const y = Math.abs(distanceFromCenter) * -26;
    // Rotation for the fanned effect
    const rotate = distanceFromCenter * 9.5;

    return { x, y, rotate };
  };

  // Animation for the container to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // REBUILT ANIMATION LOGIC: Integrated positioning directly into framer-motion
  const itemVariants = {
    // All cards start at the center, scaled down
    hidden: { opacity: 0, scale: 0.8, x: 0, y: 0, rotate: 0 },
    // Animate to the final calculated position
    visible: (i: number) => {
      const state = getCardState(i, libraryItems.length);
      return {
        opacity: 1,
        scale: 1,
        x: state.x,
        y: state.y,
        rotate: state.rotate,
        zIndex: libraryItems.length - Math.abs(i - (libraryItems.length - 1) / 2),
        transition: {
          type: "spring" as const,
          stiffness: 140,
          damping: 14,
        },
      };
    },
    active: (i: number) => {
      const state = getCardState(i, libraryItems.length);
      return {
        opacity: 1,
        scale: 1.15,
        x: state.x,
        y: state.y - 25,
        rotate: state.rotate,
        zIndex: 90,
        transition: {
          type: "spring" as const,
          stiffness: 240,
          damping: 18,
        },
      };
    },
  };

  return (
    <section
      id="exams"
      dir="rtl"
      className={cn(
        "py-20 sm:py-28 bg-[#160C07] islamic-navy-pattern relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#C9B38D]/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,179,141,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto flex flex-col items-center text-center px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "امتحانات"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-3 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="max-w-3xl text-stone-300 md:text-xl font-urdu leading-relaxed mx-auto font-medium">
            {header?.subtitle ||
              "مدرسہ صاحب الزمان کے سالانہ، ششماہی اور حوزوی امتحانات کے تصویری مناظر، امتحانی ہال اور انعامات کی تقسیم"}
          </p>

          <div className="pt-2 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-urdu shadow-sm">
              
              <span>کارڈ پر ماؤس لے جائیں یا کلک کر کے مکمل منظر دیکھیں</span>
            </span>
          </div>
        </div>

        {/* Sized container for the absolute positioning & curved fanned arch */}
        <div className="relative w-full flex flex-col items-center justify-center">
          <motion.div
            ref={inViewRef}
            className="relative mt-8 sm:mt-14 flex items-center justify-center w-full"
            style={{ minHeight: "380px" }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {libraryItems.map((item, index) => {
              const distanceFromCenter = Math.abs(
                index - (libraryItems.length - 1) / 2
              );
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={item.id || index}
                  className={cn(
                    "absolute w-36 h-52 sm:w-48 sm:h-68 md:w-56 md:h-80 lg:w-64 lg:h-88 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-2 transition-all cursor-pointer select-none bg-[#1A0E08]",
                    isActive
                      ? "border-[#FFE566] shadow-[0_0_35px_rgba(255,215,0,0.55)] ring-2 ring-[#FFE566]/40"
                      : "border-[#C9B38D]/40 hover:border-[#C9B38D]"
                  )}
                  custom={index}
                  variants={itemVariants}
                  animate={inView ? (isActive ? "active" : "visible") : "hidden"}
                  whileHover={{
                    scale: 1.18,
                    y: getCardState(index, libraryItems.length).y - 28,
                    zIndex: 99,
                    transition: {
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  onHoverStart={() => setActiveIndex(index)}
                  onClick={() => {
                    setActiveIndex(index);
                    setSelectedMedia(item);
                  }}
                >
                  {/* Card Media Container */}
                  <div className="relative w-full h-full bg-[#0D0603]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0704] via-[#0E0704]/40 to-transparent pointer-events-none" />

                    {/* Top Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-urdu font-bold px-2.5 py-0.5 rounded-full bg-[#120A05]/90 text-[#D9C7A7] border border-[#C9B38D]/40 backdrop-blur-md shadow-md">
                        {item.type === "video" ? (
                          <Play className="w-3 h-3 text-[#FFE566] fill-[#FFE566]" />
                        ) : (
                          <FileCheck className="w-3 h-3 text-[#C9B38D]" />
                        )}
                        <span>{item.category || "امتحانات"}</span>
                      </span>
                    </div>

                    {/* Center hover icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-12 h-12 rounded-full bg-[#1A0E08]/90 text-[#FFE566] border border-[#C9B38D] flex items-center justify-center shadow-lg backdrop-blur-sm">
                        {item.type === "video" ? (
                          <Play className="w-6 h-6 fill-current mr-0.5" />
                        ) : (
                          <ZoomIn className="w-6 h-6" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-right bg-gradient-to-t from-black/95 via-black/75 to-transparent z-10 pointer-events-none">
                      <h4 className="font-urdu font-bold text-white text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {item.title}
                      </h4>
                      {item.location && (
                        <p className="font-urdu text-[11px] text-stone-300 flex items-center gap-1 justify-end mt-1">
                          <span>{item.location}</span>
                          <MapPin className="w-3 h-3 text-[#C9B38D]" />
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <MediaLightboxModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
}
