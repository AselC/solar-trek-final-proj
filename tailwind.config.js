// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'Orbitron', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        peach: '#FFDAB9',
        antique: '#FAEBD7',
        'soft-blue': '#C9D6FF',
        lavender: '#E2CFEA',
        earth: '#3A2A21',
      },
    },
  },
  plugins: [],
};
