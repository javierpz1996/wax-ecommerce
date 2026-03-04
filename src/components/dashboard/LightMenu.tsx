"use client";

import Image from "next/image";

const DEFAULT_ICONS = [
  "/images/icons/icono1.png",
  "/images/icons/icono2.png",
  "/images/icons/icono3.png",
  "/images/icons/icono4.png",
  "/images/icons/icono5.png",
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
    <div className="space-y-3 md:space-y-4 text-center">
      <p className="text-lg font-pixelify font-medium uppercase tracking-widest text-[var(--pac-yellow)]">
        Menú
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {Array.from({ length: count }).map((_, index) => {
          const isOn = activeIndex === index;
          const iconSrc = iconList[index];

          const colors = [
            { border: "#FF0000", glow: "rgba(255,0,0,0.7)" },
            { border: "#FF69B4", glow: "rgba(255,105,180,0.7)" },
            { border: "#00BFFF", glow: "rgba(0,191,255,0.7)" },
            { border: "#FFA500", glow: "rgba(255,165,0,0.7)" },
            { border: "#FFE600", glow: "rgba(255,230,0,0.7)" },
          ];

          const c = colors[index % colors.length];

          return (
            <button
              key={index}
              type="button"
              onClick={() => onToggle(index)}
              className="relative flex size-11 md:size-12 items-center justify-center overflow-hidden border-2 transition-all duration-300"
              style={
                isOn
                  ? {
                      borderColor: c.border,
                      backgroundColor: `${c.border}22`,
                      boxShadow: `
                        0 0 12px ${c.border},
                        0 0 28px ${c.border},
                        0 0 50px ${c.glow},
                        inset 0 0 15px ${c.border},
                        inset 0 0 30px ${c.glow}
                      `,
                    }
                  : {
                      borderColor: "var(--pac-outline)",
                      backgroundColor: "black",
                    }
              }
            >
              {iconSrc ? (
                <span className="relative block size-8 md:size-10">
                  <Image
                    src={iconSrc}
                    alt={`Ícono ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 32px, 40px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span
                  className="h-3 w-3"
                  style={{
                    backgroundColor: isOn
                      ? c.border
                      : "rgba(255,255,255,0.3)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}