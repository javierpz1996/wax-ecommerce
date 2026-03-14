import { getSupabaseServer } from "./supabase-server";

const ROW_ID = 1;

export async function readNewsTickerText(): Promise<string | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("news_ticker_config")
    .select("text")
    .eq("id", ROW_ID)
    .single();

  if (error || data?.text == null) return null;
  const text = String(data.text).trim();
  return text || null;
}

export async function writeNewsTickerText(text: string | null): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;

  const value = text ? text.trim() : null;
  await supabase
    .from("news_ticker_config")
    .upsert({ id: ROW_ID, text: value }, { onConflict: "id" });
}
