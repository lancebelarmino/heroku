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
}));

export default useStyles;
