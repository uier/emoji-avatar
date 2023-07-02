/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require("daisyui")],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["emerald"],
  },
};
