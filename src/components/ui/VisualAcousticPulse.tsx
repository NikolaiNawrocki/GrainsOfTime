"use client";

interface VisualAcousticPulseProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function VisualAcousticPulse({
  className = "",
  color = "bg-grains-red",
  size = "md",
  label,
}: VisualAcousticPulseProps) {
  const heights = {
    sm: "h-3 gap-0.5 w-0.5",
    md: "h-4 gap-1 w-1",
    lg: "h-6 gap-1 w-1.5",
  };

  const containerHeights = {
    sm: "h-3.5",
    md: "h-5",
    lg: "h-7",
  };

  const barClasses = [
    "animate-acoustic-1",
    "animate-acoustic-2",
    "animate-acoustic-3",
    "animate-acoustic-4",
    "animate-acoustic-5",
  ];

  return (
    <div
      className={`inline-flex items-center gap-2 group select-none ${className}`}
      title="Acoustic vocal frequency visualization"
      aria-hidden="true"
    >
      <div
        className={`flex items-end ${containerHeights[size]} overflow-hidden`}
      >
        {barClasses.map((anim, i) => (
          <span
            key={i}
            className={`${heights[size].split(" ")[2]} ${heights[size].split(" ")[0]} ${color} rounded-full inline-block mx-[1.5px] ${anim} transition-transform group-hover:scale-y-110`}
            style={{
              height: `${[40, 85, 100, 65, 50][i]}%`,
            }}
          />
        ))}
      </div>
      {label && (
        <span className="text-[10px] font-mono tracking-widest uppercase text-grains-muted group-hover:text-grains-black transition-colors">
          {label}
        </span>
      )}
    </div>
  );
}
