"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MobileNav } from "./MobileNav";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { SiteSettings } from "@/types";

interface HeaderProps {
  settings?: SiteSettings;
}

const navItems = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/history", label: "Living Archive" },
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
    <header className="sticky top-0 z-40 w-full bg-grains-white/95 backdrop-blur-md border-b border-grains-border transition-colors">
      {/* Scroll depth progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-grains-red transition-[width] duration-150 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <AnnouncementBanner announcement={settings?.announcement} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Mark & University Heritage */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm"
        >
          <div className="w-10 h-10 rounded-full bg-grains-black border border-grains-border flex items-center justify-center p-1.5 shadow-sm group-hover:border-grains-red transition-colors shrink-0">
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
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-grains-black group-hover:text-grains-red transition-colors">
              GRAINS <span className="text-grains-red">OF</span> TIME
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-grains-muted uppercase -mt-0.5">
              NC STATE • EST. 1968
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono uppercase tracking-[0.16em]">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1 transition-all relative group ${
                  isActive
                    ? "text-grains-black font-semibold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-grains-red"
                    : "text-grains-black/70 hover:text-grains-red hover:-translate-y-0.5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href={settings?.socialLinks?.spotify || "https://open.spotify.com/artist/4oHl4fefbY77maGXUyGZeW?si=mVbG3OowSiGR2XN1FCG6jg"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 border border-grains-border hover:border-[#1DB954] hover:text-[#1DB954] text-grains-black font-mono text-xs tracking-widest uppercase rounded-sm transition-colors shadow-subtle inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954]"
            aria-label="Listen on Spotify"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.217.355-.678.468-1.033.251-2.83-1.728-6.393-2.119-10.589-1.161-.406.094-.813-.159-.906-.565-.094-.407.159-.814.566-.907 4.593-1.05 8.544-.606 11.71 1.332.355.217.469.676.252 1.05zm1.47-3.268c-.274.444-.858.587-1.302.314-3.238-1.99-8.176-2.566-12.006-1.403-.5.152-1.033-.13-1.185-.63-.153-.502.13-1.034.63-1.186 4.382-1.33 9.825-.688 13.549 1.603.444.273.587.857.314 1.302zm.126-3.41c-3.883-2.305-10.292-2.518-14.004-1.391-.595.18-1.226-.157-1.406-.753-.18-.595.157-1.226.753-1.406 4.275-1.298 11.348-1.05 15.823 1.606.536.318.71 1.01.392 1.545-.318.536-1.01.71-1.545.392z"/>
            </svg>
            <span>Spotify</span>
          </a>
          <a
            href={settings?.socialLinks?.gofundme || "https://www.gofundme.com/f/grainsoftime"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 border border-grains-border hover:border-grains-red text-grains-black hover:text-grains-red font-mono text-xs tracking-widest uppercase rounded-sm transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red"
          >
            Support
          </a>
          <Link
            href="/book"
            className="px-4 py-2 bg-grains-red hover:bg-grains-red-bright text-white font-mono text-xs tracking-widest uppercase rounded-sm transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-grains-red"
          >
            Book Us
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center space-x-2">
          <a
            href={settings?.socialLinks?.spotify || "https://open.spotify.com/artist/4oHl4fefbY77maGXUyGZeW?si=mVbG3OowSiGR2XN1FCG6jg"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-grains-border text-grains-black hover:text-[#1DB954] hover:border-[#1DB954] rounded-sm transition-colors flex items-center justify-center"
            aria-label="Listen on Spotify"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.217.355-.678.468-1.033.251-2.83-1.728-6.393-2.119-10.589-1.161-.406.094-.813-.159-.906-.565-.094-.407.159-.814.566-.907 4.593-1.05 8.544-.606 11.71 1.332.355.217.469.676.252 1.05zm1.47-3.268c-.274.444-.858.587-1.302.314-3.238-1.99-8.176-2.566-12.006-1.403-.5.152-1.033-.13-1.185-.63-.153-.502.13-1.034.63-1.186 4.382-1.33 9.825-.688 13.549 1.603.444.273.587.857.314 1.302zm.126-3.41c-3.883-2.305-10.292-2.518-14.004-1.391-.595.18-1.226-.157-1.406-.753-.18-.595.157-1.226.753-1.406 4.275-1.298 11.348-1.05 15.823 1.606.536.318.71 1.01.392 1.545-.318.536-1.01.71-1.545.392z"/>
            </svg>
          </a>
          <a
            href={settings?.socialLinks?.gofundme || "https://www.gofundme.com/f/grainsoftime"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 border border-grains-border text-grains-black font-mono text-[10px] tracking-wider uppercase rounded-sm"
          >
            Support
          </a>
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
