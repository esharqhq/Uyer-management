import Image from "next/image";

export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
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
      </div>
    </section>
  );
}
