import Image from "next/image";
import { SanityImage } from "@/types";
import { urlForImage } from "@/sanity/image";
import { cn } from "@/lib/utils/cn";

interface EditorialImageProps {
  image?: SanityImage;
  alt: string;
  aspectRatio?: "16/9" | "4/5" | "1/1" | "3/2" | "21/9";
  caption?: string;
  credit?: string;
  placeholderLabel?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

export function EditorialImage({
  image,
  alt,
  aspectRatio = "16/9",
  caption,
  credit,
  placeholderLabel = "Grains of Time Archive",
  priority = false,
  className,
  containerClassName,
}: EditorialImageProps) {
  const sanityUrl = image ? urlForImage(image)?.url() : null;
  const displayCaption = caption || image?.caption;
  const displayCredit = credit || image?.credit;

  const aspectClass = {
    "16/9": "aspect-video",
    "4/5": "aspect-[4/5]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
    "21/9": "aspect-[21/9]",
  }[aspectRatio];

  return (
    <figure className={cn("relative flex flex-col group", containerClassName)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-grains-surface border border-grains-border rounded-sm",
          aspectClass,
          className
        )}
      >
        {sanityUrl ? (
          <Image
            src={sanityUrl}
            alt={alt || image?.alt || "Grains of Time"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          // Intentional, architectural placeholder
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#141418] via-[#0E0E12] to-[#0A0A0C]">
            {/* Subtle architectural framing lines */}
            <div className="absolute inset-3 border border-zinc-800/50 pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase border border-zinc-800 bg-black/40">
                Editorial Frame • {aspectRatio}
              </span>
              <p className="text-sm font-serif text-zinc-400 max-w-xs leading-snug">
                {placeholderLabel}
              </p>
              <span className="text-[10px] font-mono text-zinc-600 block tracking-widest uppercase">
                Awaiting Verified Asset
              </span>
            </div>
          </div>
        )}
      </div>

      {(displayCaption || displayCredit) && (
        <figcaption className="mt-2.5 flex items-baseline justify-between text-xs text-zinc-500 font-sans">
          {displayCaption && (
            <span className="italic pr-4 text-zinc-400">{displayCaption}</span>
          )}
          {displayCredit && (
            <span className="font-mono text-[11px] tracking-wider uppercase text-zinc-500 whitespace-nowrap ml-auto">
              Photo: {displayCredit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
