import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, leading, trailing, ...props }, ref) => (
    <div
      className={cn(
        'group flex items-center h-11 rounded-md border bg-surface px-3 gap-2 transition-colors',
        'border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-[color:var(--color-focus-ring)]',
        invalid && 'border-danger focus-within:border-danger focus-within:ring-red-500/20',
        className,
      )}
    >
      {leading && <span className="text-fg-muted shrink-0">{leading}</span>}
      <input
        ref={ref}
        className="flex-1 bg-transparent outline-none text-sm text-fg placeholder:text-fg-muted"
        {...props}
      />
      {trailing && <span className="text-fg-muted shrink-0">{trailing}</span>}
    </div>
  ),
);
Input.displayName = 'Input';

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-[13px] font-medium text-fg-secondary block', className)} {...props} />;
}

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, hint, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="text-[12px] text-danger">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-fg-muted">{hint}</p>
      ) : null}
    </div>
  );
}
