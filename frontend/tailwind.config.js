/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: { primary: "#0047AB" },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "4rem",
          xl: "7rem",
          "2xl": "10rem",
        },
      },
    },
  },
  plugins: [],
};
