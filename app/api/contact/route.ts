import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { sendMail } from "@/lib/email";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Ungültige Anfrage."] }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues.map((i) => i.message) },
      { status: 400 },
    );
  }

  const d = parsed.data;
  try {
    await sendMail({
      subject: `Kontaktanfrage von ${d.firstName} ${d.lastName}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><b>Name:</b> ${esc(d.firstName)} ${esc(d.lastName)}</p>
        <p><b>E-Mail:</b> ${esc(d.email)}</p>
        <p><b>Telefon:</b> ${esc(d.phone || "–")}</p>
        <p><b>Nachricht:</b></p>
        <p>${esc(d.message)}</p>`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."] },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
