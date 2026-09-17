import type { Metadata } from "next";
import { getMembers } from "@/lib/sanity/queries";
import { EnsembleGrid } from "@/components/members/EnsembleGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Current Ensemble & Members",
  description:
    "Meet the current voices of Grains of Time across Tenor 1, Tenor 2, Baritone, Bass, and Vocal Percussion.",
};

export const revalidate = 60;

export default async function MembersPage() {
  const members = await getMembers();
  const activeMembers = members.filter((m) => m.status === "active");

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-14">
        <SectionHeading
          eyebrow="The Voices"
          title="Current Ensemble"
          subtitle="Nine to fifteen undergraduate voices spanning five distinct vocal sections, performing without instrumental accompaniment."
        />
      </div>

      {/* Grid */}
      <EnsembleGrid members={activeMembers} />
    </div>
  );
}
