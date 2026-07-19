import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase admin client.
//
// Uses SUPABASE_SECRET_KEY (format sb_secret_…) — the successor to the old
// service_role key. It grants full read/write on the private `applications`
// bucket, so this module MUST NEVER be imported from a client component.
// The `server-only` import above turns any client import into a build error.

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

export const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET ?? "applications";

let client: SupabaseClient | null = null;

/** Lazily create the admin client so a missing env var fails per-request
 *  (with a clear message) instead of crashing the whole module at import. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!url || !secretKey) {
    throw new Error(
      "Supabase ist nicht konfiguriert (SUPABASE_URL / SUPABASE_SECRET_KEY fehlen).",
    );
  }
  if (!client) {
    client = createClient(url, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
