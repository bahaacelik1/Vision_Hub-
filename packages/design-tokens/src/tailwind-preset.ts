import type { Config } from 'tailwindcss';
import { colors, typography, radius, spacing } from './index';

export const visionPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        vision: colors.brand.vision,
        hub: colors.brand.hub,
        social: colors.brand.social,
        neutral: colors.neutral,
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        danger: colors.semantic.danger,
        info: colors.semantic.info,
      },
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      borderRadius: radius,
      spacing,
    },
  },
};

export default visionPreset;
