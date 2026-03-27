/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron:  { 50:'#fff9f0',100:'#fff0d6',200:'#ffdba3',300:'#ffbf5c',400:'#ff9f1c',500:'#f07c00',600:'#c25e00',700:'#9b4600',800:'#7a3500',900:'#5e2800' },
        sacred:   { 50:'#fef7ee',100:'#fdecd3',200:'#fbd5a3',300:'#f8b567',400:'#f5913e',500:'#f0700b',600:'#ca540a',700:'#a43d0e',800:'#853212',300:'#6b2712' },
        vermilion:{ DEFAULT:'#c0392b', dark:'#922b21', light:'#e74c3c' },
        marigold: { DEFAULT:'#f39c12', dark:'#d68910', light:'#f8c471' },
        tulsi:    { DEFAULT:'#27ae60', dark:'#1e8449', light:'#58d68d' },
        incense:  { DEFAULT:'#8e44ad', dark:'#6c3483', light:'#b07dd4' },
        cream:    { DEFAULT:'#fef9f0', dark:'#f9ead3' },
        gold:     { DEFAULT:'#d4a017', light:'#edc96b', dark:'#b8860b' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
        serif: ['"Noto Serif Devanagari"', 'serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(240,112,11,0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(240,112,11,0.8), 0 0 40px rgba(240,112,11,0.3)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-saffron': 'linear-gradient(135deg, #f07c00, #f39c12)',
        'gradient-sacred': 'linear-gradient(135deg, #1a0a00, #3d1400)',
        'gradient-lotus': 'linear-gradient(135deg, #c0392b, #8e44ad)',
      },
      boxShadow: {
        'saffron': '0 4px 20px rgba(240,112,11,0.4)',
        'sacred': '0 8px 40px rgba(0,0,0,0.6)',
        'card': '0 2px 20px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
