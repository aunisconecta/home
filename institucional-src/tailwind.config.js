/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          dark: '#0A0A0A',
          gray: '#1A1A1A',
          lightgray: '#27272A',
          coral: '#E54B4B',
          coralhover: '#D13D3D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
