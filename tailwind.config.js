/**
 * NOTE: This project runs Tailwind v4, which is configured CSS-first via the
 * `@theme` block in app/styles/tailwind.css — that is where these tokens are
 * actually registered and where utilities are generated from. This file is kept
 * in sync for documentation and for any tooling that still reads a JS config.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
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
        // The one unexpected accent — deep terracotta, used sparingly.
        terracotta: {
          DEFAULT: '#B85C3E', dark: '#9F4D33', light: '#C97559',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
