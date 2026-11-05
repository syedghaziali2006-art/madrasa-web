"use client";

import React, { useState } from "react";
import { coursesData, Course } from "@/data/madarsaData";
import { BookOpen, BookmarkCheck, ShieldCheck, Laptop, Clock, GraduationCap, Check, ArrowLeft, CheckCircle2 } from "lucide-react";

interface CoursesProps {
  onSelectCourseForAdmission: (courseTitle: string) => void;
}

export default function Courses({ onSelectCourseForAdmission }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course>(coursesData[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-6 h-6 text-[#E5A93C]" />;
      case "BookmarkCheck":
        return <BookmarkCheck className="w-6 h-6 text-[#E5A93C]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#E5A93C]" />;
      case "Laptop":
        return <Laptop className="w-6 h-6 text-[#E5A93C]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#E5A93C]" />;
    }
  };

  return (
    <section id="curriculum" className="py-24 relative bg-[#1A0E08] islamic-navy-pattern">
      <div id="courses" className="sr-only" />
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#C9B38D]/15 via-[#C9B38D]/10 to-transparent border border-[#C9B38D]/40 text-[#D9C7A7] text-xs sm:text-sm font-semibold backdrop-blur-md mb-4 shadow-sm">
            
            <span className="font-urdu">تعلیمی نصاب و درجات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white mb-4 leading-relaxed">
            ہمارے مرکزی <span className="text-[#C9B38D]">تعلیمی شعبہ جات</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.4)]" />
          <p className="text-base sm:text-lg text-stone-300 font-urdu leading-relaxed max-w-2xl mx-auto">
            قرآن مجید اور سیرتِ اہلِ بیتؑ کے متوازن نظامِ تعلیم کے تحت مختلف درجات کے طلباء کے لیے ۵ سالہ جامع اور مستند نصاب۔
          </p>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coursesData.map((course) => {
            const isSelected = selectedCourse.id === course.id;
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? "bg-gradient-to-b from-[#25150C] to-[#120A05] border-[#C9B38D] shadow-[0_10px_35px_rgba(201,179,141,0.25)] -translate-y-1.5"
                    : "bg-gradient-to-b from-[#1E110A]/85 to-[#120A05]/90 backdrop-blur-xl border-[#C9B38D]/20 hover:border-[#C9B38D]/60 hover:shadow-lg"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-urdu font-bold px-3 py-1 rounded-full bg-[#2C190F] text-[#D9C7A7] border border-[#C9B38D]/40">
                      {course.tag}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#1A0E08] border border-[#C9B38D]/30 flex items-center justify-center shadow-inner">
                      {getIcon(course.icon)}
                    </div>
                  </div>

                  <h3 className="text-xl font-urdu font-bold text-white mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#C9B38D] font-arabic mb-3">
                    {course.arabicTitle}
                  </p>

                  <p className="text-xs text-stone-300 font-urdu leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C9B38D]/20 flex items-center justify-between text-xs font-urdu text-stone-400">
                  <span className="flex items-center gap-1 font-medium text-[#D9C7A7]">
                    <Clock className="w-3.5 h-3.5 text-[#C9B38D]" />
                    {course.duration}
                  </span>
                  <span className={`font-bold ${isSelected ? "text-white" : "text-stone-400"}`}>
                    {isSelected ? "منتخب شدہ ✓" : "تفصیل دیکھیں ←"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Course Deep Dive Showcase Card in Champagne Gold Frame */}
        <div className="bg-gradient-to-b from-[#EFE5D2] via-[#C9B38D] to-[#876F4B] p-[2px] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          <div className="rounded-[30px] bg-gradient-to-b from-[#22130B] to-[#120A05] p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9B38D]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0E08] border border-[#C9B38D]/40 text-xs font-urdu font-bold text-[#D9C7A7]">
                  <GraduationCap className="w-4 h-4 text-[#C9B38D]" />
                  <span>{selectedCourse.level}</span>
                  <span>•</span>
                  <span>{selectedCourse.duration}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-urdu font-bold text-white">
                  {selectedCourse.title}
                </h3>

                <p className="text-sm sm:text-base text-stone-300 font-urdu leading-relaxed">
                  {selectedCourse.description}
                </p>

                {/* Course Syllabus Features */}
                <div>
                  <h4 className="text-sm font-urdu font-bold text-[#C9B38D] mb-3 block">
                    نصاب کی نمایاں خصوصیات و مضامین:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCourse.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white bg-[#1A0E08]/90 p-3 rounded-xl border border-[#C9B38D]/20 font-urdu">
                        <CheckCircle2 className="w-4 h-4 text-[#C9B38D] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Action Box with White and Dull Golden Button */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center p-6 sm:p-8 rounded-2xl bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-center space-y-4 shadow-xl">
                <span className="text-xs text-stone-400 font-urdu">
                  داخلہ کے لیے مطلوبہ شعبہ
                </span>
                <div className="text-xl sm:text-2xl font-urdu font-bold text-[#D9C7A7]">
                  {selectedCourse.title}
                </div>
                <p className="text-xs text-stone-300 font-urdu leading-relaxed">
                  اہلیت: چھٹی جماعت پاس، عمر 11 تا 16 سال۔ انٹرویو و ٹیسٹ کے بعد میرٹ پر داخلہ۔
                </p>
                <button
                  onClick={() => onSelectCourseForAdmission(selectedCourse.title)}
                  className="w-full inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-base shadow-lg transition-all duration-300 active:scale-95 group"
                >
                  <span>اس شعبے میں داخلہ فارم بھریں</span>
                  <ArrowLeft className="w-4 h-4 text-[#8C6D3F] group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
