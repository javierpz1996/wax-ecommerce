"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDisplayNumber,
  getDisplayLabel,
  toWaMeDigits,
  DEFAULT_NUMBER,
} from "@/lib/whatsappNumber";

export function useWhatsappNumber() {
  const [storedNumber, setStoredNumber] = useState<string | null>(null);
  const [storedLabel, setStoredLabel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/whatsapp-number");
      if (res.ok) {
        const data = (await res.json()) as {
          number?: string | null;
          label?: string | null;
        };
        const n = data.number;
        const l = data.label;
        setStoredNumber(
          n != null && String(n).trim() !== "" ? String(n).trim() : null
        );
        setStoredLabel(
          l != null && String(l).trim() !== "" ? String(l).trim() : null
        );
      }
    } catch {
      setStoredNumber(null);
      setStoredLabel(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const setNumber = useCallback(async (newNumber: string | null) => {
    try {
      await fetch("/api/whatsapp-number", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: newNumber ?? "" }),
      });
      setStoredNumber(newNumber);
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const setLabel = useCallback(async (newLabel: string | null) => {
    try {
      await fetch("/api/whatsapp-number", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel ?? "" }),
      });
      setStoredLabel(newLabel);
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const displayNumber = getDisplayNumber(storedNumber);
  const displayLabel = getDisplayLabel(storedLabel);
  const whatsappHref = `https://wa.me/${toWaMeDigits(storedNumber)}`;

  return {
    number: displayNumber,
    storedNumber,
    whatsappHref,
    setNumber,
    label: displayLabel,
    storedLabel,
    setLabel,
    loading,
  };
}

export { DEFAULT_NUMBER };
