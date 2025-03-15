/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        walk: {
          "0%": { left: "0", transform: "scaleX(-1)" },
          "49.9%": { left: "calc(100vw - 3rem)", transform: "scaleX(-1)" },
          "50%": { left: "calc(100vw - 3rem)", transform: "scaleX(1)" },
          "99.9%": { left: "0", transform: "scaleX(1)" },
          "100%": { left: "0", transform: "scaleX(-1)" },
        },
      },
      animation: {
        walk: "walk 40s linear infinite",
        "walk-slow": "walk 90s linear infinite",
        "walk-fast": "walk 28s linear infinite",
      },
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
