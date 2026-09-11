'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@vision/ui';
import type { ReactNode } from 'react';

interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

const items: NavItem[] = [
  { key: 'home',          label: 'Ana Sayfa',    href: '/',              icon: <Icon.Home /> },
  { key: 'search',        label: 'Arama',        href: '/search',        icon: <Icon.Search /> },
  { key: 'notifications', label: 'Bildirimler',  href: '/notifications', icon: <Icon.Bell /> },
  { key: 'messages',      label: 'Mesajlar',     href: '/messages',      icon: <Icon.Mail /> },
  { key: 'profile',       label: 'Profil',       href: '/profile',       icon: <Icon.User /> },
];

/**
 * Şeffaf sidebar. Kapalı 68px hâlde arka plan TAMAMEN şeffaf (yalnız
 * iconlar float görünür). Hover'da cam efekti (backdrop-blur), turuncu
 * dalga blob'ları ve içerik açığa çıkar.
 */
export function HoverSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <aside
      className="group fixed top-0 left-0 h-full z-40 w-[68px] hover:w-[240px] transition-all duration-300 ease-out overflow-hidden"
    >
      {/* Cam paneli — sadece hover'da görünür */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.55) 100%)',
          backdropFilter: 'blur(24px) saturate(140%)',
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          borderRight: '1px solid rgba(247,131,74,0.15)',
        }}
      />
      {/* Dark tema paneli — hover'da */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(180deg, rgba(34,40,49,0) 0%, rgba(34,40,49,0) 100%)' }}
      />
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
        style={{ background: 'linear-gradient(180deg, rgba(34,40,49,0.72) 0%, rgba(34,40,49,0.6) 100%)' }}
      />

      {/* Turuncu dalga / blob'lar — sadece hover'da */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <span className="absolute -top-16 -left-16 h-60 w-60 rounded-full blur-3xl bg-social-500/25 animate-blob-1" />
        <span className="absolute top-1/3 -right-16 h-52 w-52 rounded-full blur-3xl bg-social-400/20 animate-blob-2" />
        <span className="absolute bottom-0 -left-10 h-56 w-56 rounded-full blur-3xl bg-social-600/20 animate-blob-3" />
      </div>

      <style>{`
        @keyframes blob1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,30px) scale(1.1); } }
        @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,-30px) scale(1.15); } }
        @keyframes blob3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(10px,-20px) scale(1.05); } }
        .animate-blob-1 { animation: blob1 12s ease-in-out infinite; }
        .animate-blob-2 { animation: blob2 15s ease-in-out infinite; }
        .animate-blob-3 { animation: blob3 18s ease-in-out infinite; }
      `}</style>

      <div className="relative h-full flex flex-col">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 h-16 px-4 shrink-0 text-fg font-semibold"
        >
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-social-500 to-social-700 flex items-center justify-center text-white font-bold shadow-md shrink-0">
            V
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Vision Social
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 py-3 px-3 space-y-1">
          {items.map((it) => {
            const active = isActive(it.href);
            return (
              <Link
                key={it.key}
                href={it.href}
                className={`relative flex items-center gap-4 h-12 px-3 rounded-xl transition-colors ${
                  active
                    ? 'text-social-600 dark:text-social-300 group-hover:bg-social-500/20'
                    : 'text-fg-secondary group-hover:hover:bg-social-500/10 group-hover:hover:text-fg'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-social-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <span className="shrink-0 grid place-items-center w-6 h-6">{it.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
                  {it.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Create post FAB */}
        <div className="p-3">
          <button
            type="button"
            className="w-full h-12 rounded-xl bg-gradient-to-r from-social-500 to-social-600 text-white font-medium shadow-lg shadow-social-500/30 flex items-center gap-3 px-3 hover:opacity-90 transition-opacity"
          >
            <span className="shrink-0 grid place-items-center w-6 h-6"><Icon.Plus /></span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Paylaş
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
