"use client";

import { useCallback, useEffect, useState } from "react";

const DEFAULT_TEXT =
  "Promos activas esta semana Stock limitado Escríbenos por WhatsApp para pedidos personalizados ";

export function useNewsTickerText() {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchText = useCallback(async () => {
    try {
      const res = await fetch("/api/news-ticker");
      if (res.ok) {
        const data = (await res.json()) as { text?: string | null };
        setText(data.text ?? null);
      }
    } catch {
      setText(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchText();
  }, [fetchText]);

  const setNewsTickerText = useCallback(async (newText: string | null) => {
    try {
      await fetch("/api/news-ticker", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText ?? "" }),
      });
      setText(newText);
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const storedText = text && text.trim() !== "" ? text : null;
  return {
    text: storedText ?? DEFAULT_TEXT,
    storedText,
    setNewsTickerText,
    loading,
  };
}
