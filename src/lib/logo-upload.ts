import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "logos";
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];

function getExtension(mime: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] ?? "png";
}

/**
 * Sube un archivo de imagen al bucket "logos" y devuelve la URL pública.
 * Requiere que en Supabase exista el bucket "logos" (público) con política de INSERT.
 */
export async function uploadLogoFile(
  supabase: SupabaseClient,
  file: File
): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "Tipo de archivo no permitido. Usá PNG, JPEG, WebP o GIF."
    );
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("La imagen no puede superar 2 MB.");
  }

  const ext = getExtension(file.type);
  const path = `logo-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}

/**
 * Sube un icono de botón (1-5) al bucket "logos" y devuelve la URL pública.
 * index: 0-4 para botón 1-5.
 */
export async function uploadIconFile(
  supabase: SupabaseClient,
  file: File,
  index: number
): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "Tipo de archivo no permitido. Usá PNG, JPEG, WebP o GIF."
    );
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("La imagen no puede superar 2 MB.");
  }
  const i = Math.max(0, Math.min(4, Math.floor(index)));
  const ext = getExtension(file.type);
  const path = `light-${i + 1}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}
