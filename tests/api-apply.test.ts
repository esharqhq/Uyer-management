// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";
import { APPLY_DOCS } from "@/lib/schemas";

const SUBMISSION_ID = "11111111-1111-4111-8111-111111111111";

// Mock the server-only Supabase client so the route downloads/removes without
// touching the network. download() returns a tiny PDF-typed blob.
const download = vi.fn(async () => ({
  data: new Blob(["%PDF-1.4"], { type: "application/pdf" }),
  error: null,
}));
const remove = vi.fn(async () => ({ data: [], error: null }));

vi.mock("@/lib/supabase-server", () => ({
  SUPABASE_BUCKET: "applications",
  getSupabaseAdmin: () => ({
    storage: { from: () => ({ download, remove }) },
  }),
}));

beforeEach(() => {
  vi.resetModules();
  delete process.env.RESEND_API_KEY;
  download.mockClear();
  remove.mockClear();
});

function jsonReq(
  overrides: Record<string, unknown> = {},
  opts: { skipDoc?: string } = {},
) {
  const uploads = APPLY_DOCS.filter((d) => d.required && d.key !== opts.skipDoc).map(
    (d) => ({ docKey: d.key, path: `${SUBMISSION_ID}/${d.key}-${d.slug}.pdf` }),
  );
  const body = {
    anrede: "Herr",
    vorname: "Max",
    nachname: "Mustermann",
    email: "max@example.com",
    phone: "+43 660 1234567",
    geburtsdatum: "1990-05-01",
    versicherungsnummer: "",
    strasse: "Musterstraße 1",
    plz: "1010",
    ort: "Wien",
    land: "Österreich",
    berufserfahrung: "",
    consent: true,
    submissionId: SUBMISSION_ID,
    uploads,
    ...overrides,
  };
  return new Request("http://localhost/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/apply", () => {
  it("accepts a complete application and deletes the files afterwards", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(jsonReq());
    expect(res.status).toBe(200);
    // Files are temporary: removed once the email is sent.
    expect(remove).toHaveBeenCalledOnce();
  });

  it("rejects a missing required document (E-Card Vorderseite)", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(jsonReq({}, { skipDoc: "ecardVorne" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(JSON.stringify(body.errors)).toContain("E-Card Vorderseite");
    expect(remove).not.toHaveBeenCalled();
  });

  it("rejects an upload path outside the submission folder", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(
      jsonReq({
        uploads: APPLY_DOCS.filter((d) => d.required).map((d) => ({
          docKey: d.key,
          path: `someone-else/${d.key}.pdf`,
        })),
      }),
    );
    expect(res.status).toBe(400);
  });
});
