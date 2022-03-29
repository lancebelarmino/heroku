import React from 'react';
import { MagicSpinner } from 'react-spinners-kit';
import { motion } from 'framer-motion';
import { spinnerVariant } from '../../styles/framer-variants';
import useStyles from './Spinner.styles';

const Spinner = () => {
  const { classes } = useStyles();

  return (
    <motion.div
      className={classes.spinner}
      variants={spinnerVariant}
      initial="hidden"
      animate="visible"
      exit="exit">
      <MagicSpinner size={250} color="#7B36FD" />
    </motion.div>
  );
};

export default Spinner;
