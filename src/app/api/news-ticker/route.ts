import { NextResponse } from "next/server";
import {
  readNewsTickerText,
  writeNewsTickerText,
} from "@/lib/newsTicker";

export async function GET() {
  try {
    const text = await readNewsTickerText();
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "Error al leer el news ticker" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { text?: string | null };
    const text =
      body.text === undefined ? null : body.text === "" ? null : String(body.text);
    await writeNewsTickerText(text);
    const updated = await readNewsTickerText();
    return NextResponse.json({ text: updated });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar el news ticker" },
      { status: 500 }
    );
  }
}
