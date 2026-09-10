import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vision Hub — Fırsatlar, Projeler, Kariyer',
  description: 'Vision Hub — profesyonel ve akademik alan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
