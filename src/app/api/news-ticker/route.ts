import { NextResponse } from "next/server";
import {
  readNewsTickerConfig,
  writeNewsTickerSpeedPercent,
  writeNewsTickerText,
} from "@/lib/newsTicker";

export async function GET() {
  try {
    const cfg = await readNewsTickerConfig();
    return NextResponse.json({
      text: cfg.text,
      speedPercent: cfg.speedPercent,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al leer el news ticker" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      text?: string | null;
      speedPercent?: number;
    };

    if (body.text !== undefined) {
      const text =
        body.text === null || body.text === ""
          ? null
          : String(body.text);
      await writeNewsTickerText(text);
    }

    if (body.speedPercent !== undefined) {
      await writeNewsTickerSpeedPercent(Number(body.speedPercent));
    }

    const updated = await readNewsTickerConfig();
    return NextResponse.json({
      text: updated.text,
      speedPercent: updated.speedPercent,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar el news ticker" },
      { status: 500 }
    );
  }
}
