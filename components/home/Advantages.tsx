import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StatCounter } from "@/components/motion/StatCounter";

const points = [
  {
    title: "Flexible Lösungen",
    text: "Personal genau dann, wenn Sie es brauchen – kurzfristig oder langfristig.",
  },
  {
    title: "Qualifizierte Fachkräfte",
    text: "Geprüftes Personal mit Erfahrung in der professionellen Gebäudereinigung.",
  },
  {
    title: "Komplette Prozessbetreuung",
    text: "Von der Suche über Verträge bis zur Lohnverrechnung – alles aus einer Hand.",
  },
  {
    title: "Europaweites Netzwerk",
    text: "Schwerpunkt Österreich & Deutschland, Reichweite in ganz Europa.",
  },
];

export function Advantages() {
  return (
    <Section tone="surface" aria-labelledby="advantages-heading">
      <Container>
        <h2 id="advantages-heading" className="text-center font-display text-3xl font-semibold">
          Ihr Vorteil: Partnerschaft auf Augenhöhe
        </h2>
        <AnimatedSection stagger={0.12} className="mt-12 grid gap-8 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="mt-1 size-2.5 shrink-0 rotate-45 bg-gold" aria-hidden />
              <div>
                <h3 className="font-body text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 font-body text-sm leading-6 text-muted">{p.text}</p>
              </div>
            </div>
          ))}
        </AnimatedSection>
        <div className="mt-16 grid grid-cols-1 gap-8 rounded-lg bg-ink px-6 py-10 text-surface sm:grid-cols-3 sm:gap-6">
          <StatCounter value={2} label="Länder im Fokus" />
          <StatCounter value={5} label="Leistungsbereiche" />
          <StatCounter value={100} suffix="%" label="Prozessbetreuung" />
        </div>
      </Container>
    </Section>
  );
}
