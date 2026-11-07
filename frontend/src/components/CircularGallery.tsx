import React, { useState, useEffect, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define the type for a single gallery item
export interface GalleryItem {
  id?: string;
  common: string;
  binomial: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
  pages?: number;
  description?: string;
  category?: string;
  author?: string;
  rating?: number;
  reviewsCount?: number;
}

// Define the props for the CircularGallery component
export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controlled rotation angle in degrees from scroll. */
  rotation?: number;
  /** Optional callback when an item is clicked */
  onItemClick?: (item: GalleryItem) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, rotation: controlledRotation, onItemClick, ...props }, ref) => {
    const [internalRotation, setInternalRotation] = useState(0);

    // Responsive radius calculation so cards fit perfectly on all screen sizes
    const [computedRadius, setComputedRadius] = useState(radius);

    useEffect(() => {
      const updateRadius = () => {
        if (typeof window !== 'undefined') {
          const w = window.innerWidth;
          if (w < 640) {
            setComputedRadius(Math.min(radius, 300));
          } else if (w < 1024) {
            setComputedRadius(Math.min(radius, 440));
          } else {
            setComputedRadius(radius);
          }
        }
      };
      updateRadius();
      window.addEventListener('resize', updateRadius);
      return () => window.removeEventListener('resize', updateRadius);
    }, [radius]);

    // If controlledRotation is not supplied, fallback to standard window scroll
    useEffect(() => {
      if (controlledRotation !== undefined) return;

      const handleScroll = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setInternalRotation(scrollProgress * 360);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [controlledRotation]);

    const activeRotation = controlledRotation !== undefined ? controlledRotation : internalRotation;

    if (!items || items.length === 0) {
      return null;
    }

    const anglePerItem = 360 / items.length;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none overflow-hidden",
          className
        )}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${activeRotation}deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = activeRotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.25, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.id || item.photo.url + i} 
                role="group"
                aria-label={item.common}
                onClick={() => onItemClick?.(item)}
                className="absolute w-[220px] sm:w-[270px] md:w-[300px] h-[320px] sm:h-[370px] md:h-[400px] cursor-pointer"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${computedRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-150px',
                  marginTop: '-200px',
                  opacity: opacity,
                  transition: 'opacity 0.2s linear',
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-[#C9B38D]/35 bg-[#140A05]/85 backdrop-blur-lg hover:border-[#C9B38D] hover:shadow-[0_0_35px_rgba(201,179,141,0.4)] transition-all duration-300">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  {/* Overlay text in Urdu */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/65 to-transparent text-white text-right" dir="rtl">
                    <h2 className="text-base sm:text-lg font-urdu font-bold leading-tight line-clamp-1">{item.common}</h2>
                    <em className="text-xs sm:text-sm font-urdu not-italic text-[#C9B38D] block mt-1 line-clamp-1">{item.binomial}</em>
                    <p className="text-[11px] font-urdu mt-1 text-stone-300 opacity-90 truncate">اشاعت / مؤلف: {item.photo.by}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
