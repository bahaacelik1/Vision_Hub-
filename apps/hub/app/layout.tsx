import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider, GlobalModeSwitcher } from '@vision/ui';

const SOCIAL_URL = process.env.NEXT_PUBLIC_SOCIAL_URL ?? 'http://localhost:3002';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Vision Hub — Fırsatlar, Projeler, Kariyer',
  description: 'Vision Hub / Academy — akademik ve profesyonel gelişim alanı.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultMode="hub" lockMode>
          <GlobalModeSwitcher socialHref={SOCIAL_URL} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
