import { NextResponse } from "next/server";
import {
  readWhatsappConfig,
  writeWhatsappNumber,
  writeWhatsappLabel,
} from "@/lib/whatsappNumber";

export async function GET() {
  try {
    const config = await readWhatsappConfig();
    return NextResponse.json({ number: config.number, label: config.label });
  } catch {
    return NextResponse.json(
      { error: "Error al leer la configuración" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      number?: string | null;
      label?: string | null;
    };
    if (body.number !== undefined) {
      const number =
        body.number === null || body.number === "" ? null : String(body.number);
      await writeWhatsappNumber(number);
    }
    if (body.label !== undefined) {
      const label =
        body.label === null || body.label === "" ? null : String(body.label);
      await writeWhatsappLabel(label);
    }
    const updated = await readWhatsappConfig();
    return NextResponse.json({ number: updated.number, label: updated.label });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar" },
      { status: 500 }
    );
  }
}
