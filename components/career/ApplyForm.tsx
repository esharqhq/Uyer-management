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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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

  const onSubmit = async (data: ApplyFormInput) => {
    setStatus("sending");
    setServerErrors([]);
    const fd = new FormData();
    fd.set("anrede", data.anrede);
    fd.set("vorname", data.vorname);
    fd.set("nachname", data.nachname);
    fd.set("email", data.email);
    fd.set("phone", data.phone);
    fd.set("geburtsdatum", data.geburtsdatum);
    fd.set("versicherungsnummer", data.versicherungsnummer ?? "");
    fd.set("strasse", data.strasse);
    fd.set("plz", data.plz);
    fd.set("ort", data.ort);
    fd.set("land", data.land);
    fd.set("berufserfahrung", data.berufserfahrung ?? "");
    fd.set("consent", String(data.consent));
    for (const doc of APPLY_DOCS) {
      const file = (data[doc.key] as FileList | undefined)?.[0];
      if (file) fd.set(doc.key, file);
    }
    const res = await fetch("/api/apply", { method: "POST", body: fd }).catch(() => null);
    if (res?.ok) {
      setStatus("success");
      reset();
    } else {
      const body = await res?.json().catch(() => null);
      setServerErrors(Array.isArray(body?.errors) ? body.errors : []);
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
          <Button variant="accent" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Wird gesendet …" : "Jetzt bewerben"}
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
