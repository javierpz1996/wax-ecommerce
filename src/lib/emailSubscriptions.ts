import { getSupabaseServer } from "./supabase-server";

export type EmailSubscription = {
  id: string;
  email: string;
  created_at: string;
};

export async function createEmailSubscription(
  email: string
): Promise<EmailSubscription | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const trimmed = email.trim();
  if (!trimmed) {
    throw new Error("El email es obligatorio.");
  }

  const { data, error } = await supabase
    .from("email_subscriptions")
    .insert({ email: trimmed })
    .select("id, email, created_at")
    .single();

  if (error) {
    // Si es por email duplicado, devolvemos null sin romper la UI.
    if (error.code === "23505") {
      return null;
    }
    throw error;
  }

  return data as EmailSubscription;
}

export async function getAllEmailSubscriptions(): Promise<EmailSubscription[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("email_subscriptions")
    .select("id, email, created_at")
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as EmailSubscription[];
}


