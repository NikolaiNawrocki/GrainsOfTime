import { Mail, ArrowRight } from "lucide-react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HomePageData, SiteSettings } from "@/types";

interface ArchivalFeatureProps {
  content?: HomePageData;
  settings?: SiteSettings;
}

const defaultParagraphs = [
  "Founded in 1968, Grains of Time is North Carolina’s oldest collegiate a cappella group. With over 50 years of history, we pride ourselves on our legacy as a group and our time together representing NC State.",
  "We host multiple concerts at NC State each year, in addition to performing at various events across campus. Alongside these performances, we have the pleasure to compete annually in the International Championship of Collegiate A Cappella (ICCA).",
  "Beyond campus, we stay closely connected to our local community, performing regularly throughout Raleigh and across North Carolina.",
  "Whether you’re a student, alumni, or organization looking to connect, reach out to us! We would love to hear from you!",
];

export function ArchivalFeature({ content, settings }: ArchivalFeatureProps) {
  const eyebrow = "About Grains of Time";
  const heading = content?.archivalHeading || "Singing Since 1968";
  const contactEmail = settings?.contactEmail || "ncstategrains@gmail.com";

  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual column: Vertical Belltower photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal direction="left" distance={28} duration={800}>
              <EditorialImage
                image={content?.archivalImage}
                src={content?.archivalImage?.imageUrl || "/GrainsPhotos/Vertical.jpg"}
                aspectRatio="3/4"
                alt="Grains of Time ensemble standing proudly at the NC State Memorial Belltower"
                credit="Grains of Time Media"
                containerClassName="shadow-editorial hover:shadow-accent transition-shadow duration-300 max-w-md mx-auto"
              />
            </ScrollReveal>
          </div>

          {/* Narrative column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <ScrollReveal direction="right" distance={24} duration={800}>
              <SectionHeading
                eyebrow={eyebrow}
                title={heading}
              />

              <div className="space-y-4 text-sm sm:text-base text-grains-text/85 font-sans leading-relaxed pt-2">
                {defaultParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Action Button: Let's Connect */}
              <div className="pt-6">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-grains-red hover:bg-grains-red-bright hover:shadow-accent text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 shadow-subtle group"
                >
                  <Mail className="w-4 h-4" />
                  <span>Let’s Connect</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
