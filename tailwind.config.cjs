/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3CF45E",     // Verde estilo JonBet
        primaryHover: "#2ddb4f",
        darkBg: "#0F1116",
        darkCard: "#1A1D24",
      },
      borderRadius: {
        xl2: "1rem",
      },
      animation: {
        fadeIn: "fadeIn .25s ease-out",
        slideUp: "slideUp .35s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 18px rgba(60, 244, 94, 0.4)",
      },
    },
  },
  plugins: [],
}
