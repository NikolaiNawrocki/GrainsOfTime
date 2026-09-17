import Link from "next/link";
import { Calendar, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import { EventItem } from "@/types";
import { formatDate, formatEventTime } from "@/lib/utils/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface FeaturedEventCardProps {
  events: EventItem[];
}

export function FeaturedEventCard({ events }: FeaturedEventCardProps) {
  // Find featured or first upcoming event
  const featuredEvent = events.find((e) => e.featured) || events[0];

  if (!featuredEvent) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeading
            eyebrow="On Stage"
            title="Next Live Performance"
            subtitle="Catch Grains of Time live on campus and across North Carolina."
          />
          <Link
            href="/events"
            className="inline-flex items-center text-xs font-mono tracking-widest text-grains-red-bright hover:text-white uppercase transition-colors"
          >
            <span>Full Schedule & Archive</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Featured Card */}
        <div className="relative bg-grains-surface border border-grains-border rounded-sm p-6 sm:p-10 lg:p-12 overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Date Block */}
            <div className="lg:col-span-3 pb-6 lg:pb-0 lg:border-r border-zinc-800/80">
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                  Performance Date
                </span>
                <p className="text-3xl sm:text-4xl font-serif text-grains-paper font-normal">
                  {formatDate(featuredEvent.startDate)}
                </p>
                <p className="text-xs font-mono text-zinc-400">
                  {formatEventTime(featuredEvent.startDate, featuredEvent.endDate)}
                </p>
              </div>
              <div className="mt-4">
                <StatusBadge status={featuredEvent.status} />
              </div>
            </div>

            {/* Event Details */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-grains-red uppercase block">
                {featuredEvent.eventType === "concert" ? "Major Campus Showcase" : featuredEvent.eventType}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-grains-paper group-hover:text-white transition-colors">
                {featuredEvent.title}
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                {featuredEvent.summary}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-grains-red" />
                <span>{featuredEvent.venue}</span>
                {featuredEvent.city && <span>• {featuredEvent.city}</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              {featuredEvent.ticketUrl ? (
                <a
                  href={featuredEvent.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors shadow-sm"
                >
                  <span>Reserve Tickets</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              ) : (
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono tracking-widest uppercase rounded-sm transition-colors"
                >
                  <span>Event Details</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
