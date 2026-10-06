import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SiteSettings } from "@/types";

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const social = settings?.socialLinks;

  return (
    <footer className="w-full bg-grains-black border-t border-grains-border text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16">
          {/* Column 1: Identity & Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center p-1.5 shrink-0 group-hover:border-grains-red transition-colors">
                <Image
                  src="/GrainsPhotos/grains-logo-.PNG"
                  alt="Grains of Time Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-2xl tracking-tight text-white group-hover:text-slate-100 transition-colors">
                GRAINS <span className="text-grains-red-bright">OF</span> TIME
              </span>
            </Link>
            <p className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
              {settings?.locationAffiliation || "North Carolina State University • Raleigh, NC"}
            </p>
            <p className="text-sm text-slate-300/90 font-sans max-w-sm leading-relaxed">
              Founded in 1968. A living archive of sound, brotherhood, and collegiate vocal music. Representing the Wolfpack on campus and nationwide.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Active Ensemble • Est. 1968
              </span>
            </div>
          </div>

          {/* Column 2: Living Archive */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-semibold">
              The Archive
            </h3>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link href="/about" className="hover:text-white transition-colors text-slate-300/80">
                  About the Group
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-white transition-colors text-slate-300/80">
                  Current Ensemble
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors text-slate-300/80">
                  Living Timeline (1968–Now)
                </Link>
              </li>
              <li>
                <Link href="/repertoire" className="hover:text-white transition-colors text-slate-300/80">
                  Repertoire & Arrangements
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors text-slate-300/80">
                  Photo Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Performances & Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-semibold">
              Live & Media
            </h3>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link href="/events" className="hover:text-white transition-colors text-slate-300/80">
                  Upcoming Concerts
                </Link>
              </li>
              <li>
                <a
                  href={social?.spotify || "https://open.spotify.com/artist/4oHl4fefbY77maGXUyGZeW?si=mVbG3OowSiGR2XN1FCG6jg"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300/80"
                >
                  Listen on Spotify
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors text-slate-300/80">
                  Book the Ensemble
                </Link>
              </li>
              <li>
                <Link href="/merch" className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300/80">
                  Official Merch Store
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Channels & Administration */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white font-semibold">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm font-sans">
              {social?.instagram && (
                <li>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300/80"
                  >
                    Instagram @grainsoftime
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              )}
              {social?.spotify && (
                <li>
                  <a
                    href={social.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300/80"
                  >
                    Spotify Profile
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              )}
              {social?.youtube && (
                <li>
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300/80"
                  >
                    YouTube Channel
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              )}
              {social?.facebook && (
                <li>
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300/80"
                  >
                    Facebook Page
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              )}
              {social?.gofundme && (
                <li>
                  <a
                    href={social.gofundme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 text-slate-300/80"
                  >
                    Support & Donate
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${settings?.contactEmail || "ncstategrains@gmail.com"}`}
                  className="hover:text-white transition-colors text-slate-300/80"
                >
                  {settings?.contactEmail || "ncstategrains@gmail.com"}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors border border-white/15 px-2.5 py-1 rounded-sm bg-white/5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-grains-red-bright" />
                  Officer Studio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & University Trademark Disclaimers - Deep Black Anchor */}
        <div className="border-t border-white/10 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-sans gap-4">
          <p>
            &copy; {new Date().getFullYear()} Grains of Time. All rights reserved.
          </p>
          <p className="text-slate-400 text-center sm:text-right max-w-lg">
            Grains of Time is a registered student organization at North Carolina State University. Official student-led arts ensemble.
          </p>
        </div>
      </div>
    </footer>
  );
}
