import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eu-blue': {
          50: '#e6ecf5',
          100: '#b3c4e0',
          200: '#809dcc',
          300: '#4d75b8',
          400: '#264ea3',
          500: '#003399',
          600: '#002e8a',
          700: '#00246b',
          800: '#001a4d',
          900: '#00102e',
        },
        'eu-yellow': {
          400: '#FFD700',
          500: '#FFCC00',
        },
      },
    },
  },
  plugins: [],
}

export default config
