"use client";

import Image from "next/image";

const DEFAULT_ICONS = [
  "/images/icons/icon1.png",
  "/images/icons/icon2.png",
  "/images/icons/icon3.png",
  "/images/icons/icon4.jpg",
  "/images/icons/icon5.jpg",
];

type LightMenuProps = {
  count?: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
  icons?: string[];
};

export function LightMenu({
  count = 5,
  activeIndex,
  onToggle,
  icons = DEFAULT_ICONS,
}: LightMenuProps) {
  const iconList = icons.slice(0, count);

  return (
    <div className="space-y-2 md:space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--pac-yellow)] md:text-sm">
        Menú
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {Array.from({ length: count }).map((_, index) => {
          const isOn = activeIndex === index;
          const iconSrc = iconList[index];
          const colors = [
            { border: "#FF0000", glow: "rgba(255,0,0,0.6)" },
            { border: "#FF69B4", glow: "rgba(255,105,180,0.6)" },
            { border: "#00BFFF", glow: "rgba(0,191,255,0.6)" },
            { border: "#FFA500", glow: "rgba(255,165,0,0.6)" },
            { border: "#FFE600", glow: "rgba(255,230,0,0.6)" },
          ];
          const c = colors[index % 5];
          return (
            <button
              key={index}
              type="button"
              onClick={() => onToggle(index)}
              className={`relative flex size-10 items-center justify-center overflow-hidden rounded-full border-2 text-xs font-medium transition-all md:size-12 ${
                isOn ? "bg-black/60" : "border-[var(--pac-outline)] bg-black hover:border-[var(--pac-yellow)]/60"
              }`}
              style={isOn ? { borderColor: c.border, boxShadow: `0 0 16px ${c.glow}` } : undefined}
            >
              {iconSrc ? (
                <span className="relative block size-6 shrink-0 md:size-8">
                  <Image
                    src={iconSrc}
                    alt={`Ícono ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 24px, 32px"
                    className="object-contain brightness-0 invert"
                  />
                </span>
              ) : (
                <span
                  className={`h-2 w-2 rounded-full md:h-2.5 md:w-2.5 ${!isOn ? "bg-white/30" : ""}`}
                  style={isOn ? { backgroundColor: c.border } : undefined}
                />
              )}
            </button>
          );
        })}
      </div>
      <p className="text-center text-[11px] text-[var(--pac-blue)]/80 md:text-xs">
        Botones con luz (toca para encender o apagar)
      </p>
    </div>
  );
}
