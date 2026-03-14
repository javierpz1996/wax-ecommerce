import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { uploadLogoFile } from "@/lib/logo-upload";
import { writeLogoUrl } from "@/lib/logo";

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
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Falta el archivo de imagen" },
        { status: 400 }
      );
    }

    const publicUrl = await uploadLogoFile(supabase, file);
    await writeLogoUrl(publicUrl);
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al subir el logo";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
