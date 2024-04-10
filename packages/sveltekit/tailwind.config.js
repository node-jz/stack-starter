/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.7rem',
      },
      fontFamily: {
        writing: "'PT Serif', serif",
        header: 'Poppins',
      },
      boxShadow: {
        soft: '0 8px 16px 0 #393B3F33',
        down: '0 14px 23px -13px rgba(38,38,38,0.49)',
        'down-sm': '0 8px 10px -6px rgba(38,38,38,0.29)',
        inside: 'inset 0 0 11 4px rgba(38,38,38,0.49)',
      },
      dropShadow: {
        tight: '1px 3px 1px rgba(38,38,38,0.69)',
      },
      colors: {
        background: '#fafafa',
        backgroundSubtle: '#fff',
        text: '#222222',
        brand: '#fca311',
        'brand-dark': '#fca311',
        'brand-light': '#fca311',
        accent: '#fca311',
      },
      borderRadius: {
        mega: '40px',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'grow-down': {
          '0%': {
            opacity: '0',
            transform: 'scaleY(0)',
          },
          '100%': {
            opacity: '1',
            transform: 'scaleY(1)',
          },
        },
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '25%, 75%': {
            transform: 'translateX(-10px)',
          },
          '50%': {
            transform: 'translateX(10px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        shake: 'shake 0.5s ease-in-out 1',
        'grow-down': 'grow-down 0.5s ease-out',
      },
    },
  },
  plugins: [],
  safelist: [],
};
