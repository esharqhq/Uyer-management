import Image from "next/image";
import { Button } from "@/components/ui/Button";

type HeroCta = { label: string; href: string; variant?: "accent" | "outline" };

export function PageHero({
  title,
  subtitle,
  image,
  cta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  image: string;
  cta?: HeroCta;
  secondaryCta?: HeroCta;
}) {
  return (
    <section className="relative flex min-h-[42vh] items-center overflow-hidden bg-ink text-text">
      <Image src={image} alt="" fill priority quality={65} className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 to-ink/90" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-gold sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 font-body text-text/90">{subtitle}</p>}
        {(cta || secondaryCta) && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {[cta, secondaryCta].filter(Boolean).map((action) => {
              const { label, href, variant } = action as HeroCta;
              const resolved = variant ?? (action === cta ? "accent" : "outline");
              return (
                <Button
                  key={href}
                  variant={resolved}
                  onDark={resolved === "outline"}
                  href={href}
                  className="w-full sm:w-auto sm:min-w-52 text-center"
                >
                  {label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
