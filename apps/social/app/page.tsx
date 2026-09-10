import { AreaSwitcher } from '@vision/ui';

export default function SocialHomePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-social-500">Vision Social</span>
        </div>
        <AreaSwitcher
          active="social"
          hubHref={process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3001'}
          socialHref="/"
        />
      </header>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold">Şehrinde neler oluyor?</h1>
        <p className="mt-3 text-neutral-500 text-lg">
          Etkinlik keşfet, katıl, insanlarla tanış, kendi etkinliğini oluştur.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {['Bu hafta sonu', 'Yakınında', 'Üniversiteler arası', 'Spor', 'Gezi', 'Kültür-Sanat'].map(
            (f) => (
              <span
                key={f}
                className="px-3 py-1.5 rounded-full border border-neutral-200 text-sm hover:border-social-500 cursor-pointer"
              >
                {f}
              </span>
            ),
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article
              key={i}
              className="rounded-lg border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-br from-social-500/20 to-vision-500/20" />
              <div className="p-4">
                <div className="text-xs text-neutral-500">Örnek • İstanbul</div>
                <div className="mt-1 font-medium">Etkinlik Başlığı #{i}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
