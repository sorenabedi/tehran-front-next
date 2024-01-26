import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-iranYekan)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },

        //________________________________
        //          Teyran colors
        //________________________________
        gamboge: {
          "50": "hsl(49 80% 96% / <alpha-value>)",
          "100": "hsl(48 79% 89% / <alpha-value>)",
          "200": "hsl(49 80% 77% / <alpha-value>)",
          "300": "hsl(46 80% 65% / <alpha-value>)",
          "400": "hsl(44 80% 56% / <alpha-value>)",
          "500": "hsl(38 77% 53% / <alpha-value>)",
          "600": "hsl(33 78% 44% / <alpha-value>)",
          "700": "hsl(26 76% 37% / <alpha-value>)",
          "800": "hsl(23 69% 31% / <alpha-value>)",
          "900": "hsl(21 64% 26% / <alpha-value>)",
          "950": "hsl(22 75% 14% / <alpha-value>)",
        },
        malachite: {
          "50": "hsl(115 92% 95% / <alpha-value>)",
          "100": "hsl(116 89% 89% / <alpha-value>)",
          "200": "hsl(117 88% 80% / <alpha-value>)",
          "300": "hsl(118 85% 67% / <alpha-value>)",
          "400": "hsl(119 78% 53% / <alpha-value>)",
          "500": "hsl(120 81% 44% / <alpha-value>)",
          "600": "hsl(121 85% 35% / <alpha-value>)",
          "700": "hsl(122 78% 27% / <alpha-value>)",
          "800": "hsl(122 69% 23% / <alpha-value>)",
          "900": "hsl(124 61% 20% / <alpha-value>)",
          "950": "hsl(126 80% 10% / <alpha-value>)",
        },
        thunderbird: {
          "50": "hsl(0 100% 97% / <alpha-value>)",
          "100": "hsl(0 100% 93% / <alpha-value>)",
          "200": "hsl(0 100% 88% / <alpha-value>)",
          "300": "hsl(0 100% 80% / <alpha-value>)",
          "400": "hsl(0 100% 68% / <alpha-value>)",
          "500": "hsl(0 100% 58% / <alpha-value>)",
          "600": "hsl(0 96% 51% / <alpha-value>)",
          "700": "hsl(0 98% 42% / <alpha-value>)",
          "800": "hsl(0 93% 35% / <alpha-value>)",
          "900": "hsl(0 83% 31% / <alpha-value>)",
          "950": "hsl(0 100% 15% / <alpha-value>)",
        },
        mariner: {
          "50": "hsl(195 100% 96% / <alpha-value>)",
          "100": "hsl(196 100% 91% / <alpha-value>)",
          "200": "hsl(195 100% 83% / <alpha-value>)",
          "300": "hsl(193 100% 72% / <alpha-value>)",
          "400": "hsl(195 100% 59% / <alpha-value>)",
          "500": "hsl(200 100% 50% / <alpha-value>)",
          "600": "hsl(210 100% 50% / <alpha-value>)",
          "700": "hsl(214 80% 48% / <alpha-value>)",
          "800": "hsl(216 75% 40% / <alpha-value>)",
          "900": "hsl(214 68% 33% / <alpha-value>)",
          "950": "hsl(216 61% 21% / <alpha-value>)",
        },
        "purple-heart": {
          "50": "hsl(230 100% 96% / <alpha-value>)",
          "100": "hsl(234 100% 94% / <alpha-value>)",
          "200": "hsl(235 100% 89% / <alpha-value>)",
          "300": "hsl(237 100% 82% / <alpha-value>)",
          "400": "hsl(242 97% 74% / <alpha-value>)",
          "500": "hsl(247 91% 67% / <alpha-value>)",
          "600": "hsl(251 82% 59% / <alpha-value>)",
          "700": "hsl(252 63% 54% / <alpha-value>)",
          "800": "hsl(252 59% 41% / <alpha-value>)",
          "900": "hsl(249 51% 34% / <alpha-value>)",
          "950": "hsl(252 51% 20% / <alpha-value>)",
        },
      },
      borderWidth: {
        "0.5": "0.5px",
        "1": "1px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backdropBlur: {
        xs: "2px",
      },
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          // values from config and defaults you wish to use most
          values: Object.assign(
            theme("bgGradientDeg", {}), // name of config key. Must be unique
            {
              10: "10deg", // bg-gradient-10
              15: "15deg",
              20: "20deg",
              25: "25deg",
              30: "30deg",
              45: "45deg",
              60: "60deg",
              90: "90deg",
              120: "120deg",
              135: "135deg",
            }
          ),
        }
      );
    }),
    require("tailwindcss-logical"),
  ],
} satisfies Config;

export default config;
