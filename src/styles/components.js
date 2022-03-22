const components = {
  TextInput: (theme) => ({
    input: {
      height: 40,
      border: '1px solid #DDDCE3',
      borderRadius: '8px',
      color: theme.colors.black[0],
      transition: theme.other.transitions.border,

      '&::placeholder': {
        color: theme.colors.gray[1],
      },

      '&:focus': {
        borderColor: theme.colors.violet[2],
      },
    },

    label: {
      marginBottom: 16,
      fontSize: theme.fontSizes.md,
      lineHeight: 1.25,
    },
  }),

  NumberInput: (theme) => ({
    input: {
      height: 40,
      border: '1px solid #DDDCE3',
      borderRadius: '8px',
      color: theme.colors.black[0],
      transition: theme.other.transitions.border,

      '&::placeholder': {
        color: theme.colors.gray[1],
      },

      '&:focus': {
        borderColor: theme.colors.violet[2],
      },
    },

    label: {
      marginBottom: 16,
      fontSize: theme.fontSizes.md,
      lineHeight: 1.25,
    },
  }),

  Slider: (theme) => ({
    track: { '&::before': { backgroundColor: theme.colors.gray[5] } },

    bar: {
      backgroundImage: 'linear-gradient(90deg, #7B36FD 0%, #AA5FCF 100%)',
    },

    thumb: {
      border: 'none',
      backgroundImage: 'linear-gradient(90deg, #AA5FCF 0%, #7B36FD 100%)',
      boxShadow: theme.shadows.sm,
    },

    label: {
      background: theme.colors.violet[2],
    },
  }),
};

export default components;
