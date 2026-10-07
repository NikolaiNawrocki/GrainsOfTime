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
      name: "TikTok",
      handle: "@grainsoftime",
      href:
        settings?.socialLinks?.tiktok ||
        "https://www.tiktok.com/@grainsoftime?is_from_webapp=1&sender_device=pc",
      icon: (
        <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
      accentColor: "group-hover:text-black",
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
      name: "Apple Music",
      handle: "Stream on Apple Music",
      href:
        settings?.socialLinks?.appleMusic ||
        "https://music.apple.com/us/artist/grains-of-time/213326965",
      icon: (
        <svg className="w-4 h-4 fill-[#FA243C]" viewBox="0 0 24 24">
          <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z" />
        </svg>
      ),
      accentColor: "group-hover:text-[#FA243C]",
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
