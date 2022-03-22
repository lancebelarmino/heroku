import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  btn: {
    padding: '0.75rem 1rem',
    backgroundImage: 'linear-gradient(to right, #7A35FF 0%, #AB60CF 40%, #7A35FF 100%)',
    backgroundSize: '200% auto',
    border: 'none',
    borderRadius: 50,
    outline: 'none',
    boxShadow: theme.shadows.md,
    color: theme.colors.white[0],
    transition: `${theme.other.transitions.background}, ${theme.other.transitions.boxShadow}`,

    '&:hover': {
      backgroundPositionX: 'right',
      backgroundPositionY: 'center',
      boxShadow: ' 0px 4px 14px rgba(191, 161, 249, 0.8)',
    },
  },

  icon: {
    marginRight: 12,
  },
}));

export default useStyles;
