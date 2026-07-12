"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "uyer-cookie-consent";

// Lightweight, self-contained consent notice. This site sets only technically
// necessary storage (no tracking/marketing cookies — see /datenschutz), so the
// banner informs and records a choice rather than gating any tracking scripts.
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private mode) — show the notice anyway.
      setVisible(true);
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore write failures */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-lg border border-line bg-surface p-5 shadow-lg sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-wash text-navy">
            <Cookie size={18} strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <p id="cookie-title" className="font-display text-base font-semibold">
              Cookie-Hinweis
            </p>
            <p className="mt-1 font-body text-sm leading-6 text-muted">
              Wir verwenden ausschließlich technisch notwendige Cookies für den
              Betrieb dieser Website. Weitere Informationen finden Sie in unserer{" "}
              <Link href="/datenschutz" className="text-navy underline hover:text-gold">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-3 sm:ml-auto">
          <Button variant="outline" type="button" onClick={() => decide("declined")}>
            Ablehnen
          </Button>
          <Button variant="primary" type="button" onClick={() => decide("accepted")}>
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
