import { NextResponse } from "next/server";
import { readLightsState, writeLightsState } from "@/lib/lights";

export async function GET() {
  try {
    const enabled = await readLightsState();
    return NextResponse.json({ enabled });
  } catch {
    return NextResponse.json(
      { error: "Error al leer el estado" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { enabled?: boolean[] };
    const enabled = body.enabled;
    if (!Array.isArray(enabled) || enabled.length < 5) {
      return NextResponse.json(
        { error: "Se requiere un array 'enabled' con al menos 5 elementos" },
        { status: 400 }
      );
    }
    await writeLightsState(enabled.map((v) => Boolean(v)));
    const updated = await readLightsState();
    return NextResponse.json({ enabled: updated });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar el estado" },
      { status: 500 }
    );
  }
}
