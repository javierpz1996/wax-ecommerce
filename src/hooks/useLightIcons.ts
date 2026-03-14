"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getDisplayIconUrls,
  DEFAULT_ICONS,
  ICON_COUNT,
} from "@/lib/lightIcons";

export function useLightIcons() {
  const [storedIcons, setStoredIcons] = useState<(string | null)[]>(
    () => Array(ICON_COUNT).fill(null)
  );
  const [loading, setLoading] = useState(true);

  const fetchIcons = useCallback(async () => {
    try {
      const res = await fetch("/api/lights/icons");
      if (res.ok) {
        const data = (await res.json()) as { icons?: (string | null)[] };
        const list = data.icons;
        if (Array.isArray(list)) {
          setStoredIcons(
            list.slice(0, ICON_COUNT).map((u) =>
              u != null && String(u).trim() !== "" ? String(u).trim() : null
            )
          );
        }
      }
    } catch {
      setStoredIcons(Array(ICON_COUNT).fill(null));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIcons();
  }, [fetchIcons]);

  const setIconUrl = useCallback(async (index: number, url: string | null) => {
    const i = Math.max(0, Math.min(ICON_COUNT - 1, Math.floor(index)));
    try {
      await fetch("/api/lights/icons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: i, url: url ?? "" }),
      });
      setStoredIcons((prev) => {
        const next = [...prev];
        next[i] = url;
        return next;
      });
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const uploadIcon = useCallback(async (index: number, file: File): Promise<string> => {
    const i = Math.max(0, Math.min(ICON_COUNT - 1, Math.floor(index)));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("index", String(i));
    const res = await fetch("/api/lights/icons/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      throw new Error(data.error ?? "Error al subir");
    }
    const data = (await res.json()) as { url: string };
    setStoredIcons((prev) => {
      const next = [...prev];
      next[i] = data.url;
      return next;
    });
    return data.url;
  }, []);

  const icons = getDisplayIconUrls(storedIcons);
  return {
    icons,
    storedIcons,
    setIconUrl,
    uploadIcon,
    loading,
    refetch: fetchIcons,
  };
}

export { DEFAULT_ICONS, ICON_COUNT };
