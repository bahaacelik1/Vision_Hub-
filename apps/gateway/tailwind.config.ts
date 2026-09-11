import type { Config } from 'tailwindcss';
import preset from '@vision/design-tokens/tailwind';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  presets: [preset as Config],
  darkMode: ['selector', 'html[data-theme="dark"]'],
};

export default config;
