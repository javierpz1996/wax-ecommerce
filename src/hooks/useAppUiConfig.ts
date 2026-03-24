"use client";

import { useCallback, useEffect, useState } from "react";

export function useAppUiConfig() {
  const [showEmailSubscription, setShowEmailSubscriptionState] =
    useState(true);
  const [loading, setLoading] = useState(true);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/app-ui");
      if (res.ok) {
        const data = (await res.json()) as {
          showEmailSubscription?: boolean;
        };
        setShowEmailSubscriptionState(data.showEmailSubscription !== false);
      }
    } catch {
      setShowEmailSubscriptionState(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const setShowEmailSubscription = useCallback(async (show: boolean) => {
    const res = await fetch("/api/app-ui", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showEmailSubscription: show }),
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      throw new Error(data.error ?? "No se pudo guardar");
    }
    const data = (await res.json()) as { showEmailSubscription?: boolean };
    setShowEmailSubscriptionState(data.showEmailSubscription !== false);
  }, []);

  return {
    showEmailSubscription,
    setShowEmailSubscription,
    loading,
    refetch: fetchConfig,
  };
}
