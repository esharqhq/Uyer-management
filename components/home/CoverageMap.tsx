import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const areas = [
  {
    country: "Österreich",
    cities: ["Wien", "Linz", "Salzburg", "Graz", "Innsbruck"],
  },
  {
    country: "Deutschland",
    cities: ["München", "Stuttgart", "Frankfurt", "Berlin", "Hamburg"],
  },
];

export function CoverageMap() {
  return (
    <Section tone="light" aria-labelledby="coverage-heading">
      <Container>
        <h2 id="coverage-heading" className="text-center font-display text-3xl font-semibold">
          Unsere Einsatzgebiete
        </h2>
        <AnimatedSection stagger={0.15} className="mt-12 grid gap-6 sm:grid-cols-2">
          {areas.map((a) => (
            <div key={a.country} className="rounded-lg bg-ink p-8 text-surface">
              <h3 className="font-display text-2xl font-semibold text-gold">{a.country}</h3>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {a.cities.map((c) => (
                  <li key={c} className="flex items-center gap-2 font-body text-sm text-surface/85">
                    <span className="size-1.5 rounded-full bg-gold" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-body text-xs text-surface/60">
                … und Umgebung – europaweit vernetzt.
              </p>
            </div>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
