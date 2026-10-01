import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryItem } from "@/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { urlForImage } from "@/sanity/image";

interface InstagramShowcaseProps {
  galleryItems: GalleryItem[];
}

const defaultSocialPhotos = [
  "/GrainsPhotos/Pics/IMG_4052.jpg",
  "/GrainsPhotos/MediaDay2026/IMG_4856.jpg",
  "/GrainsPhotos/Pics/IMG_1372.jpg",
  "/GrainsPhotos/Pics/IMG_2640.jpg",
];

export function InstagramShowcase({ galleryItems }: InstagramShowcaseProps) {
  // Show first 4 curated social/performance photos as the fallback grid
  const items = galleryItems.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={16} duration={600}>
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
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-grains-white text-grains-black border border-grains-border hover:border-grains-black/30 text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 shadow-subtle hover:shadow-accent hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4 text-grains-red" />
              <span>@grainsoftime</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-grains-muted" />
            </a>
          </div>
        </ScrollReveal>

        {/* Curated Social Feed Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const rawUrl =
              item.imageUrl ||
              (item.image?.asset ? urlForImage(item.image)?.url() : item.image?.imageUrl);
            const photoSrc = rawUrl || defaultSocialPhotos[idx % defaultSocialPhotos.length];

            return (
              <ScrollReveal
                key={item._id || idx}
                direction="up"
                distance={20}
                duration={650}
                delay={idx * 100}
              >
                <a
                  href="https://instagram.com/grainsoftime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square bg-grains-black border border-grains-border rounded-sm overflow-hidden flex flex-col justify-end p-5 transition-all duration-300 hover:border-grains-red/60 hover:shadow-editorial hover:-translate-y-1 block"
                >
                  {/* Photo Background */}
                  <Image
                    src={photoSrc}
                    alt={item.title || "Grains of Time on Instagram"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Contrast gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors" />

                  {/* Subtle grid framing */}
                  <div className="absolute inset-3 border border-white/20 pointer-events-none group-hover:border-grains-red/50 transition-colors" />

                  <div className="relative z-10 space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-grains-red uppercase block font-semibold drop-shadow-sm">
                      Instagram Dispatch
                    </span>
                    <p className="text-sm font-serif text-white group-hover:text-red-100 transition-colors line-clamp-2 leading-snug drop-shadow-sm">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/70 pt-2 border-t border-white/20">
                      <span>@grainsoftime</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-grains-red" />
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Editorial note on official connection */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-grains-muted tracking-wider uppercase">
            Curated Dispatch • Connect on Instagram for live stories & ticket giveaways
          </p>
        </div>
      </div>
    </section>
  );
}
