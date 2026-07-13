"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

/** `onLight` = header is sitting over the light home hero at the top of the page,
 *  so text switches to ink/navy for contrast (gold is reserved for the logo mark). */
function Logo({ onLight }: { onLight: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Uyer Management — Startseite"
      className="flex items-center rounded-lg transition-opacity duration-200 hover:opacity-90"
    >
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-semibold tracking-[0.13em] xl:text-lg",
            onLight ? "text-ink" : "text-text",
          )}
        >
          UYER MANAGEMENT
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span
            className={cn(
              "h-px flex-1",
              onLight ? "bg-navy/40" : "bg-gold/60",
            )}
            aria-hidden
          />
          <span
            className={cn(
              "font-body text-[0.55rem] font-medium uppercase tracking-[0.3em] whitespace-nowrap",
              onLight ? "text-ink/55" : "text-text/65",
            )}
          >
            Holding L.L.C-FZ
          </span>
          <span
            className={cn(
              "h-px flex-1",
              onLight ? "bg-navy/40" : "bg-gold/60",
            )}
            aria-hidden
          />
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Transparent over the hero at the top; solid background once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Force the solid background whenever the mobile menu is open.
  const solid = scrolled || open;
  // Whole site is dark now — header text is always light (gold accents).
  const onLight = false;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none",
        solid
          ? "border-b border-text/10 bg-ink/85 text-text shadow-lg shadow-ink/20 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="relative flex h-20 items-center justify-between">
        <Logo onLight={onLight} />

        {/* Center navigation — absolutely centred so it stays balanced */}
        <nav
          aria-label="Hauptnavigation"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative py-2 font-body text-sm font-medium transition-colors duration-200",
                      isActive
                        ? onLight
                          ? "text-navy"
                          : "text-gold"
                        : onLight
                          ? "text-ink/70 hover:text-ink"
                          : "text-text/80 hover:text-gold",
                    )}
                  >
                    {item.label}
                    {/* Active / hover indicator line */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 transition-all duration-300 motion-reduce:transition-none",
                        onLight ? "bg-navy" : "bg-gold",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right — contact details */}
        <div className="hidden flex-col items-end gap-1.5 lg:flex">
          <a
            href={site.phoneHref}
            className={cn(
              "flex items-center gap-2 font-body text-sm font-medium transition-colors duration-200",
              onLight
                ? "text-ink/80 hover:text-navy"
                : "text-text/85 hover:text-gold",
            )}
          >
            <Phone
              className={cn("h-4 w-4", onLight ? "text-navy" : "text-gold")}
              strokeWidth={2}
              aria-hidden
            />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className={cn(
              "flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200",
              onLight
                ? "text-ink/80 hover:text-navy"
                : "text-text/85 hover:text-gold",
            )}
          >
            <Mail
              className={cn("h-4 w-4", onLight ? "text-navy" : "text-gold")}
              strokeWidth={2}
              aria-hidden
            />
            E-Mail schreiben
          </a>
        </div>

        {/* Animated mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menü öffnen"
          className={cn(
            "relative flex h-10 w-10 flex-col items-center justify-center rounded-lg border transition-colors lg:hidden",
            onLight
              ? "border-ink/10 bg-ink/5 hover:bg-ink/10"
              : "border-text/10 bg-text/5 hover:bg-text/10",
          )}
        >
          <span
            className={cn(
              "block h-0.5 w-5 transition-all duration-300 ease-in-out motion-reduce:transition-none",
              onLight ? "bg-ink" : "bg-text",
              open ? "translate-y-1 rotate-45" : "-translate-y-1",
            )}
          />
          <span
            className={cn(
              "my-0.5 block h-0.5 w-5 transition-all duration-200 ease-in-out motion-reduce:transition-none",
              onLight ? "bg-ink" : "bg-text",
              open ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 transition-all duration-300 ease-in-out motion-reduce:transition-none",
              onLight ? "bg-ink" : "bg-text",
              open ? "-translate-y-1 -rotate-45" : "translate-y-1",
            )}
          />
        </button>
      </Container>

      {/* Mobile navigation dropdown */}
      <div
        className={cn(
          "grid border-t border-text/5 bg-ink/95 text-text backdrop-blur-lg transition-all duration-300 ease-in-out motion-reduce:transition-none lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] overflow-hidden opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobil-Navigation">
            <ul className="space-y-1 px-6 py-4">
              {site.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-lg px-4 py-3 font-body text-base font-medium transition-all duration-200 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
                        isActive
                          ? "bg-gold/10 font-semibold text-gold"
                          : "text-text/80 hover:bg-text/5 hover:text-gold",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact details */}
          <div className="space-y-3 border-t border-text/10 px-6 py-5">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 font-body text-sm font-medium text-text/85 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" strokeWidth={2} aria-hidden />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-text/85 transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4 text-gold" strokeWidth={2} aria-hidden />
              E-Mail schreiben
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
