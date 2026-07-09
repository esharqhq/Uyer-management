"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    const res = await fetch("/api/contact", {
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
      <p role="status" className="rounded-lg bg-green-600/15 p-5 font-body text-surface">
        ✓ Vielen Dank! Ihre Anfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate data-tone="dark">
      <h2 className="font-display text-2xl font-semibold text-gold">Anfrage senden</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Input label="Vorname" required error={errors.firstName?.message} {...register("firstName")} />
        <Input label="Nachname" required error={errors.lastName?.message} {...register("lastName")} />
        <Input label="Telefon" type="tel" error={errors.phone?.message} {...register("phone")} />
        <Input label="E-Mail" type="email" required error={errors.email?.message} {...register("email")} />
      </div>
      <Textarea
        label="Nachricht"
        required
        className="mt-5"
        placeholder="Wie können wir Ihnen helfen?"
        error={errors.message?.message}
        {...register("message")}
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
        <p role="alert" className="mt-4 font-body text-sm text-red-400">
          Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.
        </p>
      )}
      <Button variant="accent" type="submit" disabled={status === "sending"} className="mt-6">
        {status === "sending" ? "Wird gesendet …" : "Senden"}
      </Button>
    </form>
  );
}
