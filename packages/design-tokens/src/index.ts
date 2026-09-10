/**
 * Vision Design Tokens
 *
 * Bu dosya, kullanıcının paylaşacağı tasarım referansı geldiğinde
 * marka değerleriyle güncellenecektir. Şu an geçici placeholder değerleri var.
 */

export const colors = {
  brand: {
    vision: {
      50: '#f5f3ff',
      100: '#ede9fe',
      500: '#7c3aed',
      600: '#6d28d9',
      900: '#4c1d95',
    },
    hub: {
      500: '#2563eb',
      600: '#1d4ed8',
    },
    social: {
      500: '#f97316',
      600: '#ea580c',
    },
  },
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    500: '#71717a',
    700: '#3f3f46',
    900: '#18181b',
    1000: '#000000',
  },
  semantic: {
    success: '#16a34a',
    warning: '#eab308',
    danger: '#dc2626',
    info: '#0ea5e9',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
} as const;

export const radius = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 8px rgba(0,0,0,0.08)',
  lg: '0 12px 24px rgba(0,0,0,0.1)',
} as const;

export const motion = {
  fast: '150ms',
  base: '250ms',
  slow: '400ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;
