import { getSupabaseServer } from "./supabase-server";

const ROW_ID = 1;
const DEFAULT_LOGO_URL = "/images/logo1.png";

export async function readLogoUrl(): Promise<string | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("logo_config")
    .select("url")
    .eq("id", ROW_ID)
    .single();

  if (error || data?.url == null || data?.url === "") return null;
  const url = String(data.url).trim();
  return url || null;
}

export async function writeLogoUrl(url: string | null): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;

  const value = url ? url.trim() : null;
  await supabase
    .from("logo_config")
    .upsert({ id: ROW_ID, url: value }, { onConflict: "id" });
}
