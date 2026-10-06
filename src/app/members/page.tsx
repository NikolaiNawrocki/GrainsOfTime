import type { Metadata } from "next";
import { getMembers, getSiteSettings } from "@/lib/sanity/queries";
import { EnsembleGrid } from "@/components/members/EnsembleGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Current Ensemble & Members",
  description:
    "Meet the current voices of Grains of Time across Tenor 1, Tenor 2, Baritone, Bass, and Vocal Percussion.",
};

export const revalidate = 60;

export default async function MembersPage() {
  const [members, settings] = await Promise.all([
    getMembers(),
    getSiteSettings(),
  ]);

  const activeMembers = members.filter((m) => m.status === "active");

  const eyebrow = settings?.rosterEyebrow || "The Voices";
  const title = settings?.rosterHeading || "Current Ensemble";
  const subtitle =
    settings?.rosterSubtitle ||
    "Nine to fifteen undergraduate voices spanning five distinct vocal sections, performing without instrumental accompaniment.";

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-10">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />
        </div>
      </ScrollReveal>

      {/* Active Ensemble Feature Banner */}
      <ScrollReveal direction="up" distance={20} duration={700} delay={100}>
        <div className="mb-14">
          <EditorialImage
            image={settings?.rosterHeroImage}
            src={settings?.rosterHeroImage?.imageUrl || "/GrainsPhotos/MediaDay2026/IMG_4839.jpg"}
            aspectRatio="16/9"
            imageClassName="object-[center_78%]"
            alt={settings?.rosterHeroImage?.alt || "Grains of Time 2025–2026 active ensemble at the NC State Memorial Belltower"}
            credit={settings?.rosterHeroImage?.credit || "Grains of Time Media Day 2026"}
            containerClassName="shadow-editorial"
            priority
          />
        </div>
      </ScrollReveal>

      {/* Grid */}
      <EnsembleGrid members={activeMembers} />
    </div>
  );
}
