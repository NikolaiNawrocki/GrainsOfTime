import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Disc3 } from "lucide-react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { VisualAcousticPulse } from "@/components/ui/VisualAcousticPulse";
import { CampusClock } from "@/components/ui/CampusClock";
import { SiteSettings, HomePageData } from "@/types";

interface HeroSectionProps {
  settings?: SiteSettings;
  content?: HomePageData;
}

export function HeroSection({ settings, content }: HeroSectionProps) {
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - (settings?.foundedYear || 1968);

  const heading = content?.heroHeading || "Grains of Time";
  const subtitle = content?.heroSubtitle || "NC State’s Premier All-Male A Cappella Ensemble";
  const tagline = content?.heroTagline || "Individual voices accumulating into a lasting legacy.";
  const description =
    content?.heroDescription ||
    "Since 1968, Grains of Time has defined collegiate vocal music at NC State. Roots in tradition, an ear toward experimentation, and an unbreakable brotherhood.";
  const primaryText = content?.primaryCtaText || "Concert Schedule";
  const primaryLink = content?.primaryCtaLink || "/events";
  const secondaryText = content?.secondaryCtaText || "The Story Since 1968";
  const secondaryLink = content?.secondaryCtaLink || "/about";

  // Render stylized title if default, else standard editorial serif
  const renderTitle = () => {
    if (heading.toLowerCase() === "grains of time") {
      return (
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-none text-grains-black uppercase font-normal">
          Grains <span className="text-grains-red">of</span> Time
        </h1>
      );
    }
    return (
      <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-none text-grains-black uppercase font-normal">
        {heading}
      </h1>
    );
  };

  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-grains-border overflow-hidden bg-grains-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Archival metadata line with dynamic live campus indicator */}
        <ScrollReveal direction="down" distance={12} duration={500}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-grains-border text-xs font-mono tracking-[0.25em] text-grains-muted uppercase">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-grains-red animate-pulse" />
              <span className="text-grains-black font-medium">{settings?.locationAffiliation || "North Carolina State University"}</span>
              <span className="hidden sm:inline text-grains-border">•</span>
              <span className="hidden sm:inline"><CampusClock /></span>
            </div>
            <div className="flex items-center gap-4 text-grains-muted">
              <span>Est. {settings?.foundedYear || 1968}</span>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <VisualAcousticPulse size="sm" />
                <span>Raleigh, NC</span>
              </div>
              <span>•</span>
              <span className="text-grains-black font-medium">
                <AnimatedCounter target={yearsActive} startFrom={40} duration={1400} /> Years of Brotherhood
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Cinematic Title & Wordmark with Heritage Seal */}
        <div className="pt-10 sm:pt-14 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <ScrollReveal direction="up" distance={20} duration={700} delay={100}>
              {renderTitle()}
            </ScrollReveal>
            <ScrollReveal direction="up" distance={16} duration={700} delay={200}>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-mono tracking-widest text-grains-muted uppercase max-w-2xl">
                {subtitle}
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" distance={20} duration={700} delay={250} className="hidden md:flex flex-col items-center gap-2 shrink-0 pb-1">
            <div className="w-20 h-20 rounded-full bg-grains-black p-3.5 border border-grains-border shadow-md flex items-center justify-center group hover:border-grains-red transition-colors">
              <Image
                src="/GrainsPhotos/grains-logo-.PNG"
                alt="Grains of Time Official Seal"
                width={60}
                height={60}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[9px] font-mono tracking-[0.25em] text-grains-muted uppercase">OFFICIAL SEAL</span>
          </ScrollReveal>
        </div>

        {/* Hero Grid: Intentional Ensemble Visual Frame + Editorial Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-4">
          <div className="lg:col-span-8">
            <ScrollReveal direction="up" distance={24} duration={800} delay={300}>
              <EditorialImage
                src={content?.heroImage?.imageUrl || "/GrainsPhotos/2026-Grains-Concert/GrainsOpenPhoto.jpg"}
                image={content?.heroImage}
                aspectRatio="16/9"
                alt={content?.heroImage?.alt || "Grains of Time live concert performance at Stewart Theatre"}
                placeholderLabel="Official Concert Photography • Stewart Theatre"
                credit={content?.heroImage?.credit || "Grains of Time Media"}
                priority
                containerClassName="shadow-editorial"
              />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-4 space-y-6 pb-2">
            <ScrollReveal direction="up" distance={20} duration={800} delay={450}>
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-[0.25em] text-grains-red uppercase block font-semibold">
                  Living Archive
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-grains-black leading-tight">
                  {tagline}
                </h2>
                <p className="text-sm text-grains-text/80 leading-relaxed font-sans">
                  {description}
                </p>
              </div>

              {/* Quick entry links */}
              <div className="pt-5 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href={primaryLink}
                  className="inline-flex items-center justify-between px-6 py-3.5 bg-grains-red hover:bg-grains-red-bright hover:shadow-accent text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 shadow-subtle group"
                >
                  <span>{primaryText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <Link
                  href={secondaryLink}
                  className="inline-flex items-center justify-between px-6 py-3.5 bg-grains-cream hover:bg-grains-cream-dark hover:border-grains-black/30 border border-grains-border text-grains-black text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 group"
                >
                  <span>{secondaryText}</span>
                  <Disc3 className="w-4 h-4 text-grains-muted group-hover:text-grains-black group-hover:rotate-45 transition-all" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
