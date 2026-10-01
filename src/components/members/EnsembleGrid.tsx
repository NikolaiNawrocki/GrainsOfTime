"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Member, VocalPart } from "@/types";
import { urlForImage } from "@/sanity/image";
import { Modal } from "@/components/ui/Modal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { User, MapPin, GraduationCap, BookOpen, Music, Sparkles } from "lucide-react";

interface EnsembleGridProps {
  members: Member[];
}

const vocalSections: ("All" | VocalPart)[] = [
  "All",
  "Tenor 1",
  "Tenor 2",
  "Baritone",
  "Bass",
  "Vocal Percussion",
];

const LOCAL_HEADSHOTS: Record<string, string> = {
  jonathan: "/headshots/Johnathan.jpeg",
  johnathan: "/headshots/Johnathan.jpeg",
  landon: "/headshots/Landon.jpeg",
  caleb: "/headshots/Caleb.jpeg",
  max: "/headshots/Max.jpeg",
  davis: "/headshots/Davis.jpeg",
  isaac: "/headshots/Isaac.jpeg",
  zeke: "/headshots/Zeke.jpeg",
  brock: "/headshots/Brock.jpeg",
  zackary: "/headshots/Zackary.jpeg",
  sid: "/headshots/Sid.jpeg",
  nikolai: "/headshots/Nikolai.jpeg",
  noah: "/headshots/Noah.jpeg",
  jude: "/headshots/Jude.jpeg",
  henry: "/headshots/Henry.jpeg",
};

export function getMemberImageUrl(member: Member): string | null {
  if (member.imageUrl) return member.imageUrl;
  if (member.portrait?.asset) {
    const url = urlForImage(member.portrait)?.url();
    if (url) return url;
  }
  const firstName = member.name.trim().split(" ")[0].toLowerCase();
  return LOCAL_HEADSHOTS[firstName] || null;
}

export function EnsembleGrid({ members }: EnsembleGridProps) {
  const [selectedPart, setSelectedPart] = useState<"All" | VocalPart>("All");
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    if (selectedPart === "All") return members;
    if (selectedPart === "Vocal Percussion") {
      return members.filter(
        (m) =>
          m.vocalPart.includes("Vocal Percussion") ||
          m.vocalPart.includes("VP")
      );
    }
    return members.filter((m) => m.vocalPart.includes(selectedPart));
  }, [members, selectedPart]);

  return (
    <div>
      {/* Section Filter Controls */}
      <ScrollReveal direction="up" distance={12} duration={500}>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-grains-border no-scrollbar">
          <span className="text-xs font-mono text-grains-muted uppercase tracking-widest mr-2 whitespace-nowrap">
            Filter By Part:
          </span>
          {vocalSections.map((part) => {
            const isSelected = selectedPart === part;
            return (
              <button
                key={part}
                type="button"
                onClick={() => setSelectedPart(part)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-grains-red text-white shadow-subtle font-medium"
                    : "bg-white hover:bg-grains-cream text-grains-black border border-grains-border"
                }`}
              >
                {part}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Editorial Roster Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
        {filteredMembers.map((member, idx) => {
          const imageUrl = getMemberImageUrl(member);

          return (
            <ScrollReveal
              key={member._id}
              direction="up"
              distance={20}
              duration={600}
              delay={(idx % 5) * 60}
              className="h-full"
            >
              <div
                onClick={() => setActiveMember(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveMember(member);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${member.name}`}
                className="group relative bg-white border border-grains-border hover:border-grains-black/40 rounded-sm overflow-hidden text-left cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red flex flex-col h-full shadow-subtle hover:shadow-editorial"
              >
                {/* Member Visual Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-grains-cream">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={member.portrait?.alt || member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-grains-cream to-grains-cream-dark">
                      <div className="w-12 h-12 rounded-full border border-grains-border bg-white flex items-center justify-center mb-2 group-hover:border-grains-red/40 transition-colors">
                        <User className="w-6 h-6 text-grains-muted group-hover:text-grains-black transition-colors" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-grains-black uppercase border border-grains-border bg-white/80 px-2 py-0.5 rounded-sm">
                        {member.vocalPart}
                      </span>
                      <span className="text-[9px] font-mono text-grains-muted mt-1.5 tracking-wider">
                        {member.isPlaceholder ? "Info Pending" : "Portrait Pending"}
                      </span>
                    </div>
                  )}

                  {/* Leadership badge if applicable */}
                  {member.leadershipRole && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2 py-0.5 bg-white/95 backdrop-blur-sm border border-grains-red/30 text-grains-red text-[9px] font-mono uppercase tracking-wider rounded-sm font-medium shadow-subtle">
                        {member.leadershipRole}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Meta Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between border-t border-grains-border">
                  <div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-grains-muted uppercase tracking-wider mb-1">
                      <span className="text-grains-red font-semibold truncate mr-1">{member.vocalPart}</span>
                      {member.graduationYear && (
                        <span className="shrink-0">
                          {/^\d{4}$/.test(String(member.graduationYear))
                            ? `'${String(member.graduationYear).slice(-2)}`
                            : member.graduationYear}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-serif text-grains-black group-hover:text-grains-red transition-colors leading-tight line-clamp-1">
                      {member.name}
                    </h3>
                    {member.major && (
                      <p className="text-[11px] sm:text-xs text-grains-muted mt-1 font-sans line-clamp-1">
                        {member.major}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-grains-border flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-grains-muted uppercase tracking-wider">
                    <span>Profile</span>
                    <span className="group-hover:translate-x-1 transition-transform text-grains-red font-semibold">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Member Details Modal */}
      <Modal
        isOpen={Boolean(activeMember)}
        onClose={() => setActiveMember(null)}
        title={activeMember?.name || "Member Profile"}
        className="max-w-2xl"
      >
        {activeMember && (() => {
          const modalImageUrl = getMemberImageUrl(activeMember);
          return (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {modalImageUrl ? (
                <div className="sm:col-span-5">
                  <div className="relative aspect-[2/3] w-full max-w-[240px] sm:max-w-none mx-auto rounded-sm overflow-hidden border border-grains-border bg-grains-cream shadow-subtle">
                    <Image
                      src={modalImageUrl}
                      alt={activeMember.portrait?.alt || activeMember.name}
                      fill
                      sizes="(max-width: 640px) 240px, 320px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              ) : (
                <div className="sm:col-span-5">
                  <div className="relative aspect-[2/3] w-full max-w-[240px] sm:max-w-none mx-auto rounded-sm overflow-hidden border border-grains-border bg-grains-cream flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full border border-grains-border bg-white flex items-center justify-center mb-3">
                      <User className="w-8 h-8 text-grains-muted" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-grains-black uppercase border border-grains-border bg-white/80 px-2 py-0.5 rounded-sm">
                      {activeMember.vocalPart}
                    </span>
                    <span className="text-[10px] font-mono text-grains-muted mt-2 tracking-wider">
                      Portrait Pending
                    </span>
                  </div>
                </div>
              )}

              <div className="sm:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-grains-border text-xs font-mono uppercase tracking-widest text-grains-muted">
                  <span className="text-grains-red font-semibold">
                    {activeMember.vocalPart}
                  </span>
                  {activeMember.graduationYear && (
                    <span>
                      {/^\d{4}$/.test(String(activeMember.graduationYear))
                        ? `Class of ${activeMember.graduationYear}`
                        : activeMember.graduationYear}
                    </span>
                  )}
                </div>

                {activeMember.leadershipRole && (
                  <div className="p-3 bg-grains-cream border border-grains-border rounded-sm">
                    <span className="text-[10px] font-mono text-grains-muted uppercase tracking-widest block font-medium">
                      Executive Role
                    </span>
                    <p className="text-sm font-serif text-grains-black mt-0.5">
                      {activeMember.leadershipRole}
                    </p>
                  </div>
                )}

                <div className="space-y-3 text-sm text-grains-text/80 font-sans leading-relaxed">
                  <p>{activeMember.bio || "Ensemble biography pending submission."}</p>
                </div>

                {/* Quick Metadata Checklist */}
                <div className="grid grid-cols-1 gap-2.5 pt-3 text-xs font-mono text-grains-muted border-t border-grains-border">
                  {activeMember.major && (
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-grains-red mt-0.5 shrink-0" />
                      <span className="text-grains-text/80">{activeMember.major}</span>
                    </div>
                  )}
                  {activeMember.hometown && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-grains-red mt-0.5 shrink-0" />
                      <span className="text-grains-text/80">{activeMember.hometown}</span>
                    </div>
                  )}
                  {activeMember.favoriteSong && (
                    <div className="flex items-start gap-2">
                      <Music className="w-3.5 h-3.5 text-grains-red mt-0.5 shrink-0" />
                      <span className="text-grains-text/80">Fav Chart: {activeMember.favoriteSong}</span>
                    </div>
                  )}
                  {activeMember.funFact && (
                    <div className="flex items-start gap-2 text-grains-text/90 italic">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span>&ldquo;{activeMember.funFact}&rdquo;</span>
                    </div>
                  )}
                </div>

                {activeMember.isPlaceholder && (
                  <div className="p-2.5 bg-grains-cream border border-grains-border rounded-sm text-[11px] font-mono text-grains-muted">
                    Notice: Placeholder profile awaiting final roster verification from Grains of Time.
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
