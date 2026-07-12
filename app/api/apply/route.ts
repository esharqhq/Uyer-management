import { NextResponse } from "next/server";
import { applySchema, APPLY_DOCS, DOC_MAX_BYTES, DOC_TYPES } from "@/lib/schemas";
import { sendMail } from "@/lib/email";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

// File extension per accepted MIME type, for tidy attachment names.
const EXT: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// "Max Müller-Groß" -> "mueller_gross"-ish safe slug for filenames.
function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "bewerber"
  );
}

export async function POST(req: Request) {
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Ungültige Anfrage."] }, { status: 400 });
  }

  const parsed = applySchema.safeParse({
    anrede: fd.get("anrede"),
    vorname: fd.get("vorname"),
    nachname: fd.get("nachname"),
    email: fd.get("email"),
    phone: fd.get("phone"),
    geburtsdatum: fd.get("geburtsdatum"),
    versicherungsnummer: fd.get("versicherungsnummer") ?? "",
    strasse: fd.get("strasse"),
    plz: fd.get("plz"),
    ort: fd.get("ort"),
    land: fd.get("land"),
    berufserfahrung: fd.get("berufserfahrung") ?? "",
    consent: fd.get("consent") === "true",
  });

  const errors: string[] = parsed.success
    ? []
    : parsed.error.issues.map((i) => i.message);

  // Validate each document (type + size), collect attachments with clear names.
  const nachname = parsed.success ? slugify(parsed.data.nachname) : "bewerber";
  const attachments: { filename: string; content: Buffer }[] = [];

  for (const doc of APPLY_DOCS) {
    const value = fd.get(doc.key);
    const file = value instanceof File && value.size > 0 ? value : null;
    if (!file) {
      if (doc.required) errors.push(`Bitte laden Sie „${doc.label}" hoch.`);
      continue;
    }
    if (!DOC_TYPES.includes(file.type)) {
      errors.push(`„${doc.label}": Bitte als PDF, JPG oder PNG hochladen.`);
      continue;
    }
    if (file.size > DOC_MAX_BYTES) {
      errors.push(`„${doc.label}": Die Datei ist zu groß (max. 10 MB).`);
      continue;
    }
    attachments.push({
      filename: `${doc.slug}_${nachname}.${EXT[file.type] ?? "bin"}`,
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  if (errors.length || !parsed.success) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const d = parsed.data;
  const row = (label: string, value: string) =>
    `<p><b>${label}:</b> ${esc(value || "–")}</p>`;

  try {
    await sendMail({
      replyTo: d.email,
      subject: `Bewerbung von ${d.vorname} ${d.nachname} (${d.land})`,
      html: `
        <h2>Neue Bewerbung</h2>
        ${row("Anrede", d.anrede)}
        ${row("Name", `${d.vorname} ${d.nachname}`)}
        ${row("E-Mail", d.email)}
        ${row("Telefon", d.phone)}
        ${row("Geburtsdatum", d.geburtsdatum)}
        ${row("Versicherungsnummer", d.versicherungsnummer ?? "")}
        ${row("Adresse", `${d.strasse}, ${d.plz} ${d.ort}, ${d.land}`)}
        <p><b>Berufserfahrung:</b></p>
        <p>${esc(d.berufserfahrung || "–")}</p>
        <p><b>Angehängte Dokumente:</b> ${attachments.length}</p>`,
      attachments,
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."] },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
