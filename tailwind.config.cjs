/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        loginBg: "url('./src/images/login-background.jpg')",
      },
    },
  },
  plugins: [],
};
