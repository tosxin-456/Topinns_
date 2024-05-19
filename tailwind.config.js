/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        fontFamily: {
          'clash-light' : ['ClashDisplay-Light', 'sans-serif'],
          'clash-regular' : ['ClashDisplay-Regular', 'sans-serif'],
          'clash-medium' : ['ClashDisplay-Medium', 'sans-serif'],
          'clash-semibold' : ['ClashDisplay-Semibold', 'sans-serif'],
          'clash-bold' : ['ClashDisplay-Bold', 'sans-serif'],
          'clash-variable' : ['ClashDisplay-Variable', 'sans-serif'],
        }}},
  plugins: [],
}