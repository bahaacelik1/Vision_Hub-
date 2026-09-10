import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vision Social — Etkinlikler, Topluluk, Şehir',
  description: 'Vision Social — sosyal yaşam ve topluluk alanı.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
