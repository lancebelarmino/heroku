import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  itemFlex: {
    display: 'flex',
    gap: 32,
  },

  itemCenter: {
    display: 'grid',
    placeItems: 'center',
    rowGap: 16,
  },

  textCenter: {
    textAlign: 'center',
  },

  title: {
    marginBottom: 8,
  },

  description: {
    color: theme.colors.gray[4],
  },
}));

export default useStyles;
