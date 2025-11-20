/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe3e9',
          200: '#ffc7d4',
          300: '#ff9ab0',
          400: '#ff6d8e',
          500: '#f9486b',
          600: '#e62e5c',
          700: '#c21f4a',
          800: '#a11d44',
          900: '#881c40',
        },
        gold: {
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#d4af37',
          600: '#b8941f',
          700: '#947518',
          800: '#7a5e17',
          900: '#684e15',
        },
        ivory: {
          50: '#fffef9',
          100: '#fffdf5',
          200: '#fffaeb',
          300: '#fff6db',
          400: '#ffefc1',
          500: '#fffff0',
          600: '#e6dcc7',
          700: '#c4b89f',
          800: '#9e9280',
          900: '#7d7466',
        },
      },
      fontFamily: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        serif: "'Playfair Display', Georgia, serif",
        cursive: "'Great Vibes', cursive",
      },
    },
  },
  plugins: [],
}
