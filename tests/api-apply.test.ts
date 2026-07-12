// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";
import { APPLY_DOCS } from "@/lib/schemas";

beforeEach(() => {
  vi.resetModules();
  delete process.env.RESEND_API_KEY;
});

const pdf = (name: string) =>
  new File(["%PDF-1.4"], name, { type: "application/pdf" });

function formReq(
  overrides: Record<string, string> = {},
  opts: { skipDoc?: string; badDoc?: string } = {},
) {
  const fd = new FormData();
  fd.set("anrede", "Herr");
  fd.set("vorname", "Max");
  fd.set("nachname", "Mustermann");
  fd.set("email", "max@example.com");
  fd.set("phone", "+43 660 1234567");
  fd.set("geburtsdatum", "1990-05-01");
  fd.set("versicherungsnummer", "");
  fd.set("strasse", "Musterstraße 1");
  fd.set("plz", "1010");
  fd.set("ort", "Wien");
  fd.set("land", "Österreich");
  fd.set("berufserfahrung", "");
  fd.set("consent", "true");
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  // Attach every required document unless told to skip / corrupt one.
  for (const doc of APPLY_DOCS) {
    if (!doc.required) continue;
    if (doc.key === opts.skipDoc) continue;
    if (doc.key === opts.badDoc) {
      fd.set(doc.key, new File(["GIF89a"], "bild.gif", { type: "image/gif" }));
    } else {
      fd.set(doc.key, pdf(`${doc.slug}.pdf`));
    }
  }
  return new Request("http://localhost/api/apply", { method: "POST", body: fd });
}

describe("POST /api/apply", () => {
  it("accepts a complete application with all required documents", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(formReq());
    expect(res.status).toBe(200);
  });

  it("rejects a missing required document (E-Card Vorderseite)", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(formReq({}, { skipDoc: "ecardVorne" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(JSON.stringify(body.errors)).toContain("E-Card Vorderseite");
  });

  it("rejects a document with a wrong file type", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(formReq({}, { badDoc: "ausweis" }));
    expect(res.status).toBe(400);
  });
});
