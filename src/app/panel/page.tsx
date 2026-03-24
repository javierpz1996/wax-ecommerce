"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLightIcons } from "../../hooks/useLightIcons";
import { useLightMenuEnabled } from "../../hooks/useLightMenuEnabled";
import { useLogoUrl } from "../../hooks/useLogoUrl";
import {
  DEFAULT_NEWS_TICKER_TEXT,
  useNewsTickerText,
} from "../../hooks/useNewsTickerText";
import { NewsTicker } from "../../components/dashboard/NewsTicker";
import { useWhatsappNumber } from "../../hooks/useWhatsappNumber";
import { useAppUiConfig } from "../../hooks/useAppUiConfig";

const LIGHT_LABELS = ["Botón 1", "Botón 2", "Botón 3", "Botón 4", "Botón 5"];
const LIGHT_COLORS = [
  "border-red-500 bg-red-500/20",
  "border-pink-500 bg-pink-500/20",
  "border-sky-400 bg-sky-400/20",
  "border-orange-500 bg-orange-500/20",
  "border-yellow-400 bg-yellow-400/20",
];

export default function PanelPage() {
  const { enabled, setLightEnabled } = useLightMenuEnabled();
  const {
    storedIcons,
    setIconUrl,
    uploadIcon,
    loading: iconsLoading,
  } = useLightIcons();
  const [iconInputs, setIconInputs] = useState<string[]>(() =>
    Array(5).fill("")
  );
  const [iconSavingIndex, setIconSavingIndex] = useState<number | null>(null);
  const [iconUploadingIndex, setIconUploadingIndex] = useState<number | null>(
    null
  );
  const [iconMessage, setIconMessage] = useState<{
    index: number;
    type: "ok" | "error";
  } | null>(null);
  const iconFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { storedUrl, setLogoUrl, uploadLogo, loading: logoLoading } =
    useLogoUrl();
  const [logoInput, setLogoInput] = useState("");
  const [logoSaving, setLogoSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoMessage, setLogoMessage] = useState<"ok" | "error" | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    storedText: tickerStoredText,
    setNewsTickerText,
    speedPercent: tickerSpeedPercent,
    setNewsTickerSpeedPercent,
    loading: tickerLoading,
  } = useNewsTickerText();
  const [tickerInput, setTickerInput] = useState("");
  const [tickerSaving, setTickerSaving] = useState(false);
  const [tickerMessage, setTickerMessage] = useState<"ok" | "error" | null>(null);
  const [tickerSpeedDraft, setTickerSpeedDraft] = useState(100);
  const [tickerSpeedSaving, setTickerSpeedSaving] = useState(false);
  const [tickerSpeedMessage, setTickerSpeedMessage] = useState<
    "ok" | "error" | null
  >(null);

  const {
    number: whatsappNumber,
    storedNumber: whatsappStoredNumber,
    setNumber: setWhatsappNumber,
    storedLabel: whatsappStoredLabel,
    setLabel: setWhatsappLabel,
    storedIconUrl: whatsappStoredIconUrl,
    setIconUrl: setWhatsappIconUrl,
    uploadWhatsappIcon,
    loading: whatsappLoading,
  } = useWhatsappNumber();
  const [whatsappInput, setWhatsappInput] = useState("");
  const [whatsappSaving, setWhatsappSaving] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState<"ok" | "error" | null>(null);
  const [whatsappLabelInput, setWhatsappLabelInput] = useState("");
  const [whatsappLabelSaving, setWhatsappLabelSaving] = useState(false);
  const [whatsappLabelMessage, setWhatsappLabelMessage] = useState<"ok" | "error" | null>(null);
  const [whatsappIconInput, setWhatsappIconInput] = useState("");
  const [whatsappIconSaving, setWhatsappIconSaving] = useState(false);
  const [whatsappIconUploading, setWhatsappIconUploading] = useState(false);
  const [whatsappIconMessage, setWhatsappIconMessage] = useState<
    "ok" | "error" | null
  >(null);
  const whatsappIconFileInputRef = useRef<HTMLInputElement | null>(null);

  const [subsLoading, setSubsLoading] = useState(true);
  const [subsCount, setSubsCount] = useState<number>(0);
  const [subsEmails, setSubsEmails] = useState<string[]>([]);
  const [subsMessage, setSubsMessage] = useState<"copied" | "error" | null>(
    null
  );

  const {
    showEmailSubscription,
    setShowEmailSubscription,
    loading: appUiLoading,
  } = useAppUiConfig();
  const [subsVisibilityMessage, setSubsVisibilityMessage] = useState<
    "ok" | "error" | null
  >(null);

  const handleToggleSubscriptionForm = async () => {
    setSubsVisibilityMessage(null);
    try {
      await setShowEmailSubscription(!showEmailSubscription);
      setSubsVisibilityMessage("ok");
    } catch {
      setSubsVisibilityMessage("error");
    }
  };

  const handleTickerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTickerMessage(null);
    setTickerSaving(true);
    try {
      const text = tickerInput.trim() || null;
      await setNewsTickerText(text);
      setTickerMessage("ok");
      if (!text) setTickerInput("");
    } catch {
      setTickerMessage("error");
    } finally {
      setTickerSaving(false);
    }
  };

  const handleTickerSpeedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTickerSpeedMessage(null);
    setTickerSpeedSaving(true);
    try {
      await setNewsTickerSpeedPercent(tickerSpeedDraft);
      setTickerSpeedMessage("ok");
    } catch {
      setTickerSpeedMessage("error");
    } finally {
      setTickerSpeedSaving(false);
    }
  };

  useEffect(() => {
    if (!tickerLoading) {
      setTickerSpeedDraft(tickerSpeedPercent);
    }
  }, [tickerLoading, tickerSpeedPercent]);

  const handleLogoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogoMessage(null);
    setLogoSaving(true);
    try {
      const url = logoInput.trim() || null;
      await setLogoUrl(url);
      setLogoMessage("ok");
      if (!url) setLogoInput("");
    } catch {
      setLogoMessage("error");
    } finally {
      setLogoSaving(false);
    }
  };

  const handleLogoFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoMessage(null);
    setLogoUploading(true);
    try {
      await uploadLogo(file);
      setLogoMessage("ok");
      setLogoInput("");
      e.target.value = "";
    } catch (err) {
      setLogoMessage("error");
      e.target.value = "";
    } finally {
      setLogoUploading(false);
    }
  };

  const handleIconSubmit = async (index: number, e: React.FormEvent) => {
    e.preventDefault();
    setIconMessage(null);
    setIconSavingIndex(index);
    try {
      const url = (iconInputs[index] ?? "").trim() || null;
      await setIconUrl(index, url);
      setIconMessage({ index, type: "ok" });
      setIconInputs((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
    } catch {
      setIconMessage({ index, type: "error" });
    } finally {
      setIconSavingIndex(null);
    }
  };

  const handleIconFileChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIconMessage(null);
    setIconUploadingIndex(index);
    try {
      await uploadIcon(index, file);
      setIconMessage({ index, type: "ok" });
      e.target.value = "";
    } catch {
      setIconMessage({ index, type: "error" });
      e.target.value = "";
    } finally {
      setIconUploadingIndex(null);
    }
  };

  const handleWhatsappSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappMessage(null);
    setWhatsappSaving(true);
    try {
      const number = whatsappInput.trim() || null;
      await setWhatsappNumber(number);
      setWhatsappMessage("ok");
      if (!number) setWhatsappInput("");
    } catch {
      setWhatsappMessage("error");
    } finally {
      setWhatsappSaving(false);
    }
  };

  const handleWhatsappLabelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappLabelMessage(null);
    setWhatsappLabelSaving(true);
    try {
      const label = whatsappLabelInput.trim() || null;
      await setWhatsappLabel(label);
      setWhatsappLabelMessage("ok");
      if (!label) setWhatsappLabelInput("");
    } catch {
      setWhatsappLabelMessage("error");
    } finally {
      setWhatsappLabelSaving(false);
    }
  };

  const handleWhatsappIconSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappIconMessage(null);
    setWhatsappIconSaving(true);
    try {
      const url = whatsappIconInput.trim() || null;
      await setWhatsappIconUrl(url);
      setWhatsappIconMessage("ok");
      if (!url) setWhatsappIconInput("");
    } catch {
      setWhatsappIconMessage("error");
    } finally {
      setWhatsappIconSaving(false);
    }
  };

  const handleWhatsappIconFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setWhatsappIconMessage(null);
    setWhatsappIconUploading(true);
    try {
      await uploadWhatsappIcon(file);
      setWhatsappIconMessage("ok");
      setWhatsappIconInput("");
      e.target.value = "";
    } catch {
      setWhatsappIconMessage("error");
      e.target.value = "";
    } finally {
      setWhatsappIconUploading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/subscriptions");
        if (res.ok) {
          const data = (await res.json()) as {
            count?: number;
            emails?: string[];
          };
          setSubsCount(typeof data.count === "number" ? data.count : 0);
          setSubsEmails(Array.isArray(data.emails) ? data.emails : []);
        }
      } finally {
        setSubsLoading(false);
      }
    };
    load();
  }, []);

  const handleCopySubsEmails = async () => {
    setSubsMessage(null);
    try {
      const text = subsEmails.join(", ");
      await navigator.clipboard.writeText(text);
      setSubsMessage("copied");
    } catch {
      setSubsMessage("error");
    }
  };

  const tickerPreviewText =
    tickerInput.trim() || tickerStoredText || DEFAULT_NEWS_TICKER_TEXT;

  const tickerSpeedDescription =
    tickerSpeedDraft === 100
      ? "Velocidad normal"
      : tickerSpeedDraft < 100
        ? "Más lento que el predeterminado"
        : "Más rápido que el predeterminado";

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 px-0 py-10 sm:px-6">
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
          Logo
        </h2>
        <p className="mb-4 text-sm text-white/60">
          Subí una imagen desde tu celular o PC, o ingresá la URL de una imagen.
        </p>

        <div className="mb-4">
          <input
            ref={logoFileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleLogoFileChange}
            className="hidden"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => logoFileInputRef.current?.click()}
            disabled={logoLoading || logoUploading}
            className="w-full rounded-md border border-dashed border-white/30 bg-white/5 py-4 text-sm text-white/80 transition hover:border-[var(--pac-yellow)] hover:bg-white/10 disabled:opacity-50"
          >
            {logoUploading
              ? "Subiendo…"
              : "Elegir imagen (galería o PC)"}
          </button>
        </div>

        <form onSubmit={handleLogoSubmit} className="space-y-3">
          <input
            type="url"
            value={logoInput}
            onChange={(e) => setLogoInput(e.target.value)}
            onFocus={() => !logoLoading && setLogoInput(storedUrl ?? "")}
            placeholder={logoLoading ? "Cargando…" : storedUrl || "https://ejemplo.com/logo.png"}
            className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--pac-yellow)]"
            disabled={logoLoading}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={logoLoading || logoSaving}
              className="rounded-md bg-[var(--pac-yellow)] px-4 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
            >
              {logoSaving ? "Guardando…" : "Guardar logo"}
            </button>
            {storedUrl && (
              <button
                type="button"
                onClick={() => {
                  setLogoInput("");
                  setLogoUrl(null);
                  setLogoMessage("ok");
                }}
                disabled={logoLoading || logoSaving}
                className="text-sm text-white/60 underline hover:text-white disabled:opacity-50"
              >
                Restaurar default
              </button>
            )}
          </div>
          {logoMessage === "ok" && (
            <p className="text-sm text-emerald-400">Logo actualizado.</p>
          )}
          {logoMessage === "error" && (
            <p className="text-sm text-red-400">No se pudo guardar.</p>
          )}
        </form>
      </section>

      <section className="rounded-lg bg-[var(--pac-screen)] p-6 shadow-lg">
        <h2 className="mb-4 font-pixelify text-lg uppercase tracking-wide text-white/90">
          News Ticker
        </h2>
        <p className="mb-4 text-sm text-white/60">
          Cambiá el texto que se muestra en la banda de noticias de la página principal.
        </p>
        <form onSubmit={handleTickerSubmit} className="space-y-3">
          <textarea
            value={tickerInput}
            onChange={(e) => setTickerInput(e.target.value)}
            onFocus={() =>
              !tickerLoading && setTickerInput(tickerStoredText ?? "")
            }
            placeholder={
              tickerLoading
                ? "Cargando…"
                : tickerStoredText ||
                  "Promos activas esta semana Stock limitado Escríbenos por WhatsApp..."
            }
            rows={3}
            className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--pac-yellow)] resize-y"
            disabled={tickerLoading}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={tickerLoading || tickerSaving}
              className="rounded-md bg-[var(--pac-yellow)] px-4 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
            >
              {tickerSaving ? "Guardando…" : "Guardar texto"}
            </button>
            {tickerStoredText && (
              <button
                type="button"
                onClick={() => {
                  setTickerInput("");
                  setNewsTickerText(null);
                  setTickerMessage("ok");
                }}
                disabled={tickerLoading || tickerSaving}
                className="text-sm text-white/60 underline hover:text-white disabled:opacity-50"
              >
                Restaurar default
              </button>
            )}
          </div>
          {tickerMessage === "ok" && (
            <p className="text-sm text-emerald-400">Texto actualizado.</p>
          )}
          {tickerMessage === "error" && (
            <p className="text-sm text-red-400">No se pudo guardar.</p>
          )}
        </form>

        <div className="mt-8 rounded-xl border border-white/15 bg-black/35 p-4 shadow-inner">
          <h3 className="mb-1 font-pixelify text-sm uppercase tracking-wide text-white/90">
            Velocidad del ticker
          </h3>
          <p className="mb-4 text-xs text-white/55">
            100% es la velocidad base. Subí el porcentaje para que se mueva más
            rápido, o bajalo para que vaya más lento. Guardá para aplicar en la
            página principal.
          </p>

          <form onSubmit={handleTickerSpeedSubmit} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-2xl font-bold tabular-nums text-[var(--pac-yellow)]">
                  {tickerSpeedDraft}%
                </p>
                <p className="text-xs text-white/50">{tickerSpeedDescription}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={tickerLoading || tickerSpeedDraft <= 25}
                  onClick={() =>
                    setTickerSpeedDraft((v) => Math.max(25, v - 10))
                  }
                  className="rounded-md border border-white/25 bg-black/50 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  −10
                </button>
                <button
                  type="button"
                  disabled={tickerLoading || tickerSpeedDraft >= 250}
                  onClick={() =>
                    setTickerSpeedDraft((v) => Math.min(250, v + 10))
                  }
                  className="rounded-md border border-white/25 bg-black/50 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  +10
                </button>
                <button
                  type="button"
                  disabled={tickerLoading}
                  onClick={() => setTickerSpeedDraft(100)}
                  className="text-xs text-white/50 underline hover:text-white disabled:opacity-40"
                >
                  Reset 100%
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="ticker-speed-range"
                className="mb-1 block text-xs text-white/60"
              >
                Ajuste fino (25% – 250%)
              </label>
              <input
                id="ticker-speed-range"
                type="range"
                min={25}
                max={250}
                step={1}
                value={tickerSpeedDraft}
                disabled={tickerLoading}
                onChange={(e) =>
                  setTickerSpeedDraft(Number(e.target.value))
                }
                className="h-2 w-full cursor-pointer accent-[var(--pac-yellow)] disabled:opacity-50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={tickerLoading || tickerSpeedSaving}
                className="rounded-md bg-[var(--pac-yellow)] px-4 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {tickerSpeedSaving ? "Guardando…" : "Guardar velocidad"}
              </button>
              {tickerSpeedPercent !== tickerSpeedDraft && !tickerLoading && (
                <span className="text-xs text-amber-300/90">
                  Cambios sin guardar
                </span>
              )}
            </div>
            {tickerSpeedMessage === "ok" && (
              <p className="text-sm text-emerald-400">Velocidad guardada.</p>
            )}
            {tickerSpeedMessage === "error" && (
              <p className="text-sm text-red-400">No se pudo guardar.</p>
            )}
          </form>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">
              Vista previa (usa el texto de arriba y la velocidad del control)
            </p>
            <div className="overflow-hidden rounded-lg border border-pink-500/20 bg-black/60">
              <NewsTicker
                text={tickerPreviewText}
                speedMultiplier={tickerSpeedDraft / 100}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-[var(--pac-screen)] p-6 shadow-lg">
        <h2 className="mb-4 font-pixelify text-lg uppercase tracking-wide text-white/90">
          Número de WhatsApp
        </h2>
        <p className="mb-4 text-sm text-white/60">
          Este número se muestra como "Número actual" y es el link del botón de WhatsApp.
        </p>
        <form onSubmit={handleWhatsappSubmit} className="space-y-3">
          <input
            type="tel"
            value={whatsappInput}
            onChange={(e) => setWhatsappInput(e.target.value)}
            onFocus={() =>
              !whatsappLoading && setWhatsappInput(whatsappStoredNumber ?? "")
            }
            placeholder={
              whatsappLoading ? "Cargando…" : whatsappStoredNumber || "+54 11 1234 5678"
            }
            className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--pac-yellow)]"
            disabled={whatsappLoading}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={whatsappLoading || whatsappSaving}
              className="rounded-md bg-[var(--pac-yellow)] px-4 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
            >
              {whatsappSaving ? "Guardando…" : "Guardar número"}
            </button>
            {whatsappStoredNumber && (
              <button
                type="button"
                onClick={() => {
                  setWhatsappInput("");
                  setWhatsappNumber(null);
                  setWhatsappMessage("ok");
                }}
                disabled={whatsappLoading || whatsappSaving}
                className="text-sm text-white/60 underline hover:text-white disabled:opacity-50"
              >
                Restaurar default
              </button>
            )}
          </div>
          {whatsappMessage === "ok" && (
            <p className="text-sm text-emerald-400">Número actualizado.</p>
          )}
          {whatsappMessage === "error" && (
            <p className="text-sm text-red-400">No se pudo guardar.</p>
          )}
        </form>

        <p className="mb-2 mt-6 text-sm text-white/60">
          Texto del botón (ej. "Escribinos por WhatsApp").
        </p>
        <form onSubmit={handleWhatsappLabelSubmit} className="space-y-3">
          <input
            type="text"
            value={whatsappLabelInput}
            onChange={(e) => setWhatsappLabelInput(e.target.value)}
            onFocus={() =>
              !whatsappLoading && setWhatsappLabelInput(whatsappStoredLabel ?? "")
            }
            placeholder={
              whatsappLoading ? "Cargando…" : whatsappStoredLabel || "Escribinos por WhatsApp"
            }
            className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--pac-yellow)]"
            disabled={whatsappLoading}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={whatsappLoading || whatsappLabelSaving}
              className="rounded-md bg-[var(--pac-yellow)] px-4 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
            >
              {whatsappLabelSaving ? "Guardando…" : "Guardar texto"}
            </button>
            {whatsappStoredLabel && (
              <button
                type="button"
                onClick={() => {
                  setWhatsappLabelInput("");
                  setWhatsappLabel(null);
                  setWhatsappLabelMessage("ok");
                }}
                disabled={whatsappLoading || whatsappLabelSaving}
                className="text-sm text-white/60 underline hover:text-white disabled:opacity-50"
              >
                Restaurar default
              </button>
            )}
          </div>
          {whatsappLabelMessage === "ok" && (
            <p className="text-sm text-emerald-400">Texto actualizado.</p>
          )}
          {whatsappLabelMessage === "error" && (
            <p className="text-sm text-red-400">No se pudo guardar.</p>
          )}
        </form>

        <p className="mb-2 mt-6 text-sm text-white/60">
          Ícono del botón (igual que el menú: URL o imagen desde galería / PC).
        </p>
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
          <input
            ref={whatsappIconFileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleWhatsappIconFileChange}
            className="hidden"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => whatsappIconFileInputRef.current?.click()}
            disabled={whatsappLoading || whatsappIconUploading}
            className="mb-3 w-full rounded-md border border-dashed border-white/30 bg-black/30 py-3 text-sm text-white/80 transition hover:border-green-400/60 hover:bg-black/40 disabled:opacity-50"
          >
            {whatsappIconUploading ? "Subiendo…" : "Elegir imagen del ícono"}
          </button>
          <form onSubmit={handleWhatsappIconSubmit} className="space-y-3">
            <input
              type="url"
              value={whatsappIconInput}
              onChange={(e) => setWhatsappIconInput(e.target.value)}
              onFocus={() =>
                !whatsappLoading &&
                setWhatsappIconInput(whatsappStoredIconUrl ?? "")
              }
              placeholder={
                whatsappLoading
                  ? "Cargando…"
                  : whatsappStoredIconUrl || "https://…/icono.png"
              }
              className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--pac-yellow)]"
              disabled={whatsappLoading}
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={whatsappLoading || whatsappIconSaving}
                className="rounded-md bg-[var(--pac-yellow)] px-4 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {whatsappIconSaving ? "Guardando…" : "Guardar URL del ícono"}
              </button>
              {whatsappStoredIconUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setWhatsappIconInput("");
                    setWhatsappIconUrl(null);
                    setWhatsappIconMessage("ok");
                  }}
                  disabled={whatsappLoading || whatsappIconSaving}
                  className="text-sm text-white/60 underline hover:text-white disabled:opacity-50"
                >
                  Ícono por defecto (SVG WhatsApp)
                </button>
              )}
            </div>
            {whatsappIconMessage === "ok" && (
              <p className="text-sm text-emerald-400">Ícono actualizado.</p>
            )}
            {whatsappIconMessage === "error" && (
              <p className="text-sm text-red-400">No se pudo guardar.</p>
            )}
          </form>
        </div>
      </section>

      <section className="rounded-lg bg-[var(--pac-screen)] p-6 shadow-lg">
        <h2 className="mb-4 font-pixelify text-lg uppercase tracking-wide text-white/90">
          Iconos de los botones
        </h2>
        <p className="mb-4 text-sm text-white/60">
          Cambiá el ícono de cada botón del menú por URL o subiendo una imagen desde tu celular o PC.
        </p>
        <div className="space-y-5">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`rounded-lg border px-4 py-3 ${LIGHT_COLORS[index]}`}
            >
              <p className="mb-3 font-medium text-white">
                {LIGHT_LABELS[index]}
              </p>
              <input
                ref={(el) => {
                  iconFileInputRefs.current[index] = el;
                }}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(e) => handleIconFileChange(index, e)}
                className="hidden"
                aria-hidden
              />
              <button
                type="button"
                onClick={() => iconFileInputRefs.current[index]?.click()}
                disabled={iconsLoading || iconUploadingIndex !== null}
                className="mb-3 w-full rounded-md border border-dashed border-white/30 bg-white/5 py-2 text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-50"
              >
                {iconUploadingIndex === index
                  ? "Subiendo…"
                  : "Elegir imagen (galería o PC)"}
              </button>
              <form
                onSubmit={(e) => handleIconSubmit(index, e)}
                className="flex flex-wrap items-center gap-2"
              >
                <input
                  type="url"
                  value={iconInputs[index] ?? ""}
                  onChange={(e) =>
                    setIconInputs((prev) => {
                      const next = [...prev];
                      next[index] = e.target.value;
                      return next;
                    })
                  }
                  onFocus={() =>
                    !iconsLoading &&
                    setIconInputs((prev) => {
                      const next = [...prev];
                      next[index] = storedIcons[index] ?? "";
                      return next;
                    })
                  }
                  placeholder={
                    iconsLoading
                      ? "Cargando…"
                      : storedIcons[index] || "https://ejemplo.com/icono.png"
                  }
                  className="min-w-0 flex-1 rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[var(--pac-yellow)]"
                  disabled={iconsLoading}
                />
                <button
                  type="submit"
                  disabled={
                    iconsLoading || iconSavingIndex !== null
                  }
                  className="rounded-md bg-[var(--pac-yellow)] px-3 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  {iconSavingIndex === index ? "Guardando…" : "Guardar URL"}
                </button>
                {storedIcons[index] && (
                  <button
                    type="button"
                    onClick={() => {
                      setIconUrl(index, null);
                      setIconInputs((prev) => {
                        const next = [...prev];
                        next[index] = "";
                        return next;
                      });
                      setIconMessage({ index, type: "ok" });
                    }}
                    disabled={iconsLoading}
                    className="text-sm text-white/60 underline hover:text-white disabled:opacity-50"
                  >
                    Default
                  </button>
                )}
              </form>
              {iconMessage?.index === index && (
                <p
                  className={`mt-2 text-sm ${
                    iconMessage.type === "ok"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {iconMessage.type === "ok"
                    ? "Icono actualizado."
                    : "No se pudo guardar."}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

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

      <section className="rounded-lg border-t border-white/15 bg-[var(--pac-screen)] p-6 shadow-lg">
        <h2 className="mb-3 font-pixelify text-lg uppercase tracking-wide text-white/90">
          Email para subscriptores
        </h2>
        <p className="mb-4 text-sm text-white/60">
          Escribí el asunto y el contenido del email que querés enviar a todas las personas que se subscribieron.
          Más adelante vas a poder usar este texto en tu herramienta de email masivo.
        </p>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-fuchsia-500/30 bg-fuchsia-950/20 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-white">
              Formulario de suscripción en la página
            </p>
            <p className="text-xs text-white/50">
              Mostrá u ocultá el bloque donde la gente deja su email en la home.
            </p>
          </div>
          <button
            type="button"
            disabled={appUiLoading}
            onClick={handleToggleSubscriptionForm}
            className={`relative h-9 w-16 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
              showEmailSubscription
                ? "bg-fuchsia-500"
                : "bg-white/20"
            }`}
            aria-pressed={showEmailSubscription}
            aria-label={
              showEmailSubscription
                ? "Ocultar formulario de suscripción"
                : "Mostrar formulario de suscripción"
            }
          >
            <span
              className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition-transform ${
                showEmailSubscription ? "left-8" : "left-1"
              }`}
            />
          </button>
        </div>
        {subsVisibilityMessage === "ok" && (
          <p className="-mt-2 mb-4 text-xs text-emerald-400">
            Preferencia guardada.
          </p>
        )}
        {subsVisibilityMessage === "error" && (
          <p className="-mt-2 mb-4 text-xs text-red-400">
            No se pudo guardar. Revisá Supabase o la conexión.
          </p>
        )}

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2">
            <p className="text-sm text-white/70">
              Subscriptores:{" "}
              <span className="font-bold text-white">
                {subsLoading ? "…" : subsCount}
              </span>
            </p>
            <button
              type="button"
              onClick={handleCopySubsEmails}
              disabled={subsLoading || subsCount === 0}
              className="rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-50"
            >
              Copiar emails
            </button>
          </div>
          {subsMessage === "copied" && (
            <p className="text-xs text-emerald-400">
              Emails copiados al portapapeles.
            </p>
          )}
          {subsMessage === "error" && (
            <p className="text-xs text-red-400">
              No se pudo copiar. Probá de nuevo.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
