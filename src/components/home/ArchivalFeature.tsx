import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ArchivalFeature() {
  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual column: Archival frame */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <EditorialImage
              aspectRatio="4/5"
              alt="Archival photograph of early Grains of Time ensemble"
              placeholderLabel="Historical Photograph • NC State Campus"
              caption="Early ensemble brotherhood following a campus performance in Raleigh."
              credit="NC State Archives / Grains of Time Legacy"
            />
          </div>

          {/* Narrative column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <SectionHeading
              eyebrow="The Archive"
              title="1968: Where the Harmony Began"
              subtitle="More than half a century ago, a handful of NC State students gathered to sing without instruments. Today, that foundation remains unbroken."
            />

            <div className="space-y-4 text-sm text-zinc-400 font-sans leading-relaxed">
              <p>
                From barbershop and collegiate choral classics in the late 1960s to contemporary pop, rock, and student-arranged soul charts today, Grains of Time reflects the spirit of North Carolina State University.
              </p>
              <p>
                Every decade has contributed unique voices, legendary arrangements, and enduring friendships that span generations of alumni.
              </p>
            </div>

            {/* Archive stats bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80">
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-grains-paper block">
                  1968
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  Founded
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-grains-paper block">
                  5+
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  Decades
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-grains-paper block">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  A Cappella
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/history"
                className="inline-flex items-center text-xs font-mono tracking-widest text-grains-red-bright hover:text-white uppercase transition-colors group"
              >
                <History className="w-4 h-4 mr-2 text-grains-red" />
                <span>Explore the Living Timeline</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
