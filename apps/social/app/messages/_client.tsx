'use client';

import { useState } from 'react';
import { Avatar, Icon, Input } from '@vision/ui';

interface Conversation {
  id: string;
  name: string;
  university: string;
  preview: string;
  time: string;
  unread?: number;
  online?: boolean;
}

const conversations: Conversation[] = [
  { id: '1', name: 'Elif Yılmaz',    university: 'ODTÜ',      preview: 'Portfolyo için teşekkür ederim ❤️',         time: '2 dk',  unread: 2, online: true },
  { id: '2', name: 'Ahmet Kaya',     university: 'İTÜ',       preview: 'CFD raporunu attım, göz gezdirir misin?',   time: '1 sa',  unread: 1 },
  { id: '3', name: 'Vision Social',  university: 'Resmi',     preview: 'Uludağ etkinliği için kayıt onayı geldi',   time: '3 sa' },
  { id: '4', name: 'Zeynep Demir',   university: 'Bilkent',   preview: 'Startup takımı için hangi rolde olursun?',  time: 'Dün',   online: true },
  { id: '5', name: 'Can Öztürk',     university: 'Koç',       preview: 'Yazın çok isabetliydi 👏',                 time: '2 gün' },
  { id: '6', name: 'Furkan Er',      university: 'İTÜ',       preview: 'Board game buluşmasında görüşürüz!',       time: '3 gün' },
];

const initialMessages = [
  { from: 'them', text: 'Selam Baha, portfolyoyu inceledim, gerçekten çok temiz olmuş 🙌' },
  { from: 'me',   text: 'Teşekkür ederim Elif! Senden gelmesi ayrı değerli.' },
  { from: 'them', text: 'Yarın kampüste birlikte kahve içelim mi? Birkaç fikir tartışırız.' },
  { from: 'me',   text: 'Kesinlikle, 14:00 uygun mu?' },
  { from: 'them', text: '14:00 harika 👍' },
];

export function MessagesClient({ meName }: { meName: string }) {
  const [activeId, setActiveId] = useState<string>('1');
  const [q, setQ] = useState('');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0]!;
  const filtered = conversations.filter(
    (c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.preview.toLowerCase().includes(q.toLowerCase()),
  );

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages([...messages, { from: 'me', text: draft.trim() }]);
    setDraft('');
  };

  return (
    <>
      {/* Conversations list */}
      <aside className="w-[340px] shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="h-16 px-4 flex items-center justify-between border-b border-border">
          <h1 className="text-[18px] font-semibold">Mesajlar</h1>
          <button className="h-9 w-9 rounded-full hover:bg-subtle grid place-items-center text-fg-muted hover:text-fg" aria-label="Yeni mesaj">
            <Icon.Plus />
          </button>
        </div>
        <div className="p-3">
          <Input placeholder="Sohbetlerde ara" leading={<Icon.Search />} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <ul className="flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setActiveId(c.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-subtle transition-colors ${
                  c.id === activeId ? 'bg-social-500/10' : ''
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar name={c.name} size="md" />
                  {c.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-surface" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold truncate">{c.name}</p>
                    <span className="text-[11px] text-fg-muted shrink-0">{c.time}</span>
                  </div>
                  <p className="text-[13px] text-fg-muted truncate">{c.preview}</p>
                </div>
                {c.unread && (
                  <span className="ml-1 min-w-5 h-5 px-1.5 rounded-full bg-social-500 text-white text-[11px] font-semibold grid place-items-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Thread */}
      <section className="flex-1 flex flex-col min-w-0 bg-canvas">
        <header className="h-16 px-6 border-b border-border bg-surface flex items-center gap-3">
          <Avatar name={active.name} size="md" />
          <div className="min-w-0">
            <p className="font-semibold truncate">{active.name}</p>
            <p className="text-[12px] text-fg-muted truncate">
              {active.university} {active.online && '· Çevrimiçi'}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-fg-muted">
            <IconBtn label="Ara"><Icon.Search /></IconBtn>
            <IconBtn label="Bilgi">i</IconBtn>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.from === 'me'
                    ? 'bg-social-500 text-white rounded-br-md'
                    : 'bg-surface border border-border rounded-bl-md'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={send} className="border-t border-border bg-surface p-3 flex items-center gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`${active.name}'e mesaj yaz...`}
            className="flex-1"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="h-11 px-5 rounded-full bg-social-500 text-white font-medium disabled:opacity-40 hover:bg-social-600 transition-colors"
          >
            Gönder
          </button>
        </form>
      </section>
    </>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button className="h-10 w-10 grid place-items-center rounded-full hover:bg-subtle text-fg-muted hover:text-fg" aria-label={label}>
      {children}
    </button>
  );
}
