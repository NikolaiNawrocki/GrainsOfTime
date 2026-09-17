"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { GalleryItem } from "@/types";
import { urlForImage } from "@/sanity/image";
import { Lightbox } from "@/components/ui/Lightbox";
import { Camera, Maximize2 } from "lucide-react";

interface GalleryGridProps {
  items: GalleryItem[];
}

const filterTags = [
  { label: "All Photos", value: "all" },
  { label: "Live Concerts", value: "concert" },
  { label: "Rehearsals", value: "rehearsal" },
  { label: "Archival History", value: "archival" },
  { label: "Tour & Travel", value: "travel" },
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
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-grains-border no-scrollbar">
        {filterTags.map((tag) => {
          const isSelected = selectedTag === tag.value;
          return (
            <button
              key={tag.value}
              type="button"
              onClick={() => setSelectedTag(tag.value)}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors whitespace-nowrap ${
                isSelected
                  ? "bg-grains-red text-white"
                  : "bg-grains-surface hover:bg-grains-surface-elevated text-zinc-400 hover:text-white border border-grains-border"
              }`}
            >
              {tag.label}
            </button>
          );
        })}
      </div>

      {/* Photography Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const imageUrl = item.image?.asset
            ? urlForImage(item.image)?.url()
            : null;

          return (
            <div
              key={item._id}
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
              className="group relative aspect-[4/3] bg-zinc-950 border border-grains-border hover:border-zinc-600 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red flex flex-col justify-end p-4"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={item.image.alt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-zinc-900 via-zinc-950 to-black">
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center mb-2 group-hover:border-grains-red/40 transition-colors">
                    <Camera className="w-6 h-6 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    Photo Archive Frame
                  </span>
                  <p className="text-xs font-serif text-zinc-400 mt-1 max-w-xs line-clamp-2">
                    {item.title}
                  </p>
                </div>
              )}

              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Caption & Credit on Hover */}
              <div className="relative z-10 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-90">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-serif text-white font-medium drop-shadow-sm">
                    {item.title}
                  </h3>
                  <Maximize2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                </div>
                {item.image.credit && (
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 drop-shadow-sm">
                    Photo: {item.image.credit}
                  </p>
                )}
              </div>
            </div>
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
