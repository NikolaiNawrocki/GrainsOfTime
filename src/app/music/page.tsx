import type { Metadata } from "next";
import { getMusicReleases, getSiteSettings } from "@/lib/sanity/queries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Disc3, ArrowUpRight, Music2, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Discography & Recorded Sound",
  description:
    "Explore the recorded releases, studio albums, and singles of Grains of Time, NC State's premier all-male a cappella group.",
};

export const revalidate = 60;

export default async function MusicPage() {
  const [releases, settings] = await Promise.all([
    getMusicReleases(),
    getSiteSettings(),
  ]);

  const spotifyUrl = settings?.socialLinks?.spotify;

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Discography"
          title="Recorded Sound"
          subtitle="Studio albums, singles, and archival live recordings capturing the evolution of the Grains of Time sound."
        />

        {spotifyUrl ? (
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-mono text-xs uppercase tracking-widest rounded-sm transition-colors font-medium shadow-sm whitespace-nowrap self-start md:self-auto"
          >
            <span>Listen on Spotify</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        ) : (
          <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 self-start md:self-auto">
            <Music2 className="w-3.5 h-3.5 text-zinc-600" />
            <span>Official Streaming Links Pending</span>
          </div>
        )}
      </div>

      {/* Releases List */}
      <div className="space-y-16">
        {releases.map((release) => (
          <article
            key={release._id}
            className="p-8 sm:p-10 bg-grains-surface border border-grains-border rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* Artwork Column */}
            <div className="lg:col-span-4">
              <EditorialImage
                image={release.coverArt}
                alt={`${release.title} cover artwork`}
                aspectRatio="1/1"
                placeholderLabel={`Album Artwork • ${release.title}`}
                caption={`${release.releaseType} • Released ${release.releaseYear}`}
              />
            </div>

            {/* Details & Tracklist Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tracking-widest text-grains-red uppercase border border-grains-red/30 px-2 py-0.5 rounded-sm bg-grains-red/10">
                    {release.releaseType}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {release.releaseYear}
                  </span>
                </div>
                <h3 className="text-3xl font-serif text-grains-paper font-normal pt-2">
                  {release.title}
                </h3>
              </div>

              {/* Verified tracklist */}
              {release.tracklist && release.tracklist.length > 0 ? (
                <div className="pt-4 border-t border-zinc-800/80">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
                    Track Listing
                  </h4>
                  <ol className="divide-y divide-zinc-900 font-sans text-sm">
                    {release.tracklist.map((track) => (
                      <li
                        key={track.trackNumber}
                        className="py-2.5 flex items-baseline justify-between text-zinc-300"
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-xs text-zinc-500 w-4">
                            {track.trackNumber.toString().padStart(2, "0")}
                          </span>
                          <span className="font-medium text-grains-paper">
                            {track.title}
                          </span>
                          {track.originalArtist && (
                            <span className="text-xs text-zinc-500 hidden sm:inline">
                              ({track.originalArtist})
                            </span>
                          )}
                        </div>
                        {track.soloist && (
                          <span className="text-xs font-mono text-zinc-400">
                            Solo: {track.soloist}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-sm text-xs font-mono text-zinc-400 flex items-start gap-2.5">
                  <Disc3 className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-zinc-300 font-medium">Liner Notes & Tracklist Pending</p>
                    <p className="mt-0.5 text-zinc-500 font-sans">
                      {release.notes || "Official master recordings and track metadata awaiting verified entry by student directors."}
                    </p>
                  </div>
                </div>
              )}

              {/* Streaming Links */}
              <div className="pt-4 flex flex-wrap gap-4">
                {release.spotifyUrl && (
                  <a
                    href={release.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors"
                  >
                    <span>Spotify</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                )}
                {release.appleMusicUrl && (
                  <a
                    href={release.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors"
                  >
                    <span>Apple Music</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                )}
              </div>

              {release.isPlaceholder && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-600">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Placeholder record pending official discography entry</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
