'use client';

import { ModeSwitcher } from './mode-switcher';

interface GlobalModeSwitcherProps {
  hubHref?: string;
  socialHref?: string;
}

/**
 * Ekranın üst-orta noktasına sabitlenmiş Hub/Social geçiş kontrolü.
 * Sidebar/topbar genişliği ne olursa olsun her iki app'te de tam aynı viewport
 * pikselinde durur.
 */
export function GlobalModeSwitcher({ hubHref, socialHref }: GlobalModeSwitcherProps) {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full bg-surface/90 backdrop-blur border border-border shadow-sm p-0.5">
        <ModeSwitcher hubHref={hubHref} socialHref={socialHref} navigate />
      </div>
    </div>
  );
}
