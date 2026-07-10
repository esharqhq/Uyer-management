import Image from "next/image";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

/* WhatsApp brand glyph — lucide ships no brand icons; inherits currentColor. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function StaffCta() {
  return (
    <section
      aria-labelledby="staff-cta-heading"
      className="relative overflow-hidden bg-ink py-24 text-surface sm:py-32"
    >
      <Image
        src="/images/hero-services.jpg"
        alt=""
        fill
        quality={60}
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/85" />

      <Container className="relative">
        <AnimatedSection className="text-center">
          <h2
            id="staff-cta-heading"
            className="font-display text-3xl font-semibold uppercase tracking-wide text-gold sm:text-4xl md:text-5xl"
          >
            Sie suchen Personal?
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-8 text-surface/85">
            Rufen Sie uns jetzt an und erfahren Sie, wie wir Ihr Unternehmen
            zuverlässig unterstützen.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="outline"
              onDark
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto sm:min-w-52"
            >
              <span className="flex items-center justify-center gap-2.5">
                <WhatsAppIcon className="size-5" />
                WhatsApp
              </span>
            </Button>
            <Button
              variant="outline"
              onDark
              href={`mailto:${site.email}`}
              className="w-full sm:w-auto sm:min-w-52"
            >
              <span className="flex items-center justify-center gap-2.5">
                <Mail size={20} strokeWidth={1.75} aria-hidden />
                E-Mail schreiben
              </span>
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
