import {
  getSiteSettings,
  getHomePage,
  getUpcomingEvents,
} from "@/lib/sanity/queries";
import { HeroSection } from "@/components/home/HeroSection";
import { EditorialStatement } from "@/components/home/EditorialStatement";
import { FeaturedEventCard } from "@/components/home/FeaturedEventCard";
import { ArchivalFeature } from "@/components/home/ArchivalFeature";

export const revalidate = 60; // ISR cache for 60 seconds

export default async function HomePage() {
  const [settings, homeContent, upcomingEvents] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getUpcomingEvents(),
  ]);

  const showEvents = homeContent?.showFeaturedEvent !== false;

  return (
    <div className="flex flex-col w-full">
      <HeroSection settings={settings} content={homeContent} />
      <EditorialStatement content={homeContent} />
      {showEvents && <FeaturedEventCard events={upcomingEvents} />}
      <ArchivalFeature content={homeContent} />
    </div>
  );
}
