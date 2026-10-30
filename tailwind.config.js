/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'rgb(var(--ivory-rgb) / <alpha-value>)',
        navy: 'rgb(var(--navy-rgb) / <alpha-value>)',
        powder: 'rgb(var(--powder-rgb) / <alpha-value>)',
        denim: 'rgb(var(--denim-rgb) / <alpha-value>)',
        mist: 'rgb(var(--mist-rgb) / <alpha-value>)',
        paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
        butter: '#F1D978',
        blush: '#E9B9C9',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', '"Segoe Script"', 'cursive'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
