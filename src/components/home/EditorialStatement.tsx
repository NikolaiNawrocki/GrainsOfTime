import Link from "next/link";
import { Users, Calendar, Clock, Music, ArrowRight, LucideIcon } from "lucide-react";
import { HomePageData } from "@/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface EditorialStatementProps {
  content?: HomePageData;
}

export function EditorialStatement({ content }: EditorialStatementProps) {
  const eyebrow = content?.pullQuoteEyebrow || "Tradition & Experimentation";
  const quote =
    content?.pullQuoteText ||
    "No instruments. Just brotherhood, acoustic discipline, and arrangements forged over fifty-plus years in Raleigh.";
  const attribution =
    content?.pullQuoteAttribution ||
    "Grains of Time Charter • North Carolina State University";

  // Map icon based on URL or index
  const getIconForLink = (url?: string, index: number = 0): LucideIcon => {
    if (!url) return Users;
    if (url.includes("member")) return Users;
    if (url.includes("history") || url.includes("timeline")) return Clock;
    if (url.includes("repertoire") || url.includes("music")) return Music;
    if (url.includes("event") || url.includes("calendar")) return Calendar;
    const fallbackIcons = [Users, Clock, Music, Calendar];
    return fallbackIcons[index % fallbackIcons.length];
  };

  const defaultPillars = [
    {
      title: "Current Ensemble",
      description:
        "Explore the active vocal roster across Tenor 1, Tenor 2, Baritone, Bass, and Vocal Percussion.",
      href: "/members",
      actionText: "Meet the Voices",
    },
    {
      title: "Living Timeline",
      description:
        "Over five decades of performance programs, archival photos, and university milestones since 1968.",
      href: "/history",
      actionText: "Explore Archive",
    },
    {
      title: "Active Repertoire",
      description:
        "Contemporary charts, student arrangements, and perennial NC State traditions performed without instruments.",
      href: "/repertoire",
      actionText: "View Setlists",
    },
    {
      title: "Performances & Gigs",
      description:
        "Flagship campus showcases, regional festival appearances, and private bookings across North Carolina.",
      href: "/events",
      actionText: "See Upcoming",
    },
  ];

  const cards =
    content?.quickLinks && content.quickLinks.length > 0
      ? content.quickLinks.map((item, idx) => ({
          title: item.title,
          description: item.description || "",
          href: item.linkUrl || "/events",
          actionText: item.actionText || "Learn More",
        }))
      : defaultPillars;

  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-grains-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Pull Quote */}
        <ScrollReveal direction="up" distance={20} duration={800}>
          <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
            <span className="text-xs font-mono tracking-[0.22em] text-grains-red uppercase block font-medium">
              {eyebrow}
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-grains-black leading-snug font-normal">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="text-xs font-mono tracking-widest text-grains-muted uppercase pt-1">
              {attribution}
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Pillars - Open Layout with Staggered Scroll Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {cards.map((card, idx) => {
            const Icon = getIconForLink(card.href, idx);
            return (
              <ScrollReveal
                key={card.href + idx}
                direction="up"
                distance={24}
                duration={700}
                delay={idx * 120}
                className="h-full"
              >
                <Link
                  href={card.href}
                  className="group border-t-2 border-grains-black/20 pt-6 hover:border-grains-red transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-3">
                      <Icon className="w-5 h-5 text-grains-red transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-[10px] font-mono tracking-widest text-grains-muted uppercase">
                        Archive File {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-grains-black group-hover:text-grains-red transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-grains-text/75 font-sans leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-auto flex items-center text-xs font-mono tracking-wider text-grains-black group-hover:text-grains-red font-medium uppercase transition-colors">
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
