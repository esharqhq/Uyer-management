import { forwardRef, useId } from "react";
import { FieldError } from "./Input";

type Props = { label: React.ReactNode; error?: string } & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...rest }, ref) => {
    const autoId = useId();
    const boxId = id ?? autoId;
    return (
      <div className={className}>
        <div className="flex items-start gap-2.5">
          <input
            id={boxId}
            ref={ref}
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-ink"
            {...rest}
          />
          <label htmlFor={boxId} className="font-body text-sm">
            {label}
          </label>
        </div>
        <FieldError error={error} />
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
