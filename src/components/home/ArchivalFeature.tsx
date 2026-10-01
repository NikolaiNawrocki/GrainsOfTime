import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function ArchivalFeature() {
  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual column: Archival frame */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ScrollReveal direction="left" distance={28} duration={800}>
              <EditorialImage
                src="/GrainsPhotos/Pics/IMG_2224.jpg"
                aspectRatio="4/5"
                alt="Grains of Time brothers in unity under concert spotlights"
                credit="Grains of Time Archive"
                containerClassName="shadow-editorial hover:shadow-accent transition-shadow duration-300"
              />
            </ScrollReveal>
          </div>

          {/* Narrative column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <ScrollReveal direction="right" distance={24} duration={800}>
              <SectionHeading
                eyebrow="The Archive"
                title="1968: Where the Harmony Began"
                subtitle="More than half a century ago, a handful of NC State students gathered to sing without instruments. Today, that foundation remains unbroken."
              />

              <div className="space-y-4 text-sm text-grains-text/80 font-sans leading-relaxed pt-2">
                <p>
                  From barbershop and collegiate choral classics in the late 1960s to contemporary pop, rock, and student-arranged soul charts today, Grains of Time reflects the spirit of North Carolina State University.
                </p>
                <p>
                  Every decade has contributed unique voices, legendary arrangements, and enduring friendships that span generations of alumni.
                </p>
              </div>

              {/* Archive stats bar with animated counters */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-grains-border">
                <div className="group">
                  <span className="text-2xl sm:text-3xl font-serif text-grains-black block group-hover:text-grains-red transition-colors">
                    <AnimatedCounter target={1968} startFrom={1900} duration={1600} />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-grains-muted">
                    Founded
                  </span>
                </div>
                <div className="group">
                  <span className="text-2xl sm:text-3xl font-serif text-grains-black block group-hover:text-grains-red transition-colors">
                    <AnimatedCounter target={5} startFrom={1} duration={1200} suffix="+" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-grains-muted">
                    Decades
                  </span>
                </div>
                <div className="group">
                  <span className="text-2xl sm:text-3xl font-serif text-grains-black block group-hover:text-grains-red transition-colors">
                    <AnimatedCounter target={100} startFrom={50} duration={1400} suffix="%" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-grains-muted">
                    A Cappella
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/history"
                  className="inline-flex items-center text-xs font-mono tracking-widest text-grains-black hover:text-grains-red uppercase transition-all duration-200 group font-medium"
                >
                  <History className="w-4 h-4 mr-2 text-grains-red transition-transform duration-300 group-hover:-rotate-45" />
                  <span>Explore the Living Timeline</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
