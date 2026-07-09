import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-surface hover:brightness-110",
  accent: "bg-gold text-ink hover:brightness-95",
  outline:
    "bg-transparent text-navy border-navy hover:bg-navy/5 data-[on-dark=true]:text-gold data-[on-dark=true]:border-gold data-[on-dark=true]:hover:bg-gold/10",
};

type Props = {
  variant?: Variant;
  href?: string;
  onDark?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  href,
  onDark,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(
    "inline-block rounded-lg border border-transparent px-5 py-3 font-body font-medium transition",
    variants[variant],
    variant === "outline" && "border-current",
    "disabled:cursor-not-allowed disabled:bg-muted disabled:text-surface/70",
    className,
  );
  if (href) {
    return (
      <Link href={href} data-on-dark={onDark} className={classes}>
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
