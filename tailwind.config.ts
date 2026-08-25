import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Deep surgical near-black — the anchor
        ink: {
          DEFAULT: '#0A0F1A',
          900: '#050810',
          800: '#0A0F1A',
          700: '#111827',
          600: '#1F2937',
          500: '#374151',
        },
        // Warm off-white paper base
        paper: {
          DEFAULT: '#F5F4F0',
          50: '#FAFAF7',
          100: '#F5F4F0',
          200: '#EBE9E2',
          300: '#DDDBD3',
        },
        // Neutral steel greys — surface, borders, dividers, secondary text
        steel: {
          DEFAULT: '#8A8F96',
          100: '#EFF0F2',
          200: '#E0E2E5',
          300: '#C7CACF',
          400: '#A6ABB2',
          500: '#8A8F96',
          600: '#6A6F76',
          700: '#4B5058',
        },
        // The single accent — muted surgical teal, used ONLY for interactive states + key highlights
        accent: {
          DEFAULT: '#00A3B4',
          light: '#33B7C4',
          deep: '#007988',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-3xl': ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '500' }],
        'display-2xl': ['clamp(2.75rem, 6.5vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '500' }],
        'display-xl': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '500' }],
        'display-lg': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        'eyebrow': ['0.72rem', { lineHeight: '1', letterSpacing: '0.24em', fontWeight: '500' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(to right, rgba(10,15,26,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,15,26,0.05) 1px, transparent 1px)',
        'grid-fine-dark':
          'linear-gradient(to right, rgba(245,244,240,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,244,240,0.06) 1px, transparent 1px)',
        'radial-accent':
          'radial-gradient(ellipse at center, rgba(0,163,180,0.14), transparent 60%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      transitionTimingFunction: {
        precision: 'cubic-bezier(0.22, 1, 0.36, 1)',
        clinical: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
