"use client";

import { useState } from "react";

export function SubscripcionEmail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "No se pudo guardar el email.");
      }

      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-4 w-full max-w-[min(100%,380px)] md:max-w-md lg:max-w-lg">
      <p className="mb-3 text-center font-pixelify text-sm uppercase tracking-widest text-purple-300">
        Suscripción
      </p>
      <form
        onSubmit={handleSubmit}
        className="group relative rounded-xl"
      >
        <div className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-70 blur-md transition duration-300 group-focus-within:opacity-100" />
        <div className="relative flex flex-col gap-2 rounded-xl bg-black/70 p-3 border border-white/10">
          <p className="text-center text-xs text-white/70 uppercase tracking-[0.18em]">
            Dejá tu email y te avisamos promos.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-email@ejemplo.com"
              className="flex-1 rounded-md bg-black/60 px-3 py-2 text-xs text-white placeholder-white/40 outline-none border border-white/15 focus:border-fuchsia-400"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="rounded-md bg-fuchsia-500 px-3 py-2 text-xs font-bold text-black whitespace-nowrap transition hover:bg-fuchsia-400 disabled:opacity-50"
            >
              {status === "loading" ? "Enviando…" : "Ok"}
            </button>
          </div>
        </div>
        {status === "ok" && (
          <p className="text-[11px] text-emerald-400 text-center">
            ¡Listo! Te vamos a avisar por email.
          </p>
        )}
        {status === "error" && (
          <p className="text-[11px] text-red-400 text-center">
            No se pudo guardar. Probá de nuevo.
          </p>
        )}
      </form>
    </div>
  );
}

