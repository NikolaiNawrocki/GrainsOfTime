import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { SiteSettings } from "@/types";

interface HeaderProps {
  settings?: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-grains-black/90 backdrop-blur-md border-b border-grains-border">
      <AnnouncementBanner announcement={settings?.announcement} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Mark & University Heritage */}
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-tight text-grains-paper group-hover:text-white transition-colors">
            GRAINS <span className="text-grains-red italic">of</span> TIME
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase -mt-0.5">
            NC STATE • EST. 1968
          </span>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono uppercase tracking-[0.18em]">
          <Link
            href="/about"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/members"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Members
          </Link>
          <Link
            href="/events"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Events
          </Link>
          <Link
            href="/history"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Living Archive
          </Link>
          <Link
            href="/repertoire"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Repertoire
          </Link>
          <Link
            href="/gallery"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/music"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Music
          </Link>
          <Link
            href="/merch"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Merch
          </Link>
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            href="/book"
            className="px-4 py-2 bg-grains-red hover:bg-grains-red-bright text-white font-mono text-xs tracking-widest uppercase rounded-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-grains-red"
          >
            Book Us
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center space-x-2">
          <Link
            href="/book"
            className="px-3 py-1.5 bg-grains-red text-white font-mono text-[10px] tracking-wider uppercase rounded-sm"
          >
            Book
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
