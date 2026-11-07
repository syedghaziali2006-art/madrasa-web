import React, { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BooksSection from "@/components/BooksSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";

const CampusMediaSection = React.lazy(() => import("@/components/gallery/CampusMediaSection"));
const LibraryGallerySection = React.lazy(() => import("@/components/gallery/LibraryGallerySection"));
const StudentActivitiesSection = React.lazy(() => import("@/components/gallery/StudentActivitiesSection"));
const StudentPicnicSection = React.lazy(() => import("@/components/gallery/StudentPicnicSection"));
const CelebrationsGallerySection = React.lazy(() => import("@/components/gallery/CelebrationsGallerySection"));
const Testimonials = React.lazy(() => import("@/components/Testimonials"));
const WebsiteIntro = React.lazy(() => import("@/components/WebsiteIntro"));

import { api } from "@/services/api";

export default function HomePage() {
  // Always show intro on page enter / reload as requested
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("introShown");
  });
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [homeData, setHomeData] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    // Clear any previous session lock so reload always shows intro
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("msz_intro_completed");
    }
    const handleReplay = () => setShowIntro(true);
    window.addEventListener("msz_replay_intro", handleReplay);
    return () => window.removeEventListener("msz_replay_intro", handleReplay);
  }, []);

  React.useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [resHome, resSettings] = await Promise.all([
          api.homepage.get(),
          api.settings.get(),
        ]);
        if (resHome.success && resHome.data) {
          setHomeData(resHome.data);
        }
        if (resSettings.success && resSettings.data) {
          setSettings(resSettings.data);
        }
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      }
    };
    fetchHomeData();
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenWhatsApp = () => {
    const phoneNumber = "923356666880";
    const message = encodeURIComponent("السلام علیکم، میں مدرسہ صاحب الزمان سے رابطہ کرنا چاہتا/چاہتی ہوں۔");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const sections = homeData?.sections;

  return (
    <main className="min-h-screen bg-[#120A05] text-[#FAF7F2] selection:bg-[#C9B38D] selection:text-[#120A05]">
      {/* 0. 3D Perspective Tunnel Intro Experience */}
      {showIntro && (
        <Suspense fallback={<div className="fixed inset-0 z-40 bg-[#120A05]" />}>
          <WebsiteIntro
            onFinish={() => {
              setShowIntro(false);
              sessionStorage.setItem("introShown", "1");
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          />
        </Suspense>
      )}

      {/* 1. Navbar */}
      <Navbar
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenDonation={() => handleScrollToSection("donation")}
        onOpenContact={handleOpenWhatsApp}
      />

      {/* 2. Hero Section */}
      <Hero
        data={homeData?.hero}
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenContact={handleOpenWhatsApp}
        onExploreCourses={() => {
          window.location.href = "/policy";
        }}
      />

      {/* 3. سیکشن ۱: مدرسے کی تصویریں اور ویڈیوز (Campus Bento Grid) */}
      {sections?.campus?.enabled !== false && (
        <Suspense fallback={<div className="h-[420px] w-full bg-[#160C07]" />}>
          <CampusMediaSection
            header={sections?.campus}
            items={homeData?.campusMedia}
          />
        </Suspense>
      )}

      {/* 5. سیکشن ۲: لائبریری کی تصویریں (Library Carousel Slider) */}
      {sections?.library?.enabled !== false && (
        <Suspense fallback={<div className="h-[420px] w-full bg-[#160C07]" />}>
          <LibraryGallerySection
            header={sections?.library}
            items={homeData?.libraryMedia}
          />
        </Suspense>
      )}

      {/* 6. منتخب کتب و مطبوعات (Selected Books Showcase) */}
      {sections?.books?.enabled !== false && (
        <BooksSection header={sections?.books} />
      )}

      {/* 7. سیکشن ۴: بچوں کی پکنک کی تصاویر و ویڈیوز (Picnic Polaroid Grid) */}
      {sections?.picnic?.enabled !== false && (
        <Suspense fallback={<div className="h-[420px] w-full bg-[#160C07]" />}>
          <StudentPicnicSection
            header={sections?.picnic}
            items={homeData?.picnicMedia}
          />
        </Suspense>
      )}

      {/* 8. سیکشن ۵: بچوں کے کھیل کود کی تصاویر و ویڈیوز (Sports Masonry Grid) */}
      {sections?.activities?.enabled !== false && (
        <Suspense fallback={<div className="h-[420px] w-full bg-[#160C07]" />}>
          <StudentActivitiesSection
            header={sections?.activities}
            items={homeData?.activitiesMedia}
          />
        </Suspense>
      )}

      {/* 9. سیکشن ۵: بچوں کے جشنوں کی تصاویر و ویڈیوز (Celebrations Spotlight Slider) */}
      {sections?.celebrations?.enabled !== false && (
        <Suspense fallback={<div className="h-[420px] w-full bg-[#160C07]" />}>
          <CelebrationsGallerySection
            header={sections?.celebrations}
            items={homeData?.celebrationsMedia}
          />
        </Suspense>
      )}


      {/* 11. تاثرات (Scholars & Guardians Testimonials) */}
      {sections?.testimonials?.enabled !== false && (
        <Suspense fallback={<div className="h-[420px] w-full bg-[#120A05]" />}>
          <Testimonials
            header={sections?.testimonials}
            items={homeData?.testimonialsList}
          />
        </Suspense>
      )}

      {/* 6. فوٹر و رابطہ (Footer & Contact Information) */}
      <Footer settings={settings} />

      {/* 7. آن لائن داخلہ فارم (Interactive Application Modal) */}
      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />
    </main>
  );
}
