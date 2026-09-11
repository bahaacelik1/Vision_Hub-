/**
 * Vision Tailwind Preset — CSS custom property tabanlı.
 * Renkler `packages/design-tokens/src/tokens.css` içinden gelir.
 *
 * `any` kullanmamızın nedeni bu paketin tailwind'e bağımlı olmaması —
 * preset uygulama tarafında Tailwind Config'e enjekte edilir.
 */
export const visionPreset: any = {
  theme: {
    extend: {
      colors: {
        // Semantic (theme-aware)
        canvas:   'var(--color-bg-canvas)',
        surface:  'var(--color-bg-surface)',
        elevated: 'var(--color-bg-elevated)',
        subtle:   'var(--color-bg-subtle)',
        inverse:  'var(--color-bg-inverse)',
        border:   'var(--color-border-default)',
        'border-strong': 'var(--color-border-strong)',
        fg:         'var(--color-text-primary)',
        'fg-muted': 'var(--color-text-muted)',
        'fg-secondary': 'var(--color-text-secondary)',
        'fg-inverse':   'var(--color-text-inverse)',
        primary:         'var(--color-action-primary)',
        'primary-hover': 'var(--color-action-primary-hover)',
        'primary-text':  'var(--color-action-primary-text)',
        'primary-soft':  'var(--color-action-secondary)',
        link: 'var(--color-link)',
        success: 'var(--color-status-success)',
        warning: 'var(--color-status-warning)',
        danger:  'var(--color-status-error)',
        info:    'var(--color-status-info)',

        // Brand primitives
        hub: {
          50:'#EDF5F5',100:'#D4E8E9',200:'#B0D4D6',300:'#8CC0C3',400:'#76ABAE',
          500:'#76ABAE',600:'#5E9295',700:'#4A7A7D',800:'#376264',900:'#264A4C',
        },
        social: {
          50:'#FEF0E9',100:'#FDD9C8',200:'#FBBDA0',300:'#F9A078',400:'#F7834A',
          500:'#F7834A',600:'#E0683A',700:'#C4522D',800:'#9E3E22',900:'#772E19',
        },
        neutral: {
          50:'#F8F9FA',100:'#EEEEEE',200:'#DEE2E6',300:'#CED4DA',400:'#ADB5BD',
          500:'#6C757D',600:'#495057',700:'#31363F',800:'#2B2F36',900:'#272B30',950:'#222831',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 12px rgba(0,0,0,0.08)',
        lg: '0 8px 24px rgba(0,0,0,0.12)',
        xl: '0 16px 48px rgba(0,0,0,0.16)',
      },
    },
  },
};

export default visionPreset;

export {};
