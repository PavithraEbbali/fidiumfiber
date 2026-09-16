import type { Config } from 'tailwindcss';

/**
 * Official Fidium palette — hex values sampled directly from fidiumfiber.com.
 *  #93D500 / #00AE42  →  the brand "lime → green" gradient
 *  #008533            →  deep green used for emphasis type
 *  #003595            →  brand navy
 *  #F97E19            →  promo/offer accent
 */
/** Full 0–100 opacity scale so fine-grained tints like `/8` or `/12` resolve. */
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)])
);

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      opacity,
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        900: '900ms',
      },
      colors: {
        lime: {
          DEFAULT: '#93D500',
          50: '#F4FCE0',
          100: '#E7F9BF',
          200: '#D2F383',
          300: '#B8EA45',
          400: '#A3E016',
          500: '#93D500',
          600: '#7AB100',
          700: '#5E8800',
          800: '#456400',
          900: '#2E4300',
        },
        fidium: {
          DEFAULT: '#00AE42',
          50: '#E6F8ED',
          100: '#C2EFD4',
          200: '#86DFA9',
          300: '#45CE7B',
          400: '#12BC55',
          500: '#00AE42',
          600: '#008533',
          700: '#006827',
          800: '#004C1D',
          900: '#003113',
        },
        navy: {
          DEFAULT: '#003595',
          50: '#EAF0FC',
          100: '#CFDDF8',
          200: '#9BB8F0',
          300: '#5F8CE6',
          400: '#2A63DA',
          500: '#003595',
          600: '#002B7A',
          700: '#00215E',
          800: '#001843',
          900: '#000F2B',
        },
        slate950: '#060B16',
        ink: '#0B1220',
        promo: '#F97E19',
        muted: '#636569',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,18,32,.04), 0 8px 24px -8px rgba(11,18,32,.10)',
        cardHover: '0 2px 4px rgba(11,18,32,.05), 0 24px 56px -16px rgba(0,174,66,.28)',
        pop: '0 20px 60px -20px rgba(0,174,66,.55)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.22,1,.36,1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(.85)', opacity: '.55' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration,38s) linear infinite',
        shimmer: 'shimmer 2.8s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s cubic-bezier(.22,1,.36,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
