// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete process.env.RESEND_API_KEY; // mock mode
});

function req(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("returns 200 for valid input (mock mode)", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      req({
        firstName: "Max",
        lastName: "Mustermann",
        phone: "",
        email: "max@example.com",
        message: "Ich interessiere mich für Ihre Leistungen.",
        consent: true,
      }),
    );
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("returns 400 for invalid input", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(req({ firstName: "M" }));
    expect(res.status).toBe(400);
  });
});
