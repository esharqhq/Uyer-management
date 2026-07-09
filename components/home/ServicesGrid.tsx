import {
  Users,
  CalendarClock,
  Calculator,
  FileSignature,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

/* one icon per service, same order as site.services */
const icons: LucideIcon[] = [Users, CalendarClock, Calculator, FileSignature, Handshake];

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <Section tone="light" aria-labelledby="services-heading">
      <Container>
        <p className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-navy">
          Leistungen
        </p>
        <h2 id="services-heading" className="mt-3 text-center font-display text-3xl font-semibold">
          Unser Leistungsspektrum
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted">
          Als europaweit tätiges Unternehmen in der Personalvermittlung und
          Auftragsvermittlung, mit Schwerpunkt in Österreich und Deutschland,
          bieten wir Ihnen ein vollständiges Leistungspaket.
        </p>
        <AnimatedSection stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s, i) => {
            const Icon = icons[i];
            return (
              <article
                key={s.title}
                className="group rounded-lg border border-line bg-surface p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lg"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-lg bg-gold-wash text-navy transition duration-300 group-hover:bg-gold group-hover:text-ink">
                  <Icon size={24} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-muted">
                  {detailed ? s.text : s.text.split(". ")[0] + "."}
                </p>
              </article>
            );
          })}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
