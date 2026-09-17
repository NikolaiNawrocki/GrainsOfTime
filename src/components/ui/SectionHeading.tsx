import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-2">
          {align === "center" && (
            <span className="w-6 h-[1px] bg-grains-red/60 inline-block" />
          )}
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-grains-red-bright">
            {eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-grains-red/60 inline-block" />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-grains-paper font-normal">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-zinc-400 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
