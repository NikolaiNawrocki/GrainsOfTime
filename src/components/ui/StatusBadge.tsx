import { cn } from "@/lib/utils/cn";

interface StatusBadgeProps {
  status: "published" | "draft" | "sold_out" | "cancelled" | "archived" | "active" | "featured";
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = {
    sold_out: {
      defaultLabel: "Sold Out",
      classes: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    },
    cancelled: {
      defaultLabel: "Cancelled",
      classes: "bg-red-500/10 text-red-400 border-red-500/25",
    },
    featured: {
      defaultLabel: "Featured",
      classes: "bg-grains-red/10 text-grains-red-bright border-grains-red/30",
    },
    archived: {
      defaultLabel: "Archived",
      classes: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40",
    },
    published: {
      defaultLabel: "Confirmed",
      classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    },
    draft: {
      defaultLabel: "Draft",
      classes: "bg-zinc-800 text-zinc-500 border-zinc-700",
    },
    active: {
      defaultLabel: "Active",
      classes: "bg-zinc-800 text-zinc-300 border-zinc-700",
    },
  }[status] || {
    defaultLabel: status,
    classes: "bg-zinc-800 text-zinc-300 border-zinc-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono uppercase tracking-widest border",
        config.classes,
        className
      )}
    >
      {label || config.defaultLabel}
    </span>
  );
}
