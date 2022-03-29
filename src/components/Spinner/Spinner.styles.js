import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  spinner: {
    position: 'absolute',
    zIndex: 1000,
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '100%',
    background: theme.colors.white,
  },
}));

export default useStyles;
