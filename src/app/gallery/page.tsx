import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/sanity/queries";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Photo Archive & Visual Dispatch",
  description:
    "Explore the visual archive of Grains of Time: live concerts at Stewart Theatre, rehearsals, backstage moments, and historical tours.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-14">
          <SectionHeading
            eyebrow="Visual Living Archive"
            title="Moments & Memories"
            subtitle="A curated photographic chronicle of live performances, rehearsal craft, and collegiate brotherhood."
          />
        </div>
      </ScrollReveal>

      <GalleryGrid items={items} />
    </div>
  );
}
