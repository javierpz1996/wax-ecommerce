import { getSupabaseServer } from "./supabase-server";

const ROW_ID = 1;

export type AppUiConfig = {
  showEmailSubscription: boolean;
};

export async function readAppUiConfig(): Promise<AppUiConfig> {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return { showEmailSubscription: true };
  }

  const { data, error } = await supabase
    .from("app_ui_config")
    .select("show_email_subscription")
    .eq("id", ROW_ID)
    .single();

  if (error || !data) {
    return { showEmailSubscription: true };
  }

  const raw = (data as { show_email_subscription?: unknown })
    .show_email_subscription;
  return {
    showEmailSubscription: raw !== false,
  };
}

export async function writeShowEmailSubscription(show: boolean): Promise<void> {
  const supabase = getSupabaseServer();
  if (!supabase) {
    throw new Error("Supabase no configurado");
  }

  const { error } = await supabase.from("app_ui_config").upsert(
    {
      id: ROW_ID,
      show_email_subscription: Boolean(show),
    },
    { onConflict: "id" }
  );

  if (error) throw error;
}
