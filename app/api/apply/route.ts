import { NextResponse } from "next/server";
import { applySchema, APPLY_DOCS } from "@/lib/schemas";
import { sendMail } from "@/lib/email";
import { getSupabaseAdmin, SUPABASE_BUCKET } from "@/lib/supabase-server";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

// File extension per accepted MIME type, for tidy attachment names.
const EXT: Record<string, string> = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Resend caps a single email at ~40 MB total. Stay safely under it.
const MAX_TOTAL_ATTACHMENT_BYTES = 38 * 1024 * 1024;

const DOC_BY_KEY = new Map<string, (typeof APPLY_DOCS)[number]>(
  APPLY_DOCS.map((d) => [d.key, d]),
);
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

type Body = {
  submissionId?: string;
  uploads?: { docKey?: string; path?: string }[];
} & Record<string, unknown>;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Ungültige Anfrage."] }, { status: 400 });
  }

  const parsed = applySchema.safeParse({
    anrede: body.anrede,
    vorname: body.vorname,
    nachname: body.nachname,
    email: body.email,
    phone: body.phone,
    geburtsdatum: body.geburtsdatum,
    versicherungsnummer: body.versicherungsnummer ?? "",
    strasse: body.strasse,
    plz: body.plz,
    ort: body.ort,
    land: body.land,
    berufserfahrung: body.berufserfahrung ?? "",
    consent: body.consent === true,
  });

  const errors: string[] = parsed.success
    ? []
    : parsed.error.issues.map((i) => i.message);

  const submissionId = body.submissionId;
  const uploads = Array.isArray(body.uploads) ? body.uploads : [];

  if (!submissionId || !UUID_RE.test(submissionId)) {
    errors.push("Ungültige Anfrage.");
  }

  // Every uploaded path must live under this submission's folder — guards
  // against a client pointing us at another applicant's files.
  const paths: string[] = [];
  const seenKeys = new Set<string>();
  for (const u of uploads) {
    const doc = u.docKey ? DOC_BY_KEY.get(u.docKey) : undefined;
    if (!doc || typeof u.path !== "string" || !u.path.startsWith(`${submissionId}/`)) {
      errors.push("Ungültiges Dokument.");
      continue;
    }
    seenKeys.add(doc.key);
    paths.push(u.path);
  }

  // Required documents must each have an uploaded file.
  for (const doc of APPLY_DOCS) {
    if (doc.required && !seenKeys.has(doc.key)) {
      errors.push(`Bitte laden Sie „${doc.label}" hoch.`);
    }
  }

  if (errors.length || !parsed.success) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const d = parsed.data!;
  const nachname = slugify(d.nachname);
  const supabase = getSupabaseAdmin();

  // ── Download each file from Storage into a Buffer for the email ──────────
  const attachments: { filename: string; content: Buffer }[] = [];
  let totalBytes = 0;
  try {
    for (const u of uploads) {
      const doc = DOC_BY_KEY.get(u.docKey!)!;
      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .download(u.path!);
      if (error || !data) {
        console.error("[apply] download failed:", error?.message);
        return NextResponse.json(
          { ok: false, errors: ["Die hochgeladenen Dateien konnten nicht gelesen werden. Bitte versuchen Sie es erneut."] },
          { status: 502 },
        );
      }
      const buffer = Buffer.from(await data.arrayBuffer());
      totalBytes += buffer.length;
      if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { ok: false, errors: ["Die Dateien sind insgesamt zu groß (max. ca. 38 MB). Bitte laden Sie kleinere Dateien hoch."] },
          { status: 400 },
        );
      }
      attachments.push({
        filename: `${doc.slug}_${nachname}.${EXT[data.type] ?? "bin"}`,
        content: buffer,
      });
    }
  } catch (err) {
    console.error("[apply] storage download threw:", err);
    return NextResponse.json(
      { ok: false, errors: ["Die hochgeladenen Dateien konnten nicht gelesen werden. Bitte versuchen Sie es erneut."] },
      { status: 502 },
    );
  }

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
    // Email failed — do NOT delete the files, so nothing is lost and a retry
    // can still reach them.
    return NextResponse.json(
      { ok: false, errors: ["Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."] },
      { status: 502 },
    );
  }

  // ── Email sent: delete the temporary files (DSGVO — not kept) ────────────
  if (paths.length) {
    const { error } = await supabase.storage.from(SUPABASE_BUCKET).remove(paths);
    if (error) {
      // The applicant's mail is already out; a cleanup failure must not turn
      // a successful submission into an error. Log for manual pruning.
      console.error("[apply] cleanup remove failed:", error.message, paths);
    }
  }

  return NextResponse.json({ ok: true });
}
