"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDisplayNumber,
  getDisplayLabel,
  getDisplayIconUrl,
  toWaMeDigits,
  DEFAULT_NUMBER,
} from "@/lib/whatsappNumber";

export function useWhatsappNumber() {
  const [storedNumber, setStoredNumber] = useState<string | null>(null);
  const [storedLabel, setStoredLabel] = useState<string | null>(null);
  const [storedIconUrl, setStoredIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/whatsapp-number");
      if (res.ok) {
        const data = (await res.json()) as {
          number?: string | null;
          label?: string | null;
          iconUrl?: string | null;
        };
        const n = data.number;
        const l = data.label;
        const i = data.iconUrl;
        setStoredNumber(
          n != null && String(n).trim() !== "" ? String(n).trim() : null
        );
        setStoredLabel(
          l != null && String(l).trim() !== "" ? String(l).trim() : null
        );
        setStoredIconUrl(
          i != null && String(i).trim() !== "" ? String(i).trim() : null
        );
      }
    } catch {
      setStoredNumber(null);
      setStoredLabel(null);
      setStoredIconUrl(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const setNumber = useCallback(async (newNumber: string | null) => {
    try {
      const res = await fetch("/api/whatsapp-number", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: newNumber ?? "" }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          number?: string | null;
          iconUrl?: string | null;
        };
        setStoredNumber(
          data.number != null && String(data.number).trim() !== ""
            ? String(data.number).trim()
            : null
        );
        if (data.iconUrl !== undefined) {
          setStoredIconUrl(
            data.iconUrl != null && String(data.iconUrl).trim() !== ""
              ? String(data.iconUrl).trim()
              : null
          );
        }
      } else {
        setStoredNumber(newNumber);
      }
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const setLabel = useCallback(async (newLabel: string | null) => {
    try {
      const res = await fetch("/api/whatsapp-number", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel ?? "" }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          label?: string | null;
          iconUrl?: string | null;
        };
        setStoredLabel(
          data.label != null && String(data.label).trim() !== ""
            ? String(data.label).trim()
            : null
        );
        if (data.iconUrl !== undefined) {
          setStoredIconUrl(
            data.iconUrl != null && String(data.iconUrl).trim() !== ""
              ? String(data.iconUrl).trim()
              : null
          );
        }
      } else {
        setStoredLabel(newLabel);
      }
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const setIconUrl = useCallback(async (newIconUrl: string | null) => {
    try {
      const res = await fetch("/api/whatsapp-number", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iconUrl: newIconUrl ?? "" }),
      });
      if (res.ok) {
        const data = (await res.json()) as { iconUrl?: string | null };
        setStoredIconUrl(
          data.iconUrl != null && String(data.iconUrl).trim() !== ""
            ? String(data.iconUrl).trim()
            : null
        );
      }
    } catch {
      // ignore
    }
  }, []);

  const uploadWhatsappIcon = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/whatsapp/icon/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      throw new Error(data.error ?? "Error al subir");
    }
    const data = (await res.json()) as { url: string };
    setStoredIconUrl(data.url);
    return data.url;
  }, []);

  const displayNumber = getDisplayNumber(storedNumber);
  const displayLabel = getDisplayLabel(storedLabel);
  const displayIconUrl = getDisplayIconUrl(storedIconUrl);
  const whatsappHref = `https://wa.me/${toWaMeDigits(storedNumber)}`;

  return {
    number: displayNumber,
    storedNumber,
    whatsappHref,
    setNumber,
    label: displayLabel,
    storedLabel,
    setLabel,
    iconUrl: displayIconUrl,
    storedIconUrl,
    setIconUrl,
    uploadWhatsappIcon,
    loading,
  };
}

export { DEFAULT_NUMBER };
