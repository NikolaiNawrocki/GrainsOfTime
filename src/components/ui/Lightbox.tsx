"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GalleryItem } from "@/types";
import { urlForImage } from "@/sanity/image";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < items.length - 1) {
        onNavigate(currentIndex + 1);
      }
    },
    [isOpen, currentIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  const imageUrl =
    currentItem.imageUrl ||
    (currentItem.image?.asset ? urlForImage(currentItem.image)?.url() : null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title || "Gallery photo viewer"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute top-5 right-5 z-50 p-2 text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Navigation - Prev */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm bg-black/60 hover:bg-black border border-white/10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Navigation - Next */}
      {currentIndex < items.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm bg-black/60 hover:bg-black border border-white/10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Main Image container */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={currentItem.image?.alt || currentItem.title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          ) : (
            <div className="w-full h-full max-w-2xl flex flex-col items-center justify-center p-8 bg-zinc-900/90 border border-white/15 rounded-sm text-center">
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-2">
                Gallery Photograph
              </span>
              <h3 className="text-xl font-serif text-white mb-2">
                {currentItem.title}
              </h3>
            </div>
          )}
        </div>

        {/* Caption & Metadata */}
        <div className="w-full mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between text-slate-300 border-t border-white/15 pt-3 gap-2">
          <div>
            <h4 className="text-base font-serif font-medium text-white">
              {currentItem.title}
            </h4>
          </div>
          <div className="text-right text-xs font-mono text-slate-400 tracking-wider uppercase">
            {currentItem.photographerCredit && (
              <span className="block">Credit: {currentItem.photographerCredit}</span>
            )}
            <span className="block text-[11px] text-slate-500">
              {currentIndex + 1} of {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
