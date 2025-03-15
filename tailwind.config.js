const { text } = require("stream/consumers");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#BE7B3D",
        main: "#8B5E35",
        secondColor: "#9B7E5C",
        Secondtext: "#9D9DAA",
        Thirdtext: "#C0C0C0",
        bg: "#f6f6f6",
        text: "#090F41",
        reveiw: "#FFC000",
        border: "#A2A3B1",
      },
      fontFamily: {
        popins: "Poppins",
        Hedvig: "Hedvig Letters Serif",
        Caveat: "Caveat",
        Roboto: "Roboto",
        Crimson: "Crimson Pro",
        Inter: "Inter",
        archivo: "Archivo",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("flowbite/plugin")],
};
