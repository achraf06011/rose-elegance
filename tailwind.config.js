/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        encre: '#0F0C09',
        craie: '#FDFAF6',
        pivoine: {
          DEFAULT: '#9B1B30',
          vif: '#B8202E',
          pale: '#F5E8EB',
          rose: '#E8CFC8',
        },
        or: {
          DEFAULT: '#B8922A',
          clair: '#D4B483',
        },
        sable: '#E8DDD0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
