"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type MotionValue,
  AnimatePresence,
} from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

const MADARSA_CARDS = [
  {
    src: "/images/intro/campus-building.jpg",
    title: "مرکزی کیمپس و خوبصورت عمارت",
    tag: "جامعہ کی عمارت",
  },
  {
    src: "/images/intro/namaz-ba-jamat.jpg",
    title: "طلبہ کی باجماعت نماز و عبادات",
    tag: "نماز و عبادات",
  },
  {
    src: "/images/intro/alam-mubarak.png",
    title: "شبِ عزا و سالانہ مجلسِ فاطمیہؑ",
    tag: "شعائرِ اہلِ بیتؑ",
  },
  {
    src: "/images/intro/tarbiyat-session.png",
    title: "اساتذہ و سرپرست کی تربیتی نشست",
    tag: "تربیت و رہنمائی",
  },
  {
    src: "/images/intro/library-students.jpg",
    title: "مرکزی لائبریری و مطالعہِ کتب",
    tag: "علمی تحقیق و مطالعہ",
  },
  {
    src: "/images/intro/founder-shakir-ali.jpg",
    title: "بانیِ جامعہ علامہ شیخ شاکر علی سرور (رہ)",
    tag: "بانیِ ادارہ",
  },
  {
    src: "/images/intro/tarbiyat-session.png",
    title: "اساتذہ و سرپرست کی تربیتی نشست",
    tag: "تربیت و رہنمائی",
  },
  {
    src: "/images/intro/campus-building.jpg",
    title: "مرکزی کیمپس و خوبصورت عمارت",
    tag: "جامعہ کی عمارت",
  },
  {
    src: "/images/intro/founder-shakir-ali.jpg",
    title: "بانیِ جامعہ علامہ شیخ شاکر علی سرور (رہ)",
    tag: "بانیِ ادارہ",
  },
  {
    src: "/images/intro/alam-mubarak.png",
    title: "شبِ عزا و سالانہ مجلسِ فاطمیہؑ",
    tag: "شعائرِ اہلِ بیتؑ",
  },
  {
    src: "/images/intro/namaz-ba-jamat.jpg",
    title: "طلبہ کی باجماعت نماز و عبادات",
    tag: "نماز و عبادات",
  },
  {
    src: "/images/intro/library-students.jpg",
    title: "مرکزی لائبریری و مطالعہِ کتب",
    tag: "علمی تحقیق و مطالعہ",
  },
];

interface TunnelCardData {
  item: { src: string; title: string; tag: string };
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = MADARSA_CARDS.map((item, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  const radiusFactorX = 0.28 + (i % 3) * 0.08;
  const radiusFactorY = 0.26 + (i % 2) * 0.09;

  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX,
    radiusFactorY,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
    index: i,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
  onSelect?: () => void;
}

function TunnelCard({ card, progress, pointer, total, stage, onSelect }: TunnelCardProps) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const defaultFarZ = stage.isMobile ? -1200 : -1700;
  const initialFarZ = stage.isMobile ? -480 : -650;
  const farZ = card.index < 5 ? initialFarZ : defaultFarZ;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  const initialOpacity = card.index < 5 ? 0.92 : 0;
  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [initialOpacity, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(130, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(270, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: number[]) => {
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  return (
    <motion.div
      onClick={onSelect}
      style={{
        width: cardWidth,
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#1A0E08] shadow-[0_20px_50px_rgba(0,0,0,0.95)] ring-1 ring-[#C9B38D]/40 transition-all duration-500 hover:ring-[#C9B38D] hover:shadow-[0_0_35px_rgba(201,179,141,0.35)]">
        <img
          src={card.item.src}
          alt={card.item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-black/20 to-transparent flex flex-col justify-end p-3.5 sm:p-4 text-right" dir="rtl">
          <span className="text-[10px] sm:text-[11px] font-urdu font-semibold text-[#C9B38D] mb-0.5">
            {card.item.tag}
          </span>
          <span className="text-xs sm:text-sm font-urdu font-bold text-white drop-shadow-md">
            {card.item.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface WebsiteIntroProps {
  onFinish: () => void;
}

export default function WebsiteIntro({ onFinish }: WebsiteIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  const [stage, setStage] = useState<StageDimensions>({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 900,
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Raw motion value controlled directly by mouse wheel / touch trackpad
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 75,
    damping: 28,
    restDelta: 0.0001,
  });

  // Lock body scroll and guarantee top position while intro is visible
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
  }, []);

  const handleFinish = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      onFinish();
    }, 700);
  }, [isExiting, onFinish]);

  // Handle wheel scrolling locally inside the viewport container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const current = rawProgress.get();
      const delta = e.deltaY * 0.00085;
      const next = Math.min(1, Math.max(0, current + delta));
      rawProgress.set(next);

      if (next >= 0.98) {
        handleFinish();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        const current = rawProgress.get();
        const delta = deltaY * 0.002;
        const next = Math.min(1, Math.max(0, current + delta));
        rawProgress.set(next);

        if (next >= 0.98) {
          handleFinish();
        }
      }
    };

    // Auto-glide gently forward if user is idle
    const autoInterval = setInterval(() => {
      const current = rawProgress.get();
      if (current < 0.95) {
        rawProgress.set(current + 0.0008);
      }
    }, 30);

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      clearInterval(autoInterval);
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [rawProgress, handleFinish]);

  const pointer = useCameraParallax(!reduce);

  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 1.2]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.88, 1], [0.4, 1, 1, 0]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.08 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] w-screen h-screen text-white overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 20% 35%, rgba(220, 38, 38, 0.4) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 80% 20%, rgba(185, 28, 28, 0.3) 0%, transparent 55%), linear-gradient(160deg, #000000 0%, #1a0000 40%, #000000 100%)",
        opacity: 0.7,
      }}
    >

      {/* 2. 3D PERSPECTIVE TUNNEL VIEWPORT */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
        style={{
          perspective: stage.isMobile ? "900px" : "1300px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle Ambient Vignettes & Concentric Depth Rings */}
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[#120A05]/40 to-[#120A05]/95 pointer-events-none" />

        {/* TOP CONTROLS: Skip Intro Button */}
        <div className="absolute top-5 sm:top-7 left-5 sm:left-8 z-50 flex items-center gap-3">
          <button
            onClick={handleFinish}
            className="font-urdu font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#120A05] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,1)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer group"
            aria-label="اسکپ کریں اور ویب سائٹ میں داخل ہوں"
          >
            <span>اسکپ کریں / ویب سائٹ میں داخل ہوں</span>
            <ArrowLeft className="w-4 h-4 text-[#8C6D3F] group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* TOP RIGHT: Islamic Badge */}
        <div className="absolute top-5 sm:top-7 right-5 sm:right-8 z-50 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A0E08]/85 border border-[#C9B38D]/30 backdrop-blur-md shadow-md text-right" dir="rtl">
          
          <span className="font-urdu text-xs text-[#D9C7A7] font-semibold">
            خوش آمدید
          </span>
        </div>

        {/* CENTER ANCHOR: Bismillah & Golden Calligraphy */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="pointer-events-none z-10 flex flex-col items-center text-center px-4 max-w-4xl"
          dir="rtl"
        >
          {/* A. Bismillah in Arabic Calligraphy: Transparent background, blinking golden dot, white text */}
          <div className="inline-flex items-center gap-3 mb-3 sm:mb-4 select-none">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#C9B38D] animate-blink-gold shrink-0" />
            <p className="font-arabic text-xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          {/* B. Large Golden Calligraphy Image */}
          <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[700px] aspect-[560/125] my-2 select-none">
            <img
              src="/images/madrasa-calligraphy.png"
              alt="مدرسہ صاحب الزمان (عج)"
              className="w-full h-full object-contain drop-shadow-[0_15px_45px_rgba(201,179,141,0.5)] drop-shadow-[0_6px_18px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* C. Subtitle / Tagline */}
          <p className="mt-2 text-sm sm:text-base md:text-lg font-urdu text-[#FAF7F2] drop-shadow-md font-medium max-w-xl leading-relaxed">
            دینی و عصری علوم کا بین الاقوامی اسلامی ادارہ | گلزارِ ہجری اسکیم ۳۳ احسن آباد، کراچی
          </p>
        </motion.div>

        {/* BOTTOM: Scroll Prompt */}
        <motion.div
          style={{ opacity: promptOpacity }}
          className="pointer-events-none absolute bottom-7 sm:bottom-9 z-20 flex flex-col items-center gap-2 text-xs font-urdu text-stone-300 drop-shadow-md select-none"
        >
          <div className="flex items-center gap-2 bg-[#1A0E08]/90 px-4 py-2 rounded-full border border-[#C9B38D]/35 backdrop-blur-md shadow-lg shadow-black/60">
            <Compass className="w-3.5 h-3.5 text-[#C9B38D] animate-spin" style={{ animationDuration: "8s" }} />
            <span>ماؤس اسکرول کریں یا سوائپ کریں</span>
          </div>
          <div className="h-6 w-px bg-gradient-to-b from-[#C9B38D] to-transparent animate-pulse" />
        </motion.div>

        {/* 3D Z-SPACE CORRIDOR WITH MADARSA IMAGES */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {TUNNEL_CARDS.map((card, i) => (
            <TunnelCard
              key={i}
              card={card}
              progress={smoothProgress}
              pointer={pointer}
              total={TUNNEL_CARDS.length}
              stage={stage}
              onSelect={handleFinish}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
