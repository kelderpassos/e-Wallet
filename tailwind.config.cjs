/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        loginBg: "url('./src/images/gilles-lambert-pb_lF8VWaPU-unsplash.jpg')",
      },
    },
  },
  plugins: [],
};
