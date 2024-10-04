/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Normal Theme (Light)
        normalPrimary: "#333", // Contoh warna primary untuk tema normal (light)
        normalBackground: "#fff", // Warna background putih untuk tema normal (light)

        // Dark Theme
        darkPrimary: "#fff", // Contoh warna primary untuk tema gelap (dark)
        darkBackground: "#333", // Warna background gelap untuk tema gelap (dark)
      },
    },
  },
  darkMode: "class", // Mengaktifkan dark mode berbasis class
  plugins: [require("rippleui")],
  rippleui: {
    themes: [
      {
        themeName: "light",
        colorScheme: "light",
        colors: {
          primary: "#235264",
          backgroundPrimary: "#F3F4F6",
        },
      },
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          primary: "#573242",
          backgroundPrimary: "#1a1a1a",
        },
      },
    ],
  },
};
