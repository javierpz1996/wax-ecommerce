import { NextResponse } from "next/server";
import {
  readLightIconUrls,
  writeLightIconUrl,
} from "@/lib/lightIcons";

export async function GET() {
  try {
    const icons = await readLightIconUrls();
    return NextResponse.json({ icons });
  } catch {
    return NextResponse.json(
      { error: "Error al leer los iconos" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      index?: number;
      url?: string | null;
    };
    const index = typeof body.index === "number" ? body.index : 0;
    if (index < 0 || index > 4) {
      return NextResponse.json(
        { error: "Índice inválido (0-4)" },
        { status: 400 }
      );
    }
    const url =
      body.url === undefined ? null : body.url === "" ? null : String(body.url);
    await writeLightIconUrl(index, url);
    const icons = await readLightIconUrls();
    return NextResponse.json({ icons });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar el icono" },
      { status: 500 }
    );
  }
}
