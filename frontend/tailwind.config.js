/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        card: "#121216",
        border: "#1f1f23",
        primary: {
          DEFAULT: "#8b5cf6",
          dark: "#6d28d9",
          glow: "rgba(139, 92, 246, 0.5)",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          dark: "#0891b2",
        },
        accent: "#f43f5e",
        success: "#10b981",
        warning: "#f59e0b",
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0a0a0c 0%, #1a1a2e 100%)',
        'glass': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(139, 92, 246, 0.3)',
        'glow-secondary': '0 0 15px rgba(6, 182, 212, 0.3)',
        'glow-accent': '0 0 15px rgba(244, 63, 94, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
