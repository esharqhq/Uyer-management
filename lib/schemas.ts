import { z } from "zod";

export const REGIONS = [
  "Wien",
  "Niederösterreich",
  "Oberösterreich",
  "Salzburg",
  "Steiermark",
  "Tirol",
  "Andere Region (Österreich)",
  "Deutschland",
] as const;

export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const consent = z
  .boolean()
  .refine((v) => v === true, "Bitte stimmen Sie der Datenschutzerklärung zu.");

const email = z
  .string()
  .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.");

export const contactSchema = z.object({
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein."),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein."),
  phone: z.string().optional().or(z.literal("")),
  email,
  message: z.string().min(10, "Bitte geben Sie Ihre Nachricht ein (mind. 10 Zeichen)."),
  consent,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const applySchema = z.object({
  name: z.string().min(3, "Bitte geben Sie Ihren Vor- und Nachnamen ein."),
  phone: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein."),
  email,
  region: z.enum(REGIONS, { message: "Bitte wählen Sie Ihre Region." }),
  consent,
});
export type ApplyInput = z.infer<typeof applySchema>;
