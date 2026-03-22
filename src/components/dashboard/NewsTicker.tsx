"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type NewsTickerProps = {
  text?: string;
  /** 1 = 100% (por defecto). Menos = más lento, más = más rápido. */
  speedMultiplier?: number;
};

export function NewsTicker({
  text = "Promos activas esta semana Stock limitado Escríbenos por WhatsApp para pedidos personalizados ",
  speedMultiplier = 1,
}: NewsTickerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLSpanElement | null>(null);
  const [itemWidthPx, setItemWidthPx] = useState<number>(320);
  const [repeatCount, setRepeatCount] = useState<number>(6);
  const [durationSec, setDurationSec] = useState<number>(12);

  const normalizedText = useMemo(() => {
    // Mantiene un espacio final para separar repeticiones.
    const t = String(text ?? "");
    return t.endsWith(" ") ? t : `${t} `;
  }, [text]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const el = itemRef.current;
    if (!viewport || !el) return;

    const compute = () => {
      // Queremos que los textos cortos "vuelvan" rápido y que los largos se muevan un poco más lento.
      const itemWidth = el.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      if (!itemWidth || itemWidth < 1 || !viewportWidth || viewportWidth < 1)
        return;

      setItemWidthPx(itemWidth);

      const needed = Math.ceil(viewportWidth / itemWidth) + 2;
      setRepeatCount(Math.max(2, Math.min(12, needed)));

      // Base según largo del texto (sin % del panel; si no, el clamp mínimo anula el efecto).
      const isLong = itemWidth > 800;
      const basePxPerSec = isLong ? 90 : 190;
      const rawSeconds = itemWidth / basePxPerSec;
      const clampedBase = Math.max(
        isLong ? 7 : 3,
        Math.min(isLong ? 26 : 16, rawSeconds)
      );

      // Velocidad del panel: 100% = 1, 200% = el doble de rápido (mitad de duración).
      const mult = Math.max(0.25, Math.min(2.5, speedMultiplier));
      const seconds = clampedBase / mult;

      // Límites finales para evitar animaciones ilegibles o eternas.
      setDurationSec(Math.min(90, Math.max(0.35, seconds)));
    };

    compute();

    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [normalizedText, speedMultiplier]);

  return (
    <div
      className="overflow-hidden rounded-md py-3 text-[12px] uppercase tracking-widest text-pink-400"
      style={{
        background:
          "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,150,0.08) 50%, rgba(0,0,0,1) 100%)",
      }}
    >
      <style>{`
        @keyframes waxTickerMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--wax-ticker-distance))); }
        }
      `}</style>
      <div
        ref={viewportRef}
        className="overflow-hidden"
      >
        <div
          className="flex w-max will-change-transform"
          style={{
            ["--wax-ticker-distance" as never]: `${itemWidthPx}px`,
            animation: `waxTickerMarquee ${durationSec}s linear infinite`,
          }}
        >
          {Array.from({ length: repeatCount }).map((_, idx) => (
            <span
              // Solo el primero se mide para calcular el ancho real.
              ref={idx === 0 ? itemRef : undefined}
              key={idx}
              aria-hidden={idx === 0 ? undefined : true}
              className="animate-neon font-extrabold whitespace-nowrap [text-shadow:
                0_0_4px_#fff,
                0_0_10px_#ff00aa,
                0_0_20px_#ff00aa,
                0_0_40px_#ff0080,
                0_0_80px_#ff0080,
                0_0_120px_#ff0080]"
            >
              {normalizedText}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}