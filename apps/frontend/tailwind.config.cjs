const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  theme: {
    screens: {
      xxs: "375px",
      xs: "480px",
      ...defaultTheme.screens,
    },
    colors: {
      inherit: colors.inherit,
      current: colors.currentColor,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      cyan: colors.cyan, // TODO: remove after adding relay results colors
      bg: "rgb(var(--bg) / <alpha-value>)",
      surface: "rgb(var(--surface) / <alpha-value>)",
      heading: "rgb(var(--heading) / <alpha-value>)",
      text: "rgb(var(--text) / <alpha-value>)",
      accent: "rgb(var(--accent) / <alpha-value>)",
      error: "rgb(var(--error) / <alpha-value>)",
    },
    extend: {
      keyframes: {
        "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
        "fly-up": {
          from: { transform: "translate3d(0, 50px, 0)" },
          to: { transform: "translate3d(0, 0, 0)" },
        },
        "fly-right": {
          from: { transform: "translate3d(-50px, 0, 0)" },
          to: { transform: "translate3d(0, 0, 0)" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-15deg)" },
          "75%": { transform: "rotate(15deg)" },
        },
      },
      animation: {
        shake: "shake 0.8s",
      },
    },
  },
};
