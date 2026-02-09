import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand': {
          50: '#f3f1fe',
          100: '#e0dcfc',
          200: '#c4bbf9',
          300: '#a99fff',
          400: '#8b7ff5',
          500: '#6b4ce6',
          600: '#4a3a9f',
          700: '#3b2a80',
          800: '#2a1d5e',
          900: '#1a1040',
        },
        'gold': {
          400: '#e6b800',
          500: '#d4a000',
          600: '#b88a00',
        },
        'dark': {
          DEFAULT: '#0a0a0f',
          50: '#f5f5f7',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b',
          900: '#0a0a0f',
        },
      },
    },
  },
  plugins: [],
}

export default config
