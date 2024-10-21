/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}", 
    "./Home/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#f5f5f9', 
          2: '#FFF78A',
          4: '#FFF176',
          5: '#FB8C00',
          6: '#2196F3', 
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        umbold: ["UberMove-Bold"],
        umlight: ["UberMove-Light"],
        ummedium: ["UberMove-Medium"],
        umregular: ["UberMove-Regular"],
      },
      textColor: {
        DEFAULT: '#000', 
      },
    },
  },
  plugins: [],
};
