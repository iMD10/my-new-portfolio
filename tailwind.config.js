/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        dark: '#0B0A08',
        sand: '#F3EBDD',
        muted: '#B9AA97',
        gold: '#D99A4E',
        oasis: '#6FA8B8',
      },
      fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
        serifAccent: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
