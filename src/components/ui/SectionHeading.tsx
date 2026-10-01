import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-2", align === "center" && "justify-center")}>
          {align === "center" && (
            <span className={cn("w-6 h-[1px] inline-block", isDark ? "bg-grains-red-bright/60" : "bg-grains-red/40")} />
          )}
          <span className={cn("text-[11px] font-mono uppercase tracking-[0.22em] font-medium", isDark ? "text-grains-red-bright" : "text-grains-red")}>
            {eyebrow}
          </span>
          <span className={cn("w-8 h-[1px] inline-block", isDark ? "bg-grains-red-bright/60" : "bg-grains-red/40")} />
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight font-normal leading-[1.15]",
          isDark ? "text-white" : "text-grains-black"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base font-sans leading-relaxed",
            isDark ? "text-slate-300" : "text-grains-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
