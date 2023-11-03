/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#4646B5",
        secondary:"#D6F037",
        tertiary:"#0C0C1D"
      }
    },
  },
  plugins: [],
}