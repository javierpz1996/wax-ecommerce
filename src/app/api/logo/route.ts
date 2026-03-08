import { NextResponse } from "next/server";
import { readLogoUrl, writeLogoUrl } from "@/lib/logo";

export async function GET() {
  try {
    const url = await readLogoUrl();
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: "Error al leer el logo" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { url?: string | null };
    const url = body.url === undefined ? null : (body.url === "" ? null : String(body.url));
    await writeLogoUrl(url);
    const updated = await readLogoUrl();
    return NextResponse.json({ url: updated });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar el logo" },
      { status: 500 }
    );
  }
}
