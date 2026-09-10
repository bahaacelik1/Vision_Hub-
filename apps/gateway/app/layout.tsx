import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vision — Öğrenci Ekosistemi',
  description: 'Vision Hub ve Vision Social — tek hesap, tüm üniversite hayatı.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
