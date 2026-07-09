"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-ink/95 text-surface backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-gold">
          UYER MANAGEMENT
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-body text-sm font-medium transition hover:text-gold",
                    pathname === item.href ? "text-gold" : "text-surface",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menü öffnen"
          className="md:hidden"
        >
          <span className="block h-0.5 w-6 bg-surface" />
          <span className="mt-1.5 block h-0.5 w-6 bg-surface" />
          <span className="mt-1.5 block h-0.5 w-6 bg-surface" />
        </button>
      </Container>
      {open && (
        <nav aria-label="Mobile Navigation" className="border-t border-navy md:hidden">
          <ul className="space-y-1 px-5 py-4">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-body font-medium text-surface hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
