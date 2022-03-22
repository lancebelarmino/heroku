import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  btn: {
    display: 'block',
    marginBottom: 40,
    textAlign: 'right',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    justifyContent: 'space-between',
    rowGap: 40,
  },

  row: {
    '&:not(:last-child)': {
      marginBottom: 40,
    },
  },

  address: {
    display: 'flex',
    gap: 40,
  },

  addressInput: {
    width: '100%',
  },

  btnImport: {
    width: '140px',
  },

  title: {
    marginBottom: 24,
  },

  table: {
    width: '100%',
    marginTop: 16,
  },

  tr: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 1.5rem',
    lineHeight: 1.14,

    '&:not(:last-child)': {
      marginBottom: 16,
    },

    '&:nth-child(even)': {
      background: theme.colors.gray[0],
    },
  },
}));

export default useStyles;
