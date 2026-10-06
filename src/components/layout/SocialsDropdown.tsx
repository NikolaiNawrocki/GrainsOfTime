"use client";

import { useState, useRef, useEffect } from "react";
import { Instagram, Youtube, Facebook, ChevronDown, ArrowUpRight } from "lucide-react";
import { SiteSettings } from "@/types";

interface SocialsDropdownProps {
  settings?: SiteSettings;
  compact?: boolean;
}

export function SocialsDropdown({ settings, compact = false }: SocialsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@grainsoftime",
      href:
        settings?.socialLinks?.instagram ||
        "https://www.instagram.com/grainsoftime/?hl=en",
      icon: <Instagram className="w-4 h-4 text-[#E1306C]" />,
      accentColor: "group-hover:text-[#E1306C]",
    },
    {
      name: "YouTube",
      handle: "GrainsofTime",
      href:
        settings?.socialLinks?.youtube ||
        "https://www.youtube.com/user/GrainsofTime",
      icon: <Youtube className="w-4 h-4 text-[#FF0000]" />,
      accentColor: "group-hover:text-[#FF0000]",
    },
    {
      name: "Spotify",
      handle: "Stream Our Music",
      href:
        settings?.socialLinks?.spotify ||
        "https://open.spotify.com/artist/4oHl4fefbY77maGXUyGZeW?si=mVbG3OowSiGR2XN1FCG6jg",
      icon: (
        <svg className="w-4 h-4 fill-[#1DB954]" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.217.355-.678.468-1.033.251-2.83-1.728-6.393-2.119-10.589-1.161-.406.094-.813-.159-.906-.565-.094-.407.159-.814.566-.907 4.593-1.05 8.544-.606 11.71 1.332.355.217.469.676.252 1.05zm1.47-3.268c-.274.444-.858.587-1.302.314-3.238-1.99-8.176-2.566-12.006-1.403-.5.152-1.033-.13-1.185-.63-.153-.502.13-1.034.63-1.186 4.382-1.33 9.825-.688 13.549 1.603.444.273.587.857.314 1.302zm.126-3.41c-3.883-2.305-10.292-2.518-14.004-1.391-.595.18-1.226-.157-1.406-.753-.18-.595.157-1.226.753-1.406 4.275-1.298 11.348-1.05 15.823 1.606.536.318.71 1.01.392 1.545-.318.536-1.01.71-1.545.392z" />
        </svg>
      ),
      accentColor: "group-hover:text-[#1DB954]",
    },
    {
      name: "Facebook",
      handle: "@grainsoftime",
      href:
        settings?.socialLinks?.facebook ||
        "https://www.facebook.com/grainsoftime/",
      icon: <Facebook className="w-4 h-4 text-[#1877F2]" />,
      accentColor: "group-hover:text-[#1877F2]",
    },
  ];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Social media and music links"
        className={`border border-grains-border hover:border-grains-red text-grains-black hover:text-grains-red font-mono uppercase rounded-sm transition-all shadow-subtle inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red select-none ${
          isOpen ? "border-grains-red text-grains-red bg-grains-cream" : "bg-transparent"
        } ${
          compact
            ? "px-2 py-1.5 text-[10px] tracking-wider"
            : "px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-[11px] xl:text-xs tracking-wider"
        }`}
      >
        <span>Socials</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-grains-red" : "text-grains-muted"
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-60 rounded-sm bg-white border border-grains-border shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-3.5 py-2 border-b border-grains-border flex items-center justify-between bg-grains-white">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-grains-muted font-medium">
              Connect & Listen
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-grains-red"></span>
          </div>

          <div className="py-1 bg-white">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between px-3.5 py-2 text-xs transition-colors hover:bg-grains-cream"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-grains-white border border-grains-border flex items-center justify-center shrink-0 shadow-xs group-hover:border-grains-red/40 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className={`font-mono text-xs uppercase tracking-wider text-grains-black transition-colors ${item.accentColor}`}>
                      {item.name}
                    </span>
                    <span className="text-[10px] text-grains-muted truncate font-sans">
                      {item.handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-grains-muted group-hover:text-grains-red transition-all opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
