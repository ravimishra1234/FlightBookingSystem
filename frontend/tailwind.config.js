/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D1F1A',
        'primary-2': '#10271F',
        'primary-3': '#112E25',
        accent: '#1D6B43',
        'accent-light': '#2E8B57',
        'accent-bright': '#22c55e',
        gold: '#C9A84C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      transitionDuration: {
        '700': '700ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
};
