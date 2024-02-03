/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: { primary: "#0047AB" },
      container: {
        padding: "10rem",
      },
    },
  },
  plugins: [],
};
