import {
  getSiteSettings,
  getUpcomingEvents,
  getGalleryItems,
} from "@/lib/sanity/queries";
import { HeroSection } from "@/components/home/HeroSection";
import { EditorialStatement } from "@/components/home/EditorialStatement";
import { FeaturedEventCard } from "@/components/home/FeaturedEventCard";
import { ArchivalFeature } from "@/components/home/ArchivalFeature";
import { InstagramShowcase } from "@/components/home/InstagramShowcase";

export const revalidate = 60; // ISR cache for 60 seconds

export default async function HomePage() {
  const [settings, upcomingEvents, galleryItems] = await Promise.all([
    getSiteSettings(),
    getUpcomingEvents(),
    getGalleryItems(),
  ]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection settings={settings} />
      <EditorialStatement />
      <FeaturedEventCard events={upcomingEvents} />
      <ArchivalFeature />
      <InstagramShowcase galleryItems={galleryItems} />
    </div>
  );
}
