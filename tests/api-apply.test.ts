// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete process.env.RESEND_API_KEY;
});

function formReq(overrides: Record<string, string> = {}, file?: File) {
  const fd = new FormData();
  fd.set("name", "Max Mustermann");
  fd.set("phone", "+43 660 1234567");
  fd.set("email", "max@example.com");
  fd.set("region", "Wien");
  fd.set("consent", "true");
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  if (file) fd.set("cv", file);
  return new Request("http://localhost/api/apply", { method: "POST", body: fd });
}

describe("POST /api/apply", () => {
  it("accepts valid application with PDF cv", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const cv = new File(["%PDF-1.4"], "Lebenslauf_Mustermann.pdf", {
      type: "application/pdf",
    });
    const res = await POST(formReq({}, cv));
    expect(res.status).toBe(200);
  });

  it("rejects missing cv", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(formReq());
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(JSON.stringify(body.errors)).toContain("Lebenslauf");
  });

  it("rejects wrong file type", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const cv = new File(["GIF89a"], "bild.gif", { type: "image/gif" });
    const res = await POST(formReq({}, cv));
    expect(res.status).toBe(400);
  });
});
