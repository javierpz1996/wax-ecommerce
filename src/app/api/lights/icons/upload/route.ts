import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { uploadIconFile } from "@/lib/logo-upload";
import { writeLightIconUrl } from "@/lib/lightIcons";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase no configurado" },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const indexStr = formData.get("index");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Falta el archivo de imagen" },
        { status: 400 }
      );
    }
    const index = indexStr != null ? parseInt(String(indexStr), 10) : 0;
    if (Number.isNaN(index) || index < 0 || index > 4) {
      return NextResponse.json(
        { error: "Índice de botón inválido (0-4)" },
        { status: 400 }
      );
    }

    const publicUrl = await uploadIconFile(supabase, file, index);
    await writeLightIconUrl(index, publicUrl);
    return NextResponse.json({ url: publicUrl, index });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al subir el icono";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
