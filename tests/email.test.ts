import { describe, it, expect, vi, beforeEach } from "vitest";

describe("sendMail", () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.RESEND_API_KEY;
  });

  it("runs in mock mode without RESEND_API_KEY", async () => {
    const { sendMail } = await import("@/lib/email");
    const result = await sendMail({ subject: "Test", html: "<p>Hi</p>" });
    expect(result.mocked).toBe(true);
  });
});
