import Image from "next/image";
import { SanityImage } from "@/types";
import { urlForImage } from "@/sanity/image";
import { cn } from "@/lib/utils/cn";

interface EditorialImageProps {
  image?: SanityImage;
  src?: string;
  alt: string;
  aspectRatio?: "16/9" | "4/5" | "1/1" | "3/2" | "21/9" | "2/3" | "3/4";
  caption?: string;
  credit?: string;
  placeholderLabel?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

export function EditorialImage({
  image,
  src,
  alt,
  aspectRatio = "16/9",
  credit,
  placeholderLabel = "Grains of Time Archive",
  priority = false,
  className,
  containerClassName,
  imageClassName,
}: EditorialImageProps) {
  const sanityUrl = image?.asset ? urlForImage(image)?.url() : null;
  const imageUrl = src || image?.imageUrl || sanityUrl;
  const displayCredit = credit || image?.credit;

  const aspectClass = {
    "16/9": "aspect-video",
    "4/5": "aspect-[4/5]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
    "21/9": "aspect-[21/9]",
    "2/3": "aspect-[2/3]",
    "3/4": "aspect-[3/4]",
  }[aspectRatio] || "aspect-video";

  return (
    <figure className={cn("relative flex flex-col group", containerClassName)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-grains-cream border border-grains-border rounded-sm",
          aspectClass,
          className
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt || image?.alt || "Grains of Time"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
              imageClassName
            )}
          />
        ) : (
          // Intentional, architectural placeholder in warm cream
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-grains-cream via-[#EAE5DC] to-grains-cream-dark">
            {/* Subtle architectural framing lines */}
            <div className="absolute inset-3 border border-grains-black/10 pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono tracking-[0.2em] text-grains-black/75 uppercase border border-grains-black/15 bg-white/80 rounded-sm">
                Editorial Frame • {aspectRatio}
              </span>
              <p className="text-sm font-serif text-grains-black max-w-xs leading-snug">
                {placeholderLabel}
              </p>
              <span className="text-[10px] font-mono text-grains-muted block tracking-widest uppercase">
                Awaiting Verified Asset
              </span>
            </div>
          </div>
        )}
      </div>

      {displayCredit && (
        <figcaption className="mt-2.5 flex items-baseline justify-end text-xs text-grains-muted font-sans">
          <span className="font-mono text-[11px] tracking-wider uppercase text-grains-muted whitespace-nowrap ml-auto">
            Photo: {displayCredit}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
