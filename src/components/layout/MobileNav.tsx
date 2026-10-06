"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Instagram, Youtube, Facebook } from "lucide-react";
import { SiteSettings } from "@/types";

interface MobileNavProps {
  settings?: SiteSettings;
}

const mainNavLinks = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/history", label: "Living Archive" },
  { href: "/repertoire", label: "Repertoire" },
  { href: "/gallery", label: "Gallery" },
  { href: "/merch", label: "Merch" },
];

export function MobileNav({ settings }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const socialChannels = [
    {
      name: "Instagram",
      href:
        settings?.socialLinks?.instagram ||
        "https://www.instagram.com/grainsoftime/?hl=en",
      icon: <Instagram className="w-4 h-4 text-[#E1306C]" />,
    },
    {
      name: "YouTube",
      href:
        settings?.socialLinks?.youtube ||
        "https://www.youtube.com/user/GrainsofTime",
      icon: <Youtube className="w-4 h-4 text-[#FF0000]" />,
    },
    {
      name: "Spotify",
      href:
        settings?.socialLinks?.spotify ||
        "https://open.spotify.com/artist/4oHl4fefbY77maGXUyGZeW?si=mVbG3OowSiGR2XN1FCG6jg",
      icon: (
        <svg className="w-4 h-4 fill-[#1DB954]" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.217.355-.678.468-1.033.251-2.83-1.728-6.393-2.119-10.589-1.161-.406.094-.813-.159-.906-.565-.094-.407.159-.814.566-.907 4.593-1.05 8.544-.606 11.71 1.332.355.217.469.676.252 1.05zm1.47-3.268c-.274.444-.858.587-1.302.314-3.238-1.99-8.176-2.566-12.006-1.403-.5.152-1.033-.13-1.185-.63-.153-.502.13-1.034.63-1.186 4.382-1.33 9.825-.688 13.549 1.603.444.273.587.857.314 1.302zm.126-3.41c-3.883-2.305-10.292-2.518-14.004-1.391-.595.18-1.226-.157-1.406-.753-.18-.595.157-1.226.753-1.406 4.275-1.298 11.348-1.05 15.823 1.606.536.318.71 1.01.392 1.545-.318.536-1.01.71-1.545.392z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href:
        settings?.socialLinks?.facebook ||
        "https://www.facebook.com/grainsoftime/",
      icon: <Facebook className="w-4 h-4 text-[#1877F2]" />,
    },
  ];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="p-2 text-grains-black/80 hover:text-grains-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 top-[73px] z-50 bg-grains-white/98 backdrop-blur-md flex flex-col justify-between p-6 overflow-y-auto border-t border-grains-border animate-fade-in shadow-xl"
        >
          <nav className="space-y-6 pt-2">
            <div className="flex items-center justify-between pb-4 border-b border-grains-border">
              <span className="text-[10px] font-mono tracking-[0.25em] text-grains-muted uppercase block">
                Navigation Index
              </span>
              <div className="w-8 h-8 rounded-full bg-grains-black p-1.5 flex items-center justify-center border border-grains-border">
                <Image
                  src="/GrainsPhotos/grains-logo-.PNG"
                  alt="Grains of Time Logo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Primary Nav Links */}
            <ul className="space-y-3.5">
              {mainNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-2xl font-serif tracking-tight flex items-center justify-between transition-colors ${
                        isActive
                          ? "text-grains-red font-medium"
                          : "text-grains-black hover:text-grains-red"
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Socials & Streaming Channels */}
            <div className="pt-4 border-t border-grains-border space-y-3">
              <span className="text-[10px] font-mono tracking-[0.2em] text-grains-muted uppercase block font-medium">
                Follow & Listen
              </span>
              <div className="grid grid-cols-2 gap-2">
                {socialChannels.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 bg-grains-cream/50 hover:bg-grains-cream border border-grains-border/70 rounded-sm text-xs font-mono uppercase tracking-wider text-grains-black hover:text-grains-red transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-grains-muted" />
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="pt-6 border-t border-grains-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono text-grains-muted tracking-wider">
                <p>NC STATE UNIVERSITY</p>
                <p>FOUNDED 1968 • RALEIGH, NC</p>
              </div>
              <a
                href={settings?.socialLinks?.gofundme || "https://www.gofundme.com/f/grainsoftime"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-grains-border hover:border-grains-red text-grains-black hover:text-grains-red font-mono text-xs tracking-wider uppercase rounded-sm transition-colors"
              >
                Support
              </a>
            </div>
            <Link
              href="/book"
              className="block w-full py-3 text-center bg-grains-red hover:bg-grains-red-bright text-white font-mono text-xs tracking-widest uppercase rounded-sm transition-colors shadow-subtle"
            >
              Inquire / Book Ensemble
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
