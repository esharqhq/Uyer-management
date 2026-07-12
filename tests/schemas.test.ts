import { describe, it, expect } from "vitest";
import { contactSchema, applySchema, personnelRequestSchema } from "@/lib/schemas";

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

const validApply = {
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
};

describe("applySchema", () => {
  it("accepts valid input", () => {
    expect(applySchema.safeParse(validApply).success).toBe(true);
  });

  it("rejects unknown land", () => {
    const r = applySchema.safeParse({ ...validApply, land: "Mars" });
    expect(r.success).toBe(false);
  });

  it("rejects missing anrede", () => {
    const { anrede, ...rest } = validApply;
    expect(applySchema.safeParse(rest).success).toBe(false);
  });
});

const validRequest = {
  firmenname: "Muster GmbH",
  ansprechpartner: "Max Mustermann",
  email: "max@example.com",
  telefon: "+43 660 1234567",
  position: "Reinigungskraft",
  anzahl: 5,
  einsatzort: "Wien",
  startdatum: "",
  anmerkungen: "",
  consent: true,
};

describe("personnelRequestSchema", () => {
  it("accepts valid input", () => {
    expect(personnelRequestSchema.safeParse(validRequest).success).toBe(true);
  });

  it("coerces a numeric string for anzahl", () => {
    const r = personnelRequestSchema.safeParse({ ...validRequest, anzahl: "3" });
    expect(r.success).toBe(true);
    expect(r.data?.anzahl).toBe(3);
  });

  it("rejects anzahl below 1", () => {
    const r = personnelRequestSchema.safeParse({ ...validRequest, anzahl: 0 });
    expect(r.success).toBe(false);
  });

  it("rejects an unknown einsatzort", () => {
    const r = personnelRequestSchema.safeParse({ ...validRequest, einsatzort: "Mars" });
    expect(r.success).toBe(false);
  });

  it("rejects missing consent with German message", () => {
    const r = personnelRequestSchema.safeParse({ ...validRequest, consent: false });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toContain("Datenschutzerklärung");
  });
});
