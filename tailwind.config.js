/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode (will be dark by default)
  theme: {
    extend: {
      colors: {
        // High-end developer dark mode palette
        dark: {
          950: '#030712', // Extreme dark
          900: '#0b0f19', // Deep dark
          800: '#111827', // Card dark
          700: '#1f2937', // Border/Hover dark
          600: '#374151',
          500: '#9ca3af', // Text muted
        },
        accent: {
          cyan: '#00e5ff',    // Neon Cyan
          blue: '#2563eb',    // Slate Blue
          indigo: '#4f46e5',  // Indigo accent
          emerald: '#10b981', // Neon Emerald
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'blob-slow': 'blob-slow 7s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'blob-slow': {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'radial-gradient-dark': 'radial-gradient(circle at top, #0f172a, #030712)',
        'mesh-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 50%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 229, 255, 0.15)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
