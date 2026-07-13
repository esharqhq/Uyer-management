import { forwardRef, useId } from "react";
import { FieldLabel, FieldError } from "./Input";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  error?: string;
  fileName?: string | null;
  /** Helper text shown before a file is picked. */
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FileUpload = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      fileName,
      hint = "Datei hochladen (PDF oder Word, max. 5 MB)",
      accept = ".pdf,.doc,.docx",
      required,
      className,
      id,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const selected = Boolean(fileName);
    return (
      <div className={className}>
        <FieldLabel htmlFor={inputId} label={label} required={required} />
        <label
          htmlFor={inputId}
          className={cn(
            "block cursor-pointer rounded-lg border border-dashed px-4 py-6 text-center font-body text-sm transition focus-within:outline-2 focus-within:outline-gold focus-within:outline-offset-2",
            selected
              ? "border-green-600 bg-green-600/10"
              : "border-line bg-surface hover:border-gold",
          )}
        >
          {selected ? (
            <>
              <span className="font-medium text-text">{`✓ ${fileName}`}</span>
              <span className="mt-1 block text-muted">
                Datei ausgewählt – zum Ersetzen klicken
              </span>
            </>
          ) : (
            <span className="text-muted">{hint}</span>
          )}
          <input
            id={inputId}
            ref={ref}
            type="file"
            className="sr-only"
            accept={accept}
            aria-required={required || undefined}
            {...rest}
          />
        </label>
        <FieldError error={error} />
      </div>
    );
  },
);
FileUpload.displayName = "FileUpload";
