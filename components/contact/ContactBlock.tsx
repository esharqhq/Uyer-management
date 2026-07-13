import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Clock, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const methods: { icon: LucideIcon; label: string; value: string; href: string }[] = [
  { icon: Phone, label: "Anrufen", value: site.phone, href: site.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Nachricht senden", href: site.whatsapp },
  { icon: Mail, label: "E-Mail", value: site.email, href: `mailto:${site.email}` },
];

export function ContactBlock() {
  return (
    <Section tone="light" aria-labelledby="contact-heading">
      <Container>
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Kontakt
          </p>
          <h2 id="contact-heading" className="mt-3 font-display text-3xl font-semibold">
            So erreichen Sie uns
          </h2>
          <p className="mt-4 font-body leading-7 text-muted">
            Wir freuen uns auf Ihre Anfrage – telefonisch, per WhatsApp oder
            E-Mail. Wir melden uns schnellstmöglich bei Ihnen zurück.
          </p>
        </AnimatedSection>

        <AnimatedSection stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-3">
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              className="group flex flex-col items-center gap-3 rounded-lg border border-line bg-surface p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lg"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold-wash text-gold transition duration-300 group-hover:bg-gold group-hover:text-ink">
                <m.icon size={26} strokeWidth={1.75} aria-hidden />
              </span>
              <span className="mt-1 font-display text-lg font-semibold">{m.label}</span>
              <span className="font-body text-sm text-muted">{m.value}</span>
            </a>
          ))}
        </AnimatedSection>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
          <p className="flex items-center gap-2.5 font-body text-sm text-muted">
            <MapPin size={18} strokeWidth={1.75} className="shrink-0 text-gold" aria-hidden />
            {site.address.area}, {site.address.city}
          </p>
          <p className="flex items-center gap-2.5 font-body text-sm text-muted">
            <Clock size={18} strokeWidth={1.75} className="shrink-0 text-gold" aria-hidden />
            {site.hours.days} · {site.hours.time}
          </p>
        </div>

        <p className="mt-8 text-center font-body text-sm text-muted">
          <Link href="/impressum" className="hover:text-gold">Impressum</Link>
          {" | "}
          <Link href="/datenschutz" className="hover:text-gold">Datenschutz</Link>
          {" | "}
          <Link href="/agb" className="hover:text-gold">AGB</Link>
        </p>
      </Container>
    </Section>
  );
}
