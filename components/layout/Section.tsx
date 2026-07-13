import { cn } from "@/lib/cn";

const tones = {
  light: "bg-paper text-text",
  surface: "bg-surface text-text",
  wash: "bg-surface text-text",
  dark: "bg-ink text-text",
} as const;

export function Section({
  tone = "light",
  className,
  children,
  ...rest
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-16 sm:py-24", tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}
