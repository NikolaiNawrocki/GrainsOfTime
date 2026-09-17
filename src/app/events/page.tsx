import type { Metadata } from "next";
import { getUpcomingEvents, getArchivedEvents } from "@/lib/sanity/queries";
import { EventsView } from "@/components/events/EventsView";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Concerts & Performance Schedule",
  description:
    "Official schedule of upcoming concerts, NC State campus performances, and archived concert programs for Grains of Time.",
};

export const revalidate = 60;

export default async function EventsPage() {
  const [upcomingEvents, archivedEvents] = await Promise.all([
    getUpcomingEvents(),
    getArchivedEvents(),
  ]);

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14">
        <SectionHeading
          eyebrow="Concert Calendar"
          title="Performances & Tickets"
          subtitle="Join us live on campus in Raleigh and at collegiate a cappella showcases across the East Coast."
        />
      </div>

      <EventsView
        upcomingEvents={upcomingEvents}
        archivedEvents={archivedEvents}
      />
    </div>
  );
}
