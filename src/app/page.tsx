import {
  getSiteSettings,
  getHomePage,
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
  const [settings, homeContent, upcomingEvents, galleryItems] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getUpcomingEvents(),
    getGalleryItems(),
  ]);

  const showEvents = homeContent?.showFeaturedEvent !== false;
  const galleryCount = homeContent?.galleryCount || 6;
  const filteredGallery = galleryItems.slice(0, galleryCount);

  return (
    <div className="flex flex-col w-full">
      <HeroSection settings={settings} content={homeContent} />
      <EditorialStatement content={homeContent} />
      {showEvents && <FeaturedEventCard events={upcomingEvents} />}
      <ArchivalFeature />
      <InstagramShowcase galleryItems={filteredGallery} />
    </div>
  );
}
