"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types";
import { urlForImage } from "@/sanity/image";
import { Lightbox } from "@/components/ui/Lightbox";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Camera, Maximize2 } from "lucide-react";

interface GalleryGridProps {
  items: GalleryItem[];
}

const filterTags = [
  { label: "All Photos", value: "all" },
  { label: "Media Day 2026", value: "mediaday" },
  { label: "2026 Concert", value: "2026-concert" },
  { label: "2025 Concert", value: "2025-concert" },
  { label: "Brotherhood & Retreat", value: "travel" },
  { label: "Archival & Awards", value: "archival" },
];

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedTag, setSelectedTag] = useState("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedTag === "all") return items;
    return items.filter((item) => item.tags?.includes(selectedTag as any));
  }, [items, selectedTag]);

  return (
    <div>
      {/* Category Filter Pills */}
      <ScrollReveal direction="up" distance={12} duration={500}>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-grains-border no-scrollbar">
          {filterTags.map((tag) => {
            const isSelected = selectedTag === tag.value;
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => setSelectedTag(tag.value)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors whitespace-nowrap ${
                  isSelected
                    ? "bg-grains-red text-white shadow-subtle font-medium"
                    : "bg-white hover:bg-grains-cream text-grains-black border border-grains-border"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Photography Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const imageUrl =
            item.imageUrl ||
            (item.image?.asset ? urlForImage(item.image)?.url() : null);

          const credit = item.photographerCredit || item.image?.credit;

          return (
            <ScrollReveal
              key={item._id}
              direction="up"
              distance={20}
              duration={600}
              delay={(index % 3) * 80}
            >
              <div
                onClick={() => setActiveLightboxIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveLightboxIndex(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View photo: ${item.title}`}
                className="group relative aspect-[4/3] bg-grains-cream border border-grains-border hover:border-grains-black/40 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red flex flex-col justify-end p-4 shadow-subtle hover:shadow-editorial"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.image?.alt || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-grains-cream via-[#ECE7DF] to-grains-cream-dark">
                    <div className="w-12 h-12 rounded-full border border-grains-border bg-white flex items-center justify-center mb-2 group-hover:border-grains-red/40 transition-colors">
                      <Camera className="w-6 h-6 text-grains-muted group-hover:text-grains-black transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-grains-black uppercase border border-grains-border bg-white/80 px-2 py-0.5 rounded-sm">
                      Photo Archive Frame
                    </span>
                    <p className="text-xs font-serif text-grains-black mt-1 max-w-xs line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                )}

                {/* Hover overlay gradient in Deep Black */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Caption & Credit on Hover */}
                <div className="relative z-10 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-90">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-serif text-white font-medium drop-shadow-sm">
                      {item.title}
                    </h3>
                    <Maximize2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors shrink-0" />
                  </div>
                  {credit && (
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-300 drop-shadow-sm">
                      Photo: {credit}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Accessible Lightbox Viewer */}
      <Lightbox
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIndex) => setActiveLightboxIndex(newIndex)}
      />
    </div>
  );
}
