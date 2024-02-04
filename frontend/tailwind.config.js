/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: { primary: "#0047AB" },
      container: {
        padding: {
          DEFAULT: "2rem",
          sm: "3rem",
          lg: "5rem",
          xl: "8rem",
          "2xl": "10rem",
        },
      },
    },
  },
  plugins: [],
};
