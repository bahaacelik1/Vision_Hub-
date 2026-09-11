import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider, GlobalModeSwitcher } from '@vision/ui';

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3001';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Vision Social — Etkinlikler, Topluluk, Şehir',
  description: 'Vision Social — sosyal yaşam ve topluluk alanı.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultMode="social" lockMode>
          <GlobalModeSwitcher hubHref={HUB_URL} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
