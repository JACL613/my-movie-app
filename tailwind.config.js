/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000020", // Azul personalizado para el fondo de la página
      },
    },
  },
  plugins: [],
};
