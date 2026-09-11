import { SocialShell } from '../_components/shell';
import { requireSocialUser } from '../_guard';
import { Avatar, Icon } from '@vision/ui';

interface Notif {
  who: string;
  action: string;
  target?: string;
  time: string;
  category: 'like' | 'comment' | 'follow' | 'event' | 'mention';
}

const notifs: Record<string, Notif[]> = {
  Bugün: [
    { who: 'Elif Yılmaz',   action: 'gönderini beğendi',                target: '"Portfolyo paylaşımı"',            time: '4 dk',  category: 'like' },
    { who: 'Ahmet Kaya',    action: 'seni takip etmeye başladı',                                                    time: '1 sa',  category: 'follow' },
    { who: 'Vision Social', action: 'yeni bir etkinlik önerdi:',        target: 'Sunset Hiking at Uludağ',          time: '2 sa',  category: 'event' },
  ],
  'Bu Hafta': [
    { who: 'Zeynep Demir',  action: 'yorumunda seni etiketledi',        target: '"Startup Weekend"',                time: '2 gün', category: 'mention' },
    { who: 'Can Öztürk',    action: 'gönderine yorum yaptı:',           target: '"Katılıyorum, ekosistemin farkı…"', time: '3 gün', category: 'comment' },
    { who: 'Mert Aksoy',    action: 've 12 kişi daha gönderini beğendi', target: '"F1 CFD analizleri"',              time: '4 gün', category: 'like' },
  ],
  'Daha Önce': [
    { who: 'Deniz Aydın',   action: 'seni takip etmeye başladı',                                                    time: '2 hf',  category: 'follow' },
    { who: 'Furkan Er',     action: 'birlikte katıldığın etkinlik başladı:', target: 'Board Game Meetup',           time: '3 hf',  category: 'event' },
  ],
};

const iconMap = {
  like: <span className="text-social-500"><Icon.Star width={18} height={18} /></span>,
  comment: <span className="text-info"><Icon.Mail width={18} height={18} /></span>,
  follow: <span className="text-hub-500"><Icon.User width={18} height={18} /></span>,
  event: <span className="text-warning"><Icon.Calendar width={18} height={18} /></span>,
  mention: <span className="text-social-600">@</span>,
} as const;

export default async function NotificationsPage() {
  await requireSocialUser();
  return (
    <SocialShell>
      <div className="max-w-[720px] mx-auto px-6 py-6">
        <h1 className="text-[22px] font-semibold mb-6">Bildirimler</h1>

        {Object.entries(notifs).map(([group, list]) => (
          <section key={group} className="mb-6">
            <p className="text-[13px] font-semibold text-fg-secondary mb-2">{group}</p>
            <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
              {list.map((n, i) => (
                <li key={i} className="flex items-start gap-3 p-4 hover:bg-subtle cursor-pointer transition-colors">
                  <div className="relative shrink-0">
                    <Avatar name={n.who} size="md" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-surface border border-border grid place-items-center">
                      {iconMap[n.category]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{n.who}</span>{' '}
                      <span className="text-fg-secondary">{n.action}</span>{' '}
                      {n.target && <span className="text-fg-secondary">{n.target}</span>}
                    </p>
                    <p className="text-[12px] text-fg-muted mt-0.5">{n.time}</p>
                  </div>
                  {n.category === 'follow' && (
                    <button className="text-[13px] font-semibold text-social-500 hover:text-social-600 shrink-0">
                      Takip et
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SocialShell>
  );
}
