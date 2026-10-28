import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Disc3 } from "lucide-react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SiteSettings, HomePageData } from "@/types";

interface HeroSectionProps {
  settings?: SiteSettings;
  content?: HomePageData;
}

export function HeroSection({ settings, content }: HeroSectionProps) {
  const primaryText = content?.primaryCtaText || "Concert Schedule";
  const primaryLink = content?.primaryCtaLink || "/events";
  const secondaryText = "Book the Grains";
  const secondaryLink = "/book";

  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-grains-border overflow-hidden bg-grains-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Centered Cinematic Title & University Affiliation */}
        <div className="pt-2 sm:pt-6 pb-10 sm:pb-12 text-center flex flex-col items-center justify-center">
          <ScrollReveal direction="up" distance={20} duration={700} delay={100}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tight leading-none text-grains-black uppercase font-normal text-center">
              GRAINS <span className="text-grains-red">OF</span> TIME
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={16} duration={700} delay={200}>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg lg:text-xl font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-grains-black uppercase text-center">
              North Carolina State University
            </p>
            <p className="mt-2 text-xs sm:text-sm md:text-base font-mono tracking-widest text-grains-muted uppercase text-center">
              North Carolina’s Oldest A Cappella Group
            </p>
          </ScrollReveal>
        </div>

        {/* Hero Grid: Ensemble Photo + Seal & Action Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          {/* Main Performance Photo */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="up" distance={24} duration={800} delay={300}>
              <EditorialImage
                src={content?.heroImage?.imageUrl || "/GrainsPhotos/2026-Grains-Concert/GrainsOpenPhoto.jpg"}
                image={content?.heroImage}
                aspectRatio="16/9"
                alt={content?.heroImage?.alt || "Grains of Time live concert performance at Stewart Theatre"}
                placeholderLabel="Official Concert Photography • Stewart Theatre"
                hideCredit
                priority
                containerClassName="shadow-editorial"
              />
            </ScrollReveal>
          </div>

          {/* Beside the photo: Seal + Buttons */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <ScrollReveal direction="up" distance={20} duration={800} delay={450} className="w-full">
              <div className="w-full max-w-xs sm:max-w-sm mx-auto flex flex-col items-center justify-center space-y-6 lg:space-y-8">
                {/* Official Heritage Seal */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-grains-black p-3.5 border border-grains-border shadow-md flex items-center justify-center group hover:border-grains-red transition-colors shrink-0">
                  <Image
                    src="/GrainsPhotos/grains-logo-.PNG"
                    alt="Grains of Time Official Seal"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Direct Action Buttons */}
                <div className="w-full space-y-3.5 pt-1">
                  <Link
                    href={primaryLink}
                    className="w-full flex items-center justify-between px-6 py-4 bg-grains-red hover:bg-grains-red-bright hover:shadow-accent text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 shadow-subtle group"
                  >
                    <span>{primaryText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href={secondaryLink}
                    className="w-full flex items-center justify-between px-6 py-4 bg-[#EBE8E1] hover:bg-[#DFDCD4] border border-grains-border text-grains-black text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 group"
                  >
                    <span>{secondaryText}</span>
                    <Disc3 className="w-4 h-4 text-grains-muted group-hover:text-grains-black group-hover:rotate-45 transition-all" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
