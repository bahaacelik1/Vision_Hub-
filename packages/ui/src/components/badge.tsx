import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

type Tone = 'neutral' | 'vision' | 'hub' | 'social' | 'success' | 'warning' | 'danger';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  neutral: 'bg-neutral-100 text-neutral-700',
  vision: 'bg-vision-100 text-vision-900',
  hub: 'bg-blue-100 text-blue-800',
  social: 'bg-orange-100 text-orange-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
};

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
