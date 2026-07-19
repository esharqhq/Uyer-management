"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import {
  applySchema,
  ANREDE,
  LAENDER,
  APPLY_DOCS,
  DOC_MAX_BYTES,
  DOC_TYPES,
} from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const DOC_HINT = "PDF, JPG oder PNG · max. 10 MB";
const DOC_ACCEPT = ".pdf,.jpg,.jpeg,.png";

// Files are uploaded DIRECTLY from the browser to Supabase Storage via a
// short-lived signed URL, so the file bytes never pass through the Vercel
// function — this sidesteps the platform's ~4.5 MB request-body limit (413).
type SignedUpload = {
  docKey: string;
  path: string;
  signedUrl: string;
  token: string;
};

// Generate a v4-shaped UUID that works on older Samsung Internet / Android
// WebView, where crypto.randomUUID() is undefined. Guarantees a non-empty,
// path-safe hex string so the storage path never becomes "undefined/…".
function safeUuid(): string {
  const c = typeof crypto !== "undefined" ? crypto : undefined;
  if (c?.randomUUID) {
    try {
      return c.randomUUID();
    } catch {
      /* fall through */
    }
  }
  // Fill 16 bytes from a CSPRNG when available, else Math.random.
  const bytes = new Uint8Array(16);
  if (c?.getRandomValues) {
    c.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10xx
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return (
    hex.slice(0, 4).join("") +
    "-" +
    hex.slice(4, 6).join("") +
    "-" +
    hex.slice(6, 8).join("") +
    "-" +
    hex.slice(8, 10).join("") +
    "-" +
    hex.slice(10, 16).join("")
  );
}

const docFile = (required: boolean, subject: string) =>
  z
    .custom<FileList>()
    .refine(
      (fl) => !required || (fl && fl.length === 1),
      `Bitte laden Sie ${subject} hoch.`,
    )
    .refine(
      (fl) => !fl?.[0] || fl[0].size <= DOC_MAX_BYTES,
      "Die Datei ist zu groß (max. 10 MB).",
    )
    .refine(
      (fl) => !fl?.[0] || DOC_TYPES.includes(fl[0].type),
      "Bitte laden Sie die Datei als PDF, JPG oder PNG hoch.",
    );

const applyFormSchema = applySchema.extend({
  ausweis: docFile(true, "Ihren Ausweis / Reisepass"),
  meldezettel: docFile(true, "Ihren Meldezettel"),
  ecardVorne: docFile(true, "die Vorderseite Ihrer E-Card"),
  ecardHinten: docFile(true, "die Rückseite Ihrer E-Card"),
  lebenslauf: docFile(false, "Ihren Lebenslauf"),
});
type ApplyFormInput = z.infer<typeof applyFormSchema>;
type FieldName = keyof ApplyFormInput;

// Three steps keep every view short enough to fit one screen. Each step's
// fields are validated before the applicant may continue to the next.
const STEPS = [
  {
    title: "Persönliche Daten",
    fields: [
      "anrede",
      "vorname",
      "nachname",
      "email",
      "phone",
      "geburtsdatum",
      "versicherungsnummer",
    ],
  },
  {
    title: "Adresse",
    fields: ["strasse", "plz", "ort", "land", "berufserfahrung"],
  },
  {
    title: "Dokumente",
    fields: [...APPLY_DOCS.map((d) => d.key), "consent"],
  },
] as const satisfies ReadonlyArray<{ title: string; fields: readonly FieldName[] }>;

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center" aria-label="Fortschritt der Bewerbung">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={s.title}
            className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}
            aria-current={active ? "step" : undefined}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full font-body text-sm font-semibold transition",
                  done && "bg-gold text-ink",
                  active && "bg-gold text-ink ring-2 ring-gold ring-offset-2 ring-offset-surface",
                  !done && !active && "border border-line bg-surface text-muted",
                )}
              >
                {done ? <Check size={16} strokeWidth={2.5} aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden font-body text-sm sm:block",
                  active ? "font-semibold text-text" : "text-muted",
                )}
              >
                {s.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "mx-3 h-px flex-1 transition-colors",
                  done ? "bg-ink" : "bg-line",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function ApplyForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "sending" | "success" | "error"
  >("idle");
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ApplyFormInput>({ resolver: zodResolver(applyFormSchema) });

  const isLast = step === STEPS.length - 1;

  const goNext = async () => {
    const valid = await trigger([...STEPS[step].fields] as FieldName[], {
      shouldFocus: true,
    });
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  // On any step, Enter advances instead of submitting early (except in the
  // multi-line experience field and on the final step, where submit is valid).
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      e.key === "Enter" &&
      !isLast &&
      (e.target as HTMLElement).tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      void goNext();
    }
  };

  // If a submit-time validation error slips into an earlier step, jump there.
  const onInvalid = (errs: typeof errors) => {
    const firstBad = STEPS.findIndex((s) =>
      s.fields.some((f) => f in errs),
    );
    if (firstBad >= 0 && firstBad !== step) setStep(firstBad);
  };

  // Read a JSON error body without throwing; return its `errors` array or null.
  const readErrors = async (res: Response): Promise<string[] | null> => {
    const text = await res.text().catch(() => "");
    try {
      const errs = (JSON.parse(text) as { errors?: unknown }).errors;
      if (Array.isArray(errs)) return errs as string[];
    } catch {
      /* not JSON */
    }
    return text ? [`[Debug] HTTP ${res.status} ${res.statusText}: ${text}`] : null;
  };

  const onSubmit = async (data: ApplyFormInput) => {
    setServerErrors([]);

    // Collect the picked files (required + any optional CV).
    const picked: { docKey: string; file: File }[] = [];
    for (const doc of APPLY_DOCS) {
      const file = (data[doc.key] as FileList | undefined)?.[0];
      if (file) picked.push({ docKey: doc.key, file });
    }

    const submissionId = safeUuid();
    // Never send a malformed path: bail before any network call if empty.
    if (!submissionId) {
      setServerErrors([
        "Ihre Bewerbung konnte nicht vorbereitet werden. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.",
      ]);
      setStatus("error");
      return;
    }

    // DEBUG INSTRUMENTATION — surface the real failure (thrown exception vs.
    // non-2xx response) so we can still diagnose Samsung Internet / Android.
    try {
      // ── 1. Ask our API for a signed upload URL per file ──────────────────
      setStatus("uploading");
      const urlRes = await fetch("/api/apply/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          files: picked.map((p) => ({
            docKey: p.docKey,
            filename: p.file.name,
            contentType: p.file.type,
            size: p.file.size,
          })),
        }),
      });
      if (!urlRes.ok) {
        setServerErrors(
          (await readErrors(urlRes)) ?? [
            `[Debug] HTTP ${urlRes.status} ${urlRes.statusText}`,
          ],
        );
        setStatus("error");
        return;
      }
      const { uploads } = (await urlRes.json()) as { uploads: SignedUpload[] };
      const uploadByKey = new Map(uploads.map((u) => [u.docKey, u]));

      // ── 2. Upload each file DIRECTLY to Supabase Storage ─────────────────
      // Multipart PUT matches how supabase-js posts a Blob to a signed URL.
      for (const { docKey, file } of picked) {
        const target = uploadByKey.get(docKey);
        if (!target) {
          setServerErrors(["Der Upload konnte nicht vorbereitet werden. Bitte versuchen Sie es erneut."]);
          setStatus("error");
          return;
        }
        const form = new FormData();
        form.append("cacheControl", "3600");
        form.append("", file);
        const putRes = await fetch(target.signedUrl, {
          method: "PUT",
          headers: { "x-upsert": "true" },
          body: form,
        });
        if (!putRes.ok) {
          const body = await putRes.text().catch(() => "");
          console.error(
            `[apply] storage upload failed: HTTP ${putRes.status}`,
            body,
          );
          setServerErrors([
            `Eine Datei konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut. [Debug HTTP ${putRes.status}]`,
          ]);
          setStatus("error");
          return;
        }
      }

      // ── 3. Send the small JSON (fields + submissionId + paths) ───────────
      setStatus("sending");
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anrede: data.anrede,
          vorname: data.vorname,
          nachname: data.nachname,
          email: data.email,
          phone: data.phone,
          geburtsdatum: data.geburtsdatum,
          versicherungsnummer: data.versicherungsnummer ?? "",
          strasse: data.strasse,
          plz: data.plz,
          ort: data.ort,
          land: data.land,
          berufserfahrung: data.berufserfahrung ?? "",
          consent: data.consent,
          submissionId,
          uploads: uploads.map((u) => ({ docKey: u.docKey, path: u.path })),
        }),
      });

      if (res.ok) {
        setStatus("success");
        reset();
        return;
      }

      console.error(`[apply] request failed: HTTP ${res.status} ${res.statusText}`);
      setServerErrors(
        (await readErrors(res)) ?? [
          `[Debug] HTTP ${res.status} ${res.statusText}`,
        ],
      );
      setStatus("error");
    } catch (err) {
      // A fetch itself threw — network error, or an exception before/around it.
      const message = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      console.error("[apply] submit threw:", err);
      setServerErrors([`[Debug] ${message}`]);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="rounded-lg bg-green-600/15 p-5 font-body">
        ✓ Vielen Dank für Ihre Bewerbung! Wir prüfen Ihre Unterlagen und melden
        uns in Kürze bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} onKeyDown={handleKeyDown} noValidate>
      <Stepper current={step} />
      <p className="mt-4 font-body text-sm text-muted sm:hidden">
        Schritt {step + 1} von {STEPS.length}
      </p>

      {/* ── Step 1 · Persönliche Daten ────────────────────────────────── */}
      {step === 0 && (
        <div key="step-0" className="animate-step mt-6">
          <h3 className="font-display text-lg font-semibold">Persönliche Daten</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Select label="Anrede" required options={ANREDE} placeholder="Bitte wählen" error={errors.anrede?.message} {...register("anrede")} />
            <div className="hidden sm:block" aria-hidden />
            <Input label="Vorname" required placeholder="Max" error={errors.vorname?.message} {...register("vorname")} />
            <Input label="Nachname" required placeholder="Mustermann" error={errors.nachname?.message} {...register("nachname")} />
            <Input label="E-Mail" type="email" required error={errors.email?.message} {...register("email")} />
            <Input label="Telefonnummer" type="tel" required error={errors.phone?.message} {...register("phone")} />
            <Input label="Geburtsdatum" type="date" required error={errors.geburtsdatum?.message} {...register("geburtsdatum")} />
            <Input label="Versicherungsnummer" placeholder="optional" error={errors.versicherungsnummer?.message} {...register("versicherungsnummer")} />
          </div>
        </div>
      )}

      {/* ── Step 2 · Adresse & Erfahrung ──────────────────────────────── */}
      {step === 1 && (
        <div key="step-1" className="animate-step mt-6">
          <h3 className="font-display text-lg font-semibold">Adresse</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Input label="Straße & Hausnummer" required className="sm:col-span-2" placeholder="Musterstraße 1" error={errors.strasse?.message} {...register("strasse")} />
            <Input label="PLZ" required placeholder="1010" error={errors.plz?.message} {...register("plz")} />
            <Input label="Ort" required placeholder="Wien" error={errors.ort?.message} {...register("ort")} />
            <Select label="Land" required options={LAENDER} placeholder="Bitte wählen" error={errors.land?.message} {...register("land")} />
          </div>
          <Textarea
            label="Berufserfahrung"
            className="mt-5"
            rows={4}
            placeholder="Optional: Erzählen Sie uns kurz von Ihrer Erfahrung in der Gebäudereinigung."
            error={errors.berufserfahrung?.message}
            {...register("berufserfahrung")}
          />
        </div>
      )}

      {/* ── Step 3 · Dokumente ────────────────────────────────────────── */}
      {step === 2 && (
        <div key="step-2" className="animate-step mt-6">
          <h3 className="font-display text-lg font-semibold">Dokumente</h3>
          <p className="mt-1 font-body text-sm text-muted">
            Bitte laden Sie die folgenden Unterlagen hoch. {DOC_HINT}.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {APPLY_DOCS.map((doc) => (
              <FileUpload
                key={doc.key}
                label={doc.label}
                required={doc.required}
                hint={DOC_HINT}
                accept={DOC_ACCEPT}
                fileName={(watch(doc.key) as FileList | undefined)?.[0]?.name ?? null}
                error={errors[doc.key]?.message as string | undefined}
                {...register(doc.key)}
              />
            ))}
          </div>
          <Checkbox
            className="mt-6"
            label={
              <>
                Ich stimme der Verarbeitung meiner Daten gemäß{" "}
                <Link href="/datenschutz" className="underline hover:text-gold">
                  Datenschutzerklärung
                </Link>{" "}
                zu.<span className="ml-0.5 text-gold">*</span>
              </>
            }
            error={errors.consent?.message}
            {...register("consent")}
          />
        </div>
      )}

      {status === "error" && isLast && (
        <p role="alert" className="mt-4 font-body text-sm text-red-400">
          {serverErrors.length > 0
            ? serverErrors.join(" ")
            : "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."}
        </p>
      )}

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <Button variant="outline" type="button" onClick={goBack}>
            Zurück
          </Button>
        ) : (
          <span />
        )}
        {isLast ? (
          <Button
            variant="accent"
            type="submit"
            disabled={status === "uploading" || status === "sending"}
          >
            {status === "uploading"
              ? "Wird hochgeladen …"
              : status === "sending"
                ? "Wird gesendet …"
                : "Jetzt bewerben"}
          </Button>
        ) : (
          <Button variant="primary" type="button" onClick={goNext}>
            Weiter
          </Button>
        )}
      </div>
    </form>
  );
}
