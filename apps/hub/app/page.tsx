import { AreaSwitcher } from '@vision/ui';

export default function HubHomePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-hub-500">Vision Hub</span>
        </div>
        <AreaSwitcher
          active="hub"
          hubHref="/"
          socialHref={process.env.NEXT_PUBLIC_SOCIAL_URL ?? 'http://localhost:3002'}
        />
      </header>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold">Fırsatlar, projeler, kariyer.</h1>
        <p className="mt-3 text-neutral-500 text-lg">
          Öğrencilerin şirketler, üniversiteler ve profesyonel projelerle buluştuğu alan.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Fırsatlar', 'Projeler / Challenges', 'Başvurular', 'Şirketler', 'Academy', 'Etkinlikler'].map(
            (m) => (
              <div
                key={m}
                className="rounded-lg border border-neutral-200 p-6 hover:border-hub-500 transition-colors"
              >
                <div className="text-sm text-neutral-500">Modül</div>
                <div className="mt-1 text-lg font-medium">{m}</div>
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
