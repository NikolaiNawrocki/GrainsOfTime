import Link from "next/link";
import { Calendar, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import { EventItem } from "@/types";
import { formatDate, formatEventTime } from "@/lib/utils/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VisualAcousticPulse } from "@/components/ui/VisualAcousticPulse";

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
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={16} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionHeading
              eyebrow="On Stage"
              title="Next Live Performance"
              subtitle="Catch Grains of Time live on campus and across North Carolina."
              theme="dark"
            />
            <Link
              href="/events"
              className="inline-flex items-center text-xs font-mono tracking-widest text-grains-red-bright hover:text-white uppercase transition-all duration-200 group"
            >
              <span>Full Schedule & Archive</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured Card in Deep Black Anchor with ScrollReveal */}
        <ScrollReveal direction="up" distance={24} duration={800} delay={150}>
          <div className="relative bg-grains-black-deep border border-white/10 hover:border-grains-red/40 rounded-sm p-6 sm:p-10 lg:p-12 overflow-hidden group shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Date Block */}
              <div className="lg:col-span-3 pb-6 lg:pb-0 lg:border-r border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <VisualAcousticPulse size="sm" color="bg-grains-red-bright" />
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                      Performance Date
                    </span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-serif text-white font-normal">
                    {formatDate(featuredEvent.startDate)}
                  </p>
                  <p className="text-xs font-mono text-slate-300">
                    {formatEventTime(featuredEvent.startDate, featuredEvent.endDate)}
                  </p>
                </div>
                <div className="mt-4">
                  <StatusBadge status={featuredEvent.status} variant="dark" />
                </div>
              </div>

              {/* Event Details */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-grains-red-bright uppercase block font-semibold">
                  {featuredEvent.eventType === "concert" ? "Major Campus Showcase" : featuredEvent.eventType}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-slate-100 transition-colors">
                  {featuredEvent.title}
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {featuredEvent.summary}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-grains-red-bright shrink-0" />
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
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 shadow-subtle hover:shadow-accent hover:-translate-y-0.5"
                  >
                    <span>Reserve Tickets</span>
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono tracking-widest uppercase rounded-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Event Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
