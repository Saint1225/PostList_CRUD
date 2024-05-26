/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./*.{html,js,jsx}", "./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'yellow': '#F8B959',
      'skin': '#FDEACD',
      'white': '#FFFFFF',
      'red': '#F95A50',
      'green': '#b7f7c2',
      'gray': 'rgb(71 85 105)'
    },
    screens: {
      '2xs': '410px',
      'xs': '480px',
      'sm': '610px',
      'md': '910px',
      'lg': '1100px',
      'xl': '1450px',
    },
    extend: {},
  },
  plugins: [],
  safelist: [ { pattern: /./ } ]
})

