"use client";

import { useCallback, useEffect, useState } from "react";

const LIGHT_COUNT = 5;
const DEFAULT_ENABLED = Array(LIGHT_COUNT).fill(true) as boolean[];

export function useLightMenuEnabled() {
  const [enabled, setEnabled] = useState<boolean[]>(DEFAULT_ENABLED);
  const [loading, setLoading] = useState(true);

  const fetchLights = useCallback(async () => {
    try {
      const res = await fetch("/api/lights");
      if (res.ok) {
        const data = (await res.json()) as { enabled?: boolean[] };
        if (Array.isArray(data.enabled) && data.enabled.length >= LIGHT_COUNT) {
          setEnabled(data.enabled.slice(0, LIGHT_COUNT).map((v) => Boolean(v)));
        }
      }
    } catch {
      // mantener default
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLights();
  }, [fetchLights]);

  const setLightEnabled = useCallback(
    async (index: number, value: boolean) => {
      const next = [...enabled];
      next[index] = value;
      setEnabled(next);

      try {
        await fetch("/api/lights", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled: next }),
        });
      } catch {
        setEnabled(enabled);
      }
    },
    [enabled]
  );

  return { enabled, setLightEnabled, loading };
}
