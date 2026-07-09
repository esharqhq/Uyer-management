"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { applySchema, REGIONS, CV_MAX_BYTES, CV_TYPES } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

const applyFormSchema = applySchema.extend({
  cv: z
    .custom<FileList>()
    .refine((fl) => fl && fl.length === 1, "Bitte laden Sie Ihren Lebenslauf hoch.")
    .refine(
      (fl) => !fl?.[0] || fl[0].size <= CV_MAX_BYTES,
      "Die Datei ist zu groß (max. 5 MB).",
    )
    .refine(
      (fl) => !fl?.[0] || CV_TYPES.includes(fl[0].type),
      "Bitte laden Sie Ihren Lebenslauf als PDF oder Word-Datei hoch.",
    ),
});
type ApplyFormInput = z.infer<typeof applyFormSchema>;

export function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ApplyFormInput>({ resolver: zodResolver(applyFormSchema) });

  const cvFile = watch("cv")?.[0];

  const onSubmit = async (data: ApplyFormInput) => {
    setStatus("sending");
    setServerErrors([]);
    const fd = new FormData();
    fd.set("name", data.name);
    fd.set("phone", data.phone);
    fd.set("email", data.email);
    fd.set("region", data.region);
    fd.set("consent", String(data.consent));
    fd.set("cv", data.cv[0]);
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Vor- und Nachname" required placeholder="Max Mustermann" error={errors.name?.message} {...register("name")} />
        <Input label="Telefon" type="tel" required error={errors.phone?.message} {...register("phone")} />
        <Input label="E-Mail" type="email" required error={errors.email?.message} {...register("email")} />
        <Select label="Region" required options={REGIONS} placeholder="Bitte wählen" error={errors.region?.message} {...register("region")} />
      </div>
      <FileUpload
        label="Lebenslauf"
        required
        className="mt-5"
        fileName={cvFile?.name ?? null}
        error={errors.cv?.message as string | undefined}
        {...register("cv")}
      />
      <Checkbox
        className="mt-5"
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
      {status === "error" && (
        <p role="alert" className="mt-4 font-body text-sm text-red-700">
          {serverErrors.length > 0
            ? serverErrors.join(" ")
            : "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."}
        </p>
      )}
      <Button variant="accent" type="submit" disabled={status === "sending"} className="mt-6">
        {status === "sending" ? "Wird gesendet …" : "Jetzt bewerben"}
      </Button>
    </form>
  );
}
