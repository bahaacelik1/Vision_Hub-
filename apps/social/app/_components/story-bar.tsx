'use client';

import { Avatar } from '@vision/ui';
import { Icon } from '@vision/ui';

const stories = [
  { name: 'Elif Yılmaz',   ring: true,  seen: false },
  { name: 'Ahmet Kaya',    ring: true,  seen: false },
  { name: 'Zeynep Demir',  ring: true,  seen: false },
  { name: 'Can Öztürk',    ring: true,  seen: true },
  { name: 'Mert Aksoy',    ring: true,  seen: false },
  { name: 'Deniz Aydın',   ring: true,  seen: true },
  { name: 'Ayşe Kara',     ring: true,  seen: false },
  { name: 'Furkan Er',     ring: true,  seen: true },
  { name: 'Selin Uçar',    ring: true,  seen: false },
];

export function StoryBar({ currentName }: { currentName: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
        <button className="flex flex-col items-center gap-1.5 shrink-0 w-[68px]">
          <span className="relative h-[62px] w-[62px] rounded-full bg-subtle grid place-items-center">
            <Avatar name={currentName} size="lg" className="h-[58px] w-[58px]" />
            <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-social-500 grid place-items-center text-white border-2 border-surface">
              <Icon.Plus width={14} height={14} />
            </span>
          </span>
          <span className="text-[11px] text-fg-secondary truncate max-w-full">Hikaye ekle</span>
        </button>

        {stories.map((s) => (
          <button key={s.name} className="flex flex-col items-center gap-1.5 shrink-0 w-[68px]">
            <span
              className="h-[62px] w-[62px] rounded-full grid place-items-center p-[2px]"
              style={{
                background: s.seen
                  ? 'linear-gradient(135deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15))'
                  : 'conic-gradient(from 210deg, #F7834A, #E0683A, #F9A078, #F7834A)',
              }}
            >
              <span className="block h-full w-full rounded-full bg-surface p-[2px]">
                <Avatar name={s.name} size="lg" className="h-full w-full" />
              </span>
            </span>
            <span className="text-[11px] text-fg-secondary truncate max-w-full">{s.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
