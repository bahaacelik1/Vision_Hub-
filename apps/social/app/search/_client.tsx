'use client';

import { useMemo, useState } from 'react';
import { Avatar, Input, Icon } from '@vision/ui';

const recent = ['sunset hiking', 'jazz night', 'elif yılmaz', 'startup weekend', 'balat'];

const people = [
  { name: 'Elif Yılmaz',   university: 'ODTÜ · Endüstri Tasarımı' },
  { name: 'Ahmet Kaya',    university: 'İTÜ · Makine Mühendisliği' },
  { name: 'Zeynep Demir',  university: 'Bilkent · İşletme' },
  { name: 'Can Öztürk',    university: 'Koç · Ekonomi' },
  { name: 'Mert Aksoy',    university: 'Sabancı · Bilgisayar' },
  { name: 'Deniz Aydın',   university: 'ODTÜ · Endüstri Müh.' },
];

const tags = ['#VisionHackathon', '#KampüsŞenliği', '#StajSezonu', '#Erasmus2027', '#Uludağ', '#Kadıköy'];

export function SearchClient() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'all' | 'people' | 'tags' | 'events'>('all');

  const filteredPeople = useMemo(
    () => people.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.university.toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  const filteredTags = useMemo(() => tags.filter((t) => t.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Kişi, etiket, etkinlik ara..."
        leading={<Icon.Search />}
        autoFocus
      />

      <div className="mt-4 flex items-center gap-1 border-b border-border">
        {(['all', 'people', 'tags', 'events'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-10 px-4 text-sm font-medium relative ${tab === t ? 'text-fg' : 'text-fg-muted hover:text-fg'}`}
          >
            {t === 'all' ? 'Tümü' : t === 'people' ? 'Kişiler' : t === 'tags' ? 'Etiketler' : 'Etkinlikler'}
            {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-social-500 rounded-full" />}
          </button>
        ))}
      </div>

      {!q && (
        <section className="mt-6">
          <p className="text-[13px] font-semibold text-fg-secondary mb-2">Son aramalar</p>
          <div className="flex flex-wrap gap-2">
            {recent.map((r) => (
              <button
                key={r}
                onClick={() => setQ(r)}
                className="h-9 px-3 rounded-full bg-subtle hover:bg-social-500/10 text-sm"
              >
                {r}
              </button>
            ))}
          </div>
        </section>
      )}

      {(tab === 'all' || tab === 'people') && filteredPeople.length > 0 && (
        <section className="mt-6">
          <p className="text-[13px] font-semibold text-fg-secondary mb-2">Kişiler</p>
          <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
            {filteredPeople.slice(0, 6).map((p) => (
              <li key={p.name} className="flex items-center gap-3 p-3">
                <Avatar name={p.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-[12px] text-fg-muted">{p.university}</p>
                </div>
                <button className="text-[13px] font-semibold text-social-500 hover:text-social-600">
                  Takip et
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(tab === 'all' || tab === 'tags') && filteredTags.length > 0 && (
        <section className="mt-6">
          <p className="text-[13px] font-semibold text-fg-secondary mb-2">Etiketler</p>
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((t) => (
              <span key={t} className="h-9 px-3 rounded-full bg-social-500/10 text-social-700 dark:text-social-300 text-sm font-medium flex items-center">
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {q && filteredPeople.length === 0 && filteredTags.length === 0 && (
        <p className="mt-8 text-center text-fg-muted">"{q}" için sonuç yok.</p>
      )}
    </>
  );
}
