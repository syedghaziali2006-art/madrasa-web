import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        madarsa: {
          bg: "#120A05",
          dark: "#0D0704",
          navy: "#1A0E08",
          card: "#22130B",
          cardHover: "#2C190F",
          maroon: "#24140D",
          maroonDark: "#1A0D08",
          border: "rgba(201, 179, 141, 0.25)",
          borderHover: "rgba(201, 179, 141, 0.55)",
          gold: "#C9B38D",
          goldLight: "#D9C7A7",
          goldDark: "#997C4D",
          textLight: "#FAF7F2",
          textMuted: "#C4B5A5",
        },
      },
      fontFamily: {
        heading: ["'Noto Nastaliq Urdu'", "serif"],
        arabic: ["'Noto Nastaliq Urdu'", "serif"],
        cairo: ["'Noto Nastaliq Urdu'", "serif"],
        urdu: ["'Noto Nastaliq Urdu'", "serif"],
        nastaliq: ["'Noto Nastaliq Urdu'", "serif"],
      },
      boxShadow: {
        goldGlow: "0 0 25px rgba(229, 169, 60, 0.35)",
        goldGlowLg: "0 0 45px rgba(229, 169, 60, 0.55)",
        darkCard: "0 20px 50px -10px rgba(0, 0, 0, 0.8)",
      },
      maxWidth: {
        site: "100%",
        "7xl": "100%",
        "8xl": "100%",
      },
    },
  },
  plugins: [],
};

export default config;
