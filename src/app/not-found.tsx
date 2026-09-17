import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-grains-red">
          <Radio className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase block">
            404 • Missing Track
          </span>
          <h1 className="text-4xl font-serif text-grains-paper">
            Lost in the Harmony
          </h1>
          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            The archival file or page you requested could not be located in our records. It may have been archived, moved, or retired.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Archive</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
