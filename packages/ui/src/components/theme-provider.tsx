'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Mode = 'hub' | 'social';
type Theme = 'light' | 'dark';

interface ThemeState {
  mode: Mode;
  theme: Theme;
  setMode: (m: Mode) => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  toggleMode: () => void;
}

const Ctx = createContext<ThemeState | null>(null);

interface ProviderProps {
  children: ReactNode;
  defaultMode?: Mode;
  defaultTheme?: Theme;
  /** true = mode değiştirilemez; hub/social app'lerinde kullanılır. */
  lockMode?: boolean;
}

const COOKIE_THEME = 'vision-theme';
const COOKIE_MODE = 'vision-mode';
const ONE_YEAR = 60 * 60 * 24 * 365;

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]!) : null;
}
function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

export function ThemeProvider({ children, defaultMode = 'hub', defaultTheme, lockMode }: ProviderProps) {
  const [mode, setModeState] = useState<Mode>(defaultMode);
  const [theme, setThemeState] = useState<Theme>(defaultTheme ?? 'light');

  // Hydrate from cookie (cross-port) + system preference
  useEffect(() => {
    const savedTheme = readCookie(COOKIE_THEME);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme);
    } else if (!defaultTheme && typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
    if (!lockMode) {
      const savedMode = readCookie(COOKIE_MODE);
      if (savedMode === 'hub' || savedMode === 'social') setModeState(savedMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect state on <html> + persist to cookie
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-mode', mode);
    html.setAttribute('data-theme', theme);
    writeCookie(COOKIE_THEME, theme);
    if (!lockMode) writeCookie(COOKIE_MODE, mode);
  }, [mode, theme, lockMode]);

  const setMode = (m: Mode) => {
    if (lockMode) return;
    setModeState(m);
  };

  const value: ThemeState = {
    mode,
    theme,
    setMode,
    setTheme: setThemeState,
    toggleMode: () => setMode(mode === 'hub' ? 'social' : 'hub'),
    toggleTheme: () => setThemeState(theme === 'light' ? 'dark' : 'light'),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTheme must be used inside <ThemeProvider>');
  return v;
}
