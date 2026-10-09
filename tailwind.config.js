/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173F2A',
          50: '#EDF4EF',
          100: '#D6E5DC',
          200: '#AECDB9',
          300: '#86B597',
          400: '#5E9D75',
          500: '#246B45',
          600: '#1F5C3B',
          700: '#194A30',
          800: '#173F2A',
          900: '#0F2B1D',
        },
        leaf: {
          DEFAULT: '#70A66B',
          50: '#F1F8F0',
          100: '#DEF0DB',
          200: '#BDE1B8',
          300: '#9CD295',
          400: '#70A66B',
          500: '#5A9454',
          600: '#487B43',
          700: '#3A6336',
          800: '#2D4D2A',
          900: '#1F371D',
        },
        botanical: '#F3F7EF',
        cream: '#FCFCF8',
        charcoal: '#202720',
        muted: '#69746C',
        accent: {
          DEFAULT: '#D4A53A',
          50: '#FBF6E9',
          100: '#F5E9C8',
          200: '#EBD49A',
          300: '#E0BE6C',
          400: '#D4A53A',
          500: '#BF9230',
          600: '#A67E29',
          700: '#876623',
          800: '#6B511C',
          900: '#4F3B15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.83rem + 0.22vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)',
        'fluid-xl': 'clamp(1.25rem, 1.15rem + 0.5vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.35rem + 0.75vw, 2.25rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.65rem + 1.25vw, 3rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3.75rem)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(23, 63, 42, 0.08), 0 4px 16px -4px rgba(23, 63, 42, 0.06)',
        card: '0 1px 3px -1px rgba(23, 63, 42, 0.06), 0 8px 24px -8px rgba(23, 63, 42, 0.10)',
        lift: '0 4px 12px -2px rgba(23, 63, 42, 0.12), 0 16px 40px -12px rgba(23, 63, 42, 0.18)',
      },
      maxWidth: {
        container: '1280px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
