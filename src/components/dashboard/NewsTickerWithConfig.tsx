"use client";

import { useNewsTickerText } from "@/hooks/useNewsTickerText";
import { NewsTicker } from "./NewsTicker";

export function NewsTickerWithConfig() {
  const { text, speedPercent } = useNewsTickerText();
  return (
    <NewsTicker text={text} speedMultiplier={speedPercent / 100} />
  );
}
