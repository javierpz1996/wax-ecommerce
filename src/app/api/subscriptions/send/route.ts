import { NextResponse } from "next/server";
import { getAllEmailSubscriptions } from "@/lib/emailSubscriptions";
import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      subject?: string;
      body?: string;
    };

    const subject = (body.subject ?? "").trim();
    const textBody = (body.body ?? "").trim();

    if (!subject || !textBody) {
      return NextResponse.json(
        { error: "Asunto y contenido son obligatorios." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILGUN_API_KEY;
    const domain =
      process.env.MAILGUN_DOMAIN ||
      "sandboxe540df84232642c8b63e93795f62491e.mailgun.org";
    const fromEmail =
      process.env.MAILGUN_FROM_EMAIL ||
      `Mailgun Sandbox <postmaster@${domain}>`;
    const baseUrl = process.env.MAILGUN_API_BASE_URL || "https://api.mailgun.net";

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Configura MAILGUN_API_KEY, MAILGUN_DOMAIN y MAILGUN_FROM_EMAIL en las variables de entorno.",
        },
        { status: 500 }
      );
    }

    const subs = await getAllEmailSubscriptions();
    const to = subs.map((s) => s.email).filter(Boolean);

    if (to.length === 0) {
      return NextResponse.json(
        { error: "No hay subscriptores para enviar el email." },
        { status: 400 }
      );
    }

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: apiKey,
      url: baseUrl,
    });

    const text = textBody;

    // Mailgun permite pasar array de destinatarios con `to`.
    await mg.messages.create(domain, {
      from: fromEmail,
      to,
      subject,
      text,
    });

    return NextResponse.json({ ok: true, sentTo: to.length });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error al enviar el email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

