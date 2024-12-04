/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        special: "'Roboto Slab', serif",
        base: "'Roboto', sans-serif"
      },
      colors: {
        light: {
          DEFAULT: '#f9f8f7',
          hover: '#EDEBE8'
        },
        dark: {
          DEFAULT: '#32302f',
          hover: '#535150'
        },
        primary: {
          DEFAULT: '#26638e',
          hover: '#2F7BB1',
          light: '#edf3fa'
        },
        secondary: {
          DEFAULT: '#d4605c',
          hover: '#C13833'
        },
        tertiary: {
          DEFAULT: '#377674',
          hover: '#489996'
        },
        highlight: {
          DEFAULT: '#FAF33E',
          hover: '#F9F224'
        },
        success: {
          DEFAULT: '#408446',
          hover: '#50A557',
          light: '#ACD7B0'
        }
      }
    }
  },
  plugins: []
}
