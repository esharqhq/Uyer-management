import { NextResponse } from "next/server";
import { applySchema, CV_MAX_BYTES, CV_TYPES } from "@/lib/schemas";
import { sendMail } from "@/lib/email";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function POST(req: Request) {
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Ungültige Anfrage."] }, { status: 400 });
  }
  const parsed = applySchema.safeParse({
    name: fd.get("name"),
    phone: fd.get("phone"),
    email: fd.get("email"),
    region: fd.get("region"),
    consent: fd.get("consent") === "true",
  });

  const errors: string[] = parsed.success
    ? []
    : parsed.error.issues.map((i) => i.message);

  const cv = fd.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    errors.push("Bitte laden Sie Ihren Lebenslauf hoch.");
  } else if (!CV_TYPES.includes(cv.type)) {
    errors.push("Bitte laden Sie Ihren Lebenslauf als PDF oder Word-Datei hoch.");
  } else if (cv.size > CV_MAX_BYTES) {
    errors.push("Die Datei ist zu groß (max. 5 MB).");
  }

  if (errors.length || !parsed.success) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const d = parsed.data;
  const file = cv as File;
  try {
    await sendMail({
      subject: `Bewerbung von ${d.name} (${d.region})`,
      html: `
        <h2>Neue Bewerbung</h2>
        <p><b>Name:</b> ${esc(d.name)}</p>
        <p><b>E-Mail:</b> ${esc(d.email)}</p>
        <p><b>Telefon:</b> ${esc(d.phone)}</p>
        <p><b>Region:</b> ${esc(d.region)}</p>`,
      attachments: [
        { filename: file.name, content: Buffer.from(await file.arrayBuffer()) },
      ],
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."] },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
