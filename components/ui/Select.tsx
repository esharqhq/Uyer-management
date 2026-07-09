import { forwardRef, useId } from "react";
import { FieldLabel, FieldError, fieldClasses } from "./Input";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, placeholder, required, className, id, ...rest }, ref) => {
    const autoId = useId();
    const selectId = id ?? autoId;
    return (
      <div className={className}>
        <FieldLabel htmlFor={selectId} label={label} required={required} />
        <select
          id={selectId}
          ref={ref}
          required={required}
          defaultValue=""
          className={cn(fieldClasses, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%235B6B7D%22 stroke-width=%222%22 fill=%22none%22/></svg>')] bg-[position:right_14px_center] bg-no-repeat pr-10")}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <FieldError error={error} />
      </div>
    );
  },
);
Select.displayName = "Select";
