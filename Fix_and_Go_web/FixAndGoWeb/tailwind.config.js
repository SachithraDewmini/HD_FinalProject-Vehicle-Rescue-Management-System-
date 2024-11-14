/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary:"#f97136",
      },
      fontFamily:{
        sans: ["Poppins","sans-serif"],
      },
      container:{
        center:true,
        padding:{
          DEFAULTT : "1rem",
          sm:"2rem",
          lg:"4rem",
          xl:"5rem",
          "2xl":"6rem",
        },
      },
    },
  },
  plugins: [],
};

