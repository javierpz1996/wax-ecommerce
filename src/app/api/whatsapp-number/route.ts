import { NextResponse } from "next/server";
import {
  readWhatsappConfig,
  writeWhatsappNumber,
  writeWhatsappLabel,
  writeWhatsappIconUrl,
} from "@/lib/whatsappNumber";

export async function GET() {
  try {
    const config = await readWhatsappConfig();
    return NextResponse.json({
      number: config.number,
      label: config.label,
      iconUrl: config.iconUrl,
    });
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
      iconUrl?: string | null;
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
    if (body.iconUrl !== undefined) {
      const iconUrl =
        body.iconUrl === null || body.iconUrl === ""
          ? null
          : String(body.iconUrl);
      await writeWhatsappIconUrl(iconUrl);
    }
    const updated = await readWhatsappConfig();
    return NextResponse.json({
      number: updated.number,
      label: updated.label,
      iconUrl: updated.iconUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar" },
      { status: 500 }
    );
  }
}
