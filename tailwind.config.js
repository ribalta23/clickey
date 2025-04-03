/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar modo oscuro basado en clases
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2979FF',
          '50': '#EBF3FF',
          '100': '#D6E7FF',
          '200': '#ADC9FF',
          '300': '#85ABFF',
          '400': '#5C8DFF',
          '500': '#2979FF', // Color principal
          '600': '#0055E6',
          '700': '#0041AD',
          '800': '#002C75',
          '900': '#00183C',
        }
      }
    },
  },
  plugins: [],
}
