import { z } from "zod";

export const ANREDE = ["Herr", "Frau", "Divers"] as const;

export const LAENDER = ["Österreich", "Deutschland", "Schweiz"] as const;

// Documents (Ausweis, Meldezettel, E-Card, Lebenslauf): PDF or photo, max 10 MB.
export const DOC_MAX_BYTES = 10 * 1024 * 1024;
export const DOC_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const consent = z
  .boolean()
  .refine((v) => v === true, "Bitte stimmen Sie der Datenschutzerklärung zu.");

const email = z
  .string()
  .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.");

const optionalText = z.string().optional().or(z.literal(""));

export const contactSchema = z.object({
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein."),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein."),
  phone: optionalText,
  email,
  message: z.string().min(10, "Bitte geben Sie Ihre Nachricht ein (mind. 10 Zeichen)."),
  consent,
});
export type ContactInput = z.infer<typeof contactSchema>;

// Text fields of the Bewerbung. Files are validated separately (client:
// applyFormSchema; server: route handler) since FormData carries them apart.
export const applySchema = z.object({
  anrede: z.enum(ANREDE, { message: "Bitte wählen Sie eine Anrede." }),
  vorname: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein."),
  nachname: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein."),
  email,
  phone: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein."),
  geburtsdatum: z.string().min(1, "Bitte geben Sie Ihr Geburtsdatum ein."),
  versicherungsnummer: optionalText,
  strasse: z.string().min(2, "Bitte geben Sie Straße & Hausnummer ein."),
  plz: z.string().min(4, "Bitte geben Sie Ihre PLZ ein."),
  ort: z.string().min(2, "Bitte geben Sie Ihren Ort ein."),
  land: z.enum(LAENDER, { message: "Bitte wählen Sie Ihr Land." }),
  berufserfahrung: optionalText,
  consent,
});
export type ApplyInput = z.infer<typeof applySchema>;

// Regions we staff — shown in the Personalanfrage form's Einsatzort select.
export const EINSATZORTE = [
  "Salzburg & Umgebung",
  "Wien",
  "Oberösterreich",
  "München",
  "Rosenheim",
  "Berchtesgadener Land",
  "Bad Reichenhall",
  "Freilassing",
  "Traunstein",
  "Bad Aibling",
  "Tittmoning",
] as const;

// Company request for staff (/fuer-unternehmen → /api/personnel-request).
export const personnelRequestSchema = z.object({
  firmenname: z.string().min(2, "Bitte geben Sie den Firmennamen ein."),
  ansprechpartner: z.string().min(2, "Bitte geben Sie einen Ansprechpartner ein."),
  email,
  telefon: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein."),
  position: z.string().min(2, "Bitte geben Sie die gesuchte Position ein."),
  anzahl: z.coerce
    .number({ message: "Bitte geben Sie die Anzahl der Mitarbeiter an." })
    .int("Bitte geben Sie eine ganze Zahl an.")
    .min(1, "Bitte geben Sie die Anzahl der Mitarbeiter an (mind. 1)."),
  einsatzort: z.enum(EINSATZORTE, { message: "Bitte wählen Sie einen Einsatzort." }),
  startdatum: optionalText,
  anmerkungen: optionalText,
  consent,
});
export type PersonnelRequestInput = z.infer<typeof personnelRequestSchema>;

// German labels for the document uploads — reused by the form and the email.
export const APPLY_DOCS = [
  { key: "ausweis", label: "Ausweis / Reisepass", required: true, slug: "ausweis" },
  { key: "meldezettel", label: "Meldezettel", required: true, slug: "meldezettel" },
  { key: "ecardVorne", label: "E-Card Vorderseite", required: true, slug: "ecard_vorne" },
  { key: "ecardHinten", label: "E-Card Rückseite", required: true, slug: "ecard_hinten" },
  { key: "lebenslauf", label: "Lebenslauf / CV", required: false, slug: "lebenslauf" },
] as const;

export type ApplyDocKey = (typeof APPLY_DOCS)[number]["key"];
