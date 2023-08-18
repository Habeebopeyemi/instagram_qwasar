/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "281px",
      xsm: "511px",
      midmax: "900px",
      ...defaultTheme.screens,
      smax: "1440px",
    },
    extend: {
      colors: {
        button: "#A77E01",
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
