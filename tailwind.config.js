/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Bricolage Grotesque", "sans-serif"],
      },
      colors: {
        gray: {
          850: "#1a1f2e",
          950: "#0d1117",
        },
      },
      animation: {
        "fade-in": "fadeInUp 0.3s ease both",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to:   { opacity: 1, transform: "translateY(0)"    },
        },
      },
    },
  },
  plugins: [],
};
