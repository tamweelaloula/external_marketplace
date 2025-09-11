/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // enable dark mode via class
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
//   plugins: [require("tailwindcss-animate")],
}
