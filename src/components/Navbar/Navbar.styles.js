import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    nav: {
      position: 'sticky',
      top: 0,
      width: '280px !important',
      minWidth: '280px !important',
      padding: '2.5rem !important',
      background: theme.colors.white[0],
      borderRight: '2px solid rgba(53, 25, 106, 0.04);',
      height: '100vh',
    },

    mobileNav: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      width: '100% !important',
      padding: '7.5rem 2.5rem 2.5rem 2.5rem !important',
      background: theme.colors.white[0],
      borderRight: '2px solid rgba(53, 25, 106, 0.04);',
      height: 'auto',
      boxShadow: theme.shadows.sm,
    },

    burger: {
      position: 'absolute',
      zIndex: 999,
      top: 40,
      left: 40,
    },

    header: {
      marginBottom: 80,
    },

    link: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colors.gray[3],
      padding: `0.75rem 1.25rem 0.75rem 1.25rem`,
      borderRadius: 8,
      fontWeight: 400,
      transition: theme.other.transitions.color,

      '&:not(:last-child)': {
        marginBottom: 16,
      },

      '&:hover': {
        backgroundColor: theme.colors.violet[0],
        color: theme.colors.violet[2],
        textDecoration: 'none',

        [`& .${icon} stop:first-of-type `]: {
          stopColor: theme.colors.violet[2],
        },

        [`& .${icon} stop:last-child `]: {
          stopColor: theme.colors.violet[1],
        },
      },
    },

    linkIcon: {
      ref: icon,
      marginRight: 12,

      [`& stop:first-of-type `]: {
        stopColor: theme.colors.gray[2],
        transition: theme.other.transitions.stopColor,
      },

      [`& stop:last-child `]: {
        stopColor: theme.colors.gray[2],
        transition: theme.other.transitions.stopColor,
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colors.violet[0],
        color: theme.colors.violet[2],

        [`& .${icon} stop:first-of-type`]: {
          stopColor: theme.colors.violet[2],
        },

        [`& .${icon} stop:last-child`]: {
          stopColor: theme.colors.violet[1],
        },
      },
    },
  };
});

export default useStyles;
