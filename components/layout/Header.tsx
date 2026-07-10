"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

/** Gold interlocked "UY" monogram in a navy rounded square — recreated as SVG. */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="11"
        className="fill-navy stroke-gold/50"
        strokeWidth="1.25"
      />
      <g
        className="stroke-gold"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* W upstrokes */}
        <path d="M11 13 L18 33 L24 21 L30 33 L37 13" />
        {/* U curl tying the mark together */}
        <path d="M18 27 Q24 35 30 27" />
      </g>
    </svg>
  );
}

/** `onLight` = header is sitting over the light home hero at the top of the page,
 *  so text switches to ink/navy for contrast (gold is reserved for the logo mark). */
function Logo({ onLight }: { onLight: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Uyer Management — Startseite"
      className="flex items-center gap-3 rounded-lg transition-opacity duration-200 hover:opacity-90"
    >
      <LogoMark className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-body text-xl font-semibold tracking-[0.2em]",
            onLight ? "text-ink" : "text-surface",
          )}
        >
          UYER
        </span>
        <span
          className={cn(
            "mt-1 font-body text-[0.62rem] font-medium uppercase tracking-[0.4em]",
            onLight ? "text-ink/50" : "text-surface/60",
          )}
        >
          Management
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
  // The home hero is light at the top — use dark header text there until scrolled.
  const onLight = pathname === "/" && !solid;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none",
        solid
          ? "border-b border-surface/10 bg-ink/85 text-surface shadow-lg shadow-ink/20 backdrop-blur-md"
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
                          : "text-surface/80 hover:text-gold",
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
                : "text-surface/85 hover:text-gold",
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
                : "text-surface/85 hover:text-gold",
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
              : "border-surface/10 bg-surface/5 hover:bg-surface/10",
          )}
        >
          <span
            className={cn(
              "block h-0.5 w-5 transition-all duration-300 ease-in-out motion-reduce:transition-none",
              onLight ? "bg-ink" : "bg-surface",
              open ? "translate-y-1 rotate-45" : "-translate-y-1",
            )}
          />
          <span
            className={cn(
              "my-0.5 block h-0.5 w-5 transition-all duration-200 ease-in-out motion-reduce:transition-none",
              onLight ? "bg-ink" : "bg-surface",
              open ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 transition-all duration-300 ease-in-out motion-reduce:transition-none",
              onLight ? "bg-ink" : "bg-surface",
              open ? "-translate-y-1 -rotate-45" : "translate-y-1",
            )}
          />
        </button>
      </Container>

      {/* Mobile navigation dropdown */}
      <div
        className={cn(
          "grid border-t border-surface/5 bg-ink/95 text-surface backdrop-blur-lg transition-all duration-300 ease-in-out motion-reduce:transition-none lg:hidden",
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
                          : "text-surface/80 hover:bg-surface/5 hover:text-gold",
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
          <div className="space-y-3 border-t border-surface/10 px-6 py-5">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 font-body text-sm font-medium text-surface/85 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" strokeWidth={2} aria-hidden />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-surface/85 transition-colors hover:text-gold"
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
