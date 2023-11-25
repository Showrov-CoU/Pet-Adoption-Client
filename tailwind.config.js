/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#57a538",
      },
      fontFamily: {
        lobster: ["Lobster Two", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
