"use client";

import Link from "next/link";
import { useLightMenuEnabled } from "../../hooks/useLightMenuEnabled";

const LIGHT_LABELS = ["Luz 1", "Luz 2", "Luz 3", "Luz 4", "Luz 5"];
const LIGHT_COLORS = [
  "border-red-500 bg-red-500/20",
  "border-pink-500 bg-pink-500/20",
  "border-sky-400 bg-sky-400/20",
  "border-orange-500 bg-orange-500/20",
  "border-yellow-400 bg-yellow-400/20",
];

export default function PanelPage() {
  const { enabled, setLightEnabled } = useLightMenuEnabled();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-pixelify text-2xl uppercase tracking-widest text-[var(--pac-yellow)]">
          Panel
        </h1>
        <Link
          href="/"
          className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10"
        >
          Volver
        </Link>
      </div>

      <section className="rounded-lg bg-[var(--pac-screen)] p-6 shadow-lg">
        <h2 className="mb-4 font-pixelify text-lg uppercase tracking-wide text-white/90">
          Menú de luces
        </h2>
        <p className="mb-6 text-sm text-white/60">
          Activa o desactiva cada botón del menú. Solo se puede cambiar desde este panel.
        </p>
        <ul className="space-y-4">
          {enabled.map((isOn, index) => (
            <li
              key={index}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 ${LIGHT_COLORS[index % LIGHT_COLORS.length]}`}
            >
              <span className="font-medium text-white">
                {LIGHT_LABELS[index]}
              </span>
              <button
                type="button"
                onClick={() => setLightEnabled(index, !isOn)}
                className={`relative h-8 w-14 rounded-full transition-colors ${
                  isOn ? "bg-[var(--pac-yellow)]" : "bg-white/20"
                }`}
                aria-pressed={isOn}
                aria-label={`${LIGHT_LABELS[index]} ${isOn ? "encendido" : "apagado"}`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                    isOn ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
