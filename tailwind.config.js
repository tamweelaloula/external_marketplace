/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // enable dark mode via class
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwind-scrollbar-hide")],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(180px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(180px) rotate(-360deg)",
          },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
      },
    },
  },
  //   plugins: [require("tailwindcss-animate")],
};
