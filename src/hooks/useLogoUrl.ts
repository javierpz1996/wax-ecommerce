"use client";

import { useCallback, useEffect, useState } from "react";

const DEFAULT_LOGO = "/images/logo1.png";

export function useLogoUrl() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLogo = useCallback(async () => {
    try {
      const res = await fetch("/api/logo");
      if (res.ok) {
        const data = (await res.json()) as { url?: string | null };
        setUrl(data.url ?? null);
      }
    } catch {
      setUrl(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  const setLogoUrl = useCallback(async (newUrl: string | null) => {
    try {
      await fetch("/api/logo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newUrl ?? "" }),
      });
      setUrl(newUrl);
    } catch {
      // revert could be done by re-fetching
    }
  }, []);

  const displayUrl = url && url.trim() !== "" ? url : null;
  return {
    logoUrl: displayUrl ?? DEFAULT_LOGO,
    storedUrl: displayUrl,
    setLogoUrl,
    loading,
  };
}
