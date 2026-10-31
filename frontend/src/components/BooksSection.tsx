"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, Sparkles, Star, Eye, X, BookmarkCheck } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  pages: number;
  description: string;
}

import { api } from "@/services/api";

interface BooksSectionProps {
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
}

export default function BooksSection({ header }: BooksSectionProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const defaultBooks: Book[] = [
    {
      id: "1",
      title: "شہادتِ امام حسینؑ",
      author: "سید ابو الاعلیٰ مودودی",
      category: "تاریخ و سوانح",
      coverImage: "/images/books/book-1.jpg",
      rating: 5,
      reviewsCount: 124,
      pages: 180,
      description: "واقعہ کربلا کے تاریخی حقائق، فلسفۂ شہادت اور اس کے اسلامی و سیاسی اثرات پر تفصیلی و مدلل تاریخی جائزہ۔",
    },
    {
      id: "2",
      title: "کربلا کا تاریخی پس منظر",
      author: "شاہدہ بی بی خسروی / ندوی",
      category: "تاریخِ کربلا",
      coverImage: "/images/books/book-2.jpg",
      rating: 5,
      reviewsCount: 98,
      pages: 320,
      description: "قیامِ امام حسینؑ کے پس منظر، اسباب و محرکات اور کوفہ و شام کے تاریخی حالات پر مشتمل جامع کتاب۔",
    },
    {
      id: "3",
      title: "روضة الشہداء",
      author: "علامہ ملا حسین واعظ کاشفیؒ",
      category: "مقتل و فضائل",
      coverImage: "/images/books/book-3.jpg",
      rating: 5,
      reviewsCount: 215,
      pages: 450,
      description: "فارسی و اردو کی معروف ترین کلاسیکل مقتل کی کتاب جس میں انبیاء اور اہل بیتؑ کے مصائب کا دردناک اور مستند بیان ہے۔",
    },
    {
      id: "4",
      title: "شہادتِ امام حسینؑ (حقائق و واقعات)",
      author: "محققین تاریخِ اسلام",
      category: "تحقیق و مقالات",
      coverImage: "/images/books/book-4.jpg",
      rating: 5,
      reviewsCount: 86,
      pages: 210,
      description: "واقعہ کربلا سے متعلق مستند تاریخی شواہد، اسناد اور محققانہ تجزیات کا خوبصورت اور معلوماتی انتخاب۔",
    },
    {
      id: "5",
      title: "تاریخِ عاشور",
      author: "ڈاکٹر ابراہیم آیتی",
      category: "واقعہ عاشوراء",
      coverImage: "/images/books/book-5.jpg",
      rating: 5,
      reviewsCount: 160,
      pages: 290,
      description: "عاشوراء کے دن کے لمحہ بہ لمحہ واقعات، خطبات، شہدائے کربلا کی قربانیوں اور تاریخی حقائق پر مستند تصنیف۔",
    },
  ];

  const [books, setBooks] = useState<Book[]>(defaultBooks);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.books.getAll();
        if (res.success && res.data && res.data.length > 0) {
          // Map backend book data to Book interface if needed
          const mapped: Book[] = res.data.slice(0, 10).map((b: any, idx: number) => ({
            id: b.id || String(idx),
            title: b.title,
            author: b.author || "مصنف",
            category: b.category || "عام",
            coverImage: b.coverImage || `/images/books/book-${(idx % 5) + 1}.jpg`,
            rating: b.rating || 5,
            reviewsCount: b.reviewsCount || 100 + idx * 10,
            pages: b.pages || 250,
            description: b.description || "مستند دینی و علمی تصنیف"
          }));
          setBooks(mapped);
        }
      } catch (err) {
        // fallback
      }
    };
    fetchBooks();
  }, []);

  return (
    <section id="books" className="py-20 sm:py-28 relative overflow-hidden bg-[#120A05] islamic-dark-pattern" dir="rtl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C9B38D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A0E08]/90 border border-[#C9B38D]/40 text-[#C9B38D] text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C9B38D]" />
            <span className="font-urdu">{header?.badge || "علمی و تحقیقی ذخیرہ"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urdu font-bold text-white pt-2 leading-[2.1] sm:leading-[2.2]">
            {header?.title || "منتخب کتب و اہم مطبوعات"}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9B38D] to-transparent mx-auto rounded-full my-4 shadow-[0_0_12px_rgba(201,179,141,0.5)]" />

          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2] font-urdu leading-[2.4] sm:leading-[2.6] max-w-2xl mx-auto font-medium">
            {header?.subtitle || "مدرسہ صاحب الزمان کی لائبریری میں دستیاب تاریخِ اسلام، سیرتِ اہلِ بیتؑ اور تحقیق پر مبنی معتبر کتب"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-7 items-stretch">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="group relative flex flex-col justify-between p-5 rounded-3xl bg-gradient-to-b from-[#1C1009] via-[#160B06] to-[#100703] border border-[#C9B38D]/25 hover:border-[#C9B38D] shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(201,179,141,0.3)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-urdu font-semibold text-[#C9B38D] bg-[#24130A] px-3 py-1 rounded-full border border-[#C9B38D]/30">
                    {book.category}
                  </span>
                  <span className="text-[11px] font-urdu text-stone-400">
                    {book.pages} صفحات
                  </span>
                </div>

                <div className="relative w-full aspect-[1/1.35] max-w-[190px] mx-auto mb-5 rounded-lg overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.85)] group-hover:shadow-[0_16px_36px_rgba(201,179,141,0.35)] transition-all duration-500 group-hover:scale-105 bg-[#0D0603] border-r-2 border-stone-800">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="w-10 h-10 rounded-full bg-white text-[#120A05] border border-[#C9B38D] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-5 h-5 text-[#8C6D3F]" />
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-urdu font-bold text-white text-base sm:text-lg leading-[2.1] group-hover:text-[#D9C7A7] transition-colors min-h-[58px] flex items-center justify-center">
                    {book.title}
                  </h3>
                  <p className="text-xs font-urdu text-[#C9B38D] mt-2 truncate">
                    {book.author}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#C9B38D]/20">
                <div className="flex items-center justify-center gap-1 mb-3">
                  <span className="text-xs font-mono font-bold text-stone-300 ml-1">
                    {book.rating}.0
                  </span>
                  <div className="flex text-[#C9B38D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9B38D] text-[#C9B38D]" />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBook(book);
                  }}
                  className="w-full h-10 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-[#8C6D3F]" />
                  <span>مطالعہ و تفصیلات</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1A0E08] via-[#24130A] to-[#1A0E08] border border-[#C9B38D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#120A05] border border-[#C9B38D]/40 flex items-center justify-center shrink-0 shadow">
              <BookmarkCheck className="w-6 h-6 text-[#C9B38D]" />
            </div>
            <div>
              <h4 className="font-urdu font-bold text-white text-base sm:text-lg">
                مدرسہ صاحب الزمان لائبریری میں ۲۵,۰۰۰ سے زائد کتب دستیاب ہیں
              </h4>
              <p className="font-urdu text-xs sm:text-sm text-stone-300 mt-1 leading-[2.0]">
                طلبہ اور محققین حضرات لائبریری وزٹ کر کے اصل کتب اور نایاب نسخوں سے استفادہ حاصل کر سکتے ہیں۔
              </p>
            </div>
          </div>

          <a
            href="/library"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-sm shrink-0 shadow-lg transition active:scale-95"
          >
            مکمل کتب خانہ و آن لائن کیٹلاگ دیکھیں
          </a>
        </div>
      </div>

      {selectedBook && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#1E110A] to-[#120A05] border-2 border-[#C9B38D]/50 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#120A05] hover:bg-[#2A170E] border border-[#C9B38D]/40 text-stone-300 hover:text-white flex items-center justify-center transition"
              aria-label="بند کریں"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-right mt-2">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden bg-[#0A0503] border border-[#C9B38D]/40 shrink-0 shadow-xl">
                <Image
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="inline-block self-center sm:self-start px-3 py-1 rounded-full bg-[#1A0E08] text-[11px] font-urdu font-semibold text-[#C9B38D] border border-[#C9B38D]/30 mb-2">
                  {selectedBook.category}
                </div>

                <h3 className="font-urdu font-bold text-white text-xl sm:text-2xl leading-[2.1]">
                  {selectedBook.title}
                </h3>

                <p className="text-sm font-urdu font-semibold text-[#C9B38D] mt-2">
                  مصنف: {selectedBook.author}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-1.5 my-2.5">
                  <div className="flex text-[#C9B38D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9B38D] text-[#C9B38D]" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-300 font-urdu">
                    ({selectedBook.reviewsCount} آراء)
                  </span>
                </div>

                <p className="font-urdu text-xs sm:text-sm text-stone-200 leading-[2.2] mt-1">
                  {selectedBook.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#C9B38D]/20 flex items-center justify-around text-xs font-urdu text-stone-300">
                  <span>صفحات: <b className="text-white">{selectedBook.pages}</b></span>
                  <span>زبان: <b className="text-white">اردو</b></span>
                  <span>دستیابی: <b className="text-emerald-400">لائبریری میں موجود</b></span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C9B38D]/30 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedBook(null)}
                className="flex-1 h-11 rounded-full bg-white hover:bg-stone-100 text-[#120A05] border-2 border-[#C9B38D] font-urdu font-bold text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#8C6D3F]" />
                <span>مطالعہ و معلومات کے لیے رابطہ کریں</span>
              </a>
              <button
                onClick={() => setSelectedBook(null)}
                className="h-11 px-6 rounded-full bg-[#1A0E08] hover:bg-[#2A170E] text-white border border-[#C9B38D]/40 font-urdu font-semibold text-sm transition"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
