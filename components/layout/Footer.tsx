import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg text-gold">{site.legalName}</p>
          <address className="mt-3 font-body text-sm not-italic leading-6 text-surface/80">
            {site.address.street}
            <br />
            {site.address.area}, {site.address.city}
          </address>
        </div>
        <div>
          <p className="font-body text-sm font-semibold uppercase tracking-wider text-gold">
            Kontakt
          </p>
          <ul className="mt-3 space-y-2 font-body text-sm text-surface/80">
            <li>
              <a href={site.phoneHref} className="hover:text-gold">{site.phone}</a>
            </li>
            <li>
              <a href={site.whatsapp} className="hover:text-gold">WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            </li>
          </ul>
          <p className="mt-4 font-body text-sm text-surface/80">
            <span className="font-semibold text-surface">Öffnungszeiten:</span>
            <br />
            {site.hours.days}, {site.hours.time}
          </p>
        </div>
        <div>
          <p className="font-body text-sm font-semibold uppercase tracking-wider text-gold">
            Rechtliches
          </p>
          <ul className="mt-3 space-y-2 font-body text-sm text-surface/80">
            <li>
              <Link href="/impressum" className="hover:text-gold">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-gold">Datenschutz</Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-navy py-4 text-center font-body text-xs text-surface/60">
        © {new Date().getFullYear()} {site.legalName}
      </div>
    </footer>
  );
}
