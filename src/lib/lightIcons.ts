import { getSupabaseServer } from "./supabase-server";

const ICON_COUNT = 5;
const DEFAULT_ICONS = [
  "/images/icons/icono1.png",
  "/images/icons/icono2.png",
  "/images/icons/icono3.png",
  "/images/icons/icono4.png",
  "/images/icons/icono5.png",
];

function clampIndex(index: number): number {
  const i = Math.floor(index);
  if (i < 0) return 0;
  if (i >= ICON_COUNT) return ICON_COUNT - 1;
  return i;
}

export async function readLightIconUrls(): Promise<(string | null)[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [...DEFAULT_ICONS];

  const { data, error } = await supabase
    .from("light_icons_config")
    .select("id, url")
    .order("id", { ascending: true });

  if (error || !data) return [...DEFAULT_ICONS];

  const urls: (string | null)[] = [];
  for (let i = 1; i <= ICON_COUNT; i++) {
    const row = data.find((r) => r.id === i);
    const url =
      row?.url != null && String(row.url).trim() !== ""
        ? String(row.url).trim()
        : null;
    urls.push(url);
  }
  return urls;
}

export async function writeLightIconUrl(
  index: number,
  url: string | null
): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;

  const id = clampIndex(index) + 1;
  const value = url ? url.trim() : null;
  await supabase
    .from("light_icons_config")
    .upsert({ id, url: value }, { onConflict: "id" });
}

export function getDisplayIconUrls(stored: (string | null)[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < ICON_COUNT; i++) {
    const url = stored[i];
    result.push(
      url && url.trim() !== "" ? url.trim() : DEFAULT_ICONS[i]
    );
  }
  return result;
}

export { DEFAULT_ICONS, ICON_COUNT };
