"use client";

import { useNewsTickerText } from "@/hooks/useNewsTickerText";
import { NewsTicker } from "./NewsTicker";

export function NewsTickerWithConfig() {
  const { text } = useNewsTickerText();
  return <NewsTicker text={text} />;
}
