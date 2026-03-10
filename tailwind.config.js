/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        brandBlue: "#2f63e7",
        brandPurple: "#7b39e8"
      },
      boxShadow: {
        card: "0 8px 24px rgba(29, 50, 98, 0.09)"
      }
    }
  },
  plugins: []
};
