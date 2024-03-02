/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: { primary: "#0047AB", "primary-dark": "#0f00ab" },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "4rem",
          xl: "7rem",
          "2xl": "10rem",
        },
      },
      keyframes: {
        sliding: {
          "0%, 100%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(30%)" },
        },
      },
      animation: {
        "anime-sliding": "sliding 1s linear infinite",
      },
    },
  },
  plugins: [],
};
