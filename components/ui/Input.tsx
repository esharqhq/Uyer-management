import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

export function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-body text-sm font-medium">
      {label}
      {required && <span className="ml-0.5 text-gold">*</span>}
    </label>
  );
}

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  // red-400 keeps error text readable on the dark theme surfaces
  // on an ancestor, which switches this to red-400 for contrast on ink.
  return (
    <p className="mt-1 text-sm font-medium text-red-400">
      {error}
    </p>
  );
}

export const fieldClasses =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 font-body text-text placeholder:text-muted focus:border-gold";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className, id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <div className={className}>
        <FieldLabel htmlFor={inputId} label={label} required={required} />
        <input id={inputId} ref={ref} required={required} className={fieldClasses} {...rest} />
        <FieldError error={error} />
      </div>
    );
  },
);
Input.displayName = "Input";
