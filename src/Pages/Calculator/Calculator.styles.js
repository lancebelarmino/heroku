import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  btn: {
    display: 'block',
    position: 'relative',
    zIndex: 888,
    marginBottom: 40,
    textAlign: 'right',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    justifyContent: 'space-between',
    rowGap: 40,

    [theme.fn.smallerThan('md')]: {
      gridTemplateColumns: 'repeat(2, auto)',
    },

    [theme.fn.smallerThan('sm')]: {
      gridTemplateColumns: 'repeat(1, auto)',
    },
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
