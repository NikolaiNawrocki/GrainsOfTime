"use client";

import { useEffect, useState } from "react";

export function CampusClock() {
  const [timeString, setTimeString] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setTimeString(`${formatter.format(now)} EST`);
      } catch (e) {
        // Fallback
        setTimeString(null);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeString) return null;

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-grains-muted tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
      <span>{timeString}</span>
    </span>
  );
}
