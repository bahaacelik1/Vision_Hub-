# Vision Ekosistemi

Vision Hub (profesyonel/akademik) + Vision Social (sosyal/topluluk) — tek hesap, tek ekosistem.

## Mimari

```
vision-ecosystem/
├── apps/
│   ├── gateway/   Ana giriş — Hub/Social seçim ekranı  (:3000)
│   ├── hub/       Vision Hub — fırsat/proje/kariyer    (:3001)
│   ├── social/    Vision Social — etkinlik/topluluk    (:3002)
│   ├── admin/     Yönetim paneli                        (:3003)
│   └── api/       NestJS backend                        (:4000)
├── packages/
│   ├── config/          Paylaşılan ESLint/TS/Tailwind presetleri
│   ├── types/           Ortak TypeScript tipleri (User, Event, Opportunity…)
│   ├── design-tokens/   Renk/tipografi/spacing tokenları
│   ├── ui/              Ortak React komponentleri (shadcn tabanlı)
│   ├── icons/           Icon seti
│   ├── sdk/             Frontend'ler için API client
│   ├── auth/            Ortak kimlik/oturum
│   └── database/        Prisma schema + client
└── docs/                Ürün ve teknik dokümantasyon
```

## Gereksinimler

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+ (veya Docker)

## Başlangıç

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Scriptler

| Komut              | Açıklama                          |
| ------------------ | --------------------------------- |
| `pnpm dev`         | Tüm app'leri geliştirme modunda çalıştırır |
| `pnpm build`       | Prod build                        |
| `pnpm lint`        | Tüm workspace'lerde lint          |
| `pnpm typecheck`   | TypeScript kontrolleri            |
| `pnpm test`        | Testleri çalıştırır               |
| `pnpm format`      | Prettier ile format               |

## Ürün Dokümantasyonu

Detaylı ürün akışı için: [docs/product/overview.md](docs/product/overview.md)
