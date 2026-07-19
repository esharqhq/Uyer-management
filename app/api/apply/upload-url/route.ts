import { NextResponse } from "next/server";
import { APPLY_DOCS, DOC_MAX_BYTES, DOC_TYPES } from "@/lib/schemas";
import { getSupabaseAdmin, SUPABASE_BUCKET } from "@/lib/supabase-server";

const DOC_KEYS = new Set<string>(APPLY_DOCS.map((d) => d.key));
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Extensions Supabase Storage will accept for us, matched case-insensitively.
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "pdf"]);

// Strictly sanitize a client filename into a Supabase-safe object name.
// Phone-camera names carry spaces, umlauts, parentheses, Cyrillic, etc. — all
// rejected by Storage — so we reduce the base to [a-z0-9-] and validate the
// extension against an allowlist. Returns null if the extension is not allowed.
function sanitizeName(name: string): string | null {
  const base = name.split(/[\\/]/).pop() ?? "";
  const dot = base.lastIndexOf(".");
  if (dot < 1) return null; // no extension → reject
  const ext = base.slice(dot + 1).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) return null;

  const cleaned =
    base
      .slice(0, dot)
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/Ä/g, "ae").replace(/Ö/g, "oe").replace(/Ü/g, "ue")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "file";

  return `${cleaned}.${ext}`;
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
    const sanitized = sanitizeName(f.filename);
    if (!sanitized) {
      return NextResponse.json(
        { ok: false, errors: ["Bitte laden Sie die Dateien als PDF, JPG, PNG oder WEBP hoch."] },
        { status: 400 },
      );
    }
    const path = `${submissionId}/${f.docKey}-${sanitized}`;
    // TEMP DIAGNOSTIC: raw submissionId + name vs. final path (no file bytes).
    console.log("[apply:upload-url] received:", {
      submissionId,
      docKey: f.docKey,
      rawName: f.filename,
      finalPath: path,
    });
    // TEMP DIAGNOSTIC: exact strings passed to Supabase, with quotes, so any
    // leading slash / trailing whitespace / newline / hidden char is visible.
    console.log("[apply:upload-url] EXACT path arg:", JSON.stringify(path));
    console.log("[apply:upload-url] bucket:", JSON.stringify(SUPABASE_BUCKET));
    console.log("[apply:upload-url] url:", JSON.stringify(process.env.SUPABASE_URL));
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
