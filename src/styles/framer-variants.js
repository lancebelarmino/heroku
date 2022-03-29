export const contentVariant = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: (i) => {
    return {
      y: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.4,
        delay: i * 0.1,
      },
    };
  },
};

export const spinnerVariant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0 },
};
