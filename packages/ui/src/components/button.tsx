import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--color-focus-ring)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-[color:var(--color-action-primary)] text-[color:var(--color-action-primary-text)] hover:bg-[color:var(--color-action-primary-hover)]',
  secondary:
    'bg-transparent text-[color:var(--color-action-primary)] border border-[color:var(--color-action-primary)] hover:bg-[color:var(--color-action-secondary)]',
  tertiary:
    'bg-transparent text-[color:var(--color-action-primary)] hover:bg-[color:var(--color-action-secondary)]',
  destructive: 'bg-danger text-white hover:opacity-90',
  ghost: 'bg-transparent text-fg hover:bg-subtle',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-[13px] min-w-[44px]',
  md: 'h-11 px-5 text-sm min-w-[44px]',
  lg: 'h-12 px-6 text-base min-w-[44px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {loading && (
        <span className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      )}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
