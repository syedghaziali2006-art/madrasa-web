"use client";

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

export default function Home() {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);

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

  return (
    <main className="min-h-screen bg-[#120A05] text-[#FAF7F2] selection:bg-[#C9B38D] selection:text-[#120A05]">
      {/* 1. Navbar */}
      <Navbar
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenDonation={() => handleScrollToSection("donation")}
        onOpenContact={handleOpenWhatsApp}
      />

      {/* 2. Hero Section */}
      <Hero
        onOpenAdmission={() => setIsAdmissionOpen(true)}
        onOpenContact={handleOpenWhatsApp}
        onExploreCourses={() => {
          window.location.href = "/policy";
        }}
      />

      {/* 3. سیکشن ۱: مدرسے کی تصویریں اور ویڈیوز (Campus Bento Grid) */}
      <CampusMediaSection />

      {/* 5. سیکشن ۲: لائبریری کی تصویریں (Library Carousel Slider) */}
      <LibraryGallerySection />

      {/* 6. منتخب کتب و مطبوعات (Selected Books Showcase) */}
      <BooksSection />

      {/* 7. سیکشن ۴: بچوں کی پکنک کی تصاویر و ویڈیوز (Picnic Polaroid Grid) */}
      <StudentPicnicSection />

      {/* 8. سیکشن ۵: بچوں کے کھیل کود کی تصاویر و ویڈیوز (Sports Masonry Grid) */}
      <StudentActivitiesSection />

      {/* 9. سیکشن ۵: بچوں کے جشنوں کی تصاویر و ویڈیوز (Celebrations Spotlight Slider) */}
      <CelebrationsGallerySection />


      {/* 11. تاثرات (Scholars & Guardians Testimonials) */}
      <Testimonials />

      {/* 6. فوٹر و رابطہ (Footer & Contact Information) */}
      <Footer />

      {/* 7. آن لائن داخلہ فارم (Interactive Application Modal) */}
      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />
    </main>
  );
}
