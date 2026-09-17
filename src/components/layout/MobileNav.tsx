"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/history", label: "Living Archive" },
  { href: "/repertoire", label: "Repertoire" },
  { href: "/gallery", label: "Gallery" },
  { href: "/music", label: "Music" },
  { href: "/merch", label: "Merch" },
  { href: "/book", label: "Book Us" },
];

export function MobileNav() {
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

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="p-2 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grains-red rounded-sm"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 top-[65px] z-50 bg-grains-black/98 backdrop-blur-md flex flex-col justify-between p-6 overflow-y-auto border-t border-grains-border animate-fade-in"
        >
          <nav className="space-y-6 pt-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase block mb-4">
              Navigation Index
            </span>
            <ul className="space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-2xl font-serif tracking-tight flex items-center justify-between transition-colors ${
                        isActive
                          ? "text-grains-red-bright font-medium"
                          : "text-grains-paper hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.isExternal && <ArrowUpRight className="w-4 h-4 text-zinc-500" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-8 border-t border-zinc-800 space-y-4">
            <div className="text-xs font-mono text-zinc-500 tracking-wider">
              <p>NC STATE UNIVERSITY</p>
              <p>FOUNDED 1968 • RALEIGH, NC</p>
            </div>
            <Link
              href="/book"
              className="block w-full py-3 text-center bg-grains-red hover:bg-grains-red-bright text-white font-mono text-xs tracking-widest uppercase rounded-sm transition-colors"
            >
              Inquire / Book Ensemble
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
