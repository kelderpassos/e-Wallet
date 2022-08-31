/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        loginBg: "url('./src/assets/gilles-lambert-pb_lF8VWaPU-unsplash.jpg')",
      },
    },
  },
  plugins: [],
};
