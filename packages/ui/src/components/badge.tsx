import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  neutral: 'bg-subtle text-fg-muted border border-border',
  primary: 'bg-primary-soft text-primary',
  success: 'bg-green-500/10 text-success',
  warning: 'bg-yellow-500/10 text-warning',
  danger:  'bg-red-500/10 text-danger',
  info:    'bg-blue-500/10 text-info',
};

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[12px] font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
