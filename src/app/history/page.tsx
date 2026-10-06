import type { Metadata } from "next";
import { getTimelineEntries, getSiteSettings } from "@/lib/sanity/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { History, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Living Archive & History (1968–Present)",
  description:
    "Explore the documented history of Grains of Time from its founding at NC State in 1968 through the modern era.",
};

export const revalidate = 60;

export default async function HistoryPage() {
  const [timeline, settings] = await Promise.all([
    getTimelineEntries(),
    getSiteSettings(),
  ]);

  const eyebrow = settings?.timelineEyebrow || "Chronicle • 1968 to Present";
  const title = settings?.timelineHeading || "The Living Archive";
  const subtitle =
    settings?.timelineSubtitle ||
    "A chronological record of sound, milestones, and brotherhood at North Carolina State University.";
  const notice =
    settings?.timelineArchivalNotice ||
    "This timeline documents verified organizational milestones. Dates, narratives, and archival imagery are curated directly from NC State university archives and Grains of Time alumni records.";

  return (
    <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-grains-white">
      {/* Header */}
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-16">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />
        </div>
      </ScrollReveal>

      {/* Archival Policy Notice */}
      <ScrollReveal direction="up" distance={16} duration={600} delay={100}>
        <div className="p-5 mb-16 bg-grains-cream border border-grains-border rounded-sm flex items-start gap-3 text-xs font-mono text-grains-muted shadow-subtle">
          <History className="w-4 h-4 text-grains-red mt-0.5 shrink-0" />
          <div>
            <span className="text-grains-black font-semibold uppercase tracking-wider block">
              Archival Standard & Integrity
            </span>
            <p className="mt-1 font-sans text-grains-text/80 leading-normal">
              {notice}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-grains-border pl-6 sm:pl-10 space-y-16 ml-3 sm:ml-6">
        {timeline.map((entry) => (
          <ScrollReveal
            key={entry._id}
            direction="up"
            distance={20}
            duration={650}
          >
            <article
              className="relative group space-y-5"
              aria-label={`${entry.year}: ${entry.headline}`}
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-grains-red group-hover:bg-grains-red transition-colors shadow-sm" />

              {/* Date & Era Header */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif text-grains-black font-normal">
                    {entry.year}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-grains-red uppercase border border-grains-red/30 px-2.5 py-0.5 rounded-sm bg-red-50 font-medium">
                    {entry.era}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-grains-black group-hover:text-grains-red transition-colors pt-1">
                  {entry.headline}
                </h3>
              </div>

              {/* Narrative text */}
              <div className="text-sm sm:text-base text-grains-text/85 font-sans leading-relaxed max-w-3xl">
                <p>{entry.narrative}</p>
              </div>

              {/* Archival Photograph if present */}
              {entry.archivalImage && (
                <div className="max-w-2xl pt-2">
                  <EditorialImage
                    image={entry.archivalImage}
                    alt={entry.archivalImage.alt || entry.headline}
                    aspectRatio="16/9"
                    caption={entry.archivalImage.caption}
                    credit={entry.archivalImage.credit || entry.sourceCredit}
                    containerClassName="shadow-editorial"
                  />
                </div>
              )}

              {/* Placeholder Indicator if pending verification */}
              {entry.isPlaceholder && (
                <div className="flex items-center gap-2 text-[11px] font-mono text-grains-muted pt-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-grains-muted" />
                  <span>Archival record pending alumni submission</span>
                </div>
              )}
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* Alumni Archive Callout in Primary Black Anchor */}
      <ScrollReveal direction="up" distance={20} duration={700}>
        <div className="mt-20 p-8 sm:p-10 bg-grains-black text-white rounded-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-editorial">
          <div className="space-y-1">
            <h4 className="text-xl font-serif text-white">
              Are you a Grains of Time alumnus?
            </h4>
            <p className="text-sm text-slate-300 font-sans">
              Help expand the living archive by submitting historical photos, setlists, and concert recordings.
            </p>
          </div>
          <a
            href="mailto:grainsoftimencsu@gmail.com?subject=Grains%20Archival%20Submission"
            className="px-6 py-3 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap shadow-subtle font-medium"
          >
            Submit to Archive
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
