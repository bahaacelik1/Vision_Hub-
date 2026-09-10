export default function AdminHomePage() {
  const sections = [
    { key: 'hub', label: 'Vision Hub', items: ['Kullanıcılar', 'Fırsatlar', 'Projeler', 'Başvurular', 'Şirketler', 'Üniversiteler', 'Academy'] },
    { key: 'social', label: 'Vision Social', items: ['Etkinlikler', 'Kategoriler', 'Katılımlar', 'Takımlar', 'Kullanıcı etkinlikleri'] },
    { key: 'mod', label: 'Moderasyon', items: ['Onay bekleyenler', 'Raporlar', 'Kullanıcı işlemleri'] },
    { key: 'stats', label: 'İstatistik', items: ['Kullanıcı', 'Etkinlik', 'Proje', 'Başvuru'] },
  ];
  return (
    <main className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold">Vision Yönetim Paneli</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <div key={s.key} className="rounded-lg border border-neutral-200 p-6">
            <div className="font-semibold text-vision-600">{s.label}</div>
            <ul className="mt-3 space-y-1 text-sm text-neutral-700">
              {s.items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
