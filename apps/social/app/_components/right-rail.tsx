'use client';

import { Avatar, Icon } from '@vision/ui';

const suggestions = [
  { name: 'Deniz Aydın',   university: 'ODTÜ · Endüstri Mühendisliği', mutual: '3 ortak arkadaş' },
  { name: 'Furkan Er',     university: 'İTÜ · Bilgisayar Mühendisliği', mutual: '5 ortak arkadaş' },
  { name: 'Selin Uçar',    university: 'Boğaziçi · Ekonomi',            mutual: '1 ortak arkadaş' },
  { name: 'Kaan Doğan',    university: 'Sabancı · Yönetim Bilimleri',   mutual: '2 ortak arkadaş' },
];

const trending = [
  { tag: 'Vision Hackathon', posts: '2.4B paylaşım' },
  { tag: 'Kampüs Bahar Şenliği', posts: '1.1B paylaşım' },
  { tag: 'Staj Sezonu', posts: '890 paylaşım' },
  { tag: 'Erasmus 2027', posts: '640 paylaşım' },
];

const upcomingEvents = [
  { title: 'Sunset Hiking Uludağ', date: 'Cts, 10 Ocak' },
  { title: 'Inter-University Hackathon', date: 'Cmt-Pz, 18-19 Ocak' },
  { title: 'Jazz Night Kadıköy',   date: 'Pzt, 12 Ocak' },
];

export function RightRail({ userName, city }: { userName: string; city: string }) {
  return (
    <aside className="hidden lg:flex flex-col gap-4 w-[320px] shrink-0 py-6 pr-6">
      {/* User card */}
      <div className="flex items-center gap-3 py-2">
        <Avatar name={userName} size="lg" />
        <div className="min-w-0">
          <p className="font-semibold truncate">{userName}</p>
          <p className="text-sm text-fg-muted truncate">{city}</p>
        </div>
        <button className="ml-auto text-[13px] font-medium text-social-500 hover:text-social-600">
          Değiştir
        </button>
      </div>

      {/* Suggestions */}
      <Section title="Tanıyor olabilirsin" cta="Tümü">
        <ul className="space-y-3">
          {suggestions.map((s) => (
            <li key={s.name} className="flex items-center gap-3">
              <Avatar name={s.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{s.name}</p>
                <p className="text-[12px] text-fg-muted truncate">{s.university}</p>
                <p className="text-[11px] text-fg-muted truncate">{s.mutual}</p>
              </div>
              <button className="text-[13px] font-semibold text-social-500 hover:text-social-600">
                Takip et
              </button>
            </li>
          ))}
        </ul>
      </Section>

      {/* Trending */}
      <Section title="Öne çıkanlar">
        <ul className="space-y-2">
          {trending.map((t) => (
            <li key={t.tag} className="hover:bg-subtle -mx-2 px-2 py-1.5 rounded-md cursor-pointer">
              <p className="text-[11px] uppercase tracking-wider text-fg-muted">Gündem</p>
              <p className="font-semibold text-sm">#{t.tag.replace(/\s+/g, '')}</p>
              <p className="text-[12px] text-fg-muted">{t.posts}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Upcoming events */}
      <Section title="Yaklaşan etkinlikler" cta="Takvim">
        <ul className="space-y-2">
          {upcomingEvents.map((e) => (
            <li key={e.title} className="flex items-center gap-3 hover:bg-subtle -mx-2 px-2 py-1.5 rounded-md cursor-pointer">
              <span className="h-9 w-9 rounded-lg bg-social-500/15 text-social-600 dark:text-social-300 grid place-items-center">
                <Icon.Calendar />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{e.title}</p>
                <p className="text-[12px] text-fg-muted truncate">{e.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <p className="text-[11px] text-fg-muted leading-relaxed">
        Vision © 2026 · Hakkında · Gizlilik · Şartlar · Yardım
      </p>
    </aside>
  );
}

function Section({ title, cta, children }: { title: string; cta?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[13px] font-semibold text-fg-secondary">{title}</p>
        {cta && <button className="text-[12px] text-social-500 hover:text-social-600">{cta}</button>}
      </div>
      {children}
    </section>
  );
}
