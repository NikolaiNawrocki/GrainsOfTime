"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Member, VocalPart } from "@/types";
import { urlForImage } from "@/sanity/image";
import { Modal } from "@/components/ui/Modal";
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

export function EnsembleGrid({ members }: EnsembleGridProps) {
  const [selectedPart, setSelectedPart] = useState<"All" | VocalPart>("All");
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    if (selectedPart === "All") return members;
    return members.filter((m) => m.vocalPart === selectedPart);
  }, [members, selectedPart]);

  return (
    <div>
      {/* Section Filter Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-grains-border no-scrollbar">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mr-2 whitespace-nowrap">
          Filter By Part:
        </span>
        {vocalSections.map((part) => {
          const isSelected = selectedPart === part;
          return (
            <button
              key={part}
              type="button"
              onClick={() => setSelectedPart(part)}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all whitespace-nowrap ${
                isSelected
                  ? "bg-grains-red text-white"
                  : "bg-grains-surface hover:bg-grains-surface-elevated text-zinc-400 hover:text-white border border-grains-border"
              }`}
            >
              {part}
            </button>
          );
        })}
      </div>

      {/* Editorial Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map((member) => {
          const imageUrl = member.portrait?.asset
            ? urlForImage(member.portrait)?.url()
            : null;

          return (
            <div
              key={member._id}
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
              className="group relative bg-grains-surface border border-grains-border hover:border-zinc-700/80 rounded-sm overflow-hidden text-left cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red flex flex-col"
            >
              {/* Member Visual Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={member.portrait?.alt || member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-zinc-900 to-zinc-950">
                    <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center mb-3 group-hover:border-grains-red/40 transition-colors">
                      <User className="w-8 h-8 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase border border-zinc-800/80 px-2 py-0.5 rounded-sm">
                      {member.vocalPart}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 mt-2 tracking-wider">
                      {member.isPlaceholder ? "Portrait Pending" : "Member Portrait"}
                    </span>
                  </div>
                )}

                {/* Leadership badge if applicable */}
                {member.leadershipRole && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-grains-red/40 text-grains-red-bright text-[10px] font-mono uppercase tracking-widest rounded-sm">
                      {member.leadershipRole}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between border-t border-grains-border">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    <span className="text-grains-red-bright font-medium">{member.vocalPart}</span>
                    {member.graduationYear && (
                      <span>Class of &apos;{String(member.graduationYear).slice(-2)}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-serif text-grains-paper group-hover:text-white transition-colors">
                    {member.name}
                  </h3>
                  {member.major && (
                    <p className="text-xs text-zinc-400 mt-1 font-sans">
                      {member.major}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  <span>View Member Profile</span>
                  <span className="group-hover:translate-x-1 transition-transform text-grains-red-bright">
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Details Modal */}
      <Modal
        isOpen={Boolean(activeMember)}
        onClose={() => setActiveMember(null)}
        title={activeMember?.name || "Member Profile"}
      >
        {activeMember && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-grains-border text-xs font-mono uppercase tracking-widest text-zinc-400">
              <span className="text-grains-red-bright font-semibold">
                {activeMember.vocalPart}
              </span>
              {activeMember.graduationYear && (
                <span>Class of {activeMember.graduationYear}</span>
              )}
            </div>

            {activeMember.leadershipRole && (
              <div className="p-3 bg-grains-surface-elevated border border-zinc-800 rounded-sm">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  Executive Role
                </span>
                <p className="text-sm font-serif text-grains-paper mt-0.5">
                  {activeMember.leadershipRole}
                </p>
              </div>
            )}

            <div className="space-y-3 text-sm text-zinc-300 font-sans leading-relaxed">
              <p>{activeMember.bio || "Ensemble biography pending submission."}</p>
            </div>

            {/* Quick Metadata Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-zinc-400 border-t border-zinc-800/80">
              {activeMember.major && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-grains-red" />
                  <span>{activeMember.major}</span>
                </div>
              )}
              {activeMember.hometown && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-grains-red" />
                  <span>{activeMember.hometown}</span>
                </div>
              )}
              {activeMember.favoriteSong && (
                <div className="flex items-center gap-2 col-span-full">
                  <Music className="w-3.5 h-3.5 text-grains-red" />
                  <span>Fav Chart: {activeMember.favoriteSong}</span>
                </div>
              )}
              {activeMember.funFact && (
                <div className="flex items-center gap-2 col-span-full text-zinc-400 italic">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>&ldquo;{activeMember.funFact}&rdquo;</span>
                </div>
              )}
            </div>

            {activeMember.isPlaceholder && (
              <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-sm text-[11px] font-mono text-zinc-500">
                Notice: Placeholder profile awaiting final roster verification from Grains of Time.
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
