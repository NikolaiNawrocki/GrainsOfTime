import Link from "next/link";
import { Users, Calendar, Clock, Music, ArrowRight } from "lucide-react";

export function EditorialStatement() {
  const pillars = [
    {
      title: "Current Ensemble",
      description: "Explore the active vocal roster across Tenor 1, Tenor 2, Baritone, Bass, and Vocal Percussion.",
      href: "/members",
      icon: Users,
      actionText: "Meet the Voices",
    },
    {
      title: "Living Timeline",
      description: "Over five decades of performance programs, archival photos, and university milestones since 1968.",
      href: "/history",
      icon: Clock,
      actionText: "Explore Archive",
    },
    {
      title: "Active Repertoire",
      description: "Contemporary charts, student arrangements, and perennial NC State traditions performed without instruments.",
      href: "/repertoire",
      icon: Music,
      actionText: "View Setlists",
    },
    {
      title: "Performances & Gigs",
      description: "Flagship campus showcases, regional festival appearances, and private bookings across North Carolina.",
      href: "/events",
      icon: Calendar,
      actionText: "See Upcoming",
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-grains-border bg-[#0a0a0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Pull Quote */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.25em] text-grains-red-bright uppercase block">
            Tradition & Experimentation
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-grains-paper leading-snug font-normal">
            &ldquo;No instruments. Just brotherhood, acoustic discipline, and arrangements forged over fifty-plus years in Raleigh.&rdquo;
          </p>
          <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            Grains of Time Charter • North Carolina State University
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="group relative p-6 sm:p-8 bg-grains-surface border border-grains-border hover:border-zinc-700/80 rounded-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80 mb-6">
                    <Icon className="w-5 h-5 text-grains-red" />
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      Archive File
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-grains-paper group-hover:text-white transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-8 mt-auto flex items-center text-xs font-mono tracking-wider text-grains-red-bright uppercase group-hover:text-white transition-colors">
                  <span>{pillar.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
