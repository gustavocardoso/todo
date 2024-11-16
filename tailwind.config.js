/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: '#EEF0F2',
          hover: '#DCE0E4'
        },
        dark: {
          DEFAULT: '#141414',
          hover: '#0A0A0A'
        },
        primary: {
          DEFAULT: '#007CBE',
          hover: '#005D8F'
        },
        secondary: {
          DEFAULT: '#E94F37',
          hover: '#CA2E16'
        },
        tertiary: {
          DEFAULT: '#23CE6B',
          hover: '#1EAE5A'
        },
        highlight: {
          DEFAULT: '#FAF33E',
          hover: '#F9F224'
        }
      }
    }
  },
  plugins: []
}
