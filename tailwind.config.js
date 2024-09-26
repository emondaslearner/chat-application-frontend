/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_: "#1C87FD",
        white_: "#ffffff",
        medium_dark_: "#e5e9f2",
        dark_gray_: "#adb5bd",
        dark_: "#495057",
        deep_dark_: "#8094ae",
        normal_green: "#2ecc71",
        dark_bg_: "#111827",
        dark_border_: "#374151",
        dark_light_bg_: "#1F2937",
        dark_text_: "#ACB0B7",
        light_border_: "#e5e9f2",
        light_gray_: "#f1f1f1",
        light_bg_: "#ECF0F3",
      },
      fontFamily: {
        sans: [],
      },
      screens: {
        xs: "400px",
        ms: "550px",
        xll: "1440px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
