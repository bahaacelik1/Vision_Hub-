import { redirect } from 'next/navigation';
import {
  AppShell,
  Badge,
  Button,
  Card,
  AvatarStack,
  Icon,
  StatusPill,
} from '@vision/ui';
import { auth } from '@vision/auth';
import { hubNav } from './_nav';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL ?? 'http://localhost:3000';

export default async function HubHomePage() {
  const session = await auth();
  if (!session?.user) {
    redirect(`${GATEWAY_URL}/signin`);
  }
  const defaultMode = (session.user as { defaultMode?: 'HUB' | 'SOCIAL' | null }).defaultMode;
  if (!defaultMode) {
    redirect(`${GATEWAY_URL}/select-mode`);
  }
  const userName = session.user.name ?? session.user.email ?? 'Öğrenci';
  const firstName = userName.split(' ')[0] ?? userName;
  return (
    <AppShell sidebarItems={hubNav} activeKey="home" userName={userName} userEmail={session.user.email ?? undefined}>
      <div className="max-w-[1280px] mx-auto px-8 py-8 space-y-10">
        <Greeting firstName={firstName} />
        <ProfileProgress />
        <RecommendedOpportunities />
        <ActiveProjects />
        <ContinueLearning />
        <UpcomingDeadlines />
        <ApplicationStats />
        <FeaturedCompanies />
      </div>
    </AppShell>
  );
}

/* ---------------- sections ---------------- */

function Greeting({ firstName }: { firstName: string }) {
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <section>
      <p className="text-[13px] text-fg-muted uppercase tracking-wider">{today}</p>
      <h1 className="text-[28px] font-semibold mt-1">Günaydın, {firstName} 👋</h1>
    </section>
  );
}

function ProfileProgress() {
  const percent = 65;
  return (
    <Card>
      <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">Profilini tamamla</p>
            <span className="text-sm text-fg-muted">{percent}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-subtle overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 text-[13px] text-fg-muted">
            Yetenek ve ilgi alanlarını ekleyerek daha iyi fırsat önerileri al.
          </p>
        </div>
        <Button variant="secondary">Profili Tamamla</Button>
      </div>
    </Card>
  );
}

const opportunities = [
  { title: 'Frontend Developer Intern', company: 'Trendyol', location: 'İstanbul · Hybrid', type: 'Staj',  deadline: '5 gün kaldı' },
  { title: 'UX Design Intern',           company: 'Getir',    location: 'İstanbul · On-site', type: 'Staj', deadline: '10 gün kaldı' },
  { title: 'Data Analyst Intern',        company: 'Insider',  location: 'Remote',             type: 'Staj', deadline: '22 gün kaldı' },
  { title: 'Product Management Intern',  company: 'Hepsiburada', location: 'İstanbul',        type: 'Staj', deadline: '15 gün kaldı' },
  { title: 'Mobile Developer Intern',    company: 'Peak Games', location: 'İstanbul',         type: 'Staj', deadline: '30 gün kaldı' },
];

function RecommendedOpportunities() {
  return (
    <Section title="Sana özel fırsatlar" cta="Tümü">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.slice(0, 3).map((o) => (
          <Card key={o.title} interactive className="p-5">
            <div className="flex items-start justify-between">
              <div
                className="h-11 w-11 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ background: hashColor(o.company) }}
              >
                {o.company[0]}
              </div>
              <button aria-label="Kaydet" className="text-fg-muted hover:text-primary p-1">
                <Icon.Bookmark />
              </button>
            </div>
            <h3 className="mt-4 font-semibold">{o.title}</h3>
            <p className="text-sm text-fg-muted">
              {o.company} · {o.location}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <Badge tone="primary">{o.type}</Badge>
              <span className="text-[12px] text-warning font-medium">{o.deadline}</span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const projects = [
  { title: 'Sustainable Campus App Challenge', members: '3/5 üye', status: 'In Progress', skills: ['React', 'Sustainability', 'UX'] },
  { title: 'AI Ethics Research Project',       members: '2/4 üye', status: 'Accepting Applications', skills: ['Research', 'AI', 'Ethics'] },
];

function ActiveProjects() {
  return (
    <Section title="Aktif Projeler & Challenges" cta="Tümü">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Card key={p.title} interactive className="overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-hub-500/30 to-hub-500/5" />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <Badge tone={p.status === 'In Progress' ? 'info' : 'success'}>{p.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-fg-muted">{p.members}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.skills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const courses = [
  { title: 'Introduction to UX Design',    instructor: 'Elif Yılmaz',      progress: 45, duration: '12 sa', level: 'Başlangıç' },
  { title: 'Python for Data Science',      instructor: 'Dr. Mehmet Aksoy', progress: 20, duration: '20 sa', level: 'Orta' },
  { title: 'React Development Bootcamp',   instructor: 'Can Öztürk',        progress: 78, duration: '30 sa', level: 'Orta' },
];

function ContinueLearning() {
  return (
    <Section title="Öğrenmeye devam et" cta="Academy'e git">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <Card key={c.title} interactive className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-hub-400/30 to-hub-800/30" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-[12px] text-fg-muted">
                <Badge>{c.level}</Badge>
                <span>· {c.duration}</span>
              </div>
              <h3 className="mt-2 font-medium">{c.title}</h3>
              <p className="text-sm text-fg-muted">{c.instructor}</p>
              <div className="mt-3 h-1.5 rounded-full bg-subtle overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />
              </div>
              <p className="mt-1 text-[12px] text-fg-muted">{c.progress}% tamamlandı</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const deadlines = [
  { title: 'Trendyol Frontend Intern',  org: 'Trendyol',   days: 5,  tone: 'warning' as const },
  { title: 'Startup Weekend Istanbul',  org: 'Entrepreneurship Club', days: 12, tone: 'info' as const },
  { title: 'Peak Games Mobile Intern',  org: 'Peak Games', days: 30, tone: 'success' as const },
];

function UpcomingDeadlines() {
  return (
    <Section title="Yaklaşan Deadlineʼlar">
      <Card>
        <ul className="divide-y divide-border">
          {deadlines.map((d) => (
            <li key={d.title} className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-10 rounded-lg bg-subtle flex items-center justify-center text-fg-muted">
                <Icon.Clock />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{d.title}</p>
                <p className="text-sm text-fg-muted truncate">{d.org}</p>
              </div>
              <Badge tone={d.tone}>{d.days} gün kaldı</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

function ApplicationStats() {
  const stats = [
    { label: 'İncelemede',  value: 2, status: 'review' as const },
    { label: 'Kabul edildi', value: 1, status: 'accepted' as const },
    { label: 'Kaydedildi',   value: 3, status: 'draft' as const,     override: 'Kaydedildi' },
    { label: 'Taslak',       value: 1, status: 'draft' as const },
  ];
  return (
    <Section title="Başvuru Durumu">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <StatusPill status={s.status} label={s.override ?? s.label} />
            <p className="mt-3 text-3xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const companies = ['Google', 'Microsoft', 'Getir', 'Trendyol', 'Insider', 'Peak Games'];

function FeaturedCompanies() {
  return (
    <Section title="Öne çıkan şirketler" cta="Tümü">
      <div className="flex flex-wrap gap-4">
        {companies.map((c) => (
          <Card key={c} interactive className="p-4 min-w-[160px] flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ background: hashColor(c) }}
            >
              {c[0]}
            </div>
            <span className="font-medium">{c}</span>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- helpers ---------------- */

function Section({ title, cta, children }: { title: string; cta?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold">{title}</h2>
        {cta && <button className="text-sm text-link font-medium">{cta}</button>}
      </div>
      {children}
    </section>
  );
}

function hashColor(name: string) {
  const palette = ['#76ABAE', '#F7834A', '#8CC0C3', '#F9A078', '#5E9295', '#E0683A', '#4A7A7D'];
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}
