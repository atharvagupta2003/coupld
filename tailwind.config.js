/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#FFFFFF',
          primary: '#F9FAFB',
          lavender: '#0D9488',
          rose: '#E11D48',
          gold: '#0D9488',
          card: 'rgba(0,0,0,0.04)',
          border: 'rgba(0,0,0,0.08)',
          textSub: '#6B7280',
        },
      },
    },
  },
  plugins: [],
}
