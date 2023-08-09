/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  daisyui:{
    themes:[
    {
      hiretoolTheme:{
        primary: "#26bbac",
        neutral: "#00e5bd",       
        "base-100": "#FFFFFF",

        "--rounded-box": "0rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge": "0rem",// border width of tabs
        "--tab-radius": "0rem", // border radius of tabs
      },  
    },
  ],
},
theme: {
  extend: {
    borderRadius: {
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
    },
  },
},
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
}

