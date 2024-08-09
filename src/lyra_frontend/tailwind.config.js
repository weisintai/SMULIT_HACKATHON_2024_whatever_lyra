/ @type {import('tailwindcss').Config} */;
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages//*.{js,jsx,ts,tsx}",
    "./components//*.{js,jsx,ts,tsx}",
    "./app//*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
        "bubble-move": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.5" },
          "100%": {
            transform: "translateY(-100vh) translateX(100vw)",
            opacity: "0",
          },
        },
        "bubble-rise": {
          "0%": { transform: "translateY(0) scale(0.5)", opacity: "0.3" },
          "100%": { transform: "translateY(-100vh) scale(1.5)", opacity: "0" },
        },
        "bubble-move-1": {
          "0%": {
            bottom: "10%",
            transform: "translateX(0)",
            opacity: "0.5",
          },
          "50%": {
            transform: "translateX(20%)",
            opacity: "1",
          },
          "100%": {
            bottom: "100%",
            transform: "translateX(50%)",
            opacity: "0",
          },
        },
        "bubble-move-2": {
          "0%": {
            bottom: "20%",
            transform: "translateX(0)",
            opacity: "0.4",
          },
          "25%": {
            opacity: "0.8",
            transform: "translateX(-10%)",
          },
          "50%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          "75%": {
            opacity: "0.6",
            transform: "translateX(10%)",
          },
          "100%": {
            bottom: "100%",
            opacity: "0",
            transform: "translateX(20%)",
          },
        },
        "bubble-move-3": {
          "0%": {
            bottom: "30%",
            transform: "translateX(0)",
            opacity: "0.6",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(5%)",
          },
          "40%": {
            opacity: "0.8",
            transform: "translateX(-5%)",
          },
          "60%": {
            opacity: "1",
            transform: "translateX(10%)",
          },
          "80%": {
            opacity: "0.6",
            transform: "translateX(-10%)",
          },
          "100%": {
            bottom: "100%",
            opacity: "0",
            transform: "translateX(0)",
          },
        },
        "bubble-move-4": {
          "0%": {
            bottom: "15%",
            transform: "translateX(0)",
            opacity: "0.5",
          },
          "30%": {
            opacity: "0.9",
            transform: "translateX(15%)",
          },
          "60%": {
            opacity: "0.7",
            transform: "translateX(-15%)",
          },
          "100%": {
            bottom: "100%",
            opacity: "0",
            transform: "translateX(10%)",
          },
        },
        "bubble-move-5": {
          "0%": {
            bottom: "25%",
            transform: "translateX(0)",
            opacity: "0.3",
          },
          "50%": {
            opacity: "0.8",
            transform: "translateX(30%)",
          },
          "100%": {
            bottom: "100%",
            opacity: "0",
            transform: "translateX(50%)",
          },
        },
        hideLoading: {
          "0%": {
            transition: "1s",
            opacity: "1",
            visibility: "visible",
          },
          "100%": {
            transition: ".5s",
            opacity: "0",
            visibility: "hidden",
          },
        },
        animate: {
          "0%": {
            backgroundPosition: "-500%",
          },
          "100%": {
            backgroundPosition: "500%",
          },
        },
        "an-smoke-3": {
          "0%": {
            opacity: "0",
            transform: "translateY(7%) rotate(.01deg)",
          },
          "50%": {
            opacity: ".9",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-7%,5%) rotate(.01deg)",
          },
        },
        "an-smoke-3-reverse": {
          "0%": {
            opacity: "0",
            transform: "translateY(-7%) rotate(.01deg)",
          },
          "50%": {
            opacity: ".9",
          },
          "100%": {
            opacity: "0",
            transform: "translate(7%,-20%) rotate(.01deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        bounce: "bounce 2s infinite",
        "bubble-1": "bubble-move 15s infinite ease-in-out",
        "bubble-2": "bubble-move-1 10s infinite ease-in-out",
        "bubble-3": "bubble-move 25s infinite ease-in-out",
        "bubble-4": "bubble-rise 18s infinite ease-in-out",
        "bubble-5": "bubble-rise 22s infinite ease-in-out",

        "bubble-6": "bubble-move-1 12s infinite ease-in-out",
        "bubble-7": "bubble-move-2 14s infinite ease-in-out",
        "bubble-8": "bubble-move-3 16s infinite ease-in-out",
        "bubble-9": "bubble-move-4 18s infinite ease-in-out",
        "bubble-1": "bubble-move-5 20s infinite ease-in-out",

        hideLoading: "hideLoading 1s forwards 2.5s",
        animate: "animate 3s linear infinite",
        "an-smoke-3": "an-smoke-3 1.5s ease-in-out infinite",
        "an-smoke-3-reverse": "an-smoke-3-reverse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
