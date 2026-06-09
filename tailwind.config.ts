import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FFF8F3',
          100: '#FFF0E6',
          200: '#FFD9C0',
          300: '#FFB899',
          400: '#FF8C5E',
          500: '#E86A3A',
          600: '#C9522A',
          700: '#A03E1E',
          800: '#7A2D15',
          900: '#4D1A0A',
        },
        navy: {
          50: '#EEF1F9',
          100: '#D5DCF0',
          200: '#ABBAE1',
          300: '#7A93CB',
          400: '#4D6BAF',
          500: '#2D4D8F',
          600: '#1A3270',
          700: '#0F2054',
          800: '#071238',
          900: '#030822',
        },
        sage: {
          50: '#F0F7F3',
          100: '#D8EDE3',
          200: '#AFDBC7',
          300: '#80C4A6',
          400: '#5BA385',
          500: '#3E7E66',
          600: '#2C5F4A',
          700: '#1D3F32',
          800: '#0F221B',
          900: '#060F0C',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FFF8F3 0%, #FFE8D6 50%, #FFD4B8 100%)',
        'hero-gradient': 'linear-gradient(135deg, #1A3270 0%, #0F2054 40%, #2D4D8F 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,248,243,0.9) 100%)',
      },
      boxShadow: {
        'warm': '0 4px 24px rgba(232, 106, 58, 0.15)',
        'warm-lg': '0 8px 48px rgba(232, 106, 58, 0.2)',
        'card': '0 2px 16px rgba(26, 50, 112, 0.08)',
        'card-hover': '0 8px 32px rgba(26, 50, 112, 0.14)',
        'glow': '0 0 40px rgba(232, 106, 58, 0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-warm': 'pulseWarm 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseWarm: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 106, 58, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 106, 58, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
