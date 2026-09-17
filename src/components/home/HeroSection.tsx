import Link from "next/link";
import { ArrowRight, Disc3 } from "lucide-react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SiteSettings } from "@/types";

interface HeroSectionProps {
  settings?: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - (settings?.foundedYear || 1968);

  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-grains-border overflow-hidden">
      {/* Background ambient lighting - restrained, subtle crimson depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-grains-red/10 via-transparent to-transparent blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Archival metadata line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-grains-border/60 text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-grains-red" />
            <span>North Carolina State University</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Est. 1968</span>
            <span>•</span>
            <span>Raleigh, NC</span>
            <span>•</span>
            <span className="text-zinc-400">{yearsActive} Years of Brotherhood</span>
          </div>
        </div>

        {/* Cinematic Title & Wordmark */}
        <div className="pt-10 sm:pt-14 pb-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-none text-grains-paper uppercase font-normal">
            Grains <span className="text-grains-red italic font-serif">of</span>{" "}
            Time
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-mono tracking-widest text-zinc-400 uppercase max-w-2xl">
            NC State’s Premier All-Male A Cappella Ensemble
          </p>
        </div>

        {/* Hero Grid: Intentional Ensemble Visual Frame + Editorial Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-4">
          <div className="lg:col-span-8">
            <EditorialImage
              aspectRatio="16/9"
              alt="Grains of Time current active ensemble"
              placeholderLabel="Official Roster Photography • Stewart Theatre"
              caption="The ensemble performing live in Raleigh, North Carolina."
              credit="Grains of Time Media"
              priority
              containerClassName="shadow-editorial"
            />
          </div>

          <div className="lg:col-span-4 space-y-6 pb-2">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-[0.25em] text-grains-red-bright uppercase block">
                Living Archive
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-grains-paper leading-tight">
                Individual voices accumulating into a lasting legacy.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Since 1968, Grains of Time has defined collegiate vocal music at NC State. Roots in tradition, an ear toward experimentation, and an unbreakable brotherhood.
              </p>
            </div>

            {/* Quick entry links */}
            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/events"
                className="inline-flex items-center justify-between px-5 py-3 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors group"
              >
                <span>Concert Schedule</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-between px-5 py-3 bg-grains-surface hover:bg-grains-surface-elevated border border-grains-border text-zinc-300 hover:text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors group"
              >
                <span>The Story Since 1968</span>
                <Disc3 className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
