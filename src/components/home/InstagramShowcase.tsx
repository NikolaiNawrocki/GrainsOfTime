import { Instagram, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryItem } from "@/types";

interface InstagramShowcaseProps {
  galleryItems: GalleryItem[];
}

export function InstagramShowcase({ galleryItems }: InstagramShowcaseProps) {
  // Show first 4 curated social/performance photos as the fallback grid
  const items = galleryItems.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Social Dispatch"
            title="Follow the Sound"
            subtitle="Rehearsals, tour dispatches, backstage moments, and announcements on Instagram."
          />
          <a
            href="https://instagram.com/grainsoftime"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-grains-black hover:bg-black text-white border border-grains-border hover:border-zinc-700 text-xs font-mono tracking-widest uppercase rounded-sm transition-colors"
          >
            <Instagram className="w-4 h-4 text-grains-red" />
            <span>@grainsoftime</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* Curated Social Feed Fallback Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <a
              key={item._id || idx}
              href="https://instagram.com/grainsoftime"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-zinc-950 border border-grains-border rounded-sm overflow-hidden flex flex-col justify-end p-5 transition-all duration-300 hover:border-zinc-600"
            >
              {/* Subtle grid framing */}
              <div className="absolute inset-3 border border-zinc-900 pointer-events-none group-hover:border-zinc-800 transition-colors" />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-grains-red-bright uppercase block">
                  Instagram Dispatch
                </span>
                <p className="text-sm font-serif text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1 border-t border-zinc-900">
                  <span>@grainsoftime</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Editorial note on official connection */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-zinc-600 tracking-wider uppercase">
            Curated Dispatch • Connect on Instagram for live stories & ticket giveaways
          </p>
        </div>
      </div>
    </section>
  );
}
