import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin, SUPABASE_BUCKET } from "@/lib/supabase-server";

// Uses the Supabase secret key and node:crypto, so never run on the edge.
export const runtime = "nodejs";

// Constant-time compare so the secret can't be guessed byte by byte.
function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  // No secret configured → reject everything (never match "Bearer undefined").
  if (!secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(req.headers.get("authorization") ?? "");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// Keeps the free-tier Supabase project from auto-pausing after 7 days idle.
// Called by Vercel Cron (see vercel.json), which sends
// "Authorization: Bearer <CRON_SECRET>".
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    console.warn("[keep-alive] unauthorized request");
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();

    // Database write — this is what counts as activity and prevents pausing.
    const { data, error: dbError } = await supabase
      .from("keep_alive")
      .update({ pinged_at: new Date().toISOString() })
      .eq("id", 1)
      .select("pinged_at")
      .single();
    if (dbError || !data) {
      throw new Error(`keep_alive update failed: ${dbError?.message ?? "no row with id=1"}`);
    }

    // One cheap Storage call to keep Storage warm as well.
    const { error: storageError } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .list("", { limit: 1 });
    if (storageError) {
      throw new Error(`storage list failed: ${storageError.message}`);
    }

    console.log("[keep-alive] ok:", { pinged_at: data.pinged_at });
    return NextResponse.json({ ok: true, pinged_at: data.pinged_at });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error("[keep-alive] failed:", error);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
