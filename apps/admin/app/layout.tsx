import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vision Admin — Yönetim Paneli',
  description: 'Vision Ekosistemi yönetim paneli.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
