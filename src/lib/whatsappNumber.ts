import { getSupabaseServer } from "./supabase-server";

const ROW_ID = 1;
const DEFAULT_NUMBER = "+541152357094";
const DEFAULT_LABEL = "Escribinos por WhatsApp";

export type WhatsappConfig = {
  number: string | null;
  label: string | null;
  iconUrl: string | null;
};

export async function readWhatsappConfig(): Promise<WhatsappConfig> {
  const supabase = getSupabaseServer();
  if (!supabase) return { number: null, label: null, iconUrl: null };

  const { data, error } = await supabase
    .from("whatsapp_number_config")
    .select("number, label, icon_url")
    .eq("id", ROW_ID)
    .single();

  if (error) return { number: null, label: null, iconUrl: null };
  const num = data?.number != null ? String(data.number).trim() : null;
  const lbl = data?.label != null ? String(data.label).trim() : null;
  const icon =
    (data as { icon_url?: unknown })?.icon_url != null
      ? String((data as { icon_url?: unknown }).icon_url).trim()
      : null;
  return {
    number: num || null,
    label: lbl || null,
    iconUrl: icon || null,
  };
}

export async function readWhatsappNumber(): Promise<string | null> {
  const { number } = await readWhatsappConfig();
  return number;
}

export async function writeWhatsappNumber(number: string | null): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;
  const config = await readWhatsappConfig();
  const value = number ? number.trim() : null;
  await supabase.from("whatsapp_number_config").upsert(
    {
      id: ROW_ID,
      number: value,
      label: config.label,
      icon_url: config.iconUrl,
    },
    { onConflict: "id" }
  );
}

export async function writeWhatsappLabel(label: string | null): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;
  const config = await readWhatsappConfig();
  const value = label ? label.trim() : null;
  await supabase.from("whatsapp_number_config").upsert(
    {
      id: ROW_ID,
      number: config.number,
      label: value,
      icon_url: config.iconUrl,
    },
    { onConflict: "id" }
  );
}

export async function writeWhatsappIconUrl(iconUrl: string | null): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) return;
  const config = await readWhatsappConfig();
  const value = iconUrl ? iconUrl.trim() : null;
  await supabase.from("whatsapp_number_config").upsert(
    {
      id: ROW_ID,
      number: config.number,
      label: config.label,
      icon_url: value,
    },
    { onConflict: "id" }
  );
}

/** Solo dígitos, para usar en wa.me/ */
export function toWaMeDigits(number: string | null): string {
  const raw = number && number.trim() ? number : DEFAULT_NUMBER;
  const digits = raw.replace(/\D/g, "");
  return digits || "541152357094";
}

export function getDisplayNumber(stored: string | null): string {
  return stored && stored.trim() !== "" ? stored.trim() : DEFAULT_NUMBER;
}

export function getDisplayLabel(stored: string | null): string {
  return stored && stored.trim() !== "" ? stored.trim() : DEFAULT_LABEL;
}

/** URL del ícono personalizado o null para usar el SVG por defecto. */
export function getDisplayIconUrl(stored: string | null): string | null {
  return stored && stored.trim() !== "" ? stored.trim() : null;
}

export { DEFAULT_NUMBER, DEFAULT_LABEL };
