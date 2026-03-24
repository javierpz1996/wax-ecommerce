"use client";

/**
 * Pantalla inicial mientras se cargan logo, ticker, menú, WhatsApp, etc.
 */
export function AppLoadingScreen() {
  return (
    <div
      className="flex min-h-dvh w-full flex-1 flex-col items-center justify-center gap-6 bg-[var(--pac-screen)] px-0 py-16 text-white sm:px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative size-16">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--pac-yellow)]/30" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--pac-yellow)] border-r-pink-500/80" />
      </div>
      <p className="font-pixelify text-lg uppercase tracking-[0.2em] text-white/90">
        Cargando…
      </p>
      <p className="max-w-xs text-center text-xs text-white/45">
        Obteniendo configuración
      </p>
    </div>
  );
}
