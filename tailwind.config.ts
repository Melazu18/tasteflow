import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FCF7ED',
        porcelain: '#FFFDF8',
        lagoon: '#0D6660',
        turquoise: '#12AB9D',
        mint: '#E8F4EE',
        sage: '#7CA982',
        slatebrand: '#131F1F',
        brass: '#B48847',
        wine: '#6E3043',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        premium: 'var(--shadow-premium)',
        innerGlow: 'inset 0 1px 0 rgba(255,255,255,.55)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      letterSpacing: {
        luxury: '0.18em',
      },
    },
  },
  plugins: [],
} satisfies Config;
