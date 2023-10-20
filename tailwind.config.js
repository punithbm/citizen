/** @type {import ('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./ui_components/**/*.{js,jsx,ts,tsx}",
    "./hocs/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.25rem",
        xl: "2rem",
        xl2: "2.25rem",
        xxl: "2.5rem",
        xxxl: "3.75rem",
        medium: "1.5rem",
        hero: "4rem",
        "4xl": "4.5rem",
        "5xl": "6rem",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#010101",
        white: "#FFFFFF",
        grey: "#7B7B7B",
        purple: "#C4A8FF",
        green: "#00AE60",
        red: " #E11900",
        primary: {
          50: "#161326",
          300: "#E5B89E",
          500: "#FF8585",
          600: "#585A48",
          700: "#FF5B5B",
          800: "#815CCF",
        },
        text: {
          100: "#BABDC2",
          500: "#484D57",
          900: "#0A0D14",
          600: "#797F8A",
        },
        secondary: {
          50: "#F5F5F5",
          100: "#282B30",
          200: "#F3FFA8",
          300: "#F5F5F5",
          500: "#464E59",
          600: "#44484F",
        },
        lightGray: "#2B2D30",
      },

      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
      },

      lineHeight: {
        1: "1.25rem",
        2: "2.25rem",
        3: "2.875rem",
        4: "3rem",
        5: "5.375rem",
        6: "5.625rem",
        7: "6rem",
        8: "3.75rem",
        9: "1.875rem",
        10: "1.5rem",
        11: "6.25rem",
        12: "4.25rem",
        13: "5rem",
        14: "1.5rem",
      },

      letterSpacing: {
        tight: "-0.01em",
      },
      screens: {
        xs: "440px",
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },

      zIndex: {
        999: "999",
        1000: "1000",
        1001: "1001",
      },
    },
    boxShadow: {
      sm: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
    },

    container: {
      padding: {
        DEFAULT: "1rem",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
    boxShadow: ["responsive", "hover", "focus"],
  },

  corePlugins: {
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false,
  },
};
