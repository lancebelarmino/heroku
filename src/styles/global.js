const global = (theme) => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    fontFamily: theme.fontFamily,
    backgroundColor: theme.colors.gray[0],
  },
});

export default global;
