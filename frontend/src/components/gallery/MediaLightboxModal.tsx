"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Play, ZoomIn, Calendar, MapPin, Sparkles, Film, Image as ImageIcon } from "lucide-react";

export interface MediaItem {
  id: string;
  title: string;
  category: string;
  type: "image" | "video";
  imageUrl: string;
  videoDuration?: string;
  videoUrl?: string;
  date?: string;
  location?: string;
  description: string;
}

interface MediaLightboxModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function MediaLightboxModal({ item, onClose }: MediaLightboxModalProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    setIsPlaying(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  // Helper to extract YouTube embed URL if applicable
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(item.videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-gradient-to-b from-[#1E110A] to-[#120A05] rounded-3xl border-2 border-[#C9B38D]/50 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#C9B38D]/25 bg-[#140B06]">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0E08] border border-[#C9B38D]/40 text-xs font-urdu font-semibold text-[#C9B38D]">
              {item.type === "video" ? (
                <>
                  <Film className="w-3.5 h-3.5 text-[#C9B38D]" />
                  <span>ویڈیو کلپ {item.videoDuration ? `(${item.videoDuration})` : ""}</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-[#C9B38D]" />
                  <span>تصویر</span>
                </>
              )}
            </span>
            <span className="text-xs font-urdu text-stone-300 hidden sm:inline">
              {item.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1A0E08] hover:bg-[#2A170E] border border-[#C9B38D]/40 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            aria-label="بند کریں"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview Box */}
        <div className="relative w-full h-[45vh] sm:h-[55vh] bg-[#0A0503] flex items-center justify-center overflow-hidden">
          {item.type === "video" && isPlaying ? (
            embedUrl ? (
              <iframe
                src={embedUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : item.videoUrl ? (
              <video
                src={item.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-stone-300 font-urdu text-sm">ویڈیو کا ربط دستیاب نہیں ہے</div>
            )
          ) : (
            <>
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-contain"
                priority
              />

              {item.type === "video" && (
                <div
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 bg-black/40 hover:bg-black/20 flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/90 hover:bg-white text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_0_35px_rgba(201,179,141,0.8)] transform hover:scale-110 active:scale-95 transition-all duration-300">
                    <Play className="w-8 h-8 fill-[#120A05] text-[#120A05] mr-1" />
                  </div>
                  <span className="mt-4 px-4 py-1.5 rounded-full bg-[#120A05]/85 text-xs font-urdu text-stone-200 border border-[#C9B38D]/40 backdrop-blur-sm">
                    ویڈیو چلانے کے لیے کلک فرمائیں ▶
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Details & Caption */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-[#1A0E08] to-[#120A05] border-t border-[#C9B38D]/20 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-urdu font-bold text-white text-lg sm:text-2xl leading-[1.8]">
              {item.title}
            </h3>
            {item.date && (
              <div className="flex items-center gap-1.5 text-xs font-urdu text-[#C9B38D] shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            )}
          </div>

          <p className="font-urdu text-xs sm:text-sm text-stone-200 leading-[2.2]">
            {item.description}
          </p>

          {item.location && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#C9B38D]/15 text-xs font-urdu text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#C9B38D]" />
              <span>مقام: {item.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
