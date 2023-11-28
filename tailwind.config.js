/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#57a538",
        primaryDeep: "#4bc21c",
      },
      fontFamily: {
        lobster: ["Lobster Two", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
