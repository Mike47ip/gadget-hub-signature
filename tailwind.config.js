/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#0a1628",
          50: "#f0f4ff",
          100: "#e8f0fe",
          200: "#c7d8f8",
          400: "#6b7fa8",
          600: "#2c3e6b",
          800: "#1a2d4f",
          900: "#0a1628",
        },
        brand: {
          DEFAULT: "#1a56db",
          light: "#3b82f6",
          pale: "#dbeafe",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
