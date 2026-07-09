import { forwardRef, useId } from "react";
import { FieldLabel, FieldError, fieldClasses } from "./Input";
import { cn } from "@/lib/cn";

type Props = { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, required, className, id, ...rest }, ref) => {
    const autoId = useId();
    const areaId = id ?? autoId;
    return (
      <div className={className}>
        <FieldLabel htmlFor={areaId} label={label} required={required} />
        <textarea id={areaId} ref={ref} required={required} rows={5} className={cn(fieldClasses, "resize-y")} {...rest} />
        <FieldError error={error} />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
