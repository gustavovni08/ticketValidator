/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ajuste os caminhos conforme sua estrutura
  ],
  theme: {
    extend: {
      animation: {
        'custom-pulse': 'pulse 1.5s infinite ease-in-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.1)', opacity: 0.8 },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

