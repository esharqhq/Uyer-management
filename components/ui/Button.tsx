import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-text ring-1 ring-line hover:ring-gold/60",
  accent: "bg-gold text-ink hover:brightness-95",
  outline:
    "bg-transparent text-gold border-gold hover:bg-gold/10",
};

type Props = {
  variant?: Variant;
  href?: string;
  onDark?: boolean;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  href,
  onDark,
  target,
  rel,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(
    "inline-block rounded-lg border px-5 py-3 font-body font-medium transition",
    variants[variant],
    // cn() is plain concat, so a base border-transparent would conflict with
    // the outline variant's border-gold (stylesheet order decides the winner)
    variant !== "outline" && "border-transparent",
    "disabled:cursor-not-allowed disabled:bg-muted disabled:text-text/70",
    className,
  );
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        data-on-dark={onDark}
        className={classes}
      >
        {children}
      </Link>
    );
  }
  return (
    <button data-on-dark={onDark} className={classes} {...rest}>
      {children}
    </button>
  );
}
