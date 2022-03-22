import React from 'react';
import useStyles from './Card.styles.js';

const Card = ({ children }) => {
  const { classes } = useStyles();

  return <div className={classes.card}>{children}</div>;
};

export default Card;
