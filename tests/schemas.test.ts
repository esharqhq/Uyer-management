import { describe, it, expect } from "vitest";
import { contactSchema, applySchema } from "@/lib/schemas";

const validContact = {
  firstName: "Max",
  lastName: "Mustermann",
  phone: "",
  email: "max@example.com",
  message: "Ich interessiere mich für Ihre Leistungen.",
  consent: true,
};

describe("contactSchema", () => {
  it("accepts valid input", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects missing consent with German message", () => {
    const r = contactSchema.safeParse({ ...validContact, consent: false });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toContain("Datenschutzerklärung");
  });

  it("rejects invalid email with German message", () => {
    const r = contactSchema.safeParse({ ...validContact, email: "nope" });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toContain("gültige E-Mail");
  });
});

describe("applySchema", () => {
  it("accepts valid input", () => {
    const r = applySchema.safeParse({
      name: "Max Mustermann",
      phone: "+43 660 1234567",
      email: "max@example.com",
      region: "Wien",
      consent: true,
    });
    expect(r.success).toBe(true);
  });

  it("rejects unknown region", () => {
    const r = applySchema.safeParse({
      name: "Max Mustermann",
      phone: "+43 660 1234567",
      email: "max@example.com",
      region: "Mars",
      consent: true,
    });
    expect(r.success).toBe(false);
  });
});
