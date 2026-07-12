import { NextResponse } from "next/server";
import { personnelRequestSchema } from "@/lib/schemas";
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

  const parsed = personnelRequestSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues.map((i) => i.message) },
      { status: 400 },
    );
  }

  const d = parsed.data;
  const row = (label: string, value: string) =>
    `<p><b>${label}:</b> ${esc(value || "–")}</p>`;

  try {
    await sendMail({
      replyTo: d.email,
      subject: `Personalanfrage – ${d.firmenname}`,
      html: `
        <h2>Neue Personalanfrage</h2>
        ${row("Firmenname", d.firmenname)}
        ${row("Ansprechpartner", d.ansprechpartner)}
        ${row("E-Mail", d.email)}
        ${row("Telefon", d.telefon)}
        ${row("Gesuchte Position", d.position)}
        ${row("Anzahl der Mitarbeiter", String(d.anzahl))}
        ${row("Einsatzort", d.einsatzort)}
        ${row("Gewünschtes Startdatum", d.startdatum ?? "")}
        <p><b>Anmerkungen:</b></p>
        <p>${esc(d.anmerkungen || "–")}</p>`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."] },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
