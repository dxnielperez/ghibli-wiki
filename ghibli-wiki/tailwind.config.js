/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ghibli: ["Mystery Quest", "cursive"],
        noto: ["Noto Sans JP", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        skyblue: "#28AEED",
        darkgray: "#3A3A3A",
        coral: "#FF7F50",
      },
    },
  },
  plugins: [],
};
