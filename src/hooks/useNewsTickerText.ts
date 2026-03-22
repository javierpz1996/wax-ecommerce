"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_NEWS_TICKER_SPEED_PERCENT } from "@/lib/newsTickerConstants";

export const DEFAULT_NEWS_TICKER_TEXT =
  "Promos activas esta semana Stock limitado Escríbenos por WhatsApp para pedidos personalizados ";

export function useNewsTickerText() {
  const [text, setText] = useState<string | null>(null);
  const [speedPercent, setSpeedPercent] = useState<number>(
    DEFAULT_NEWS_TICKER_SPEED_PERCENT
  );
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/news-ticker");
      if (res.ok) {
        const data = (await res.json()) as {
          text?: string | null;
          speedPercent?: number;
        };
        setText(data.text ?? null);
        const sp = data.speedPercent;
        setSpeedPercent(
          typeof sp === "number" && Number.isFinite(sp)
            ? Math.min(250, Math.max(25, Math.round(sp)))
            : DEFAULT_NEWS_TICKER_SPEED_PERCENT
        );
      }
    } catch {
      setText(null);
      setSpeedPercent(DEFAULT_NEWS_TICKER_SPEED_PERCENT);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const setNewsTickerText = useCallback(async (newText: string | null) => {
    try {
      const res = await fetch("/api/news-ticker", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newText ?? "",
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          text?: string | null;
          speedPercent?: number;
        };
        setText(data.text ?? null);
        if (typeof data.speedPercent === "number") {
          setSpeedPercent(data.speedPercent);
        }
      } else {
        setText(newText);
      }
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const setNewsTickerSpeedPercent = useCallback(async (percent: number) => {
    const clamped = Math.min(250, Math.max(25, Math.round(percent)));
    const res = await fetch("/api/news-ticker", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ speedPercent: clamped }),
    });
    if (!res.ok) {
      throw new Error("No se pudo guardar la velocidad");
    }
    const data = (await res.json()) as { speedPercent?: number };
    if (typeof data.speedPercent === "number") {
      setSpeedPercent(data.speedPercent);
    } else {
      setSpeedPercent(clamped);
    }
  }, []);

  const storedText = text && text.trim() !== "" ? text : null;
  return {
    text: storedText ?? DEFAULT_NEWS_TICKER_TEXT,
    storedText,
    speedPercent,
    setNewsTickerSpeedPercent,
    setNewsTickerText,
    loading,
  };
}
