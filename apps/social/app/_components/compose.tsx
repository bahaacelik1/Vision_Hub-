'use client';

import { Avatar, Icon } from '@vision/ui';

const chips = [
  { label: 'Fotoğraf/Video', color: 'text-social-500', icon: '📷' },
  { label: 'Etkinlik',       color: 'text-hub-500',    icon: '📅' },
  { label: 'Anket',          color: 'text-info',       icon: '📊' },
  { label: 'Bir düşünce',    color: 'text-warning',    icon: '💭' },
];

export function Compose({ userName }: { userName: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-3">
        <Avatar name={userName} size="md" />
        <button
          type="button"
          className="flex-1 text-left h-11 px-4 rounded-full bg-subtle text-fg-muted hover:bg-social-500/10 hover:text-fg transition-colors"
        >
          Ne düşünüyorsun, {userName.split(' ')[0]}?
        </button>
      </div>
      <div className="mt-3 flex items-center gap-1 flex-wrap">
        {chips.map((c) => (
          <button
            key={c.label}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-full hover:bg-subtle text-sm text-fg-secondary transition-colors"
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
