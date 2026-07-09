import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "./ContactForm";

export function ContactBlock() {
  return (
    <Section tone="dark">
      <Container className="grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div className="rounded-lg bg-navy/40 p-8">
          <h2 className="font-display text-2xl font-semibold text-gold">{site.legalName}</h2>
          <address className="mt-4 font-body text-sm not-italic leading-6 text-surface/85">
            {site.address.street}
            <br />
            {site.address.area}, {site.address.city}
          </address>
          <ul className="mt-6 space-y-2.5 font-body text-sm">
            <li>
              <a href={site.phoneHref} className="text-gold hover:underline">📞 {site.phone}</a>
            </li>
            <li>
              <a href={site.whatsapp} className="text-gold hover:underline">💬 WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-gold hover:underline">✉️ {site.email}</a>
            </li>
          </ul>
          <h3 className="mt-8 font-body text-sm font-semibold uppercase tracking-wider text-surface">
            Öffnungszeiten
          </h3>
          <p className="mt-2 flex justify-between font-body text-sm text-surface/85">
            <span>{site.hours.days}</span>
            <span>{site.hours.time}</span>
          </p>
          <p className="mt-8 font-body text-sm text-surface/70">
            <Link href="/impressum" className="hover:text-gold">Impressum</Link>
            {" | "}
            <Link href="/datenschutz" className="hover:text-gold">Datenschutz</Link>
          </p>
        </div>
        <ContactForm />
      </Container>
    </Section>
  );
}
