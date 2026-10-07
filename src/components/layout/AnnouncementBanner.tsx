import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface AnnouncementBannerProps {
  announcement?: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
    linkText?: string;
  };
}

export function AnnouncementBanner({ announcement }: AnnouncementBannerProps) {
  if (
    !announcement ||
    !announcement.enabled ||
    !announcement.text ||
    announcement.text.includes("Auditions for the Fall season will be announced soon")
  ) {
    return null;
  }

  const isExternal = announcement.linkUrl?.startsWith("http");

  return (
    <aside
      aria-label="Important Announcement"
      className="relative z-40 bg-grains-cream border-b border-grains-border px-4 py-2 text-center text-xs font-mono tracking-wider text-grains-black flex items-center justify-center gap-2 flex-wrap"
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-grains-red animate-pulse" />
      <span className="font-medium">{announcement.text}</span>
      {announcement.linkUrl && (
        isExternal ? (
          <a
            href={announcement.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-grains-red hover:text-grains-red-bright hover:underline ml-1 font-sans font-semibold"
          >
            {announcement.linkText || "Learn More"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <Link
            href={announcement.linkUrl}
            className="inline-flex items-center gap-0.5 text-grains-red hover:text-grains-red-bright hover:underline ml-1 font-sans font-semibold"
          >
            {announcement.linkText || "Learn More"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )
      )}
    </aside>
  );
}
