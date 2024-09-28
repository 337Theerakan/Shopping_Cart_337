/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          500: '#ff0000',
          600: '#e60000',
          700: '#cc0000',
        },
        black: '#000000',
        gray: {
          900: '#1a1a1a',
          700: '#333333',
        },
      },
    },
  },
  plugins: [aspectRatio],
}
