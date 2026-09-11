'use client';

import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  activeKey: string;
  logo?: ReactNode;
  footer?: ReactNode;
}

/**
 * Koyu sidebar (spec: --color-sidebar-bg #222831). Hem light hem dark mod'ta koyu kalır.
 * Active item: mode accent (--color-sidebar-accent) sol şerit + arka fon tinti.
 */
export function Sidebar({ items, activeKey, logo, footer }: SidebarProps) {
  return (
    <aside
      className="w-[240px] shrink-0 flex flex-col text-[color:var(--color-sidebar-text)]"
      style={{ background: 'var(--color-sidebar-bg)' }}
    >
      <div className="h-16 px-5 flex items-center border-b border-white/5">
        {logo ?? <span className="font-semibold tracking-tight text-lg">Vision</span>}
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {items.map((it) => {
          const active = it.key === activeKey;
          return (
            <a
              key={it.key}
              href={it.href}
              className={cn(
                'relative flex items-center gap-3 h-11 px-3 rounded-md text-[14px] transition-colors',
                active
                  ? 'text-white'
                  : 'text-[color:var(--color-sidebar-text-muted)] hover:text-white hover:bg-[color:var(--color-sidebar-hover)]',
              )}
              style={active ? { background: 'var(--color-sidebar-active)' } : undefined}
            >
              {active && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                  style={{ background: 'var(--color-sidebar-accent)' }}
                />
              )}
              <span className="shrink-0">{it.icon}</span>
              <span className="truncate">{it.label}</span>
            </a>
          );
        })}
      </nav>
      {footer && <div className="p-3 border-t border-white/5">{footer}</div>}
    </aside>
  );
}
