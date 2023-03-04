const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        red: {
          50: '#fdecec',
          100: '#fcdada',
          200: '#f9b4b4',
          300: '#f58f8f',
          400: '#f47c7c',
          500: '#f26969',
          600: '#f15757',
          700: '#ef4444',
          800: '#d73d3d',
          900: '#a73030',
          1000: '#782222',
        },
        purple: {
          50: '#f6f3ff',
          100: '#ede8fe',
          200: '#dcd1fd',
          300: '#cab9fc',
          400: '#c1aefc',
          500: '#b9a2fb',
          600: '#b097fb',
          700: '#a78bfa',
          800: '#967de1',
          900: '#7561af',
          1000: '#54467d',
        },
        blue: {
          0: '#e9f2fe',
          100: '#d4e4fd',
          200: '#a8c9fa',
          300: '#7daef8',
          400: '#67a1f7',
          500: '#5193f5',
          600: '#3c86f4',
          700: '#2678f3',
          800: '#226cdb',
          900: '#1b54aa',
          1000: '#133c7a',
        },
        'light-neutral': {
          1: '#ffffff',
          100: '#edeef1',
          200: '#dadee2',
          300: '#c8cdd4',
          400: '#a3acb7',
          500: '#7e8a9a',
          600: '#6c798b',
          700: '#59697d',
          800: '#47586e',
          900: '#394658',
          1000: '#323e4d',
        },
        'dark-neutral': {
          0: '#000000',
          100: '#1c232c',
          200: '#242c37',
          300: '#2b3542',
          400: '#323e4d',
          500: '#404f63',
          600: '#59697d',
          700: '#7a8797',
          800: '#9ba5b1',
          900: '#bdc3cb',
          1000: '#eef0f2',
        },
      },
      boxShadow: {
        1: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        2: '0px 4px 10px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};