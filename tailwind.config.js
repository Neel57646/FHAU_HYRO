/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFBF7', 100: '#FFF5ED', 200: '#FFE8D8', 300: '#FFDDC0',
          400: '#FFC9A3', 500: '#FFB887', 600: '#E6A373', 700: '#CC8E5F',
          800: '#B27A4B', 900: '#996637',
        },
        earth: {
          50: '#F9F7F4', 100: '#EFE9E0', 200: '#D9CCBB', 300: '#C3AE96',
          400: '#A89078', 500: '#8D7260', 600: '#7A6451', 700: '#675642',
          800: '#554833', 900: '#433A24',
        },
        accent: {
          teal: '#4A9B8E', sage: '#6B8E7F', blush: '#D4A5A5',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
