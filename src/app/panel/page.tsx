"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useLightIcons } from "../../hooks/useLightIcons";
import { useLightMenuEnabled } from "../../hooks/useLightMenuEnabled";
import { useLogoUrl } from "../../hooks/useLogoUrl";
import { useNewsTickerText } from "../../hooks/useNewsTickerText";
import { useWhatsappNumber } from "../../hooks/useWhatsappNumber";

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
    loading: tickerLoading,
  } = useNewsTickerText();
  const [tickerInput, setTickerInput] = useState("");
  const [tickerSaving, setTickerSaving] = useState(false);
  const [tickerMessage, setTickerMessage] = useState<"ok" | "error" | null>(null);

  const {
    number: whatsappNumber,
    storedNumber: whatsappStoredNumber,
    setNumber: setWhatsappNumber,
    storedLabel: whatsappStoredLabel,
    setLabel: setWhatsappLabel,
    loading: whatsappLoading,
  } = useWhatsappNumber();
  const [whatsappInput, setWhatsappInput] = useState("");
  const [whatsappSaving, setWhatsappSaving] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState<"ok" | "error" | null>(null);
  const [whatsappLabelInput, setWhatsappLabelInput] = useState("");
  const [whatsappLabelSaving, setWhatsappLabelSaving] = useState(false);
  const [whatsappLabelMessage, setWhatsappLabelMessage] = useState<"ok" | "error" | null>(null);

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
    </div>
  );
}
