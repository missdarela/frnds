/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        frnds: {
          black: '#0D0506',
          burgundy: '#3A080D',
          'burgundy-deep': '#24060A',
          cream: '#F4EFE7',
          warm: '#E9DFD2',
          gold: '#C79B58',
          'gold-light': '#DDB77E',
          muted: '#9D9590',
        },
      },
      fontFamily: {
        // Editorial — headings, hero, display text
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Decorative — script accents ONLY (event names, flourishes)
        script: ['"Italianno"', 'cursive'],
        // Functional — nav, body, buttons, forms, UI
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale — clamp() for fluid responsive type
        'display-lg': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'heading-lg': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.15' }],
        'heading-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
        eyebrow: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.25em' }],
        // Script accents render small by nature — keep them large enough to read
        script: ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.3' }],
      },
      maxWidth: {
        content: '80rem', // 1280px primary content container
        prose: '42rem',
      },
      spacing: {
        'section-sm': 'clamp(4rem, 8vw, 6rem)',
        'section-lg': 'clamp(6rem, 12vw, 10rem)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
