import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section tone="light">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold break-words hyphens-auto sm:text-4xl">{title}</h1>
        <div className="mt-8 space-y-6 font-body leading-7 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:pt-4 [&_p]:text-muted [&_li]:text-muted [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          {children}
        </div>
      </Container>
    </Section>
  );
}
