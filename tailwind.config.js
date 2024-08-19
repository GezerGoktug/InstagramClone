/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: "1280px",
      xsl: "1150px",
      lg: "1050px",
      md: "768px",
      sm: "640px",
      xs: "550px",
      xxs: "450px",
      xxxs: "350px",
    },
    extend: {
      keyframes: {
        moving: {
          "100%": { left:"100%" },
          "0%": { left: "-400px" },
        },
        scaleUp: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        }
      },
      animation: {
        moving: "moving 0.5s cubic-bezier(0.4, 0, 0.2, 1) ",
        scaleUp: "scaleUp 0.2s linear ",
      },
    },
  },
  plugins: [],
};
