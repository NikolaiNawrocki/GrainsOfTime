"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MobileNav } from "./MobileNav";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { SocialsDropdown } from "./SocialsDropdown";
import { SiteSettings } from "@/types";

interface HeaderProps {
  settings?: SiteSettings;
}

const navItems = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/history", label: "Archive" },
  { href: "/repertoire", label: "Repertoire" },
  { href: "/gallery", label: "Gallery" },
  { href: "/merch", label: "Merch" },
];

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-grains-white/95 backdrop-blur-md border-b border-grains-border transition-colors overflow-x-clip">
      {/* Scroll depth progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-grains-red transition-[width] duration-150 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <AnnouncementBanner announcement={settings?.announcement} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 xl:gap-4 w-full">
        {/* Brand Mark & University Heritage */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 xl:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm shrink-0"
        >
          <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-grains-black border border-grains-border flex items-center justify-center p-1.5 shadow-sm group-hover:border-grains-red transition-colors shrink-0">
            <Image
              src="/GrainsPhotos/grains-logo-.PNG"
              alt="Grains of Time Official Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl xl:text-2xl tracking-tight text-grains-black group-hover:text-grains-red transition-colors whitespace-nowrap">
              GRAINS <span className="text-grains-red">OF</span> TIME
            </span>
            <span className="text-[9px] xl:text-[10px] font-mono tracking-[0.2em] xl:tracking-[0.25em] text-grains-muted uppercase -mt-0.5 whitespace-nowrap">
              NC STATE • EST. 1968
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center justify-center gap-1 xl:gap-2.5 2xl:gap-4 text-xs font-mono uppercase shrink min-w-0"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 xl:px-2.5 py-1 text-[11px] xl:text-xs tracking-[0.08em] xl:tracking-[0.14em] transition-all relative group whitespace-nowrap rounded-sm ${
                  isActive
                    ? "text-grains-black font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 xl:after:left-2.5 xl:after:right-2.5 after:h-[2px] after:bg-grains-red"
                    : "text-grains-black/75 hover:text-grains-red hover:-translate-y-0.5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Header Right Actions */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
          <SocialsDropdown settings={settings} />
          <a
            href={settings?.socialLinks?.gofundme || "https://www.gofundme.com/f/grainsoftime"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 xl:px-3.5 py-1.5 xl:py-2 border border-grains-border hover:border-grains-red text-grains-black hover:text-grains-red font-mono text-[11px] xl:text-xs tracking-wider uppercase rounded-sm transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red"
          >
            Support
          </a>
          <Link
            href="/book"
            className="px-3 xl:px-4 py-1.5 xl:py-2 bg-grains-red hover:bg-grains-red-bright text-white font-mono text-[11px] xl:text-xs tracking-wider uppercase rounded-sm transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-grains-red"
          >
            Book Us
          </Link>
        </div>

        {/* Mobile menu and action buttons */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <SocialsDropdown settings={settings} compact />
          <a
            href={settings?.socialLinks?.gofundme || "https://www.gofundme.com/f/grainsoftime"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-2.5 py-1.5 border border-grains-border hover:border-grains-red text-grains-black hover:text-grains-red font-mono text-[10px] tracking-wider uppercase rounded-sm transition-colors"
          >
            Support
          </a>
          <Link
            href="/book"
            className="px-3 py-1.5 bg-grains-red hover:bg-grains-red-bright text-white font-mono text-[11px] tracking-wider uppercase rounded-sm transition-colors"
          >
            Book
          </Link>
          <MobileNav settings={settings} />
        </div>
      </div>
    </header>
  );
}
