import type { Metadata } from "next";
import { getMembers, getSiteSettings } from "@/lib/sanity/queries";
import { EnsembleGrid } from "@/components/members/EnsembleGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

  const title = settings?.rosterHeading || "Current Ensemble";

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-10">
          <SectionHeading
            title={title}
          />
        </div>
      </ScrollReveal>

      {/* Grid */}
      <EnsembleGrid members={activeMembers} />
    </div>
  );
}
