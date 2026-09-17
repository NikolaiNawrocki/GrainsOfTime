import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import {
  fallbackSiteSettings,
  fallbackMembers,
  fallbackEvents,
  fallbackTimeline,
  fallbackGallery,
  fallbackRepertoire,
  fallbackReleases,
} from "@/lib/data/fallbackContent";
import {
  SiteSettings,
  Member,
  EventItem,
  TimelineEntry,
  GalleryItem,
  RepertoireItem,
  MusicRelease,
} from "@/types";

// GROQ Queries
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]
`;

export const membersQuery = groq`
  *[_type == "member"] | order(order asc, name asc)
`;

export const eventsQuery = groq`
  *[_type == "event" && status in ["published", "sold_out"]] | order(startDate asc)
`;

export const archivedEventsQuery = groq`
  *[_type == "event" && status == "archived"] | order(startDate desc)
`;

export const timelineQuery = groq`
  *[_type == "timelineEntry"] | order(order asc)
`;

export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(_createdAt desc)
`;

export const repertoireQuery = groq`
  *[_type == "repertoireItem"] | order(order asc, title asc)
`;

export const musicReleasesQuery = groq`
  *[_type == "musicRelease"] | order(releaseYear desc)
`;

// Resilient Data Loaders with verified fallbacks
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });
  return data || fallbackSiteSettings;
}

export async function getMembers(): Promise<Member[]> {
  const data = await sanityFetch<Member[]>({
    query: membersQuery,
    tags: ["member"],
  });
  if (data && data.length > 0) return data;
  return fallbackMembers;
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  const data = await sanityFetch<EventItem[]>({
    query: eventsQuery,
    tags: ["event"],
  });
  if (data && data.length > 0) return data;
  return fallbackEvents.filter((e) => e.status !== "archived");
}

export async function getArchivedEvents(): Promise<EventItem[]> {
  const data = await sanityFetch<EventItem[]>({
    query: archivedEventsQuery,
    tags: ["event"],
  });
  if (data && data.length > 0) return data;
  return fallbackEvents.filter((e) => e.status === "archived");
}

export async function getTimelineEntries(): Promise<TimelineEntry[]> {
  const data = await sanityFetch<TimelineEntry[]>({
    query: timelineQuery,
    tags: ["timelineEntry"],
  });
  if (data && data.length > 0) return data;
  return fallbackTimeline;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await sanityFetch<GalleryItem[]>({
    query: galleryQuery,
    tags: ["galleryItem"],
  });
  if (data && data.length > 0) return data;
  return fallbackGallery;
}

export async function getRepertoire(): Promise<RepertoireItem[]> {
  const data = await sanityFetch<RepertoireItem[]>({
    query: repertoireQuery,
    tags: ["repertoireItem"],
  });
  if (data && data.length > 0) return data;
  return fallbackRepertoire;
}

export async function getMusicReleases(): Promise<MusicRelease[]> {
  const data = await sanityFetch<MusicRelease[]>({
    query: musicReleasesQuery,
    tags: ["musicRelease"],
  });
  if (data && data.length > 0) return data;
  return fallbackReleases;
}
