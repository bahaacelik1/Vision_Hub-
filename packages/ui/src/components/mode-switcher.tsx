'use client';

import { cn } from '../utils/cn';
import { useTheme } from './theme-provider';

interface ModeSwitcherProps {
  hubHref?: string;
  socialHref?: string;
  /** When provided, clicks navigate; else they only flip local mode state. */
  navigate?: boolean;
}

/**
 * Segmented Hub ↔ Social kontrolü. TopBar merkezinde konumlanır.
 */
export function ModeSwitcher({ hubHref, socialHref, navigate }: ModeSwitcherProps) {
  const { mode, setMode } = useTheme();

  const onSelect = (m: 'hub' | 'social') => {
    setMode(m);
    if (navigate) {
      const href = m === 'hub' ? hubHref : socialHref;
      if (href) window.location.href = href;
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Mode"
      className="inline-flex items-center gap-1 rounded-full bg-subtle p-1 border border-border"
    >
      <Segment active={mode === 'hub'} label="Hub" onClick={() => onSelect('hub')} activeBg="bg-hub-500" />
      <Segment active={mode === 'social'} label="Social" onClick={() => onSelect('social')} activeBg="bg-social-500" />
    </div>
  );
}

function Segment({ active, label, onClick, activeBg }: { active: boolean; label: string; onClick: () => void; activeBg: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'h-9 min-w-[80px] px-4 rounded-full text-[13px] font-medium transition-all',
        active ? `${activeBg} text-white shadow-sm` : 'text-fg-muted hover:text-fg',
      )}
    >
      {label}
    </button>
  );
}
