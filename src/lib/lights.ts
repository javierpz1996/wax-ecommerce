import { getSupabaseServer } from "./supabase-server";

const LIGHT_COUNT = 5;
const ROW_ID = 1;
const DEFAULT_ENABLED = Array(LIGHT_COUNT).fill(true) as boolean[];

function normalizeEnabled(arr: boolean[]): boolean[] {
  const data = arr.slice(0, LIGHT_COUNT).map((v) => Boolean(v));
  while (data.length < LIGHT_COUNT) data.push(true);
  return data;
}

export async function readLightsState(): Promise<boolean[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [...DEFAULT_ENABLED];

  const { data, error } = await supabase
    .from("lights_state")
    .select("enabled")
    .eq("id", ROW_ID)
    .single();

  if (error || !data?.enabled) return [...DEFAULT_ENABLED];
  const arr = data.enabled as unknown;
  if (!Array.isArray(arr) || arr.length < LIGHT_COUNT) return [...DEFAULT_ENABLED];
  return normalizeEnabled(arr);
}

export async function writeLightsState(enabled: boolean[]): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;

  const payload = { id: ROW_ID, enabled: normalizeEnabled(enabled) };
  await supabase.from("lights_state").upsert(payload, { onConflict: "id" });
}
