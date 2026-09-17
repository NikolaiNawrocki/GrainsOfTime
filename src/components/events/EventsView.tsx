"use client";

import { useState } from "react";
import { EventItem } from "@/types";
import { formatDate, formatEventTime } from "@/lib/utils/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MapPin, Calendar, ArrowUpRight, Info } from "lucide-react";

interface EventsViewProps {
  upcomingEvents: EventItem[];
  archivedEvents: EventItem[];
}

export function EventsView({
  upcomingEvents,
  archivedEvents,
}: EventsViewProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const eventsToShow = activeTab === "upcoming" ? upcomingEvents : archivedEvents;

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex items-center gap-4 mb-12 border-b border-grains-border pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`text-sm font-mono tracking-widest uppercase pb-2 transition-all border-b-2 -mb-[18px] ${
            activeTab === "upcoming"
              ? "border-grains-red text-white font-medium"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Upcoming Concerts ({upcomingEvents.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`text-sm font-mono tracking-widest uppercase pb-2 transition-all border-b-2 -mb-[18px] ${
            activeTab === "past"
              ? "border-grains-red text-white font-medium"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Past Performances Archive ({archivedEvents.length})
        </button>
      </div>

      {/* Events List */}
      {eventsToShow.length === 0 ? (
        <div className="p-12 text-center bg-grains-surface border border-grains-border rounded-sm space-y-3">
          <Calendar className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-serif text-grains-paper">
            {activeTab === "upcoming"
              ? "No Upcoming Shows Currently Announced"
              : "No Archived Shows Recorded Yet"}
          </h3>
          <p className="text-sm text-zinc-400 font-sans max-w-md mx-auto">
            {activeTab === "upcoming"
              ? "Rehearsals are underway for the current semester. Concert dates and ticket releases are published here once finalized."
              : "Past performance programs will appear here as concerts conclude."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {eventsToShow.map((event) => (
            <article
              key={event._id}
              className="p-6 sm:p-8 bg-grains-surface border border-grains-border hover:border-zinc-700/80 rounded-sm transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Date & Status */}
              <div className="lg:w-1/4 space-y-2 lg:border-r border-zinc-800/80 lg:pr-6">
                <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block">
                  {event.eventType.toUpperCase()}
                </span>
                <p className="text-2xl sm:text-3xl font-serif text-grains-paper">
                  {formatDate(event.startDate)}
                </p>
                <p className="text-xs font-mono text-zinc-400">
                  {formatEventTime(event.startDate, event.endDate)}
                </p>
                <div className="pt-2">
                  <StatusBadge status={event.status} />
                </div>
              </div>

              {/* Title & Venue */}
              <div className="lg:w-2/4 space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif text-grains-paper">
                  {event.title}
                </h3>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  {event.summary}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-grains-red shrink-0" />
                    <span>
                      {event.venue}
                      {event.city ? `, ${event.city}` : ""}
                    </span>
                  </div>
                  {event.address && (
                    <span className="text-zinc-500 text-[11px] hidden sm:inline">
                      ({event.address})
                    </span>
                  )}
                </div>

                {event.accessibilityNotes && (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-1">
                    <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>Accessibility: {event.accessibilityNotes}</span>
                  </div>
                )}

                {/* Setlist (for past events) */}
                {event.setlist && event.setlist.length > 0 && (
                  <div className="pt-3 border-t border-zinc-800/60 mt-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                      Concert Setlist:
                    </span>
                    <ul className="text-xs text-zinc-400 list-disc list-inside space-y-0.5 font-sans">
                      {event.setlist.map((song, i) => (
                        <li key={i}>{song}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action / Ticketing */}
              <div className="lg:w-1/4 flex flex-col items-start lg:items-end justify-center">
                {event.status === "sold_out" ? (
                  <span className="px-5 py-2.5 bg-zinc-900 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase rounded-sm">
                    Sold Out
                  </span>
                ) : event.status === "cancelled" ? (
                  <span className="px-5 py-2.5 bg-zinc-900 border border-red-500/30 text-red-400 text-xs font-mono tracking-widest uppercase rounded-sm">
                    Performance Cancelled
                  </span>
                ) : event.ticketUrl ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors shadow-sm whitespace-nowrap"
                  >
                    <span>{event.isFree ? "Free RSVP" : "Tickets"}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
                    {event.isFree ? "Free Admission" : "Tickets At Door / TBA"}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
