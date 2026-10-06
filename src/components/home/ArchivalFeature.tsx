import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HomePageData } from "@/types";

interface ArchivalFeatureProps {
  content?: HomePageData;
}

export function ArchivalFeature({ content }: ArchivalFeatureProps) {
  const eyebrow = content?.archivalEyebrow || "The Archive";
  const heading = content?.archivalHeading || "1968: Where the Harmony Began";
  const subtitle =
    content?.archivalSubtitle ||
    "More than half a century ago, a handful of NC State students gathered to sing without instruments. Today, that foundation remains unbroken.";

  const narrative =
    content?.archivalNarrative ||
    "From barbershop and collegiate choral classics in the late 1960s to contemporary pop, rock, and student-arranged soul charts today, Grains of Time reflects the spirit of North Carolina State University.\n\nEvery decade has contributed unique voices, legendary arrangements, and enduring friendships that span generations of alumni.";

  const renderParagraphs = (text: string) => {
    return text.split(/\n\s*\n/).map((para, idx) => (
      <p key={idx}>{para.trim()}</p>
    ));
  };

  const statFounded = content?.archivalStatFounded || 1968;
  const statDecades = content?.archivalStatDecades || "5+";
  const statRecordings = content?.archivalStatRecordings || "100%";
  const ctaText = content?.archivalCtaText || "Explore the Living Timeline";
  const ctaLink = content?.archivalCtaLink || "/history";

  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual column: Archival frame */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ScrollReveal direction="left" distance={28} duration={800}>
              <EditorialImage
                image={content?.archivalImage}
                src={content?.archivalImage?.imageUrl || "/GrainsPhotos/Pics/IMG_2224.jpg"}
                aspectRatio="4/5"
                alt={content?.archivalImage?.alt || "Grains of Time brothers in unity under concert spotlights"}
                credit={content?.archivalImage?.credit || "Grains of Time Archive"}
                containerClassName="shadow-editorial hover:shadow-accent transition-shadow duration-300"
              />
            </ScrollReveal>
          </div>

          {/* Narrative column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <ScrollReveal direction="right" distance={24} duration={800}>
              <SectionHeading
                eyebrow={eyebrow}
                title={heading}
                subtitle={subtitle}
              />

              <div className="space-y-4 text-sm text-grains-text/80 font-sans leading-relaxed pt-2">
                {renderParagraphs(narrative)}
              </div>

              {/* Archive stats bar with animated counters */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-grains-border">
                <div className="group">
                  <span className="text-2xl sm:text-3xl font-serif text-grains-black block group-hover:text-grains-red transition-colors">
                    <AnimatedCounter target={statFounded} startFrom={1900} duration={1600} />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-grains-muted">
                    Founded
                  </span>
                </div>
                <div className="group">
                  <span className="text-2xl sm:text-3xl font-serif text-grains-black block group-hover:text-grains-red transition-colors">
                    {statDecades.endsWith("+") ? (
                      <AnimatedCounter target={parseInt(statDecades) || 5} startFrom={1} duration={1200} suffix="+" />
                    ) : (
                      statDecades
                    )}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-grains-muted">
                    Decades
                  </span>
                </div>
                <div className="group">
                  <span className="text-2xl sm:text-3xl font-serif text-grains-black block group-hover:text-grains-red transition-colors">
                    {statRecordings.endsWith("%") ? (
                      <AnimatedCounter target={parseInt(statRecordings) || 100} startFrom={50} duration={1400} suffix="%" />
                    ) : statRecordings.endsWith("+") ? (
                      <AnimatedCounter target={parseInt(statRecordings) || 50} startFrom={10} duration={1400} suffix="+" />
                    ) : (
                      statRecordings
                    )}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-grains-muted">
                    A Cappella
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center text-xs font-mono tracking-widest text-grains-black hover:text-grains-red uppercase transition-all duration-200 group font-medium"
                >
                  <History className="w-4 h-4 mr-2 text-grains-red transition-transform duration-300 group-hover:-rotate-45" />
                  <span>{ctaText}</span>
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
