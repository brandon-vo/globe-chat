module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["Nunito"],
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
