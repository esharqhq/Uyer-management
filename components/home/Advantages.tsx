import { Clock3, ShieldCheck, Workflow, Globe, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StatCounter } from "@/components/motion/StatCounter";

const points: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Clock3,
    title: "Flexible Lösungen",
    text: "Personal genau dann, wenn Sie es brauchen – kurzfristig oder langfristig.",
  },
  {
    icon: ShieldCheck,
    title: "Qualifizierte Fachkräfte",
    text: "Geprüftes Personal mit Erfahrung in der professionellen Gebäudereinigung.",
  },
  {
    icon: Workflow,
    title: "Komplette Prozessbetreuung",
    text: "Von der Suche über Verträge bis zur Lohnverrechnung – alles aus einer Hand.",
  },
  {
    icon: Globe,
    title: "Europaweites Netzwerk",
    text: "Schwerpunkt Österreich & Deutschland, Reichweite in ganz Europa.",
  },
];

export function Advantages() {
  return (
    <Section tone="surface" aria-labelledby="advantages-heading">
      <Container>
        <p className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-navy">
          Ihr Vorteil
        </p>
        <h2 id="advantages-heading" className="mt-3 text-center font-display text-3xl font-semibold">
          Partnerschaft auf Augenhöhe
        </h2>
        <AnimatedSection stagger={0.12} className="mt-12 grid gap-8 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="flex gap-5">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-gold-wash text-navy">
                <p.icon size={24} strokeWidth={1.75} aria-hidden />
              </span>
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
