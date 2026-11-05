"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Play, ZoomIn, Calendar, MapPin, Film, Image as ImageIcon } from "lucide-react";

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

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return !!url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);
  };

  const effectiveVideoUrl = item.videoUrl || (isVideoUrl(item.imageUrl) ? item.imageUrl : "");
  const embedUrl = getEmbedUrl(effectiveVideoUrl);
  const directVideoSrc = isVideoUrl(item.imageUrl)
    ? item.imageUrl
    : isVideoUrl(item.videoUrl)
    ? item.videoUrl
    : null;

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col backdrop-blur-xl rounded-3xl border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_0_rgba(255,245,230,0.18),0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top-edge specular reflection */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f5deb3]/35 to-transparent pointer-events-none z-10" />

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#f5deb3]/15 bg-white/[0.02] backdrop-blur-md relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_0_rgba(255,245,230,0.18)] text-xs font-urdu font-semibold text-[#f5deb3] hover:bg-white/[0.09] transition-all">
            {item.type === "video" ? (
              <>
                <Film className="w-3.5 h-3.5 text-[#f5deb3]" />
                <span>ویڈیو کلپ {item.videoDuration ? `(${item.videoDuration})` : ""}</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5 text-[#f5deb3]" />
                <span>تصویر</span>
              </>
            )}
            <span className="opacity-30">|</span>
            <span className="text-stone-300 font-normal">
              {item.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-[#f5deb3]/15 shadow-[inset_0_1px_1px_rgba(255,245,230,0.2)] text-stone-300 hover:text-white hover:bg-white/[0.12] hover:border-[#f5deb3]/35 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="بند کریں"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
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
            ) : effectiveVideoUrl ? (
              <video
                src={effectiveVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-stone-300 font-urdu text-sm">ویڈیو کا ربط دستیاب نہیں ہے</div>
            )
          ) : (
            <>
              {directVideoSrc ? (
                <video
                  src={`${directVideoSrc}#t=0.5`}
                  preload="metadata"
                  muted
                  playsInline
                  className="w-full h-full object-contain pointer-events-none"
                />
              ) : item.imageUrl && !isVideoUrl(item.imageUrl) ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 bg-[#0A0503]">
                  <Film className="w-12 h-12 text-[#C9B38D]/40 mb-2" />
                  <span className="text-xs font-urdu text-stone-400">کوئی میڈیا دستیاب نہیں</span>
                </div>
              )}

              {item.type === "video" && (
                <div
                  onClick={() => {
                    if (effectiveVideoUrl) {
                      setIsPlaying(true);
                    }
                  }}
                  className="absolute inset-0 bg-black/40 hover:bg-black/20 flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/90 hover:bg-white text-[#120A05] border-2 border-[#C9B38D] flex items-center justify-center shadow-[0_0_35px_rgba(201,179,141,0.8)] transform hover:scale-110 active:scale-95 transition-all duration-300">
                    <Play className="w-8 h-8 fill-[#120A05] text-[#120A05] mr-1" />
                  </div>
                  <span className="mt-4 px-4 py-1.5 rounded-full bg-[#120A05]/85 text-xs font-urdu text-stone-200 border border-[#C9B38D]/40 backdrop-blur-sm">
                    {effectiveVideoUrl ? "ویڈیو چلانے کے لیے کلک فرمائیں ▶" : "ویڈیو جلد دستیاب ہوگی"}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Details & Caption */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-[#2a1e14]/75 to-[#140e09]/85 backdrop-blur-xl border-t border-[#f5deb3]/15 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-urdu font-bold text-white text-lg sm:text-2xl leading-[1.8]">
              {item.title}
            </h3>
            {item.date && (
              <div className="flex items-center gap-1.5 text-xs font-urdu text-[#f5deb3] shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            )}
          </div>

          <p className="font-urdu text-xs sm:text-sm text-stone-200 leading-[2.2]">
            {item.description}
          </p>

          {item.location && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#f5deb3]/10 text-xs font-urdu text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#f5deb3]" />
              <span>مقام: {item.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
