import { cn } from "@/lib/utils/cn";

interface StatusBadgeProps {
  status: "published" | "draft" | "sold_out" | "cancelled" | "archived" | "active" | "featured";
  label?: string;
  variant?: "light" | "dark";
  className?: string;
}

export function StatusBadge({ status, label, variant = "light", className }: StatusBadgeProps) {
  const isDark = variant === "dark";

  const config = {
    sold_out: {
      defaultLabel: "Sold Out",
      classes: isDark
        ? "bg-amber-950/70 text-amber-300 border-amber-500/40"
        : "bg-amber-50 text-amber-800 border-amber-300",
    },
    cancelled: {
      defaultLabel: "Cancelled",
      classes: isDark
        ? "bg-red-950/70 text-red-300 border-red-500/40"
        : "bg-red-50 text-red-800 border-red-300",
    },
    featured: {
      defaultLabel: "Featured",
      classes: isDark
        ? "bg-grains-red/30 text-white border-grains-red/50 font-semibold"
        : "bg-red-50 text-grains-red border-grains-red/30 font-semibold",
    },
    archived: {
      defaultLabel: "Archived",
      classes: isDark
        ? "bg-white/10 text-slate-300 border-white/20"
        : "bg-slate-100 text-slate-700 border-slate-300",
    },
    published: {
      defaultLabel: "Confirmed",
      classes: isDark
        ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
        : "bg-emerald-50 text-emerald-800 border-emerald-300",
    },
    draft: {
      defaultLabel: "Draft",
      classes: isDark
        ? "bg-white/5 text-slate-400 border-white/10"
        : "bg-slate-100 text-slate-600 border-slate-300",
    },
    active: {
      defaultLabel: "Active",
      classes: isDark
        ? "bg-white/10 text-slate-200 border-white/20"
        : "bg-slate-100 text-slate-700 border-slate-300",
    },
  }[status] || {
    defaultLabel: status,
    classes: isDark
      ? "bg-white/10 text-slate-200 border-white/20"
      : "bg-slate-100 text-slate-700 border-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-mono uppercase tracking-wider border",
        config.classes,
        className
      )}
    >
      {label || config.defaultLabel}
    </span>
  );
}
