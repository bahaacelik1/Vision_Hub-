import Link from 'next/link';

/**
 * Ana giriş — kullanıcı Vision Hub ile Vision Social arasında seçim yapar.
 * Arka planda ortak Vision hesabı ve ekosistemi bulunur.
 */
export default function GatewayPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 gap-16">
      <header className="text-center max-w-xl">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-vision-100 text-vision-900 text-sm font-medium">
          VISION
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Üniversite hayatının tamamı, tek ekosistemde.
        </h1>
        <p className="mt-4 text-neutral-500 text-lg">
          Nereden başlamak istersin?
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <AreaCard
          href={process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3001'}
          tone="hub"
          title="Vision Hub"
          subtitle="Profesyonel & Akademik"
          description="Fırsatlar, projeler, şirketler, üniversiteler, Academy ve kariyer."
          items={['Fırsatlar', 'Projeler', 'Başvurular', 'Academy']}
        />
        <AreaCard
          href={process.env.NEXT_PUBLIC_SOCIAL_URL ?? 'http://localhost:3002'}
          tone="social"
          title="Vision Social"
          subtitle="Sosyal Yaşam & Topluluk"
          description="Etkinlikler, şehir, üniversite, spor, gezi, kültür-sanat."
          items={['Etkinlikler', 'Topluluk', 'Takvim', 'Takımlar']}
        />
      </div>

      <footer className="text-sm text-neutral-500">
        Ortak Vision hesabı — iki alanda da geçerli.
      </footer>
    </main>
  );
}

interface AreaCardProps {
  href: string;
  tone: 'hub' | 'social';
  title: string;
  subtitle: string;
  description: string;
  items: string[];
}

function AreaCard({ href, tone, title, subtitle, description, items }: AreaCardProps) {
  const accent =
    tone === 'hub'
      ? 'from-hub-500/10 border-hub-500/30 hover:border-hub-500'
      : 'from-social-500/10 border-social-500/30 hover:border-social-500';
  const tag =
    tone === 'hub' ? 'bg-hub-500 text-white' : 'bg-social-500 text-white';

  return (
    <Link
      href={href}
      className={`group relative rounded-2xl border-2 bg-gradient-to-br ${accent} p-8 transition-all hover:scale-[1.02]`}
    >
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tag}`}>
        {subtitle}
      </span>
      <h2 className="mt-4 text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-neutral-600">{description}</p>
      <ul className="mt-6 space-y-1 text-sm text-neutral-700">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
      <span className="absolute bottom-6 right-8 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Devam et →
      </span>
    </Link>
  );
}
