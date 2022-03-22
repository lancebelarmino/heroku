import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    padding: 40,
    backgroundColor: theme.colors.white[0],
    borderRadius: 8,
    boxShadow: theme.shadows.sm,
  },
}));

export default useStyles;
