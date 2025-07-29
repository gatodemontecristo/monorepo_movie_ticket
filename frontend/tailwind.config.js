/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        caros: ['var(--font-caros)'],
        mont: ['var(--font-mont)'],
      },
      colors: {
        movie: {
          black: '#0a061e',
          grey: '#4d4767',
          skin: '#c9887c',
          yellow: '#fee505',
          duck: '#cfdc34',
          white: '#d9d9d9',
          sky: '#37c6f3',
          metal: '#909090',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
