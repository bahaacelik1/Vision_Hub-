'use client';

import type { ReactNode } from 'react';
import { Bell, Mail } from './icons';
import { UserMenu } from './user-menu';

interface TopBarProps {
  userName?: string;
  userEmail?: string;
  extra?: ReactNode;
  onSignOut?: () => void;
}

export function TopBar({
  userName = 'Baha Çelik',
  userEmail,
  extra,
  onSignOut,
}: TopBarProps) {
  return (
    <header className="h-16 shrink-0 border-b border-border bg-surface flex items-center gap-4 px-6">
      {/* Sol ve merkez boş — GlobalModeSwitcher viewport-fixed */}
      <div className="flex-1" />

      <div className="flex items-center gap-1">
        {extra}
        <IconButton label="Mesajlar" badge={2}>
          <Mail />
        </IconButton>
        <IconButton label="Bildirimler" badge={5}>
          <Bell />
        </IconButton>
        <div className="ml-2">
          <UserMenu name={userName} email={userEmail} onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
}

function IconButton({ children, label, badge }: { children: ReactNode; label: string; badge?: number }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative h-11 w-11 flex items-center justify-center rounded-full text-fg-muted hover:bg-subtle hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--color-focus-ring)]"
    >
      {children}
      {badge ? (
        <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-[10px] font-semibold text-[color:var(--color-action-primary-text)] flex items-center justify-center">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
