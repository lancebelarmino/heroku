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

  cardItem: {
    display: 'flex',
    gap: 32,
  },

  cardTimer: {
    fontSize: 32,
    lineHeight: 1.25,
    fontWeight: 700,
  },

  cardDescription: {
    marginTop: 8,
    color: theme.colors.gray[4],
  },
}));

export default useStyles;
