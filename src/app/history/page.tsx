import type { Metadata } from "next";
import { getTimelineEntries } from "@/lib/sanity/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { History, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Living Archive & History (1968–Present)",
  description:
    "Explore the documented history of Grains of Time from its founding at NC State in 1968 through the modern era.",
};

export const revalidate = 60;

export default async function HistoryPage() {
  const timeline = await getTimelineEntries();

  return (
    <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16">
        <SectionHeading
          eyebrow="Chronicle • 1968 to Present"
          title="The Living Archive"
          subtitle="A chronological record of sound, milestones, and brotherhood at North Carolina State University."
        />
      </div>

      {/* Archival Policy Notice */}
      <div className="p-4 mb-16 bg-zinc-950 border border-zinc-800 rounded-sm flex items-start gap-3 text-xs font-mono text-zinc-400">
        <History className="w-4 h-4 text-grains-red mt-0.5 shrink-0" />
        <div>
          <span className="text-grains-paper font-medium uppercase tracking-wider block">
            Archival Standard & Integrity
          </span>
          <p className="mt-1 font-sans text-zinc-400 leading-normal">
            This timeline documents verified organizational milestones. Dates, narratives, and archival imagery are curated directly from NC State university archives and Grains of Time alumni records.
          </p>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l border-grains-border pl-6 sm:pl-10 space-y-16 ml-3 sm:ml-6">
        {timeline.map((entry) => (
          <article
            key={entry._id}
            className="relative group space-y-6"
            aria-label={`${entry.year}: ${entry.headline}`}
          >
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-grains-black border-2 border-grains-red group-hover:bg-grains-red transition-colors" />

            {/* Date & Era Header */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif text-grains-paper font-normal">
                  {entry.year}
                </span>
                <span className="text-xs font-mono tracking-widest text-grains-red uppercase border border-grains-red/30 px-2 py-0.5 rounded-sm bg-grains-red/10">
                  {entry.era}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-zinc-200 group-hover:text-white transition-colors pt-2">
                {entry.headline}
              </h3>
            </div>

            {/* Narrative text */}
            <div className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-3xl">
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
                />
              </div>
            )}

            {/* Placeholder Indicator if pending verification */}
            {entry.isPlaceholder && (
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 pt-2">
                <ShieldAlert className="w-3.5 h-3.5 text-zinc-600" />
                <span>Archival record pending alumni submission</span>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Alumni Archive Callout */}
      <div className="mt-20 p-8 bg-grains-surface border border-grains-border rounded-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-lg font-serif text-grains-paper">
            Are you a Grains of Time alumnus?
          </h4>
          <p className="text-sm text-zinc-400 font-sans">
            Help expand the living archive by submitting historical photos, setlists, and concert recordings.
          </p>
        </div>
        <a
          href="mailto:grainsoftimencsu@gmail.com?subject=Grains%20Archival%20Submission"
          className="px-5 py-2.5 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors whitespace-nowrap"
        >
          Submit to Archive
        </a>
      </div>
    </div>
  );
}
