import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@vision/ui';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Vision — Öğrenci Ekosistemi',
  description:
    'Öğrencinin üniversite hayatının tamamı: Vision Hub (akademik) ve Vision Social (sosyal) tek hesapta.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider defaultMode="hub" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
