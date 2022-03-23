import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  connected: {
    display: 'inline-flex',
  },

  connectedMessage: {
    marginRight: 8,
    color: theme.colors.gray[4],
  },
}));

export default useStyles;
