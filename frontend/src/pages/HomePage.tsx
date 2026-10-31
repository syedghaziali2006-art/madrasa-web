import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BooksSection from "@/components/BooksSection";
import CampusMediaSection from "@/components/gallery/CampusMediaSection";
import LibraryGallerySection from "@/components/gallery/LibraryGallerySection";
import StudentActivitiesSection from "@/components/gallery/StudentActivitiesSection";
import StudentPicnicSection from "@/components/gallery/StudentPicnicSection";
import CelebrationsGallerySection from "@/components/gallery/CelebrationsGallerySection";
import DonationSection from "@/components/DonationSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";

import { api } from "@/services/api";

export default function HomePage() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [homeData, setHomeData] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

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

  const sections = homeData?.sections;

  return (
    <main className="min-h-screen bg-[#120A05] text-[#FAF7F2] selection:bg-[#C9B38D] selection:text-[#120A05]">
      {/* 1. Navbar */}
      <Navbar
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenDonation={() => handleScrollToSection("donation")}
        onOpenContact={() => handleScrollToSection("contact")}
      />

      {/* 2. Hero Section */}
      <Hero
        data={homeData?.hero}
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenContact={() => handleScrollToSection("contact")}
        onExploreCourses={() => {
          window.location.href = "/policy";
        }}
      />

      {/* 3. سیکشن ۱: مدرسے کی تصویریں اور ویڈیوز (Campus Bento Grid) */}
      {sections?.campus?.enabled !== false && (
        <CampusMediaSection
          header={sections?.campus}
          items={homeData?.campusMedia}
        />
      )}

      {/* 5. سیکشن ۲: لائبریری کی تصویریں (Library Carousel Slider) */}
      {sections?.library?.enabled !== false && (
        <LibraryGallerySection
          header={sections?.library}
          items={homeData?.libraryMedia}
        />
      )}

      {/* 6. منتخب کتب و مطبوعات (Selected Books Showcase) */}
      {sections?.books?.enabled !== false && (
        <BooksSection header={sections?.books} />
      )}

      {/* 7. سیکشن ۳: بچوں کے کھیل کود کی تصاویر و ویڈیوز (Sports Masonry Grid) */}
      {sections?.activities?.enabled !== false && (
        <StudentActivitiesSection
          header={sections?.activities}
          items={homeData?.activitiesMedia}
        />
      )}

      {/* 8. سیکشن ۴: بچوں کی پکنک کی تصاویر و ویڈیوز (Picnic Polaroid Grid) */}
      {sections?.picnic?.enabled !== false && (
        <StudentPicnicSection
          header={sections?.picnic}
          items={homeData?.picnicMedia}
        />
      )}

      {/* 9. سیکشن ۵: بچوں کے جشنوں کی تصاویر و ویڈیوز (Celebrations Spotlight Slider) */}
      {sections?.celebrations?.enabled !== false && (
        <CelebrationsGallerySection
          header={sections?.celebrations}
          items={homeData?.celebrationsMedia}
        />
      )}

      {/* 10. عطیات و صدقات (Donations & Bank Accounts with 1-Click Copy) */}
      {sections?.donations?.enabled !== false && (
        <DonationSection
          header={sections?.donations}
          donationInfo={homeData?.donationInfo}
        />
      )}

      {/* 11. تاثرات (Scholars & Guardians Testimonials) */}
      {sections?.testimonials?.enabled !== false && (
        <Testimonials
          header={sections?.testimonials}
          items={homeData?.testimonialsList}
        />
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
