'use client';

import { useEffect, useRef, useState } from 'react';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { Avatar } from './avatar';
import { useTheme } from './theme-provider';
import { Sun, Moon, User, Settings, LogOut } from './icons';

interface UserMenuProps {
  name: string;
  email?: string;
  /** Absolute veya relative — profile sayfasına link. */
  profileHref?: string;
  /** Absolute veya relative — ayarlar sayfası. */
  settingsHref?: string;
  /** Çıkış tetiklendiğinde çağrılır. Uygulama next-auth/react.signOut() ile bağlar. */
  onSignOut?: () => void;
}

/**
 * Avatar → dropdown menü.
 * TopBar'daki tema toggle'ı buraya taşındı. Karanlık mod uygulama menüsünden yönetilir.
 */
export function UserMenu({ name, email, profileHref = '/profile', settingsHref = '/settings', onSignOut }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    setOpen(false);
    if (onSignOut) return onSignOut();
    const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL ?? '/';
    void nextAuthSignOut({ callbackUrl: gatewayUrl });
  };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Hesap menüsü"
        className="rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--color-focus-ring)]"
      >
        <Avatar name={name} size="sm" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-border bg-surface shadow-lg overflow-hidden z-50"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Avatar name={name} size="md" />
            <div className="min-w-0">
              <p className="font-semibold truncate">{name}</p>
              {email && <p className="text-[12px] text-fg-muted truncate">{email}</p>}
            </div>
          </div>

          {/* Items */}
          <div className="p-1">
            <MenuLink href={profileHref} icon={<User />}>
              Profilim
            </MenuLink>
            <MenuLink href={settingsHref} icon={<Settings />}>
              Ayarlar
            </MenuLink>

            <div className="my-1 h-px bg-border" />

            <button
              type="button"
              onClick={toggleTheme}
              role="menuitemcheckbox"
              aria-checked={theme === 'dark'}
              className="w-full flex items-center gap-3 h-11 px-3 rounded-md text-sm text-left hover:bg-subtle"
            >
              <span className="shrink-0 text-fg-muted">
                {theme === 'dark' ? <Sun /> : <Moon />}
              </span>
              <span className="flex-1">Karanlık mod</span>
              <span
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-primary' : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                    theme === 'dark' ? 'left-4' : 'left-0.5'
                  }`}
                />
              </span>
            </button>

            <div className="my-1 h-px bg-border" />

            <button
              type="button"
              onClick={handleSignOut}
              role="menuitem"
              className="w-full flex items-center gap-3 h-11 px-3 rounded-md text-sm text-left hover:bg-subtle text-danger"
            >
              <span className="shrink-0"><LogOut /></span>
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <a
      href={href}
      role="menuitem"
      className="flex items-center gap-3 h-11 px-3 rounded-md text-sm hover:bg-subtle"
    >
      <span className="shrink-0 text-fg-muted">{icon}</span>
      <span>{children}</span>
    </a>
  );
}
