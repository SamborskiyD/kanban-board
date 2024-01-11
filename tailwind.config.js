/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'black1': '#292930',
        'black2': '#303038',
        'borderGrey': '#F5F5F514',
        'violet': '#6764F1',
        'grey1': '#6B6B7B',
        'grey2': '#9C9CB0',
        'white': '#F5F5F5',
        'yellow': '#EFB62B'
      },
    },
  },
  plugins: [],
}
