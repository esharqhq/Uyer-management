import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <Section tone="light" aria-labelledby="services-heading">
      <Container>
        <h2 id="services-heading" className="text-center font-display text-3xl font-semibold">
          Unser Leistungsspektrum
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted">
          Als europaweit tätiges Unternehmen in der Personalvermittlung und
          Auftragsvermittlung, mit Schwerpunkt in Österreich und Deutschland,
          bieten wir Ihnen ein vollständiges Leistungspaket.
        </p>
        <AnimatedSection stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s, i) => (
            <article
              key={s.title}
              className="rounded-lg border border-line bg-surface p-6 shadow-sm"
            >
              <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 font-body text-sm leading-6 text-muted">
                {detailed ? s.text : s.text.split(". ")[0] + "."}
              </p>
            </article>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
