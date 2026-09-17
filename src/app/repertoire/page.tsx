import type { Metadata } from "next";
import { getRepertoire } from "@/lib/sanity/queries";
import { RepertoireList } from "@/components/repertoire/RepertoireList";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Repertoire & Musical Arrangements",
  description:
    "Explore current concert arrangements and historical charts performed by Grains of Time at NC State.",
};

export const revalidate = 60;

export default async function RepertoirePage() {
  const repertoire = await getRepertoire();

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <SectionHeading
          eyebrow="Musical Catalogue"
          title="Arrangements & Setlists"
          subtitle="A living catalogue of contemporary songs, rock anthems, and NC State traditions arranged exclusively for the human voice."
        />
      </div>

      <RepertoireList items={repertoire} />
    </div>
  );
}
