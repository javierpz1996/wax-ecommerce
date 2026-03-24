import { NextResponse } from "next/server";
import {
  readAppUiConfig,
  writeShowEmailSubscription,
} from "@/lib/appUiConfig";

export async function GET() {
  try {
    const cfg = await readAppUiConfig();
    return NextResponse.json({
      showEmailSubscription: cfg.showEmailSubscription,
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
      showEmailSubscription?: boolean;
    };
    if (body.showEmailSubscription === undefined) {
      return NextResponse.json(
        { error: "Falta showEmailSubscription" },
        { status: 400 }
      );
    }
    await writeShowEmailSubscription(Boolean(body.showEmailSubscription));
    const updated = await readAppUiConfig();
    return NextResponse.json({
      showEmailSubscription: updated.showEmailSubscription,
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Error al guardar la configuración";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
