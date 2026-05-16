/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a4b8fc',
          400: '#7c90f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          cyan:   '#06b6d4',
          violet: '#8b5cf6',
          pink:   '#ec4899',
          amber:  '#f59e0b',
        },
        dark: {
          900: '#050816',
          800: '#090d1f',
          700: '#0d1229',
          600: '#111827',
          500: '#1f2937',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'slide-in-left':  'slideInLeft 0.6s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
        'fade-in-up':   'fadeInUp 0.6s ease forwards',
        'bounce-slow':  'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 5px #6366f1, 0 0 10px #6366f1' },
          '100%': { boxShadow: '0 0 20px #8b5cf6, 0 0 40px #8b5cf6' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-60px)', opacity: 0 },
          '100%': { transform: 'translateX(0)',     opacity: 1 },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(60px)', opacity: 0 },
          '100%': { transform: 'translateX(0)',    opacity: 1 },
        },
        fadeInUp: {
          '0%':   { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)',    opacity: 1 },
        },
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':     'linear-gradient(135deg, #050816 0%, #090d1f 50%, #0d1229 100%)',
        'hero-pattern':      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
