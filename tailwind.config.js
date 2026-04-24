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
          bg: '#1C0B3A',
          primary: '#2D1B4E',
          lavender: '#B8A0D4',
          rose: '#C2547A',
          gold: '#D4A843',
          card: 'rgba(255,255,255,0.04)',
          border: 'rgba(184,160,212,0.15)',
          textSub: '#9B8FB0',
        },
      },
    },
  },
  plugins: [],
}
