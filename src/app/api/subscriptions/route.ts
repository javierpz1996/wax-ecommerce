import { NextResponse } from "next/server";
import {
  createEmailSubscription,
  getAllEmailSubscriptions,
} from "@/lib/emailSubscriptions";

export async function GET() {
  try {
    const subs = await getAllEmailSubscriptions();
    const emails = subs.map((s) => s.email).filter(Boolean);
    return NextResponse.json({ count: emails.length, emails });
  } catch {
    return NextResponse.json(
      { error: "Error al leer subscriptores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string | null };
    const email = body.email ?? "";

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      return NextResponse.json(
        { error: "Ingresá un email válido." },
        { status: 400 }
      );
    }

    await createEmailSubscription(trimmed);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al guardar el email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

