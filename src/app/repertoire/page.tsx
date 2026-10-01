import type { Metadata } from "next";
import { getRepertoire, getSiteSettings } from "@/lib/sanity/queries";
import { RepertoireList } from "@/components/repertoire/RepertoireList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Repertoire & Musical Arrangements",
  description:
    "Explore current concert arrangements and historical charts performed by Grains of Time at NC State.",
};

export const revalidate = 60;

export default async function RepertoirePage() {
  const [repertoire, settings] = await Promise.all([
    getRepertoire(),
    getSiteSettings(),
  ]);

  const spotifyUrl =
    settings?.socialLinks?.spotify ||
    "https://open.spotify.com/artist/4oHl4fefbY77maGXUyGZeW?si=mVbG3OowSiGR2XN1FCG6jg";

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-grains-border">
          <SectionHeading
            eyebrow="Musical Catalogue"
            title="Arrangements & Setlists"
            subtitle="A living catalogue of contemporary songs, rock anthems, and NC State traditions arranged exclusively for the human voice."
          />

          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-end shrink-0 inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#121212] hover:bg-black text-white text-xs font-mono tracking-wider uppercase rounded-sm transition-all shadow-subtle hover:shadow group border border-zinc-800"
          >
            <svg className="w-4 h-4 fill-[#1DB954]" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.217.355-.678.468-1.033.251-2.83-1.728-6.393-2.119-10.589-1.161-.406.094-.813-.159-.906-.565-.094-.407.159-.814.566-.907 4.593-1.05 8.544-.606 11.71 1.332.355.217.469.676.252 1.05zm1.47-3.268c-.274.444-.858.587-1.302.314-3.238-1.99-8.176-2.566-12.006-1.403-.5.152-1.033-.13-1.185-.63-.153-.502.13-1.034.63-1.186 4.382-1.33 9.825-.688 13.549 1.603.444.273.587.857.314 1.302zm.126-3.41c-3.883-2.305-10.292-2.518-14.004-1.391-.595.18-1.226-.157-1.406-.753-.18-.595.157-1.226.753-1.406 4.275-1.298 11.348-1.05 15.823 1.606.536.318.71 1.01.392 1.545-.318.536-1.01.71-1.545.392z" />
            </svg>
            <span className="font-medium">Listen on Spotify</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </ScrollReveal>

      <RepertoireList items={repertoire} />
    </div>
  );
}
