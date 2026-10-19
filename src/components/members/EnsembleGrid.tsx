"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Member } from "@/types";
import { urlForImage } from "@/sanity/image";
import { Modal } from "@/components/ui/Modal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { User, MapPin, BookOpen, Music, Sparkles } from "lucide-react";

interface EnsembleGridProps {
  members: Member[];
}

export type GradeLevel = "Senior" | "Junior" | "Sophomore" | "Freshman" | "Other";

export function getMemberGradeLevel(member: Member): GradeLevel {
  const grad = String(member.graduationYear || "").trim().toLowerCase();
  if (grad.includes("senior") || grad.includes("4th year") || grad.includes("fourth year")) return "Senior";
  if (grad.includes("junior") || grad.includes("3rd year") || grad.includes("third year")) return "Junior";
  if (grad.includes("sophomore") || grad.includes("2nd year") || grad.includes("second year")) return "Sophomore";
  if (grad.includes("freshman") || grad.includes("1st year") || grad.includes("first year")) return "Freshman";

  const bio = (member.bio || "").toLowerCase();
  if (bio.startsWith("senior") || bio.includes("senior ")) return "Senior";
  if (bio.startsWith("junior") || bio.includes("junior ")) return "Junior";
  if (bio.startsWith("sophomore") || bio.includes("sophomore ")) return "Sophomore";
  if (bio.startsWith("freshman") || bio.includes("freshman ")) return "Freshman";

  const yearMatch = grad.match(/\d{4}/);
  if (yearMatch) {
    const yr = parseInt(yearMatch[0], 10);
    if (yr <= 2026) return "Senior";
    if (yr === 2027) return "Junior";
    if (yr === 2028) return "Sophomore";
    if (yr >= 2029) return "Freshman";
  }

  return "Other";
}

const GRADE_RANK: Record<GradeLevel, number> = {
  Senior: 1,
  Junior: 2,
  Sophomore: 3,
  Freshman: 4,
  Other: 5,
};

const LOCAL_HEADSHOTS: Record<string, string> = {
  jonathan: "/headshots/Johnathan.jpeg",
  johnathan: "/headshots/Johnathan.jpeg",
  jon: "/headshots/Johnathan.jpeg",
  landon: "/headshots/Landon.jpeg",
  caleb: "/headshots/Caleb.jpeg",
  max: "/headshots/Max.jpeg",
  davis: "/headshots/Davis.jpeg",
  isaac: "/headshots/Isaac.jpeg",
  zaza: "/headshots/Isaac.jpeg",
  zeke: "/headshots/Zeke.jpeg",
  brock: "/headshots/Brock.jpeg",
  zackary: "/headshots/Zackary.jpeg",
  zack: "/headshots/Zackary.jpeg",
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
  const firstName = member.name.trim().split(/\s+/)[0].toLowerCase();
  return LOCAL_HEADSHOTS[firstName] || null;
}

// Explicit ordering requirement:
// Exec position, and then grade level after:
// Davis, Zeke, Max, Jude, Zaza, Henry, Aaron, Jon, Brock, Caleb, Zack, Landon, Nikolai, Noah, Sid
const ORDERED_NAMES: Record<string, number> = {
  davis: 1,
  zeke: 2,
  max: 3,
  jude: 4,
  zaza: 5,
  isaac: 5,
  henry: 6,
  aaron: 7,
  jon: 8,
  jonathan: 8,
  johnathan: 8,
  brock: 9,
  caleb: 10,
  zack: 11,
  zackary: 11,
  landon: 12,
  nikolai: 13,
  noah: 14,
  sid: 15,
};

function getMemberOrderScore(member: Member): number {
  const parts = member.name.trim().toLowerCase().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts[parts.length - 1] || "";

  if (ORDERED_NAMES[firstName] !== undefined) {
    return ORDERED_NAMES[firstName];
  }
  if (lastName === "casazza") {
    return 5;
  }

  if (member.leadershipRole) {
    return 6.5 + (member.order ?? 99) * 0.01;
  }
  const grade = getMemberGradeLevel(member);
  return 20 + (GRADE_RANK[grade] ?? 5) * 10 + (member.order ?? 99);
}

interface MemberGroup {
  id: string;
  title: string;
  description?: string;
  members: Member[];
}

export function EnsembleGrid({ members }: EnsembleGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  // Sort all members by the required order
  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      const scoreA = getMemberOrderScore(a);
      const scoreB = getMemberOrderScore(b);
      if (scoreA !== scoreB) return scoreA - scoreB;
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });
  }, [members]);

  // Organize by Exec position, then grade level after
  const groups: MemberGroup[] = useMemo(() => {
    const execMembers: Member[] = [];
    const seniorMembers: Member[] = [];
    const juniorMembers: Member[] = [];
    const sophomoreMembers: Member[] = [];
    const freshmanMembers: Member[] = [];
    const otherMembers: Member[] = [];

    sortedMembers.forEach((member) => {
      if (member.leadershipRole) {
        execMembers.push(member);
        return;
      }

      const grade = getMemberGradeLevel(member);
      if (grade === "Senior") {
        seniorMembers.push(member);
      } else if (grade === "Junior") {
        juniorMembers.push(member);
      } else if (grade === "Sophomore") {
        sophomoreMembers.push(member);
      } else if (grade === "Freshman") {
        freshmanMembers.push(member);
      } else {
        otherMembers.push(member);
      }
    });

    const result: MemberGroup[] = [];

    if (execMembers.length > 0) {
      result.push({
        id: "exec",
        title: "Executive Board",
        description: "Student Leadership",
        members: execMembers,
      });
    }
    if (seniorMembers.length > 0) {
      result.push({
        id: "seniors",
        title: "Seniors",
        description: "Class of 2026",
        members: seniorMembers,
      });
    }
    if (juniorMembers.length > 0) {
      result.push({
        id: "juniors",
        title: "Juniors",
        description: "Class of 2027",
        members: juniorMembers,
      });
    }
    if (sophomoreMembers.length > 0) {
      result.push({
        id: "sophomores",
        title: "Sophomores",
        description: "Class of 2028",
        members: sophomoreMembers,
      });
    }
    if (freshmanMembers.length > 0) {
      result.push({
        id: "freshmen",
        title: "Freshmen",
        description: "Class of 2029",
        members: freshmanMembers,
      });
    }
    if (otherMembers.length > 0) {
      result.push({
        id: "other",
        title: "Ensemble",
        members: otherMembers,
      });
    }

    return result;
  }, [sortedMembers]);

  // Build filter tabs dynamically from available groups
  const filterOptions = useMemo(() => {
    return [
      { id: "All", label: "All" },
      ...groups.map((g) => ({ id: g.id, label: g.title })),
    ];
  }, [groups]);

  // Determine groups to render based on active filter
  const displayedGroups = useMemo(() => {
    if (selectedFilter === "All") {
      return groups;
    }
    return groups.filter((g) => g.id === selectedFilter);
  }, [groups, selectedFilter]);

  return (
    <div>
      {/* Category / Grade Level Filter Controls */}
      <ScrollReveal direction="up" distance={12} duration={500}>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-grains-border no-scrollbar">
          <span className="text-xs font-mono text-grains-muted uppercase tracking-widest mr-2 whitespace-nowrap">
            Filter:
          </span>
          {filterOptions.map((option) => {
            const isSelected = selectedFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedFilter(option.id)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-grains-red text-white shadow-subtle font-medium"
                    : "bg-white hover:bg-grains-cream text-grains-black border border-grains-border"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Sections Organized by Exec Position then Grade Level */}
      <div className="space-y-12">
        {displayedGroups.map((group, groupIdx) => (
          <section key={group.id} className="relative">
            {/* Section Header */}
            <ScrollReveal direction="up" distance={12} duration={500} delay={groupIdx * 50}>
              <div className="flex items-baseline justify-between border-b border-grains-border pb-2.5 mb-5">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg sm:text-xl font-serif text-grains-black tracking-tight">
                    {group.title}
                  </h2>
                  <span className="text-xs font-mono text-grains-muted uppercase tracking-wider">
                    ({group.members.length})
                  </span>
                </div>
                {group.description && (
                  <span className="hidden sm:inline-block text-xs font-mono text-grains-muted uppercase tracking-wider">
                    {group.description}
                  </span>
                )}
              </div>
            </ScrollReveal>

            {/* Grid of Compact Member Cards (6 cols on xl, 5 on lg, 4 on md, 3 on sm, 2 on mobile) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3.5 md:gap-4">
              {group.members.map((member, idx) => {
                const imageUrl = getMemberImageUrl(member);
                const gradeLevel = getMemberGradeLevel(member);

                return (
                  <ScrollReveal
                    key={member._id}
                    direction="up"
                    distance={16}
                    duration={500}
                    delay={(idx % 6) * 45}
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
                      aria-label={`View profile for ${member.name}`}
                      className="group relative bg-white border border-grains-border hover:border-grains-black/40 rounded-sm overflow-hidden text-center cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red flex flex-col h-full shadow-subtle hover:shadow-editorial"
                    >
                      {/* Photo Container with Centered Bottom Badge */}
                      <div className="relative aspect-[4/5] w-full bg-grains-cream">
                        <div className="absolute inset-0 overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={member.portrait?.alt || member.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-grains-cream to-grains-cream-dark">
                              <div className="w-10 h-10 rounded-full border border-grains-border bg-white flex items-center justify-center mb-1.5 group-hover:border-grains-red/40 transition-colors">
                                <User className="w-5 h-5 text-grains-muted group-hover:text-grains-black transition-colors" />
                              </div>
                              <span className="text-[8px] font-mono tracking-widest text-grains-black uppercase border border-grains-border bg-white/80 px-1.5 py-0.5 rounded-sm">
                                {member.vocalPart}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Centered Overlapping Leadership Badge */}
                        {member.leadershipRole && (
                          <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-10 w-[92%] px-1 flex justify-center">
                            <span className="inline-block px-2 sm:px-2.5 py-0.5 bg-white border border-grains-red/35 text-grains-red text-[8.5px] sm:text-[9.5px] font-sans uppercase font-medium tracking-wider shadow-xs rounded-none truncate max-w-full">
                              {member.leadershipRole}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Body: Name, Grade, Hometown, Vocal Part, Profile */}
                      <div className="pt-4 sm:pt-4.5 pb-3 px-2.5 sm:px-3 flex-1 flex flex-col justify-between text-center">
                        <div>
                          {/* Member Name */}
                          <h3 className="text-sm sm:text-base font-sans font-normal sm:font-medium text-grains-black group-hover:text-grains-red transition-colors leading-snug line-clamp-1">
                            {member.name}
                          </h3>

                          {/* Member Meta: Grade (red), Hometown (gray), Vocal Part (gray) */}
                          <div className="mt-1.5 space-y-0.5">
                            <p className="text-[10px] sm:text-[11px] font-sans font-semibold text-grains-red uppercase tracking-wider">
                              {gradeLevel.toUpperCase()}
                            </p>
                            <p className="text-[9px] sm:text-[10px] font-sans text-grains-muted uppercase tracking-wider line-clamp-1">
                              {member.hometown || member.major || <span className="opacity-0">&nbsp;</span>}
                            </p>
                            <p className="text-[9px] sm:text-[10px] font-sans text-grains-muted uppercase tracking-wider line-clamp-1">
                              {member.vocalPart.toUpperCase()}
                            </p>
                          </div>
                        </div>

                        {/* Divider & Profile Link */}
                        <div className="mt-3 pt-2.5 border-t border-grains-border/75">
                          <span className="text-[9.5px] sm:text-[10.5px] font-sans text-grains-muted group-hover:text-grains-red transition-colors uppercase tracking-widest font-normal">
                            Profile
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {displayedGroups.length === 0 && (
        <div className="py-12 text-center text-grains-muted font-mono text-sm">
          No members found in this category.
        </div>
      )}

      {/* Member Details Modal */}
      <Modal
        isOpen={Boolean(activeMember)}
        onClose={() => setActiveMember(null)}
        title={activeMember?.name || "Member Profile"}
        className="max-w-2xl"
      >
        {activeMember && (() => {
          const modalImageUrl = getMemberImageUrl(activeMember);
          const modalGradeLevel = getMemberGradeLevel(activeMember);
          return (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {modalImageUrl ? (
                <div className="sm:col-span-5">
                  <div className="relative aspect-[4/5] sm:aspect-[2/3] w-full max-w-[240px] sm:max-w-none mx-auto rounded-sm overflow-hidden border border-grains-border bg-grains-cream shadow-subtle">
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
                  <div className="relative aspect-[4/5] sm:aspect-[2/3] w-full max-w-[240px] sm:max-w-none mx-auto rounded-sm overflow-hidden border border-grains-border bg-grains-cream flex flex-col items-center justify-center p-6 text-center">
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
                  <span>
                    {modalGradeLevel.toUpperCase()}
                    {activeMember.graduationYear && /^\d{4}$/.test(String(activeMember.graduationYear))
                      ? ` • '${String(activeMember.graduationYear).slice(-2)}`
                      : ""}
                  </span>
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
