"use client";

import { useState, useMemo } from "react";
import { RepertoireItem } from "@/types";
import { Music, ArrowUpRight, Search } from "lucide-react";

interface RepertoireListProps {
  items: RepertoireItem[];
}

export function RepertoireList({ items }: RepertoireListProps) {
  const [activeStatus, setActiveStatus] = useState<"current" | "archived" | "all">("current");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesStatus =
        activeStatus === "all" ? true : item.status === activeStatus;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originalArtist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.arranger?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [items, activeStatus, searchQuery]);

  return (
    <div>
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-grains-border">
        {/* Status toggle buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveStatus("current")}
            className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors ${
              activeStatus === "current"
                ? "bg-grains-red text-white"
                : "bg-grains-surface hover:bg-grains-surface-elevated text-zinc-400 border border-grains-border"
            }`}
          >
            Active Setlist ({items.filter((i) => i.status === "current").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveStatus("archived")}
            className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors ${
              activeStatus === "archived"
                ? "bg-grains-red text-white"
                : "bg-grains-surface hover:bg-grains-surface-elevated text-zinc-400 border border-grains-border"
            }`}
          >
            Archived Charts ({items.filter((i) => i.status === "archived").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveStatus("all")}
            className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors ${
              activeStatus === "all"
                ? "bg-grains-red text-white"
                : "bg-grains-surface hover:bg-grains-surface-elevated text-zinc-400 border border-grains-border"
            }`}
          >
            All ({items.length})
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, artist, arranger..."
            aria-label="Search repertoire by song title, original artist, or arranger"
            className="w-full bg-grains-surface border border-grains-border rounded-sm pl-9 pr-3 py-1.5 text-xs text-grains-paper placeholder-zinc-500 font-sans focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grains-red"
          />
        </div>
      </div>

      {/* Repertoire Items List */}
      <div className="border border-grains-border rounded-sm divide-y divide-grains-border bg-grains-surface">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-sm font-sans">
            No repertoire items matching your criteria.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="p-5 sm:p-6 hover:bg-grains-surface-elevated transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 sm:max-w-xl">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-serif text-grains-paper font-normal">
                    {item.title}
                  </h3>
                  {item.category && (
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-sm">
                      {item.category}
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 font-sans">
                  {item.originalArtist && (
                    <span>Original: <span className="text-zinc-300">{item.originalArtist}</span></span>
                  )}
                  {item.arranger && (
                    <span className="ml-3 border-l border-zinc-700 pl-3">
                      Arranged by: <span className="text-zinc-300">{item.arranger}</span>
                    </span>
                  )}
                </p>

                {item.notes && (
                  <p className="text-xs text-zinc-500 font-sans pt-1">
                    {item.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 sm:justify-end text-xs font-mono text-zinc-500">
                {item.yearPerformed && (
                  <span className="tracking-wider uppercase">{item.yearPerformed}</span>
                )}
                {item.listeningUrl && (
                  <a
                    href={item.listeningUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-grains-red-bright hover:underline"
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span>Listen</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
