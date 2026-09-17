import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SiteSettings } from "@/types";

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const social = settings?.socialLinks;

  return (
    <footer className="w-full bg-[#070709] border-t border-grains-border text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Column 1: Identity & Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-tight text-grains-paper">
                GRAINS <span className="text-grains-red italic">of</span> TIME
              </span>
            </Link>
            <p className="text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase">
              {settings?.locationAffiliation || "North Carolina State University • Raleigh, NC"}
            </p>
            <p className="text-sm text-zinc-400 font-sans max-w-sm leading-relaxed">
              Founded in 1968. A living archive of sound, brotherhood, and collegiate vocal music. Representing the Wolfpack on campus and nationwide.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                Active Ensemble • Est. 1968
              </span>
            </div>
          </div>

          {/* Column 2: Living Archive */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-grains-paper font-semibold">
              The Archive
            </h3>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Group
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-white transition-colors">
                  Current Ensemble
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors">
                  Living Timeline (1968–Now)
                </Link>
              </li>
              <li>
                <Link href="/repertoire" className="hover:text-white transition-colors">
                  Repertoire & Arrangements
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Photo Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Performances & Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-grains-paper font-semibold">
              Live & Media
            </h3>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Upcoming Concerts
                </Link>
              </li>
              <li>
                <Link href="/music" className="hover:text-white transition-colors">
                  Music & Releases
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">
                  Book the Ensemble
                </Link>
              </li>
              <li>
                <Link href="/merch" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  Official Merch Store
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Channels & Administration */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-grains-paper font-semibold">
              Connect
            </h3>
            <ul className="space-y-2 text-sm font-sans">
              {social?.instagram && (
                <li>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Instagram @grainsoftime
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </li>
              )}
              {social?.spotify && (
                <li>
                  <a
                    href={social.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Spotify Profile
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </li>
              )}
              {social?.youtube && (
                <li>
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    YouTube Channel
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </li>
              )}
              {social?.gofundme && (
                <li>
                  <a
                    href={social.gofundme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Support & Donate
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${settings?.contactEmail || "grainsoftimencsu@gmail.com"}`}
                  className="hover:text-white transition-colors"
                >
                  {settings?.contactEmail || "Contact Us"}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors border border-zinc-800 px-2 py-1 rounded-sm bg-zinc-900/50"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-grains-red" />
                  Officer Studio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & University Trademark Disclaimers */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-sans gap-4">
          <p>
            &copy; {new Date().getFullYear()} Grains of Time. All rights reserved.
          </p>
          <p className="text-zinc-600 text-center sm:text-right max-w-lg">
            Grains of Time is a registered student organization at North Carolina State University. Official student-led arts ensemble.
          </p>
        </div>
      </div>
    </footer>
  );
}
