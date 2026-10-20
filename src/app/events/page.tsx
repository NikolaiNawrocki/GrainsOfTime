import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/sanity/queries";
import { EventsView } from "@/components/events/EventsView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Official schedule of upcoming concerts and NC State campus performances for Grains of Time.",
};

export const revalidate = 60;

export default async function EventsPage() {
  const upcomingEvents = await getUpcomingEvents();

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="up" distance={16} duration={600}>
        <div className="mb-14">
          <SectionHeading
            title="Upcoming Events"
          />
        </div>
      </ScrollReveal>

      <EventsView
        upcomingEvents={upcomingEvents}
      />
    </div>
  );
}
