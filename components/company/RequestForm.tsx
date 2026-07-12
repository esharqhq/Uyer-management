"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  personnelRequestSchema,
  type PersonnelRequestInput,
  EINSATZORTE,
} from "@/lib/schemas";

// `anzahl` is coerced (string → number), so the raw form input and the parsed
// output differ; RHF's three generics keep both sides correctly typed.
type RequestFormValues = z.input<typeof personnelRequestSchema>;
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

export function RequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestFormValues, unknown, PersonnelRequestInput>({
    resolver: zodResolver(personnelRequestSchema),
  });

  const onSubmit = async (data: PersonnelRequestInput) => {
    setStatus("sending");
    const res = await fetch("/api/personnel-request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    if (res?.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="rounded-lg bg-green-600/15 p-5 font-body">
        ✓ Vielen Dank für Ihre Anfrage! Wir prüfen Ihren Bedarf und melden uns in
        Kürze mit passenden Fachkräften bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3 className="font-display text-lg font-semibold">Ihre Anfrage</h3>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <Input label="Firmenname" required className="sm:col-span-2" placeholder="Muster GmbH" error={errors.firmenname?.message} {...register("firmenname")} />
        <Input label="Ansprechpartner" required placeholder="Max Mustermann" error={errors.ansprechpartner?.message} {...register("ansprechpartner")} />
        <Input label="E-Mail" type="email" required error={errors.email?.message} {...register("email")} />
        <Input label="Telefon" type="tel" required error={errors.telefon?.message} {...register("telefon")} />
        <Input label="Gesuchte Position" required placeholder="z. B. Reinigungskraft" error={errors.position?.message} {...register("position")} />
        <Input label="Anzahl der Mitarbeiter" type="number" min={1} required placeholder="z. B. 5" error={errors.anzahl?.message} {...register("anzahl")} />
        <Select label="Einsatzort" required options={EINSATZORTE} placeholder="Bitte wählen" error={errors.einsatzort?.message} {...register("einsatzort")} />
        <Input label="Gewünschtes Startdatum" type="date" className="sm:col-span-2" error={errors.startdatum?.message} {...register("startdatum")} />
      </div>
      <Textarea
        label="Anmerkungen"
        className="mt-5"
        rows={4}
        placeholder="Optional: Qualifikationen, Zeitraum, weitere Details."
        error={errors.anmerkungen?.message}
        {...register("anmerkungen")}
      />
      <Checkbox
        className="mt-5"
        label={
          <>
            Personenbezogene Daten werden zu den in der{" "}
            <Link href="/datenschutz" className="underline hover:text-gold">
              Datenschutzerklärung
            </Link>{" "}
            beschriebenen Zwecken übermittelt und verwendet.
            <span className="ml-0.5 text-gold">*</span>
          </>
        }
        error={errors.consent?.message}
        {...register("consent")}
      />
      {status === "error" && (
        <p role="alert" className="mt-4 font-body text-sm text-red-700">
          Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.
        </p>
      )}
      <Button variant="accent" type="submit" disabled={status === "sending"} className="mt-6">
        {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
      </Button>
    </form>
  );
}
