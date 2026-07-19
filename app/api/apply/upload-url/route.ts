import { NextResponse } from "next/server";
import { APPLY_DOCS, DOC_MAX_BYTES, DOC_TYPES } from "@/lib/schemas";
import { getSupabaseAdmin, SUPABASE_BUCKET } from "@/lib/supabase-server";

const DOC_KEYS = new Set<string>(APPLY_DOCS.map((d) => d.key));
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Keep only characters safe for a storage object name; collapse the rest.
function safeName(name: string) {
  const base = name.split(/[\\/]/).pop() ?? "datei";
  return (
    base
      .replace(/[^a-zA-Z0-9._-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80) || "datei"
  );
}

type FileReq = {
  docKey: string;
  filename: string;
  contentType: string;
  size: number;
};

// Issues short-lived SIGNED UPLOAD URLs so the browser can PUT each file
// straight to Supabase Storage — the bytes never touch this function, so
// Vercel's ~4.5 MB body limit is never hit.
export async function POST(req: Request) {
  let body: { submissionId?: string; files?: FileReq[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Ungültige Anfrage."] }, { status: 400 });
  }

  const { submissionId, files } = body;
  if (!submissionId || !UUID_RE.test(submissionId)) {
    return NextResponse.json(
      { ok: false, errors: ["Ungültige Anfrage."] },
      { status: 400 },
    );
  }
  if (!Array.isArray(files) || files.length === 0 || files.length > APPLY_DOCS.length) {
    return NextResponse.json(
      { ok: false, errors: ["Ungültige Anfrage."] },
      { status: 400 },
    );
  }

  // Validate every file up front — reject the whole batch on the first problem
  // so the applicant sees one clear German message.
  for (const f of files) {
    if (!f || !DOC_KEYS.has(f.docKey)) {
      return NextResponse.json(
        { ok: false, errors: ["Ungültiges Dokument."] },
        { status: 400 },
      );
    }
    if (!DOC_TYPES.includes(f.contentType)) {
      return NextResponse.json(
        { ok: false, errors: ["Bitte laden Sie die Dateien als PDF, JPG oder PNG hoch."] },
        { status: 400 },
      );
    }
    if (typeof f.size !== "number" || f.size <= 0 || f.size > DOC_MAX_BYTES) {
      return NextResponse.json(
        { ok: false, errors: ["Eine Datei ist zu groß (max. 10 MB)."] },
        { status: 400 },
      );
    }
  }

  const supabase = getSupabaseAdmin();
  const uploads: { docKey: string; path: string; signedUrl: string; token: string }[] = [];

  for (const f of files) {
    const path = `${submissionId}/${f.docKey}-${safeName(f.filename)}`;
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .createSignedUploadUrl(path);
    if (error || !data) {
      console.error("[apply] createSignedUploadUrl failed:", error?.message);
      return NextResponse.json(
        { ok: false, errors: ["Der Upload konnte nicht vorbereitet werden. Bitte versuchen Sie es erneut."] },
        { status: 502 },
      );
    }
    uploads.push({
      docKey: f.docKey,
      path: data.path,
      signedUrl: data.signedUrl,
      token: data.token,
    });
  }

  return NextResponse.json({ ok: true, uploads });
}
