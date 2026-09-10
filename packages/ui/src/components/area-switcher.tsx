'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface AreaSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  active: 'hub' | 'social';
  hubHref?: string;
  socialHref?: string;
}

/**
 * Vision Hub ↔ Vision Social geçiş komponenti.
 * Her iki app'in top bar'ında ortak kullanılır.
 */
export function AreaSwitcher({
  active,
  hubHref = '/',
  socialHref = '/',
  className,
  ...props
}: AreaSwitcherProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1',
        className,
      )}
      {...props}
    >
      <a
        href={hubHref}
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
          active === 'hub'
            ? 'bg-hub-500 text-white'
            : 'text-neutral-600 hover:text-neutral-900',
        )}
      >
        Hub
      </a>
      <a
        href={socialHref}
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
          active === 'social'
            ? 'bg-social-500 text-white'
            : 'text-neutral-600 hover:text-neutral-900',
        )}
      >
        Social
      </a>
    </div>
  );
}
