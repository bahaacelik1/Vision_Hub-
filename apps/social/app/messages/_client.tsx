'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Icon, Input } from '@vision/ui';

interface Peer {
  id: string;
  name: string;
  university: string;
}
interface ConversationItem {
  id: string;
  peer: Peer | null;
  lastMessage: { body: string; createdAt: string; mine: boolean } | null;
  lastMessageAt: string;
  lastReadAt: string | null;
}
interface Message {
  id: string;
  body: string;
  createdAt: string;
  mine: boolean;
}

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, { ...init, headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) } });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json() as Promise<T>;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffH = (now.getTime() - d.getTime()) / 3_600_000;
  if (diffH < 24) return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  if (diffH < 24 * 7) return d.toLocaleDateString('tr-TR', { weekday: 'short' });
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

export function MessagesClient({ meName }: { meName: string }) {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activePeer, setActivePeer] = useState<Peer | null>(null);
  const [draft, setDraft] = useState('');
  const [q, setQ] = useState('');
  const [newMsgOpen, setNewMsgOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadConversations = useCallback(async () => {
    const r = await fetchJSON<{ conversations: ConversationItem[] }>('/api/messages/conversations');
    setConversations(r.conversations);
    return r.conversations;
  }, []);

  const loadThread = useCallback(async (id: string) => {
    const r = await fetchJSON<{ id: string; peer: Peer | null; messages: Message[] }>(
      `/api/messages/conversations/${id}`,
    );
    setMessages(r.messages);
    setActivePeer(r.peer);
    // Refresh list to update lastReadAt badges
    void loadConversations();
  }, [loadConversations]);

  // İlk yükleme + aktif seçim
  useEffect(() => {
    void loadConversations().then((list) => {
      if (list.length && !activeId) setActiveId(list[0]!.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeId) return;
    void loadThread(activeId);
  }, [activeId, loadThread]);

  // Polling: 3 sn'de bir konuşmalar + aktif thread yenilenir
  useEffect(() => {
    const iv = setInterval(() => {
      void loadConversations();
      if (activeId) void loadThread(activeId);
    }, 3000);
    return () => clearInterval(iv);
  }, [activeId, loadConversations, loadThread]);

  // Yeni mesaj geldikçe en alta scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !activeId) return;
    const text = draft.trim();
    setDraft('');
    // Optimistic
    const tempId = `tmp-${Date.now()}`;
    setMessages((m) => [...m, { id: tempId, body: text, createdAt: new Date().toISOString(), mine: true }]);
    try {
      const saved = await fetchJSON<Message>(`/api/messages/conversations/${activeId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      setMessages((m) => m.map((x) => (x.id === tempId ? saved : x)));
      void loadConversations();
    } catch {
      setMessages((m) => m.filter((x) => x.id !== tempId));
    }
  };

  const filtered = useMemo(
    () =>
      conversations.filter(
        (c) =>
          !q ||
          c.peer?.name.toLowerCase().includes(q.toLowerCase()) ||
          c.lastMessage?.body.toLowerCase().includes(q.toLowerCase()),
      ),
    [conversations, q],
  );

  return (
    <>
      {/* Left */}
      <aside className="w-[340px] shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="h-16 px-4 flex items-center justify-between border-b border-border">
          <h1 className="text-[18px] font-semibold">Mesajlar</h1>
          <button
            className="h-9 w-9 rounded-full hover:bg-subtle grid place-items-center text-fg-muted hover:text-fg"
            aria-label="Yeni mesaj"
            onClick={() => setNewMsgOpen(true)}
          >
            <Icon.Plus />
          </button>
        </div>
        <div className="p-3">
          <Input placeholder="Sohbetlerde ara" leading={<Icon.Search />} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <ul className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <li className="p-6 text-center text-sm text-fg-muted">
              Henüz sohbet yok. Yeni mesajla başla.
            </li>
          )}
          {filtered.map((c) => {
            const unread =
              c.lastMessage && !c.lastMessage.mine &&
              (!c.lastReadAt || new Date(c.lastReadAt) < new Date(c.lastMessageAt));
            return (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-subtle transition-colors ${
                    c.id === activeId ? 'bg-social-500/10' : ''
                  }`}
                >
                  <Avatar name={c.peer?.name ?? '?'} size="md" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold truncate">{c.peer?.name ?? 'Bilinmeyen'}</p>
                      <span className="text-[11px] text-fg-muted shrink-0">
                        {formatTime(c.lastMessageAt)}
                      </span>
                    </div>
                    <p className={`text-[13px] truncate ${unread ? 'text-fg font-medium' : 'text-fg-muted'}`}>
                      {c.lastMessage?.mine ? 'Sen: ' : ''}
                      {c.lastMessage?.body ?? 'Konuşmayı başlat...'}
                    </p>
                  </div>
                  {unread && (
                    <span className="ml-1 h-2 w-2 rounded-full bg-social-500 shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Thread */}
      <section className="flex-1 flex flex-col min-w-0 bg-canvas">
        {activeId && activePeer ? (
          <>
            <header className="h-16 px-6 border-b border-border bg-surface flex items-center gap-3">
              <Avatar name={activePeer.name} size="md" />
              <div className="min-w-0">
                <p className="font-semibold truncate">{activePeer.name}</p>
                <p className="text-[12px] text-fg-muted truncate">{activePeer.university || 'Vision'}</p>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                      m.mine
                        ? 'bg-social-500 text-white rounded-br-md'
                        : 'bg-surface border border-border rounded-bl-md'
                    }`}
                  >
                    {m.body}
                    <div className={`text-[10px] mt-1 ${m.mine ? 'text-white/70' : 'text-fg-muted'}`}>
                      {formatTime(m.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="border-t border-border bg-surface p-3 flex items-center gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`${activePeer.name}'e mesaj yaz...`}
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
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-fg-muted text-sm gap-3">
            <div className="h-16 w-16 rounded-full bg-social-500/10 grid place-items-center text-social-500">
              <Icon.Mail width={28} height={28} />
            </div>
            <p>{conversations.length === 0 ? 'Henüz sohbet yok' : 'Sohbet seç'}</p>
            <button
              onClick={() => setNewMsgOpen(true)}
              className="mt-1 h-10 px-5 rounded-full bg-social-500 text-white text-sm font-medium hover:bg-social-600"
            >
              Yeni mesaj
            </button>
          </div>
        )}
      </section>

      {newMsgOpen && (
        <NewMessageDialog
          onClose={() => setNewMsgOpen(false)}
          onStarted={(convId) => {
            setNewMsgOpen(false);
            setActiveId(convId);
            void loadConversations();
          }}
        />
      )}
    </>
  );
}

/* ---------- New message dialog ---------- */

interface UserResult {
  id: string;
  name: string;
  email: string;
  university: string;
}

function NewMessageDialog({ onClose, onStarted }: { onClose: () => void; onStarted: (convId: string) => void }) {
  const [q, setQ] = useState('');
  const [users, setUsers] = useState<UserResult[]>([]);
  const [selected, setSelected] = useState<UserResult | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      const r = await fetchJSON<{ users: UserResult[] }>(`/api/messages/users?q=${encodeURIComponent(q)}`);
      setUsers(r.users);
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    try {
      const r = await fetchJSON<{ conversationId: string }>('/api/messages/conversations', {
        method: 'POST',
        body: JSON.stringify({ peerUserId: selected.id, text: text.trim() || undefined }),
      });
      onStarted(r.conversationId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6" onClick={onClose}>
      <div
        className="w-full max-w-md bg-surface rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-border">
          <h2 className="font-semibold">Yeni mesaj</h2>
          <button onClick={onClose} className="h-8 w-8 rounded-full hover:bg-subtle grid place-items-center text-fg-muted" aria-label="Kapat">
            <Icon.X />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <Input placeholder="İsim veya e-posta ara..." leading={<Icon.Search />} value={q} onChange={(e) => setQ(e.target.value)} autoFocus />

          <ul className="max-h-64 overflow-y-auto border border-border rounded-lg divide-y divide-border">
            {users.length === 0 && <li className="p-4 text-center text-sm text-fg-muted">Kullanıcı bulunamadı.</li>}
            {users.map((u) => (
              <li key={u.id}>
                <button
                  onClick={() => setSelected(u)}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-subtle text-left ${
                    selected?.id === u.id ? 'bg-social-500/10' : ''
                  }`}
                >
                  <Avatar name={u.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{u.name}</p>
                    <p className="text-[12px] text-fg-muted truncate">
                      {u.university || u.email}
                    </p>
                  </div>
                  {selected?.id === u.id && <Icon.Check />}
                </button>
              </li>
            ))}
          </ul>

          {selected && (
            <form onSubmit={start} className="space-y-3">
              <Input
                placeholder={`İlk mesajın (opsiyonel)...`}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-full bg-social-500 text-white font-medium hover:bg-social-600 disabled:opacity-50"
              >
                {loading ? 'Başlatılıyor...' : `${selected.name} ile konuşma başlat`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
