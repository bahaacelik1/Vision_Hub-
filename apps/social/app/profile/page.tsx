import { SocialShell } from '../_components/shell';
import { requireSocialUser } from '../_guard';
import { Avatar, Icon } from '@vision/ui';

const stats = [
  { label: 'Gönderi',  value: 42 },
  { label: 'Takipçi',  value: '1.2B' },
  { label: 'Takip',    value: 318 },
];

const highlights = [
  { emoji: '🏔', label: 'Uludağ' },
  { emoji: '🎵', label: 'Jazz' },
  { emoji: '🎓', label: 'Bilkent' },
  { emoji: '📸', label: 'Balat' },
  { emoji: '🚀', label: 'Hackathon' },
];

const grid = Array.from({ length: 9 });

const gradients = [
  'from-social-500/60 via-social-400/30 to-hub-500/40',
  'from-hub-500/60 via-hub-400/30 to-social-500/40',
  'from-vision-500/60 via-social-400/30 to-hub-500/40',
  'from-social-400/40 to-social-700/60',
  'from-hub-400/40 to-hub-700/60',
  'from-social-500/40 via-vision-500/30 to-hub-500/40',
  'from-social-600/40 via-social-300/40 to-social-500/60',
  'from-hub-300/40 to-social-500/40',
  'from-social-500/60 via-hub-400/30 to-vision-500/40',
];

export default async function ProfilePage() {
  const user = await requireSocialUser();
  return (
    <SocialShell>
      <div className="max-w-[960px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start gap-8">
          <Avatar name={user.name} size="xl" className="h-32 w-32 text-2xl" />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[22px] font-semibold">{user.name}</h1>
              <button className="h-9 px-4 rounded-md bg-subtle hover:bg-social-500/10 text-sm font-medium">
                Profili düzenle
              </button>
              <button className="h-9 w-9 grid place-items-center rounded-md bg-subtle hover:bg-social-500/10 text-fg-muted">
                <Icon.Settings />
              </button>
            </div>

            <ul className="mt-4 flex items-center gap-8">
              {stats.map((s) => (
                <li key={s.label} className="text-sm">
                  <span className="font-semibold text-fg">{s.value}</span>{' '}
                  <span className="text-fg-muted">{s.label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 font-semibold">Baha Çelik</p>
            <p className="text-sm text-fg-muted">Boğaziçi Üniversitesi · Bilgisayar Mühendisliği</p>
            <p className="text-sm mt-1 max-w-xl">
              Ürün ve topluluğa dokunan işler seviyorum. Vision Social + Hub'da öğrenci projelerinin peşindeyim ✨
            </p>
            <a className="text-sm text-social-500 hover:text-social-600" href="#">vision.dev/baha</a>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-8 flex gap-6 overflow-x-auto pb-2">
          {highlights.map((h) => (
            <button key={h.label} className="flex flex-col items-center gap-2 shrink-0">
              <span className="h-20 w-20 rounded-full border border-border grid place-items-center text-3xl bg-surface">
                {h.emoji}
              </span>
              <span className="text-[12px] text-fg-secondary">{h.label}</span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 border-t border-border">
          <div className="flex items-center justify-center gap-8 -mt-px">
            <TabHeader active label="Gönderiler" icon="▦" />
            <TabHeader label="Kaydedilenler" icon="⌵" />
            <TabHeader label="Etiketli" icon="◎" />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-4 grid grid-cols-3 gap-1">
          {grid.map((_, i) => (
            <div
              key={i}
              className={`aspect-square bg-gradient-to-br ${gradients[i % gradients.length]} hover:opacity-80 cursor-pointer transition-opacity`}
            />
          ))}
        </div>
      </div>
    </SocialShell>
  );
}

function TabHeader({ active, label, icon }: { active?: boolean; label: string; icon: string }) {
  return (
    <button
      className={`h-12 flex items-center gap-2 text-[12px] uppercase tracking-wider font-semibold border-t-2 -mt-px ${
        active ? 'border-fg text-fg' : 'border-transparent text-fg-muted hover:text-fg'
      }`}
    >
      <span>{icon}</span> {label}
    </button>
  );
}
