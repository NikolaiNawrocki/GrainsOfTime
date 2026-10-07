export type VocalPart =
  | "Tenor 1"
  | "Tenor 2"
  | "Baritone"
  | "Bass"
  | "Vocal Percussion"
  | string;

export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImage {
  _type?: "image";
  asset?: {
    _ref: string;
    _type: "reference";
  };
  imageUrl?: string;
  alt: string;
  caption?: string;
  credit?: string;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
}

export interface SiteSettings {
  title: string;
  description: string;
  announcement?: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
    linkText?: string;
  };
  contactEmail: string;
  bookingEmail: string;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    appleMusic?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
    gofundme?: string;
    merch: string;
  };
  locationAffiliation: string;
  foundedYear: number;
  defaultOgImage?: SanityImage;
  // Booking page configuration
  bookingHeading?: string;
  bookingSubtitle?: string;
  bookingGuidelines?: {
    title: string;
    description: string;
  }[];
  bookingFaqs?: {
    q: string;
    a: string;
  }[];
  // Roster banner and page headers
  rosterEyebrow?: string;
  rosterHeading?: string;
  rosterSubtitle?: string;
  rosterHeroImage?: SanityImage;
  timelineEyebrow?: string;
  timelineHeading?: string;
  timelineSubtitle?: string;
  timelineArchivalNotice?: string;
}

export interface Member {
  _id: string;
  name: string;
  slug: string;
  vocalPart: VocalPart;
  status: "active" | "alumni";
  order: number;
  portrait?: SanityImage;
  imageUrl?: string;
  graduationYear?: number | string;
  major?: string;
  leadershipRole?: string;
  bio?: string;
  funFact?: string;
  favoriteSong?: string;
  hometown?: string;
  isPlaceholder?: boolean;
}

export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  startDate: string; // ISO string
  endDate?: string;
  timezone?: string;
  venue: string;
  address?: string;
  city?: string;
  eventType: "concert" | "campus" | "private" | "audition" | "other";
  summary: string;
  description?: string;
  posterImage?: SanityImage;
  ticketUrl?: string;
  isFree?: boolean;
  accessibilityNotes?: string;
  featured?: boolean;
  status: "published" | "draft" | "cancelled" | "sold_out" | "archived";
  setlist?: string[];
  recap?: string;
  isPlaceholder?: boolean;
}

export interface TimelineEntry {
  _id: string;
  year: string;
  era: string; // e.g. "Founding Era (1968-1979)", "The Millennium (1990-2009)", "Modern Era (2010-Present)"
  decade: string; // "1960s", "1970s", "1980s", etc.
  headline: string;
  narrative: string;
  archivalImage?: SanityImage;
  sourceCredit?: string;
  order: number;
  isPlaceholder?: boolean;
}

export interface GalleryItem {
  _id: string;
  title: string;
  year?: string;
  photographerCredit?: string;
  caption?: string;
  imageUrl?: string;
  image?: SanityImage;
  tags: ("concert" | "rehearsal" | "travel" | "archival" | "backstage" | "mediaday" | "2026-concert" | "2025-concert" | string)[];
  featured?: boolean;
  isPlaceholder?: boolean;
}

export interface RepertoireItem {
  _id: string;
  title: string;
  originalArtist?: string;
  arranger?: string;
  category?: "Contemporary Pop" | "Classic Rock" | "Soul & R&B" | "Country" | "NC State Tradition" | "Ballad";
  yearPerformed?: string;
  status: "current" | "archived";
  listeningUrl?: string;
  notes?: string;
  order: number;
  isPlaceholder?: boolean;
}

export interface MusicRelease {
  _id: string;
  title: string;
  releaseYear: string;
  releaseType: "Album" | "EP" | "Single" | "Live Recording";
  coverArt?: SanityImage;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  tracklist?: {
    trackNumber: number;
    title: string;
    originalArtist?: string;
    soloist?: string;
  }[];
  notes?: string;
  isPlaceholder?: boolean;
}

export interface BookingSubmission {
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  eventDate: string;
  venue: string;
  eventType: string;
  budgetRange?: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

export interface QuickLinkItem {
  title: string;
  description?: string;
  linkUrl?: string;
  actionText?: string;
}

export interface HomePageData {
  _id?: string;
  heroImage?: SanityImage;
  heroHeading?: string;
  heroSubtitle?: string;
  heroTagline?: string;
  heroDescription?: string;
  pullQuoteText?: string;
  pullQuoteAttribution?: string;
  pullQuoteEyebrow?: string;
  quickLinks?: QuickLinkItem[];
  showFeaturedEvent?: boolean;
  galleryCount?: number;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  // Archival feature section
  archivalEyebrow?: string;
  archivalHeading?: string;
  archivalSubtitle?: string;
  archivalNarrative?: string;
  archivalImage?: SanityImage;
  archivalStatFounded?: number;
  archivalStatDecades?: string;
  archivalStatRecordings?: string;
  archivalCtaText?: string;
  archivalCtaLink?: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface ChapterItem {
  chapterLabel?: string;
  title?: string;
  content?: string;
}

export interface AboutPageData {
  _id?: string;
  heading?: string;
  subtitle?: string;
  heroImage?: SanityImage;
  // Hero profile card
  profileBadge?: string;
  profileTitle?: string;
  profileDescription?: string;
  profileInstitution?: string;
  profileFounded?: string;
  profileGenre?: string;
  // Story & Chapters
  storyEyebrow?: string;
  chapter1?: ChapterItem;
  pullQuote?: {
    quote?: string;
    attribution?: string;
  };
  chapter2?: ChapterItem;
  additionalChapters?: ChapterItem[];
  storyBody?: any[]; // Block content
  // Mission & Values
  missionHeading?: string;
  missionText?: string;
  valuesItems?: ValueItem[];
  // Call to action
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

