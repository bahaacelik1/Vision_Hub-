'use client';

import { useTheme } from './theme-provider';
import { Sun, Moon } from './icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
      className="h-11 w-11 flex items-center justify-center rounded-full text-fg-muted hover:bg-subtle hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--color-focus-ring)]"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
