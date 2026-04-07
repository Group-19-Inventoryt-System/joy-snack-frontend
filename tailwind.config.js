/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        joysnacky: {
          dark: "rgb(var(--color-joysnacky-dark) / <alpha-value>)",
          primary: "rgb(var(--color-joysnacky-primary) / <alpha-value>)",
          accent: "rgb(var(--color-joysnacky-accent) / <alpha-value>)",
          light: "rgb(var(--color-joysnacky-light) / <alpha-value>)",
          brown: "rgb(var(--color-joysnacky-brown) / <alpha-value>)",
        },
        orange: {
          50: "rgb(var(--color-joysnacky-light-muted) / <alpha-value>)",
          100: "rgb(var(--color-joysnacky-light-soft) / <alpha-value>)",
          200: "rgb(var(--color-joysnacky-accent-soft) / <alpha-value>)",
          300: "rgb(var(--color-joysnacky-accent-glow) / <alpha-value>)",
          400: "rgb(var(--color-joysnacky-accent-strong) / <alpha-value>)",
          500: "rgb(var(--color-joysnacky-accent) / <alpha-value>)",
          600: "rgb(var(--color-joysnacky-primary) / <alpha-value>)",
          700: "rgb(var(--color-joysnacky-dark) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["'Outfit'", "sans-serif"],
        display: ["'Great Vibes'", "cursive"],
        body: ["'Outfit'", "sans-serif"],
        brand: ["'Outfit'", "sans-serif"],
        sulphur: ["'Sulphur Point'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
