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
        blink: { "0%": { opacity: 0 } },
        "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shake: {
          "10%": { transform: "translate3d(-1px, 0, 0)" },
          "20%": { transform: "translate3d(2px, 0, 0)" },
          "30%": { transform: "translate3d(-4px, 0, 0)" },
          "40%": { transform: "translate3d(4px, 0, 0)" },
          "50%": { transform: "translate3d(-4px, 0, 0)" },
          "60%": { transform: "translate3d(4px, 0, 0)" },
          "70%": { transform: "translate3d(-4px, 0, 0)" },
          "80%": { transform: "translate3d(2px, 0, 0)" },
          "90%": { transform: "translate3d(-1px, 0, 0)" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        blink: "blink 1s steps(2, start) infinite",
        "fade-in": "fade-in 500ms",
        rotate: "rotate 2s linear infinite",
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
        wave: "wave 2s linear infinite",
      },
    },
  },
};
