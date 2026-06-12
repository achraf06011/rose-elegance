/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rouge: {
          DEFAULT: '#B71C1C',
          vif: '#D32F2F',
          pale: '#FFEBEE',
        },
        creme: '#FAF7F2',
        sombre: '#1F2937',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
