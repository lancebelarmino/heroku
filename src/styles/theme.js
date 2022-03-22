const theme = {
  colors: {
    white: ['#fff'],
    black: ['#242C4E'],
    violet: ['#F8F4FE', '#AA5FCF', '#7B36FD'],
    gray: ['#F6F8FA', '#DDDCE3', '#CACFDB', '#BDC0CA', '#B4B6B8', '#F0EFF1'],
  },

  fontFamily: 'Lato, sans-serif',

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },

  lineHeight: 1.5,

  headings: {
    fontFamily: 'Lato, sans-serif',
    fontWeight: 700,
    sizes: {
      h1: { fontSize: 64, lineHeight: 1.375 },
      h2: { fontSize: 32, lineHeight: 1.25 },
      h3: { fontSize: 28, lineHeight: 1.357 },
      h4: { fontSize: 24, lineHeight: 1.166 },
      h5: { fontSize: 20, lineHeight: 1.4 },
      h6: { fontSize: 16, lineHeight: 1.5 },
    },
  },

  breakpoints: {
    xs: 500,
    sm: 768,
    md: 1024,
    lg: 1366,
    xl: 1720,
  },

  shadows: {
    sm: '0px 4px 12px rgba(53, 25, 106, 0.06)',
    md: '0px 4px 8px rgba(53, 25, 106, 0.12)',
  },

  other: {
    transitions: {
      all: 'all 200ms ease',
      color: 'color 200ms ease',
      border: 'border 200ms ease',
      background: 'background 500ms ease',
      stroke: 'stroke 200ms ease',
      stopColor: 'stop-color 200ms ease',
      boxShadow: 'box-shadow 200ms ease',
    },
  },
};

export default theme;
