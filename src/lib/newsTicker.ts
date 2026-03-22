import { getSupabaseServer } from "./supabase-server";
import { DEFAULT_NEWS_TICKER_SPEED_PERCENT } from "./newsTickerConstants";

const ROW_ID = 1;

export { DEFAULT_NEWS_TICKER_SPEED_PERCENT } from "./newsTickerConstants";

function clampSpeedPercent(n: number): number {
  if (!Number.isFinite(n)) return DEFAULT_NEWS_TICKER_SPEED_PERCENT;
  return Math.min(250, Math.max(25, Math.round(n)));
}

/** PostgREST / drivers a veces devuelven enteros como string. */
function parseSpeedPercent(raw: unknown): number {
  if (raw == null) return DEFAULT_NEWS_TICKER_SPEED_PERCENT;
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return clampSpeedPercent(raw);
  }
  if (typeof raw === "string" && raw.trim() !== "") {
    const n = Number(raw.trim());
    if (Number.isFinite(n)) return clampSpeedPercent(n);
  }
  return DEFAULT_NEWS_TICKER_SPEED_PERCENT;
}

export async function readNewsTickerConfig(): Promise<{
  text: string | null;
  speedPercent: number;
}> {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return { text: null, speedPercent: DEFAULT_NEWS_TICKER_SPEED_PERCENT };
  }

  const { data, error } = await supabase
    .from("news_ticker_config")
    .select("text, speed_percent")
    .eq("id", ROW_ID)
    .single();

  if (error) {
    return { text: null, speedPercent: DEFAULT_NEWS_TICKER_SPEED_PERCENT };
  }

  let text: string | null = null;
  if (data?.text != null) {
    const t = String(data.text).trim();
    text = t || null;
  }

  const raw = (data as { speed_percent?: unknown })?.speed_percent;
  const speedPercent = parseSpeedPercent(raw);

  return { text, speedPercent };
}

export async function readNewsTickerText(): Promise<string | null> {
  const cfg = await readNewsTickerConfig();
  return cfg.text;
}

export async function writeNewsTickerText(text: string | null): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) {
    throw new Error("Supabase no configurado (NEXT_PUBLIC_SUPABASE_URL / KEY)");
  }

  const value = text ? text.trim() : null;
  const { error } = await supabase
    .from("news_ticker_config")
    .update({ text: value })
    .eq("id", ROW_ID);
  if (error) throw error;
}

export async function writeNewsTickerSpeedPercent(
  speedPercent: number
): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) {
    throw new Error("Supabase no configurado (NEXT_PUBLIC_SUPABASE_URL / KEY)");
  }

  const { error } = await supabase
    .from("news_ticker_config")
    .update({ speed_percent: clampSpeedPercent(speedPercent) })
    .eq("id", ROW_ID);

  if (error) throw error;
}
