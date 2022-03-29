import React from 'react';
import { motion } from 'framer-motion';
import useStyles from './ScreenSection.styles';

const ScreenSection = ({ children }) => {
  const { classes } = useStyles();

  return (
    <motion.div className={classes.screen} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
};

export default ScreenSection;
