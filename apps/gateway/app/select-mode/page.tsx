'use client';

import { Suspense, useState } from 'react';
import { Button, useTheme, Icon } from '@vision/ui';

type Mode = 'hub' | 'social';

const HUB_URL    = process.env.NEXT_PUBLIC_HUB_URL    ?? 'http://localhost:3001';
const SOCIAL_URL = process.env.NEXT_PUBLIC_SOCIAL_URL ?? 'http://localhost:3002';

/**
 * Screen 2: Mode Selection
 * Sadece ilk girişte gösterilir. Devam Et: seçimi /api/profile/mode'a persist eder
 * ve seçilen alanın app URL'ine yönlendirir. Sonraki girişlerde /post-signin
 * direkt seçili mode'a yönlendirdiği için bu ekran atlanır.
 */
export default function SelectModePage() {
  return (
    <Suspense fallback={null}>
      <SelectModeContent />
    </Suspense>
  );
}

function SelectModeContent() {
  const { setMode } = useTheme();
  const [selected, setSelected] = useState<Mode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onContinue = async () => {
    if (!selected) return;
    setMode(selected);
    setLoading(true);
    setError(null);
    const res = await fetch('/api/profile/mode', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ mode: selected === 'hub' ? 'HUB' : 'SOCIAL' }),
    });
    if (!res.ok) {
      setError('Kaydedilemedi. Lütfen tekrar dene.');
      setLoading(false);
      return;
    }
    window.location.href = selected === 'hub' ? HUB_URL : SOCIAL_URL;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-canvas text-fg">
      <div className="text-center max-w-xl mb-12">
        <h1 className="text-[36px] font-bold tracking-tight">Nereden başlamak istersin?</h1>
        <p className="mt-3 text-fg-muted text-lg">
          Tek hesap. İki birbirine bağlı öğrenci deneyimi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <ModeCard
          accent="#76ABAE"
          icon={<Icon.GraduationCap width={32} height={32} />}
          title="Vision Hub / Academy"
          benefits={[
            'Staj ve iş fırsatlarını keşfet',
            "Projeler ve Challenge'lere katıl",
            'Sektör önderlerinden öğren',
            'Şirketler ve üniversitelerle bağlan',
          ]}
          selected={selected === 'hub'}
          onSelect={() => setSelected('hub')}
        />
        <ModeCard
          accent="#F7834A"
          icon={<Icon.Compass width={32} height={32} />}
          title="Vision Social"
          benefits={[
            'Şehrindeki etkinlikleri bul',
            'Diğer üniversitelerden öğrencilerle tanış',
            'Topluluklara ve takımlara katıl',
            'Deneyimlerini paylaş ve oluştur',
          ]}
          selected={selected === 'social'}
          onSelect={() => setSelected('social')}
        />
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Button size="lg" onClick={onContinue} disabled={!selected} loading={loading} className="px-10">
          Devam Et
        </Button>
        {error && <p className="text-danger text-sm">{error}</p>}
        <p className="text-[13px] text-fg-muted">İstediğin zaman modlar arasında geçiş yapabilirsin.</p>
      </div>
    </div>
  );
}

interface ModeCardProps {
  accent: string;
  icon: React.ReactNode;
  title: string;
  benefits: string[];
  selected: boolean;
  onSelect: () => void;
}

function ModeCard({ accent, icon, title, benefits, selected, onSelect }: ModeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left rounded-2xl bg-surface p-8 border-2 transition-all group relative"
      style={{
        borderColor: selected ? accent : 'var(--color-border-default)',
        boxShadow: selected ? `0 20px 40px ${accent}22` : undefined,
        transform: selected ? 'translateY(-2px)' : undefined,
      }}
    >
      {selected && (
        <span
          className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-white"
          style={{ background: accent }}
        >
          <Icon.Check />
        </span>
      )}
      <div
        className="h-14 w-14 rounded-xl flex items-center justify-center text-white mb-6"
        style={{ background: accent }}
      >
        {icon}
      </div>
      <h2 className="text-[22px] font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-fg-muted">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
            {b}
          </li>
        ))}
      </ul>
    </button>
  );
}
