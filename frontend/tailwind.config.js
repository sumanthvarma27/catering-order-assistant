/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: "#fdf5eb",
          100: "#fae8d2",
          200: "#f4c99e",
          300: "#eda66a",
          400: "#e68b43",
          500: "#c97e38",
          600: "#b86e2e",
          700: "#7c2d12",
          800: "#63230d",
          900: "#4a1808",
        },
        cream: "#f8f3e7",
        copper: "#7c2d12",
        gold: "#c8a46d",
        dark: "#1a1a1a",
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        royal: "0 4px 14px rgba(124, 45, 18, 0.25)",
        "royal-hover": "0 6px 20px rgba(124, 45, 18, 0.35)",
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
        fadeIn: "fadeIn 0.8s ease-in",
      },
    },
  },
  plugins: [],
};
