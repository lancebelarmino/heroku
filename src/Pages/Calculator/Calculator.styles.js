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

  header: {
    marginBottom: 40,
  },

  title: {
    marginBottom: 12,
  },

  description: {
    color: theme.colors.gray[4],
  },

  calculator: {
    rowGap: 28,
  },

  dateLabel: {
    marginBottom: 16,
  },

  slider: {
    marginBottom: 12,
  },

  sliderRange: {
    color: theme.colors.gray[4],
  },

  stats: {
    marginBottom: 40,
  },

  address: {
    display: 'flex',
    alignItems: 'end',
    gap: 40,
  },

  addressInput: {
    width: '100%',
  },

  btnImport: {
    width: '140px',
  },
}));

export default useStyles;
