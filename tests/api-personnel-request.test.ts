// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete process.env.RESEND_API_KEY; // mock mode
});

function req(body: unknown) {
  return new Request("http://localhost/api/personnel-request", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const valid = {
  firmenname: "Muster GmbH",
  ansprechpartner: "Max Mustermann",
  email: "max@example.com",
  telefon: "+43 660 1234567",
  position: "Reinigungskraft",
  anzahl: 5,
  einsatzort: "Wien",
  startdatum: "",
  anmerkungen: "Zwei Objekte im Zentrum.",
  consent: true,
};

describe("POST /api/personnel-request", () => {
  it("returns 200 for valid input (mock mode)", async () => {
    const { POST } = await import("@/app/api/personnel-request/route");
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("returns 400 for invalid input", async () => {
    const { POST } = await import("@/app/api/personnel-request/route");
    const res = await POST(req({ firmenname: "M" }));
    expect(res.status).toBe(400);
  });
});
