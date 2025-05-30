/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    // extend: {
    //   // colors: {
    //   //   main: "var(--main-color)",
    //   //   "mainBg": "var(--main-bg)",
    //   //   "mainBorder": "var(--main-border)",
    //   // },
    //   colors: {
    //     // theme: {
    //     //   bg: "var(--main-bg)",
    //     //   border: "var(--main-border)",
    //     //   text: "var(--main-text)",
    //     //   primary: "var(--main-color)",
    //     // },
    //     // container: {
    //     //   md: "768px",
    //     //   lg: "1024px",
    //     //   xl: "1280px",
    //     //   "2xl": "1536px",
    //     // },
    //   },
    // },
    plugins: [],
  },
  // important: true,
};
